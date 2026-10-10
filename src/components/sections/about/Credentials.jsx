import { education, certifications, training } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { CardTitle, SectionGlows, SectionHeading, iconTile } from '@/components/shared/SectionParts'

const Timeline = ({ title, note, items }) => (
    <div data-reveal className="h-full"><div className="glass-card h-full p-6 xl:p-8">
        <CardTitle note={note}>{title}</CardTitle>
        <ul className="space-y-5">
            {items.map(({ Icon, title: itemTitle, place, period }) => (
                <li key={itemTitle} className="flex gap-4">
                    <span className={`${iconTile} h-11 w-11`}>
                        <Icon size={20} aria-hidden="true" className="text-primary" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <p className="font-semibold leading-snug">{itemTitle}</p>
                            <p className="text-sm tabular-nums text-muted-foreground">{period}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{place}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div></div>
)

const Credentials = () => (
    <section id="education" aria-labelledby="education-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute left-[8%] top-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
            <div className="absolute right-[15%] bottom-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <SectionHeading id="education-heading" label="Education">Education and certifications</SectionHeading>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Timeline title="Degrees" items={education} />
                <Timeline title="Certifications" note={`Red Team Hacker Academy · ${training}`} items={certifications} />
            </div>
        </Reveal>
    </section>
)

export default Credentials
