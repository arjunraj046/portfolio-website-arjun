import { Fragment } from "react";

import ProjectIndex from "@/components/sections/projects/ProjectIndex";
import ProjectSection from "@/components/sections/projects/ProjectSection";
import SectionDivider from "@/components/shared/SectionDivider";
import { projects } from "@/data/projects";

export const metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description: "Projects by Arjun Raj, MERN full stack developer: backend systems, real-time features and full stack web applications.",
  openGraph: { images: [projects[0].images[0].src] },
};

const numbered = projects.map((project, i) => ({ ...project, number: String(i + 1).padStart(2, "0"), reverse: i % 2 === 1 }));

const groups = [
  { id: "work", label: "Work", heading: "Work projects", items: numbered.filter((p) => !p.personal) },
  { id: "personal", label: "Personal", heading: "Personal projects", items: numbered.filter((p) => p.personal) },
].filter((group) => group.items.length);

export default function ProjectsPage() {
  return (
    <main className="container mx-auto py-16 xl:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Projects</p>
        <h1 className="text-4xl xl:text-5xl font-bold tracking-[-1px]">Things I&apos;ve built.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A closer look at the systems I&apos;ve worked on: what they do, how they&apos;re built and the problems they solve.
        </p>
      </div>

      <ProjectIndex projects={numbered} />

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-foreground/10 pb-4">
            <div>
              <p className="text-sm uppercase font-semibold mb-2 text-primary tracking-[4px]">{group.label}</p>
              <h2 id={`${group.id}-heading`} className="text-2xl md:text-3xl font-bold tracking-[-0.5px]">{group.heading}</h2>
            </div>
            <p className="text-sm tabular-nums text-muted-foreground">
              {group.items.length} {group.items.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <div className="flex flex-col gap-10">
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
