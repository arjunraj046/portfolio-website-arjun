import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionParts'
import { projects } from '@/data/projects'

const FeaturedProjects = () => (
    <section id="projects" aria-labelledby="projects-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <Reveal className="container mx-auto">
            <div className="flex flex-col justify-between gap-x-6 lg:flex-row lg:items-end">
                <SectionHeading id="projects-heading" index="03" label="Projects">Selected projects</SectionHeading>
                <Button asChild variant="outline" className="mb-14 hidden lg:inline-flex">
                    <Link href="/projects">
                        See all projects
                        <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                    </Link>
                </Button>
            </div>

            <ul className="border-b border-border">
                {projects.map(({ slug, title, tagline, company, personal, images }, i) => {
                    const image = images?.[0]
                    return (
                        <li key={slug} data-reveal className="border-t border-border">
                            <Link
                                href={`/projects#${slug}`}
                                className="group -mx-4 grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 px-4 py-6 transition-colors duration-200 hover:bg-muted/60
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[3rem_1fr_11rem] md:gap-x-8 lg:grid-cols-[3rem_1fr_11rem_11rem]"
                            >
                                <span className="font-mono text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                                <div className="min-w-0">
                                    <h3 className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
                                        {title}
                                        <ArrowRight size={18} aria-hidden="true" className="text-brand transition-transform duration-200 group-hover:translate-x-1" />
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">{tagline}</p>
                                </div>
                                <p className="col-start-2 font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-start-auto">{personal ? 'Personal project' : company}</p>
                                {image && (
                                    <div className="hidden overflow-hidden rounded-md border border-border lg:block">
                                        <Image
                                            src={image.src}
                                            alt=""
                                            width={image.width}
                                            height={image.height}
                                            sizes="176px"
                                            className="aspect-[16/9] h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>
                                )}
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
