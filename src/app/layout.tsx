import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FCFBF9",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "https://business.thekittycorp.com"),
  title: {
    default: "Business Websites & E-commerce Development | KITTY CORP",
    template: "%s | KITTY CORP",
  },
  description:
    "KITTY CORP builds high-performance business websites and e-commerce platforms for companies in India and worldwide. Explore our work and request a project quote.",
  alternates: { canonical: "https://business.thekittycorp.com/" },
  applicationName: "KITTY CORP Demo Studio",
  authors: [{ name: "KITTY CORP", url: "https://thekittycorp.com" }],
  creator: "KITTY CORP",
  publisher: "KITTY CORP",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://business.thekittycorp.com/",
    siteName: "KITTY CORP Demo Studio",
    title: "Business Websites & E-commerce Development | KITTY CORP Studio",
    description:
      "Custom business websites, online stores and digital experiences by KITTY CORP. Available for projects in India and international markets.",
    images: [
      {
        url: "/images/restaurant.jpg",
        width: 1200,
        height: 630,
        alt: "KITTY CORP Demo Studio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites Engineered for Authority. Built to Convert. | KITTY CORP Studio",
    description:
      "Business websites, e-commerce development and digital experiences by KITTY CORP Studio. Projects welcome worldwide.",
    creator: "@KittyCorphq",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9V2T4Z9RJP"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (!window.location.pathname.startsWith('/admin')) {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-9V2T4Z9RJP', {
                  page_path: window.location.pathname,
                });
              }
            `,
          }}
        />
        {children}
        <StickyWhatsApp />
      </body>
    </html>
  );
}
