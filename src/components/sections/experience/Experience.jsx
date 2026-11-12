import Reveal from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionParts'
import { roles, otherRoles } from '@/data/experience'
import RoleCard from './RoleCard'

const Experience = () => (
    <section id="experience" aria-labelledby="experience-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <Reveal className="container mx-auto">
            <SectionHeading id="experience-heading" index="02" label="Experience">Where I&apos;ve worked</SectionHeading>

            <div className="border-b border-border">
                {roles.map((role) => (
                    <RoleCard key={`${role.company}-${role.title}`} {...role} />
                ))}

                <div data-reveal className="grid grid-cols-1 gap-5 border-t border-border py-8 md:grid-cols-12 md:gap-8">
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[2px] text-muted-foreground md:col-span-5 md:pt-1.5 xl:col-span-4">Also</h3>
                    <ul className="space-y-5 md:col-span-7 xl:col-span-8">
                        {otherRoles.map(({ title, detail }) => (
                            <li key={title}>
                                <p className="font-semibold leading-snug">{title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Reveal>
    </section>
)

export default Experience
