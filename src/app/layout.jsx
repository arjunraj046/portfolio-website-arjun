import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Radio from "@/components/layout/Radio";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SiteBackground from "@/components/layout/SiteBackground";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6ebf3" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
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
    title: `${site.name} — ${site.role}`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <SiteBackground />
          <Header />
          {children}
          <Footer />
          <Radio />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}
