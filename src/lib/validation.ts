import { z } from "zod";
import { prospectStatuses } from "./types";
const short = z.string().max(300);
const long = z.string().max(12000);
const url = z
  .string()
  .max(2000)
  .refine((v) => !v || /^https?:\/\//i.test(v), "Use a full http(s) URL");
const image = z
  .string()
  .max(2000)
  .refine(
    (v) =>
      !v ||
      /^\/images\/[\w.-]+$/.test(v) ||
      /^\/api\/media\/[a-f\d-]+$/.test(v) ||
      /^https?:\/\//i.test(v),
    "Use an uploaded image or an http(s) URL",
  );
const link = z
  .string()
  .max(2000)
  .refine(
    (v) => !v || /^(https?:\/\/|mailto:|tel:|#[\w-]+$)/i.test(v),
    "Use an http(s), email, phone or section link",
  );
const color = z.string().regex(/^#[\da-fA-F]{6}$/);
const email = z.union([z.literal(""), z.email()]);
const phone = z
  .string()
  .max(40)
  .refine(
    (v) =>
      !v ||
      (/^[+\d\s().-]+$/.test(v) &&
        v.replace(/\D/g, "").length >= 7 &&
        v.replace(/\D/g, "").length <= 15),
    "Use a valid phone number with country code",
  );
const item = z.object({
  id: z.uuid(),
  title: short,
  text: long,
  price: short,
  category: short,
  image,
  link,
});
export const sectionSchema = z.object({
  id: z.uuid(),
  kind: z.enum([
    "about",
    "services",
    "catalogue",
    "team",
    "gallery",
    "pricing",
    "faq",
    "hours",
    "testimonials",
    "contact",
  ]),
  heading: short,
  description: long,
  visible: z.boolean(),
  items: z.array(item).max(80),
  ctaLabel: short,
  ctaLink: link,
});
export const demoSchema = z.object({
  businessName: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(80),
  industry: short,
  templateId: short,
  status: z.enum(["draft", "published"]),
  revision: z.number().int().min(1),
  notes: long,
  business: z.object({
    tagline: short,
    description: long,
    category: short,
    logo: image,
    favicon: image,
  }),
  contact: z.object({
    phone,
    whatsapp: phone,
    whatsappMessage: long,
    email,
    address: short,
    city: short,
    state: short,
    postalCode: short,
    maps: url,
    instagram: url,
    facebook: url,
    linkedin: url,
  }),
  hero: z.object({
    heading: z.string().min(1).max(300),
    description: long,
    image,
    ctaLabel: short,
    ctaLink: link,
  }),
  design: z.object({
    primary: color,
    secondary: color,
    accent: color,
    font: z.enum(["sans", "serif", "mono"]),
    theme: z.enum(["light", "dark"]),
    buttonStyle: z.enum(["square", "soft", "pill"]),
    layout: z.enum([
      "editorial",
      "split",
      "immersive",
      "minimal",
      "structured",
    ]),
  }),
  seo: z.object({
    title: short,
    description: short,
    ogImage: image,
    canonical: url,
    noindex: z.boolean(),
  }),
  settings: z.object({
    expiresAt: z
      .string()
      .refine(
        (v) => !v || Number.isFinite(Date.parse(v)),
        "Invalid expiry date",
      ),
    showDemoLabel: z.boolean(),
  }),
  sections: z.array(sectionSchema).max(40),
  footer: long,
  password: z.string().min(8).max(128).optional(),
  clearPassword: z.boolean().optional(),
});
export const createSchema = z.object({
  templateId: short,
  businessName: z.string().trim().min(2).max(160),
});
export const prospectSchema = z.object({
  businessName: z.string().trim().min(2).max(160),
  contactPerson: short,
  phone,
  email,
  industry: short,
  demoId: z.union([z.literal(""), z.uuid()]),
  status: z.enum(prospectStatuses),
  followUp: z
    .string()
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Invalid date"),
  notes: long,
});
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
    phone,
    message: z.string().trim().min(5).max(1500),
    kind: short,
    website: z.string().max(100).default(""),
    startedAt: z.number(),
    consent: z.literal(true),
    demo_id: z.string().optional(),
  })
  .refine(
    (v) => !!v.email || v.phone.replace(/\D/g, "").length >= 7,
    "Provide an email or valid phone number",
  );

export const studioProposalSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    email,
    phone,
    projectType: z.enum(["website", "automation", "ai", "hybrid", "other"]).default("website"),
    scopeTier: z.enum(["basic", "premium", "advanced", "custom"]).default("premium"),
    estimatedBudget: z.number().int().nonnegative().default(18000),
    details: z.string().trim().min(5, "Please provide at least 5 characters about your requirements").max(2000),
    website: z.string().max(100).default(""),
    startedAt: z.number(),
    consent: z.literal(true, {
      message: "Please consent to being contacted regarding your project.",
    }),
  })
  .refine(
    (v) => !!v.email || v.phone.replace(/\D/g, "").length >= 7,
    "Provide either an email or a valid phone number",
  );

export type StudioProposalInput = z.infer<typeof studioProposalSchema>;
