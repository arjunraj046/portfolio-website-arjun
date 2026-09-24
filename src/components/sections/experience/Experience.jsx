import TiltCard from '@/components/shared/TiltCard'
import Reveal from '@/components/shared/Reveal'
import { CardTitle, SectionGlows, SectionHeading } from '@/components/shared/SectionParts'
import { roles, otherRoles } from '@/data/experience'
import RoleCard from './RoleCard'

// a vertical timeline, newest role first, with the shorter entries in one
// compact card at the end. A server component; only TiltCard and Reveal run
// in the browser
const Experience = () => (
    <section id="experience" aria-labelledby="experience-heading" className="render-lazy relative overflow-x-clip py-16 xl:py-24">
        <SectionGlows>
            <div className="absolute left-[10%] top-0 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15" />
            <div className="absolute right-[6%] top-1/2 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
        </SectionGlows>

        <Reveal className="container mx-auto">
            <SectionHeading id="experience-heading" label="Experience">Where I&apos;ve worked</SectionHeading>

            {/* the rail runs through the dots, fading out at the bottom */}
            <ol className="relative space-y-6 before:absolute before:left-[11px] before:top-3 before:bottom-0 before:w-px
                           before:bg-gradient-to-b before:from-sky-400/70 before:via-foreground/15 before:to-transparent">
                {roles.map((role) => (
                    <li key={`${role.company}-${role.title}`} className="relative pl-10 md:pl-14">
                        <span aria-hidden="true" className="absolute left-0 top-8 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-foreground/15 bg-background">
                            {role.current && <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400/40" />}
                            <span className={`h-2.5 w-2.5 rounded-full ${role.current ? 'bg-sky-400' : 'bg-foreground/35'}`} />
                        </span>
                        <RoleCard {...role} />
                    </li>
                ))}
            </ol>

            <div data-reveal className="mt-6 pl-10 md:pl-14">
                <TiltCard max={2} className="glass-card p-6 xl:p-8">
                    <CardTitle>Also</CardTitle>
                    <ul className="space-y-5">
                        {otherRoles.map(({ title, detail }) => (
                            <li key={title}>
                                <p className="font-semibold leading-snug">{title}</p>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{detail}</p>
                            </li>
                        ))}
                    </ul>
                </TiltCard>
            </div>
        </Reveal>
    </section>
)

export default Experience
