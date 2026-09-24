import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/about/Skills";
import Credentials from "@/components/sections/about/Credentials";
import Experience from "@/components/sections/experience/Experience";
import SectionDivider from "@/components/shared/SectionDivider";

// every section is a server component, so all the text is in the first HTML;
// only the small tilt and reveal wrappers inside them run in the browser
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
