import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  createDemo,
  templates,
  industries,
  toPublic,
  toAdmin,
  isAvailable,
  slugify,
  whatsappUrl,
} from "../src/lib/catalogue";
import {
  demoSchema,
  enquirySchema,
  prospectSchema,
} from "../src/lib/validation";
test("all 18 industries have multiple valid templates and bundled images", () => {
  assert.equal(industries.length, 18);
  assert.equal(new Set(templates.map((t) => t.id)).size, templates.length);
  for (const i of industries)
    assert.ok(templates.filter((t) => t.industry === i.id).length >= 3, i.id);
  for (const t of templates) {
    const d = toAdmin(createDemo(t.id, `Example ${t.specialty}`));
    assert.equal(demoSchema.safeParse(d).success, true, t.id);
    assert.ok(existsSync(`public${t.image}`), t.image);
    assert.ok(d.sections.some((s) => s.kind === "contact"));
  }
});
test("new demos and their sections are independent", () => {
  const a = createDemo("medico-1", "Clinic A"),
    b = createDemo("medico-1", "Clinic B");
  assert.notEqual(a.id, b.id);
  assert.notEqual(a.sections[0].id, b.sections[0].id);
  a.sections[0].heading = "Edited";
  assert.notEqual(a.sections[0].heading, b.sections[0].heading);
});
test("public projection strips admin notes, password hashes, and revision", () => {
  const d = createDemo("restaurant-1", "Example");
  d.notes = "PRIVATE SENTINEL";
  d.settings.passwordHash = "SECRET HASH";
  const text = JSON.stringify(toPublic(d));
  assert.ok(!text.includes("PRIVATE SENTINEL"));
  assert.ok(!text.includes("SECRET HASH"));
  assert.equal("revision" in toPublic(d), false);
  assert.equal(toAdmin(d).hasPassword, true);
  assert.ok(!JSON.stringify(toAdmin(d)).includes("SECRET HASH"));
});
test("publication and expiry gates", () => {
  const d = createDemo("hotel-1", "Sample hotel");
  assert.equal(isAvailable(d), false);
  d.status = "published";
  assert.equal(isAvailable(d), true);
  d.settings.expiresAt = "2000-01-01T00:00:00Z";
  assert.equal(isAvailable(d), false);
  d.settings.expiresAt = "2099-01-01T00:00:00Z";
  assert.equal(isAvailable(d), true);
});
test("URL, colour and image input validation rejects executable content", () => {
  const d = toAdmin(createDemo("medico-1", "Clinic"));
  assert.equal(
    demoSchema.safeParse({
      ...d,
      hero: { ...d.hero, ctaLink: "javascript:alert(1)" },
    }).success,
    false,
  );
  assert.equal(
    demoSchema.safeParse({
      ...d,
      business: { ...d.business, logo: "data:image/svg+xml,evil" },
    }).success,
    false,
  );
  assert.equal(
    demoSchema.safeParse({
      ...d,
      design: { ...d.design, primary: "red;position:fixed" },
    }).success,
    false,
  );
  assert.equal(
    demoSchema.safeParse({ ...d, slug: "../secret" }).success,
    false,
  );
});
test("slug and WhatsApp normalization", () => {
  assert.equal(slugify("The Café & Co."), "the-cafe-co");
  assert.equal(slugify("///"), "business-demo");
  assert.ok(
    whatsappUrl("+91 90000 00000", "Hello & welcome").includes(
      "Hello%20%26%20welcome",
    ),
  );
  assert.equal(whatsappUrl("12", "test"), "");
});
test("enquiries require contact and consent", () => {
  const b = {
    name: "Test Visitor",
    email: "visitor@example.test",
    phone: "",
    message: "Please send details",
    kind: "Enquiry",
    website: "",
    startedAt: Date.now(),
    consent: true,
  };
  assert.equal(enquirySchema.safeParse(b).success, true);
  assert.equal(enquirySchema.safeParse({ ...b, email: "" }).success, false);
  assert.equal(
    enquirySchema.safeParse({ ...b, consent: false }).success,
    false,
  );
  assert.equal(enquirySchema.safeParse({ ...b, message: "x" }).success, false);
});
test("prospect outreach status is constrained", () => {
  assert.equal(
    prospectSchema.safeParse({
      businessName: "Example",
      contactPerson: "",
      phone: "",
      email: "",
      industry: "medico",
      demoId: "",
      status: "invented",
      followUp: "",
      notes: "",
    }).success,
    false,
  );
});
