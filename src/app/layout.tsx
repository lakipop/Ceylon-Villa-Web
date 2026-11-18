import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SITE } from "@/lib/site";
import { t } from "@/lib/i18n";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: t.meta.title,
  description: t.meta.description,
  icons: {
    icon: "/media/logo.png",
    apple: "/media/logo.png",
  },
  openGraph: {
    title: t.meta.title,
    description: t.meta.description,
    url: siteUrl,
    siteName: SITE.name,
    images: [{ url: "/media/hero-villa.jpg", width: 1920, height: 1080 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE.name,
  url: siteUrl,
  image: `${siteUrl}/media/hero-villa.jpg`,
  numberOfRooms: SITE.rooms,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line,
    addressLocality: SITE.address.city,
    addressCountry: "LK",
  },
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
