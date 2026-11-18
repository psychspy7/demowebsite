import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#212821",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "https://demo.thekittycorp.com"),
  title: {
    default: "KITTY CORP — Demo Studio",
    template: "%s | KITTY CORP",
  },
  description:
    "Professional website demonstration studio for businesses. Explore 18 industry collections, 88 specialty templates, and build personalized digital experiences.",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
