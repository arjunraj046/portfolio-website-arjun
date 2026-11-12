import { Fragment } from "react";

import ProjectIndex from "@/components/sections/projects/ProjectIndex";
import ProjectSection from "@/components/sections/projects/ProjectSection";
import SectionDivider from "@/components/shared/SectionDivider";
import { projects } from "@/data/projects";
import { JsonLd, projectsGraph } from "@/lib/structuredData";

export const metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description: "Projects by Arjun Raj, MERN full stack developer: backend systems, real-time features and full stack web applications.",
};

const numbered = projects.map((project, i) => ({ ...project, number: String(i + 1).padStart(2, "0"), reverse: i % 2 === 1 }));

const groups = [
  { id: "work", label: "Work", heading: "Work projects", items: numbered.filter((p) => !p.personal) },
  { id: "personal", label: "Personal", heading: "Personal projects", items: numbered.filter((p) => p.personal) },
].filter((group) => group.items.length);

export default function ProjectsPage() {
  return (
    <main id="main" className="container mx-auto py-16 xl:py-24">
      <JsonLd data={projectsGraph()} />
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-4 text-brand tracking-[3px]">Portfolio</p>
        <h1 className="text-4xl xl:text-5xl font-semibold tracking-[-1px]">Projects</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Production platforms I worked on at Avaibe, and products I built on my own: what each one does, how it&apos;s built and the part I played.
        </p>
      </div>

      <ProjectIndex projects={numbered} />

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="mt-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-2 text-brand tracking-[3px]">{group.label}</p>
              <h2 id={`${group.id}-heading`} className="text-3xl md:text-5xl font-semibold tracking-[-1px]">{group.heading}</h2>
            </div>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              {group.items.length} {group.items.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {group.items.map((project, i) => (
              <Fragment key={project.slug}>
                {i > 0 && <SectionDivider className="px-0" />}
                <ProjectSection project={project} number={project.number} reverse={project.reverse} priority={project.number === "01"} />
              </Fragment>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
