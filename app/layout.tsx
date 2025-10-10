import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const clashDisplay = localFont({
  variable: "--font-heading",
  src: [
    { path: "../public/fonts/clash-display/ClashDisplay-Light.woff2",    weight: "300", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

const dmSans = localFont({
  variable: "--font-body",
  src: [{ path: "../public/fonts/dm-sans/DMSans-Regular.woff2", weight: "400", style: "normal" }],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://configgo.com"),
  title: { default: "Configgo", template: "%s — Configgo" },
  description: "Construction-tech CRM + Digital Twins.",
  themeColor: "#0b1220",

  // Favicons & Apple icon (skip this block if you use app/icon.png & app/apple-icon.png)
  icons: {
    icon: "/favicon.ico",                  // 16/32px in ICO
    apple: "/apple-touch-icon.png",       // 180x180
    shortcut: "/favicon.ico"
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Configgo",
    title: "Configgo",
    description: "Construction-tech CRM + Digital Twins.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Configgo — CRM + Digital Twins" }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Configgo",
    description: "Construction-tech CRM + Digital Twins.",
    images: ["/og.jpg"]
  },

  manifest: "/site.webmanifest"
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${dmSans.variable}`}>
      <body>
                <Header />

                {children}                      <Footer />
</body>
    </html>
  );
}
