import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/about/Skills";
import Credentials from "@/components/sections/about/Credentials";
import Experience from "@/components/sections/experience/Experience";
import SectionDivider from "@/components/shared/SectionDivider";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Credentials />
      <SectionDivider />
      <Experience />
    </main>
  );
}
