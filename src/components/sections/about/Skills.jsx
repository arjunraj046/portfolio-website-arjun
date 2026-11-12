import { skillGroups } from '@/data/skills'
import { strengths } from '@/data/about'
import Reveal from '@/components/shared/Reveal'
import { Row, SectionHeading } from '@/components/shared/SectionParts'

const Skills = () => (
    <section id="skills" aria-labelledby="skills-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <Reveal className="container mx-auto">
            <SectionHeading id="skills-heading" index="04" label="Skills">Tools and strengths I work with</SectionHeading>

            <div className="border-b border-border">
                <Row label="Core strengths">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {strengths.map(({ label, Icon }) => (
                            <li key={label} className="flex items-center gap-3 leading-snug">
                                <Icon size={17} aria-hidden="true" className="shrink-0 text-brand" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </Row>
                {Object.entries(skillGroups).map(([key, { label, items }]) => (
                    <Row key={key} label={label}>
                        <ul className="flex flex-wrap gap-x-6 gap-y-3">
                            {items.map(({ name, Icon, color, tone }) => (
                                <li key={name} className="inline-flex items-center gap-2">
                                    {Icon && <Icon size={16} aria-hidden="true" style={color ? { color } : undefined} className={tone || ''} />}
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </Row>
                ))}
            </div>
        </Reveal>
    </section>
)

export default Skills
