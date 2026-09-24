import { ArrowDownRight } from 'lucide-react'

const ProjectIndex = ({ projects }) => (
    <nav aria-label="Projects on this page">
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {projects.map(({ slug, title, tagline, company, personal, number }) => (
                <li key={slug}>
                    <a
                        href={`#${slug}`}
                        className="glass-card group flex h-full flex-col gap-1.5 px-5 py-4 transition-transform md:gap-3 md:p-5 duration-200 ease-out hover:-translate-y-1
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-sm font-semibold tabular-nums tracking-[2px] text-muted-foreground">{number}</span>
                            <span className="text-muted-foreground">{personal ? 'Personal' : company}</span>
                        </div>
                        <div>
                            <p className="flex items-center gap-1.5 text-lg font-semibold">
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
