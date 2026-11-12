import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Radio from "@/components/layout/Radio";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SiteBackground from "@/components/layout/SiteBackground";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/data/site";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b100e" },
  ],
};

export const metadata = {
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Arjun Raj", "MERN stack developer", "full stack developer", "Node.js developer", "backend developer", "React developer", "Kerala", "India"],
  robots: { index: true, follow: true },
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
          <SiteBackground />
          <Header />
          {children}
          <Footer />
          <Radio />
          <SmoothScroll />
        </ThemeProvider>
        <Script
          src="https://mozhiai.duckdns.org/widget.js"
          data-bot-id="bot_sclg0rjov3mh"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
