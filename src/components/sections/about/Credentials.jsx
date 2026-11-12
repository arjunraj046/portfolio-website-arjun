import { education, certifications, training } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { Row, SectionHeading } from '@/components/shared/SectionParts'

const Entries = ({ items }) => (
    <ul className="space-y-5">
        {items.map(({ title, place, period }) => (
            <li key={title} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                    <p className="font-semibold leading-snug">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{place}</p>
                </div>
                <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{period}</p>
            </li>
        ))}
    </ul>
)

const Credentials = () => (
    <section id="education" aria-labelledby="education-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <Reveal className="container mx-auto">
            <SectionHeading id="education-heading" index="05" label="Education">Education and certifications</SectionHeading>

            <div className="border-b border-border">
                <Row label="Degrees"><Entries items={education} /></Row>
                <Row label="Certifications" note={`Red Team Hacker Academy · ${training}`}><Entries items={certifications} /></Row>
            </div>
        </Reveal>
    </section>
)

export default Credentials
