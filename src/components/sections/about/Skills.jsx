import TiltCard from '@/components/shared/TiltCard'
import { skillGroups } from '@/data/skills'
import { strengths } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { CardTitle, SectionGlows, SectionHeading, iconTile } from '@/components/shared/SectionParts'

const Skills = () => (
    <section id="skills" aria-labelledby="skills-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute right-[8%] top-0 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15" />
            <div className="absolute left-[20%] bottom-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <SectionHeading id="skills-heading" label="Skills">Tools and strengths I work with</SectionHeading>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div data-reveal className="lg:col-span-4"><TiltCard max={3} className="glass-card flex h-full flex-col p-6 xl:p-8">
                    <CardTitle>Core strengths</CardTitle>
                    <ul className="flex flex-1 flex-col justify-between gap-3">
                        {strengths.map(({ label, Icon }) => (
                            <li key={label} className="group flex items-center gap-3.5">
                                <span className={`${iconTile} h-9 w-9 transition-colors duration-200 group-hover:bg-white/90 dark:group-hover:bg-white/20`}>
                                    <Icon size={17} aria-hidden="true" className="text-sky-600 dark:text-sky-300" />
                                </span>
                                <span className="leading-snug">{label}</span>
                            </li>
                        ))}
                    </ul>
                </TiltCard></div>

                <div data-reveal className="lg:col-span-8"><TiltCard max={2} className="glass-card h-full p-6 xl:p-8">
                    <CardTitle>Tech stack</CardTitle>
                    <dl className="divide-y divide-foreground/10">
                        {Object.entries(skillGroups).map(([key, { label, items }]) => (
                            <div key={key} className="grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
                                <dt className="pt-1.5 text-xs uppercase tracking-[2px] font-semibold text-muted-foreground">{label}</dt>
                                <dd>
                                    <ul className="flex flex-wrap gap-2">
                                        {items.map(({ name, Icon, color, tone }) => (
                                            <li
                                                key={name}
                                                className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-white/60 px-3 py-1.5 text-sm shadow-sm
                                                           transition-colors duration-200 hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-white/[0.14]"
                                            >
                                                {Icon && (
                                                    <Icon size={15} aria-hidden="true" style={color ? { color } : undefined} className={tone || ''} />
                                                )}
                                                {name}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </TiltCard></div>
            </div>
        </Reveal>
    </section>
)

export default Skills
