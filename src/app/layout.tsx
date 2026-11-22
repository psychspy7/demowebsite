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
    default: "Websites Engineered for Authority | KITTY CORP Studio",
    template: "%s | KITTY CORP",
  },
  description:
    "Expand your business and increase your revenue with KITTY CORP Studio’s sub-second, high-converting web platforms. Explore live website demos and tailored digital solutions.",
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
    title: "Websites Engineered for Authority. Built to Convert. | KITTY CORP Studio",
    description:
      "Expand your business and increase your revenue with KITTY CORP Studio’s sub-second, high-converting web platforms. Explore live demos at demo.thekittycorp.com.",
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
      "Sub-second, high-converting web platforms by KITTY CORP Studio. Explore live website demos.",
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
