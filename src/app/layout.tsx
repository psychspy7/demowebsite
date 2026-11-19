import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "https://demo.thekittycorp.com"),
  title: {
    default: "KITTY CORP — Digital Solutions & Commercial Studio | Build. Automate. Grow.",
    template: "%s | KITTY CORP Studio",
  },
  description:
    "Premium commercial digital studio by KITTY CORP. Bespoke high-converting websites, business process automation, and enterprise AI integrations. Transparent INR pricing from ₹10,000.",
  applicationName: "KITTY CORP Digital Studio",
  authors: [{ name: "KITTY CORP", url: "https://thekittycorp.com" }],
  creator: "KITTY CORP",
  publisher: "KITTY CORP",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "KITTY CORP Digital Studio",
    title: "KITTY CORP — Digital Solutions & Commercial Studio",
    description:
      "Transforming business concepts into high-converting digital realities. Transparent INR pricing, automated workflows, and enterprise AI.",
    images: [
      {
        url: "/images/office.jpg",
        width: 1200,
        height: 630,
        alt: "KITTY CORP Studio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KITTY CORP — Digital Solutions & Commercial Studio",
    description:
      "Bespoke websites, workflow automations, and enterprise AI with transparent INR pricing.",
    creator: "@thekittycorp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050507] text-zinc-100 antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
