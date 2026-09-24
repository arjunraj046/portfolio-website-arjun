import { MapPin } from 'lucide-react'

import TiltCard from '@/components/shared/TiltCard'

const RoleCard = ({ title, company, employment, location, current, mark, stack, highlights }) => (
    <div data-reveal>
        <TiltCard max={2} className="glass-card p-6 xl:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                    <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-sm font-bold tracking-wide shadow-sm ${mark.className}`}>
                        {mark.text}
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold leading-snug">{title}</h3>
                        <p className="text-muted-foreground mt-0.5">
                            {company} <span aria-hidden="true">·</span> {employment}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-muted-foreground md:items-end md:text-right">
                    {current && (
                        <span className="w-fit rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">Current</span>
                    )}
                    <p className="flex items-center gap-1.5">
                        <MapPin size={14} aria-hidden="true" />
                        {location}
                    </p>
                </div>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 lg:grid-cols-2">
                {highlights.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                        {item}
                    </li>
                ))}
            </ul>

            <ul aria-label={`Stack at ${company}`} className="mt-6 flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
                {stack.map((name) => (
                    <li
                        key={name}
                        className="rounded-lg border border-white/70 bg-white/60 px-3 py-1 text-sm shadow-sm dark:border-white/10 dark:bg-white/[0.07]"
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </TiltCard>
    </div>
)

export default RoleCard
