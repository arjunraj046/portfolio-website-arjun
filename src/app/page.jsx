import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/about/Skills";
import Credentials from "@/components/sections/about/Credentials";
import Experience from "@/components/sections/experience/Experience";
import FeaturedProjects from "@/components/sections/projects/FeaturedProjects";
import SectionDivider from "@/components/shared/SectionDivider";
import { JsonLd, homeGraph } from "@/lib/structuredData";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={homeGraph()} />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Credentials />
    </main>
  );
}
