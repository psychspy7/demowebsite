export type Layout =
  "editorial" | "split" | "immersive" | "minimal" | "structured";
export type SectionKind =
  | "about"
  | "services"
  | "catalogue"
  | "team"
  | "gallery"
  | "pricing"
  | "faq"
  | "hours"
  | "testimonials"
  | "contact";
export interface SectionItem {
  id: string;
  title: string;
  text: string;
  price: string;
  category: string;
  image: string;
  link: string;
}
export interface Section {
  id: string;
  kind: SectionKind;
  heading: string;
  description: string;
  visible: boolean;
  items: SectionItem[];
  ctaLabel: string;
  ctaLink: string;
}
export interface Industry {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  color: string;
  specialties: string[];
  sections: [SectionKind, string][];
  cta: string;
}
export interface Template {
  id: string;
  industry: string;
  name: string;
  specialty: string;
  layout: Layout;
  color: string;
  font: string;
  image: string;
  description: string;
}
export interface Demo {
  id: string;
  businessName: string;
  slug: string;
  industry: string;
  templateId: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  revision: number;
  notes: string;
  business: {
    tagline: string;
    description: string;
    category: string;
    logo: string;
    favicon: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    maps: string;
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  hero: {
    heading: string;
    description: string;
    image: string;
    ctaLabel: string;
    ctaLink: string;
  };
  design: {
    primary: string;
    secondary: string;
    accent: string;
    font: string;
    theme: "light" | "dark";
    buttonStyle: "square" | "soft" | "pill";
    layout: Layout;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    canonical: string;
    noindex: boolean;
  };
  settings: { expiresAt: string; passwordHash: string; showDemoLabel: boolean };
  sections: Section[];
  footer: string;
}
export type PublicDemo = Omit<Demo, "notes" | "revision" | "settings"> & {
  settings: Omit<Demo["settings"], "passwordHash">;
};
export type AdminDemo = Omit<Demo, "settings"> & {
  settings: Omit<Demo["settings"], "passwordHash">;
  hasPassword: boolean;
  password?: string;
  clearPassword?: boolean;
};
export const prospectStatuses = [
  "New prospect",
  "Demo prepared",
  "Contacted",
  "Interested",
  "Meeting scheduled",
  "Negotiation",
  "Converted",
  "Not interested",
] as const;
export interface Prospect {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  industry: string;
  demoId: string;
  status: (typeof prospectStatuses)[number];
  followUp: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
export interface Asset {
  id: string;
  name: string;
  url: string;
  folder: string;
  mime: string;
  size: number;
  createdAt: string;
}
export interface Enquiry {
  id: string;
  demoId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  kind: string;
  status: "new" | "read";
  createdAt: string;
}
export interface Analytics {
  id: string;
  demoId: string;
  type: "visit" | "whatsapp" | "enquiry";
  createdAt: string;
}
export interface Database {
  version: 1;
  demos: Demo[];
  prospects: Prospect[];
  assets: Asset[];
  enquiries: Enquiry[];
  analytics: Analytics[];
}
export interface Snapshot {
  demos: AdminDemo[];
  prospects: Prospect[];
  assets: Asset[];
  enquiries: Enquiry[];
  analytics: Analytics[];
}
