import { Fragment } from "react";

import ProjectSection from "@/components/sections/projects/ProjectSection";
import SectionDivider from "@/components/shared/SectionDivider";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Projects by Arjun Raj, MERN full stack developer: backend systems, real-time features and full stack web applications.",
  openGraph: { images: [projects[0].images[0].src] },
};

export default function ProjectsPage() {
  return (
    <main className="container mx-auto py-16 xl:py-24">
      <div className="mb-14 max-w-2xl">
        <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Projects</p>
        <h1 className="text-4xl xl:text-5xl font-bold tracking-[-1px]">Things I&apos;ve built.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A closer look at the systems I&apos;ve worked on: what they do, how they&apos;re built and the problems they solve.
        </p>
      </div>

      {/* one section per project */}
      <div className="flex flex-col gap-10">
        {projects.map((project, i) => (
          <Fragment key={project.slug}>
            {i > 0 && <SectionDivider className="px-0" />}
            <ProjectSection project={project} priority={i === 0} />
          </Fragment>
        ))}
      </div>
    </main>
  );
}
