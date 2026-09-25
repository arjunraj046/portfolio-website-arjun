import Image from 'next/image'

import TiltCard from '@/components/shared/TiltCard'
import CountUp from './CountUp'
import { site } from '@/data/site'
import { aboutSummary, aboutStats } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { SectionGlows, eyebrow, iconTile } from '@/components/shared/SectionParts'

const About = () => (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute left-[5%] top-0 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
            <div className="absolute right-[5%] bottom-0 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div data-reveal className="lg:col-span-8"><TiltCard max={2} className="glass-card h-full p-8 xl:p-10">
                    <div className="flex items-center gap-5 md:gap-7">
                        <Image
                            src={site.photo}
                            alt={`Portrait of ${site.name}`}
                            width={360}
                            height={640}
                            sizes="(min-width: 1280px) 128px, (min-width: 768px) 112px, 96px"
                            className="aspect-[9/16] h-auto w-24 shrink-0 rounded-lg object-cover shadow-md transition-transform duration-300 ease-out
                                hover:-translate-y-1 hover:scale-[1.03] md:w-28 xl:w-32"
                        />
                        <div>
                            <p className={eyebrow}>About me</p>
                            <h2 id="about-heading" className="text-2xl md:text-4xl xl:text-5xl font-bold tracking-[-1px]">
                                Ideas, shipped as software that holds up.
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {aboutSummary.map((paragraph) => (
                            <p key={paragraph} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </TiltCard></div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
                    {aboutStats.map(({ value, label, Icon }) => (
                        <div key={label} data-reveal className="h-full">
                            <TiltCard max={6} className="glass-card flex h-full items-center gap-5 p-6">
                                <span className={`${iconTile} h-12 w-12`}>
                                    <Icon size={22} aria-hidden="true" className="text-primary" />
                                </span>
                                <div>
                                    <CountUp value={value} className="block text-3xl font-bold leading-none tabular-nums" />
                                    <div className="text-sm text-muted-foreground mt-1.5 leading-snug">{label}</div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </Reveal>
    </section>
)

export default About
