import dynamic from "next/dynamic";

import Hero from "@/components/sections/hero/Hero";

// below the fold, so its JavaScript loads separately from the hero's;
// it is still rendered on the server, so the text is in the HTML
const About = dynamic(() => import("@/components/sections/about/About"));

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
