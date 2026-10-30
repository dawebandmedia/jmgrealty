import { inspirationImages } from "./listing-inspiration";
import type { Metadata } from "next";
import { OrganizationData, siteUrl } from "./site-info";
import "./globals.css";
import "./experience.css";
import "./enhancements.css";
import "./model-media.css";
import "./shore3.css";
import "./glam.css";
import "./alegria.css";
import "./vine.css";
import "./lanello.css";
import "./greenway.css";
import "./uhome.css";
import "./price-notice.css";
import "./pacifictown.css";
import "./norzagaray.css";
import "./catalog.css";
import "./eurotowers.css";
import "./brand.css";
import "./inquiry.css";
import "./audit-improvements.css";
import "./motion.css";
import "./new-development.css";
import "./project-browsing.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  title: {
    default: "JMG Realty PH — Find a place. Build a future.",
    template: "%s | JMG Realty PH",
  },
  description:
    "Your trusted partner in real estate brokerage, property appraisal and investment solutions. Explore property support or join the JMG Realty PH team.",
  openGraph: {
    title: "JMG Realty PH",
    description:
      "Find a place. Build a future. Property guidance with JMG Realty PH.",
    images: [{ url: inspirationImages.courtyard.src, alt: inspirationImages.courtyard.alt }],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><OrganizationData />{children}</body>
    </html>
  );
}
