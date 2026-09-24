import { Building2, ChevronDown, CircleDot } from 'lucide-react'

import ImageCarousel from './ImageCarousel'

const chip = 'rounded-lg border border-white/70 bg-white/60 dark:border-white/10 dark:bg-white/[0.07]'

// One accordion row. Native <details>, so it works without JavaScript and the
// text stays in the HTML for search engines. Rows sharing a `name` behave as a
// group where opening one closes the others (browsers without support just
// let several stay open).
const AccordionItem = ({ title, points, group, open = false }) => (
    <details name={group} open={open} className="group/item border-b border-foreground/10 last:border-b-0">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] font-medium
            transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md [&::-webkit-details-marker]:hidden">
            {title}
            <ChevronDown size={17} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform duration-200 group-open/item:rotate-180" />
        </summary>
        <ul className="space-y-2 pb-3.5">
            {points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                </li>
            ))}
        </ul>
    </details>
)

// one project as a single section: gallery beside the essentials, then every
// detail as accordion rows in two columns so the section stays short
const ProjectSection = ({ project, priority = false }) => {
    const { slug, title, tagline, company, role, status, summary, stack, images, highlights, features } = project
    // `stack` is either a flat list or labelled groups, e.g. Frontend / Backend
    const stackGroups = Array.isArray(stack[0]?.items) ? stack : [{ label: null, items: stack }]

    // all rows start closed so the two columns stay the same height
    const rows = [{ title: 'Key highlights', points: highlights }, ...features]
    const half = Math.ceil(rows.length / 2)
    const columns = [rows.slice(0, half), rows.slice(half)]

    return (
        <article id={slug} aria-labelledby={`${slug}-title`} className="glass-card scroll-mt-28 p-5 sm:p-8">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_1fr] xl:items-center xl:gap-10">
            <ImageCarousel images={images} title={title} priority={priority} />

            <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1 text-primary-foreground">
                        <Building2 size={13} aria-hidden="true" /> {company}
                    </span>
                    <span className={`${chip} px-2.5 py-1`}>{role}</span>
                    {status && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
                            <CircleDot size={12} aria-hidden="true" /> {status}
                        </span>
                    )}
                </div>

                <h2 id={`${slug}-title`} className="mt-4 text-3xl font-bold tracking-tight">{title}</h2>
                <p className="mt-1 text-muted-foreground">{tagline}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{summary}</p>

                <div className="mt-5 space-y-3">
                    {stackGroups.map(({ label, items }) => (
                        <div key={label ?? 'stack'} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                            {label && <p className="w-20 shrink-0 pt-1 text-xs font-semibold uppercase tracking-[2px] text-muted-foreground">{label}</p>}
                            <ul aria-label={label ? `${label} stack` : 'Tech stack'} className="flex flex-wrap gap-2">
                                {items.map((tech) => (
                                    <li key={tech} className={`${chip} px-2.5 py-1 text-xs font-medium`}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
            </div>

            {/* details: two independent columns, so opening a row only grows its own column */}
            <div className="mt-8 grid grid-cols-1 gap-x-6 rounded-xl border border-white/60 bg-white/40 px-4 dark:border-white/10 dark:bg-white/[0.04] md:grid-cols-2 md:px-5">
                {columns.map((column, i) => (
                    <div key={i} className="md:[&>details:last-child]:border-b-0 [&:first-child>details:last-child]:border-b md:[&:first-child>details:last-child]:border-b-0">
                        {column.map(({ title: rowTitle, points, open }) => (
                            <AccordionItem key={rowTitle} title={rowTitle} points={points} group={slug} open={open} />
                        ))}
                    </div>
                ))}
            </div>
        </article>
    )
}

export default ProjectSection
