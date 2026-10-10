import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Building2, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/shared/Reveal'
import { SectionGlows, SectionHeading } from '@/components/shared/SectionParts'
import { projects } from '@/data/projects'

const chip = 'rounded-md border border-white/70 bg-white/60 px-2.5 py-1 text-xs font-medium dark:border-white/10 dark:bg-white/[0.07]'

const keyStack = (stack = []) => {
    const groups = Array.isArray(stack[0]?.items) ? stack : [{ items: stack }]
    const longest = Math.max(0, ...groups.map((group) => group.items.length))
    const picked = []
    for (let i = 0; i < longest && picked.length < 5; i++) {
        groups.forEach((group) => {
            const item = group.items[i]
            if (item && picked.length < 5 && !picked.includes(item)) picked.push(item)
        })
    }
    return picked
}

const FeaturedProjects = () => (
    <section id="projects" aria-labelledby="projects-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute left-[6%] top-0 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
            <div className="absolute right-[10%] bottom-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <div className="flex flex-col items-center justify-between gap-6 xl:flex-row xl:items-end">
                <SectionHeading id="projects-heading" label="Projects">Selected projects</SectionHeading>
                <Button asChild variant="outline" className="mb-10 hidden xl:inline-flex">
                    <Link href="/projects">
                        View all project details
                        <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                    </Link>
                </Button>
            </div>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map(({ slug, title, tagline, company, personal, images, stack, liveUrl }) => {
                    const CompanyIcon = personal ? UserRound : Building2
                    const image = images?.[0]
                    return (
                        <li key={slug} data-reveal>
                            <article className="glass-card group flex h-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1">
                                {image && (
                                    <Link href={`/projects#${slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden border-b border-foreground/10">
                                        <Image
                                            src={image.src}
                                            alt=""
                                            width={image.width}
                                            height={image.height}
                                            sizes="(min-width: 1280px) 640px, (min-width: 768px) 46vw, 100vw"
                                            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                        />
                                    </Link>
                                )}
                                <div className="flex flex-1 flex-col p-6">
                                    <p className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                        <CompanyIcon size={13} aria-hidden="true" />
                                        {company}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{tagline}</p>
                                    <ul aria-label={`${title} key technologies`} className="mt-4 flex flex-wrap gap-2">
                                        {keyStack(stack).map((tech) => (
                                            <li key={tech} className={chip}>{tech}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                                        <Button asChild size="sm">
                                            <Link href={`/projects#${slug}`} aria-label={`${title}: project details`}>
                                                Project details
                                                <ArrowRight size={15} aria-hidden="true" className="ml-1" />
                                            </Link>
                                        </Button>
                                        {liveUrl && (
                                            <Button asChild variant="outline" size="sm">
                                                <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit the live ${title} site (opens in a new tab)`}>
                                                    Live site
                                                    <ArrowUpRight size={15} aria-hidden="true" className="ml-1" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ul>

            <div className="mt-8 flex justify-center xl:hidden">
                <Button asChild variant="outline">
                    <Link href="/projects">
                        View all project details
                        <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                    </Link>
                </Button>
            </div>
        </Reveal>
    </section>
)

export default FeaturedProjects
