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

export const metadata: Metadata = { title: "My Site" };

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
