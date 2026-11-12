import Image from 'next/image'

import { site } from '@/data/site'
import { aboutSummary, aboutStats } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { eyebrow } from '@/components/shared/SectionParts'

const About = () => (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-x-clip py-16 xl:py-24">
        <Reveal className="container mx-auto">
            <div data-reveal className="flex items-center gap-5 md:gap-8">
                <Image
                    src={site.photo}
                    alt={`Portrait of ${site.name}`}
                    width={360}
                    height={640}
                    sizes="(min-width: 1280px) 128px, (min-width: 768px) 112px, (min-width: 640px) 96px, 80px"
                    className="aspect-[9/16] h-auto w-20 shrink-0 rounded-lg object-cover transition-transform duration-300 ease-out
                        hover:-translate-y-1 sm:w-24 md:w-28 xl:w-32"
                />
                <div>
                    <p className={eyebrow}>01 / About me</p>
                    <h2 id="about-heading" className="max-w-3xl text-balance text-[1.375rem] font-semibold leading-tight tracking-[-1px] sm:text-2xl md:text-4xl xl:text-5xl">
                        I build backend systems and the web apps that run on them.
                    </h2>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16">
                <div data-reveal className="space-y-5 lg:col-span-7">
                    {aboutSummary.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <dl data-reveal className="grid grid-cols-3 divide-x divide-border border-y border-border lg:col-span-5 lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:self-start">
                    {aboutStats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col gap-2 px-3 py-5 first:pl-0 lg:flex-row lg:items-baseline lg:gap-6 lg:px-0">
                            <dt className="font-mono text-4xl font-medium leading-none tabular-nums text-brand lg:w-24 lg:text-5xl">{value}</dt>
                            <dd className="text-sm leading-snug text-muted-foreground md:text-base">{label}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </Reveal>
    </section>
)

export default About
