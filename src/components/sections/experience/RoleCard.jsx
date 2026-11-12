import { MapPin } from 'lucide-react'

const RoleCard = ({ title, company, employment, location, current, stack, highlights }) => (
    <div data-reveal className="grid grid-cols-1 gap-5 border-t border-border py-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 xl:col-span-4">
            <h3 className="text-xl font-semibold leading-snug">{title}</h3>
            <p className="mt-1 text-muted-foreground">
                {company} <span aria-hidden="true">·</span> {employment}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                {current && (
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
                        Current
                    </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} aria-hidden="true" />
                    {location}
                </span>
            </p>
        </div>

        <div className="md:col-span-7 xl:col-span-8">
            <ul className="space-y-2.5">
                {highlights.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-brand" />
                        {item}
                    </li>
                ))}
            </ul>
            <ul aria-label={`Stack at ${company}`} className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/80">
                {stack.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </div>
    </div>
)

export default RoleCard
