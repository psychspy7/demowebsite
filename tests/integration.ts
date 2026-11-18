import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { industries, templates } from "../src/lib/catalogue";
import type { AdminDemo } from "../src/lib/types";
try {
  process.loadEnvFile(".env.local");
} catch {}
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
assert.ok(
  process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD,
  "Configure .env.local before integration tests.",
);
let cookie = "",
  demoIds: string[] = [],
  assetIds: string[] = [],
  prospectIds: string[] = [];
let checks = 0;
async function check(name: string, fn: () => Promise<void>) {
  await fn();
  checks++;
  console.log(`PASS ${name}`);
}
async function api(
  path: string,
  method = "GET",
  body?: unknown,
  admin = true,
  extra: Record<string, string> = {},
) {
  const r = await fetch(base + path, {
    method,
    headers: {
      ...(body instanceof FormData
        ? {}
        : { "content-type": "application/json" }),
      ...(admin ? { cookie } : {}),
      ...extra,
    },
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });
  return r;
}
async function json(path: string, method = "GET", body?: unknown) {
  const r = await api(path, method, body);
  const b = await r.json();
  assert.ok(r.ok, `${path} returned ${r.status}: ${JSON.stringify(b)}`);
  return b;
}
try {
  await check("admin APIs deny anonymous access", async () => {
    assert.equal(
      (await api("/api/admin/snapshot", "GET", undefined, false)).status,
      401,
    );
  });
  await check("login rejects invalid credentials", async () => {
    assert.equal(
      (
        await api(
          "/api/auth",
          "POST",
          { username: "invalid", password: "incorrect" },
          false,
        )
      ).status,
      401,
    );
  });
  await check("login creates a protected server session", async () => {
    const r = await api(
      "/api/auth",
      "POST",
      {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      },
      false,
    );
    assert.equal(r.status, 200);
    const header = r.headers.get("set-cookie")!;
    assert.ok(/HttpOnly/i.test(header));
    assert.ok(/SameSite=strict/i.test(header));
    cookie = header.split(";")[0];
  });
  await check("cross-origin mutations are rejected", async () => {
    assert.equal(
      (
        await api(
          "/api/admin/demos",
          "POST",
          { businessName: "Test", templateId: "medico-1" },
          true,
          { origin: "https://untrusted.example" },
        )
      ).status,
      403,
    );
  });
  await check(
    "browser-origin requests work on the configured local host",
    async () => {
      assert.equal(
        (
          await api(
            "/api/auth",
            "POST",
            {
              username: process.env.ADMIN_USERNAME,
              password: process.env.ADMIN_PASSWORD,
            },
            false,
            { origin: base },
          )
        ).status,
        200,
      );
    },
  );
  await check(
    "all industry routes and every implemented template render",
    async () => {
      for (const i of industries) {
        assert.equal((await fetch(`${base}/${i.id}`)).status, 200, i.id);
      }
      for (let i = 0; i < templates.length; i += 5)
        await Promise.all(
          templates.slice(i, i + 5).map(async (t) => {
            const r = await fetch(`${base}/templates/${t.id}`);
            assert.equal(r.status, 200, t.id);
            const text = await r.text();
            assert.ok(text.includes("TEMPLATE PREVIEW"), t.id);
          }),
        );
    },
  );
  let demo = (await json("/api/admin/demos", "POST", {
    businessName: `QA Website ${Date.now()}`,
    templateId: "restaurant-2",
  })) as AdminDemo;
  demoIds.push(demo.id);
  await check(
    "drafts are private and authenticated previews work",
    async () => {
      const r = await api(`/preview/${demo.slug}`, "GET", undefined, false);
      assert.equal(r.status, 404);
      assert.equal((await api(`/preview/${demo.slug}`)).status, 200);
    },
  );
  await check(
    "duplicate creates independent IDs and draft content",
    async () => {
      const copy = await json(`/api/admin/demos/${demo.id}/duplicate`, "POST");
      demoIds.push(copy.id);
      assert.notEqual(copy.id, demo.id);
      assert.notEqual(copy.slug, demo.slug);
      assert.notEqual(copy.sections[0].id, demo.sections[0].id);
      copy.hero.heading = "A different story";
      await json(`/api/admin/demos/${copy.id}`, "PUT", copy);
      const snap = await json("/api/admin/snapshot");
      assert.notEqual(
        snap.demos.find((d: AdminDemo) => d.id === demo.id).hero.heading,
        copy.hero.heading,
      );
    },
  );
  await check(
    "real image uploads remain private while unattached",
    async () => {
      const form = new FormData();
      form.set(
        "file",
        new File(
          [await readFile("public/images/restaurant.jpg")],
          "qa-image.jpg",
          { type: "image/jpeg" },
        ),
      );
      form.set("folder", "QA");
      const a = await json("/api/admin/assets", "POST", form);
      assetIds.push(a.id);
      assert.equal((await api(a.url, "GET", undefined, false)).status, 404);
      assert.equal(
        (await api(a.url)).headers.get("content-type"),
        "image/jpeg",
      );
      demo.hero.image = a.url;
    },
  );
  await check("unsafe uploads rejected", async () => {
    const form = new FormData();
    form.set(
      "file",
      new File(['<svg onload="alert(1)"/>'], "unsafe.svg", {
        type: "image/svg+xml",
      }),
    );
    assert.equal((await api("/api/admin/assets", "POST", form)).status, 400);
  });
  await check("save, section reordering and publish persist", async () => {
    demo.notes = "PRIVATE-NOTE-SENTINEL";
    demo.hero.heading = "A tested website concept";
    demo.seo.title = "QA SEO Title";
    demo.contact.whatsapp = "+91 90000 00000";
    demo.contact.whatsappMessage = "Test & hello";
    demo.sections.reverse();
    demo.status = "published";
    demo = await json(`/api/admin/demos/${demo.id}`, "PUT", demo);
    const snap = await json("/api/admin/snapshot");
    assert.equal(
      snap.demos.find((d: AdminDemo) => d.id === demo.id).hero.heading,
      "A tested website concept",
    );
    assert.equal(
      (await api(demo.hero.image, "GET", undefined, false)).status,
      200,
    );
  });
  await check(
    "published HTML contains correct SEO and no private admin fields",
    async () => {
      const html = await (
        await api(`/preview/${demo.slug}`, "GET", undefined, false)
      ).text();
      assert.ok(html.includes("QA SEO Title"));
      assert.ok(html.includes("noindex"));
      assert.ok(
        html.includes("https://wa.me/919000000000?text=Test%20%26%20hello"),
      );
      assert.ok(!html.includes("PRIVATE-NOTE-SENTINEL"));
      assert.ok(!html.includes(process.env.ADMIN_PASSWORD!));
    },
  );
  await check(
    "optimistic concurrency and duplicate slug conflicts",
    async () => {
      assert.equal(
        (
          await api(`/api/admin/demos/${demo.id}`, "PUT", {
            ...demo,
            revision: demo.revision - 1,
          })
        ).status,
        409,
      );
      const copy = (await json("/api/admin/snapshot")).demos.find(
        (d: AdminDemo) => d.id === demoIds[1],
      );
      assert.equal(
        (
          await api(`/api/admin/demos/${copy.id}`, "PUT", {
            ...copy,
            slug: demo.slug,
          })
        ).status,
        409,
      );
    },
  );
  await check("used media deletion is prevented", async () => {
    assert.equal(
      (await api(`/api/admin/assets/${assetIds[0]}`, "DELETE")).status,
      409,
    );
  });
  await check("validated enquiries and analytics persist", async () => {
    const payload = {
      name: "QA Visitor",
      email: "visitor@example.test",
      phone: "",
      message: "Please share more about this concept.",
      website: "",
      startedAt: Date.now() - 5000,
      consent: true,
      kind: "General enquiry",
    };
    assert.equal(
      (
        await api(
          `/api/public/${demo.slug}/enquiries`,
          "POST",
          { ...payload, email: "" },
          false,
        )
      ).status,
      400,
    );
    assert.equal(
      (
        await api(
          `/api/public/${demo.slug}/enquiries`,
          "POST",
          { ...payload, website: "spam" },
          false,
        )
      ).status,
      400,
    );
    assert.equal(
      (await api(`/api/public/${demo.slug}/enquiries`, "POST", payload, false))
        .status,
      201,
    );
    assert.equal(
      (
        await api(
          `/api/public/${demo.slug}/events`,
          "POST",
          { type: "visit" },
          false,
        )
      ).status,
      200,
    );
    const snap = await json("/api/admin/snapshot");
    const e = snap.enquiries.find(
      (e: { demoId: string }) => e.demoId === demo.id,
    );
    assert.ok(e);
    await json(`/api/admin/enquiries/${e.id}`, "PATCH");
    assert.ok(
      snap.analytics.some(
        (a: { demoId: string; type: string }) =>
          a.demoId === demo.id && a.type === "enquiry",
      ),
    );
  });
  await check(
    "password protection gates HTML, images and submissions",
    async () => {
      demo = await json(`/api/admin/demos/${demo.id}`, "PUT", {
        ...demo,
        password: "qa-preview-password",
      });
      assert.equal(demo.hasPassword, true);
      assert.ok(!JSON.stringify(demo).includes("passwordHash"));
      const html = await (
        await api(`/preview/${demo.slug}`, "GET", undefined, false)
      ).text();
      assert.ok(html.includes("Demo password"));
      assert.ok(!html.includes("A tested website concept"));
      assert.equal(
        (await api(demo.hero.image, "GET", undefined, false)).status,
        404,
      );
      assert.equal(
        (
          await api(
            `/api/public/${demo.slug}/events`,
            "POST",
            { type: "visit" },
            false,
          )
        ).status,
        403,
      );
      const r = await api(
        `/api/public/${demo.slug}/unlock`,
        "POST",
        { password: "qa-preview-password" },
        false,
      );
      assert.equal(r.status, 200);
      const gateCookie = r.headers.get("set-cookie")!.split(";")[0];
      const unlocked = await api(
        `/preview/${demo.slug}`,
        "GET",
        undefined,
        false,
        { cookie: gateCookie },
      );
      assert.ok((await unlocked.text()).includes("A tested website concept"));
    },
  );
  await check("expiry and unpublish remove public access", async () => {
    demo = await json(`/api/admin/demos/${demo.id}`, "PUT", {
      ...demo,
      clearPassword: true,
      settings: { ...demo.settings, expiresAt: "2000-01-01T00:00:00Z" },
    });
    assert.equal(
      (await api(`/preview/${demo.slug}`, "GET", undefined, false)).status,
      404,
    );
    demo = await json(`/api/admin/demos/${demo.id}`, "PUT", {
      ...demo,
      status: "draft",
      settings: { ...demo.settings, expiresAt: "" },
    });
    assert.equal(
      (await api(`/preview/${demo.slug}`, "GET", undefined, false)).status,
      404,
    );
  });
  await check(
    "prospects can be created, updated and linked to demos",
    async () => {
      const p = await json("/api/admin/prospects", "POST", {
        businessName: "QA prospect",
        contactPerson: "Test contact",
        phone: "",
        email: "contact@example.test",
        industry: demo.industry,
        demoId: demo.id,
        status: "New prospect",
        followUp: "2026-12-01",
        notes: "QA only",
      });
      prospectIds.push(p.id);
      const updated = await json(`/api/admin/prospects/${p.id}`, "PUT", {
        ...p,
        status: "Demo prepared",
      });
      assert.equal(updated.status, "Demo prepared");
    },
  );
  console.log(
    `Integration tests passed: ${checks} workflows, ${industries.length} industry routes, ${templates.length} template routes.`,
  );
} finally {
  for (const id of demoIds)
    assert.equal((await api(`/api/admin/demos/${id}`, "DELETE")).status, 200);
  for (const id of assetIds)
    assert.equal((await api(`/api/admin/assets/${id}`, "DELETE")).status, 200);
  for (const id of prospectIds)
    assert.equal(
      (await api(`/api/admin/prospects/${id}`, "DELETE")).status,
      200,
    );
  const snapshot = await json("/api/admin/snapshot");
  assert.ok(
    !snapshot.demos.some((d: { id: string }) => demoIds.includes(d.id)),
  );
  assert.ok(
    !snapshot.enquiries.some((e: { demoId: string }) =>
      demoIds.includes(e.demoId),
    ),
  );
  assert.ok(
    !snapshot.analytics.some((a: { demoId: string }) =>
      demoIds.includes(a.demoId),
    ),
  );
  console.log("PASS deletion and cascade cleanup verified");
}
