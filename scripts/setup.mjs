import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { writeFile, access } from "node:fs/promises";
import { randomBytes } from "node:crypto";
let hidden = false;
const muted = new Writable({
  write(chunk, encoding, callback) {
    if (!hidden) process.stdout.write(chunk, encoding);
    callback();
  },
});
const rl = createInterface({
  input: process.stdin,
  output: muted,
  terminal: true,
});
try {
  let exists = false;
  try {
    await access(".env.local");
    exists = true;
  } catch {}
  if (
    exists &&
    (
      await rl.question("Replace existing local credentials? Type yes: ")
    ).trim() !== "yes"
  )
    process.exit(0);
  const username = (await rl.question("Admin ID: ")).trim();
  process.stdout.write("Admin password (hidden, minimum 12 characters): ");
  hidden = true;
  const password = await rl.question("");
  hidden = false;
  process.stdout.write("\n");
  if (username.length < 2 || password.length < 12)
    throw new Error(
      "Use an admin ID and a password with at least 12 characters.",
    );
  const url =
    (await rl.question("App URL [http://localhost:3000]: ")).trim() ||
    "http://localhost:3000";
  if (!/^https?:\/\//.test(url)) throw new Error("Use an http(s) app URL.");
  await writeFile(
    ".env.local",
    `ADMIN_USERNAME=${JSON.stringify(username)}\nADMIN_PASSWORD=${JSON.stringify(password)}\nSESSION_SECRET=${randomBytes(48).toString("hex")}\nAPP_URL=${url.replace(/\/$/, "")}\nDATA_PROVIDER=local\n`,
    { mode: 0o600 },
  );
  console.log(
    "Local configuration saved. Restart the server. Keep .env.local private.",
  );
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
} finally {
  rl.close();
}
