import { ArrowDownRight } from 'lucide-react'

const ProjectIndex = ({ projects }) => (
    <nav aria-label="Projects on this page" className="border-b border-border">
        <ol className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4 xl:gap-x-8">
            {projects.map(({ slug, title, tagline, company, personal, number }) => (
                <li key={slug} className="border-t border-border">
                    <a
                        href={`#${slug}`}
                        className="group flex h-full flex-col gap-1.5 py-5 transition-colors md:gap-3
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                            <span className="tabular-nums tracking-[2px]">{number}</span>
                            <span className="uppercase tracking-wider">{personal ? 'Personal' : company}</span>
                        </div>
                        <div>
                            <p className="flex items-center gap-1.5 text-lg font-semibold group-hover:text-brand transition-colors">
                                {title}
                                <ArrowDownRight size={16} aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </p>
                            <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground md:block">{tagline}</p>
                        </div>
                    </a>
                </li>
            ))}
        </ol>
    </nav>
)

export default ProjectIndex
