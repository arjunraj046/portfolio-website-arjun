import { ArrowUpRight, Building2, ChevronDown, CircleDot, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'

import ImageCarousel from './ImageCarousel'

const AccordionItem = ({ title, points, group, open = false }) => (
    <details name={group} open={open} className="group/item border-b border-border last:border-b-0">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] font-medium
            transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md [&::-webkit-details-marker]:hidden">
            {title}
            <ChevronDown size={17} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform duration-200 group-open/item:rotate-180" />
        </summary>
        <ul className="space-y-2 pb-3.5">
            {points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-[0.65rem] h-px w-2.5 shrink-0 bg-brand" />
                    {point}
                </li>
            ))}
        </ul>
    </details>
)

const ProjectSection = ({ project, number, reverse = false, priority = false }) => {
    const { slug, title, tagline, company, personal, role, status, summary, stack, images, highlights, features, liveUrl } = project
    const CompanyIcon = personal ? UserRound : Building2
    const stackGroups = (Array.isArray(stack?.[0]?.items) ? stack : [{ label: null, items: stack ?? [] }]).filter((group) => group.items.length)

    const rows = [{ title: 'Key highlights', points: highlights }, ...features]
    const half = Math.ceil(rows.length / 2)
    const columns = [rows.slice(0, half), rows.slice(half)]

    return (
        <article id={slug} aria-labelledby={`${slug}-title`} className="scroll-mt-28">
            <div className={`grid grid-cols-1 gap-8 xl:items-center xl:gap-12 ${images?.length ? (reverse ? 'xl:grid-cols-[1fr_1.1fr]' : 'xl:grid-cols-[1.1fr_1fr]') : ''}`}>
            {images?.length > 0 && <ImageCarousel images={images} title={title} priority={priority} className={reverse ? 'xl:order-2' : ''} />}

            <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                    {number && (
                        <span className="tabular-nums tracking-[2px]">{number}</span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                        <CompanyIcon size={13} aria-hidden="true" /> {company}
                    </span>
                    {role && <span>{role}</span>}
                    {status && (
                        <span className="inline-flex items-center gap-1.5 text-brand">
                            <CircleDot size={12} aria-hidden="true" /> {status}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                    <h3 id={`${slug}-title`} className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
                    {liveUrl && (
                        <Button asChild variant="outline" size="sm" className="group shrink-0">
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit the live ${title} site (opens in a new tab)`}>
                                Visit live site
                                <ArrowUpRight size={16} aria-hidden="true" className="ml-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </Button>
                    )}
                </div>
                <p className="mt-1 text-muted-foreground">{tagline}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{summary}</p>

                {stackGroups.length > 0 && <div className="mt-6 border-t border-border">
                    {stackGroups.map(({ label, items }) => (
                        <div key={label ?? 'stack'} className="flex flex-col gap-1.5 border-b border-border py-3 sm:flex-row sm:items-baseline sm:gap-4">
                            {label && <p className="w-24 shrink-0 font-mono text-xs uppercase tracking-[2px] text-muted-foreground">{label}</p>}
                            <ul aria-label={label ? `${label} stack` : 'Tech stack'} className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/80">
                                {items.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>}

            </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-10 border-t border-border md:grid-cols-2">
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
