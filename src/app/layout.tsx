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
  metadataBase: new URL(process.env.APP_URL || "https://demo.thekittycorp.com"),
  title: {
    default: "KITTY CORP — Precision Engineering for Ambitious Businesses",
    template: "%s | KITTY CORP",
  },
  description:
    "Professional website demonstration studio for ambitious enterprises. Explore 18 industry collections, 88 specialty templates, and live responsive previews.",
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
    url: "/",
    siteName: "KITTY CORP Demo Studio",
    title: "KITTY CORP — Demo Studio",
    description:
      "Transforming business concepts into high-converting digital realities. Explore tailored website demonstrations across 18 major industries.",
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
    title: "KITTY CORP — Demo Studio",
    description:
      "Transforming business concepts into high-converting digital realities.",
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
