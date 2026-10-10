import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/shared/Reveal'
import { SectionGlows, SectionHeading } from '@/components/shared/SectionParts'
import { projects } from '@/data/projects'

const FeaturedProjects = () => (
    <section id="projects" aria-labelledby="projects-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute left-[6%] top-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
            <div className="absolute right-[10%] bottom-0 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <div className="flex flex-col items-center justify-between gap-x-6 lg:flex-row lg:items-end">
                <SectionHeading id="projects-heading" label="Projects">Selected projects</SectionHeading>
                <Button asChild variant="outline" className="mb-10 hidden lg:inline-flex">
                    <Link href="/projects">
                        See all projects
                        <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                    </Link>
                </Button>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {projects.map(({ slug, title, tagline, company, personal, images }) => {
                    const image = images?.[0]
                    return (
                        <li key={slug} data-reveal>
                            <Link
                                href={`/projects#${slug}`}
                                className="glass-card group flex h-full flex-row transition-transform sm:flex-col duration-300 ease-out hover:-translate-y-1
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {image && (
                                    <div className="w-28 shrink-0 overflow-hidden border-r border-foreground/10 sm:w-auto sm:border-b sm:border-r-0">
                                        <Image
                                            src={image.src}
                                            alt=""
                                            width={image.width}
                                            height={image.height}
                                            sizes="(min-width: 1024px) 320px, (min-width: 640px) 46vw, 112px"
                                            className="h-full w-full object-cover object-left-top transition-transform sm:aspect-[16/9] sm:h-auto sm:object-top duration-500 ease-out group-hover:scale-[1.03]"
                                        />
                                    </div>
                                )}
                                <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:justify-start sm:p-4">
                                    <p className="text-xs font-medium text-muted-foreground">{personal ? 'Personal project' : company}</p>
                                    <h3 className="mt-0.5 flex items-center gap-1.5 text-base font-semibold sm:mt-1 sm:text-lg">
                                        {title}
                                        <ArrowRight size={15} aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground sm:leading-relaxed">{tagline}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="mt-8 flex justify-center lg:hidden">
                <Button asChild variant="outline">
                    <Link href="/projects">
                        See all projects
                        <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                    </Link>
                </Button>
            </div>
        </Reveal>
    </section>
)

export default FeaturedProjects
