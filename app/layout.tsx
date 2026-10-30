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
import "./cinema.css";

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

// Runs before first paint: decides whether the opening curtain (first visit this session)
// or the arrival curtain (after an in-site link) plays. No JS or reduced motion: neither plays.
const introScript = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||localStorage.getItem("jmg-reduce-motion-v1")==="true")return;d.classList.add("jmg-pre");var s=sessionStorage;if(s.getItem("jmg-arrive")){s.removeItem("jmg-arrive");d.classList.add("jmg-arrive");}else if(!s.getItem("jmg-seen")){s.setItem("jmg-seen","1");d.classList.add("jmg-intro");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <OrganizationData />
        {children}
        <div className="jmg-curtain" aria-hidden="true">
          <div className="jmg-curtain-mark">
            <svg width="168" height="42" viewBox="0 0 168 42" fill="none"><path pathLength="1" d="M2 37H18V23L35 9L52 23V37H64V14H80V37H92V3H112V37H124V18H143V37H166M29 37V26H41V37M69 21H75M69 27H75M98 11H106M98 18H106M98 25H106M130 25H137M130 31H137" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>JMG REALTY PH</span>
            <small>Find a place. Build a future.</small>
          </div>
        </div>
      </body>
    </html>
  );
}
