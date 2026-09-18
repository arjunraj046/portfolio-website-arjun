import { Inter } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arjun Raj — MERN Full Stack Developer",
  description:
    "MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. Node.js performance, MongoDB indexing, Redis caching and AWS deployment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='light'>

          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
