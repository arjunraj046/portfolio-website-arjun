const LegalPage = ({ title, updated, intro, sections }) => (
    <main className="container mx-auto py-16 xl:py-24">
        <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Legal</p>
            <h1 className="text-4xl xl:text-5xl font-bold tracking-[-1px]">{title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>

            <div className="glass-card mt-10 space-y-8 p-6 sm:p-10">
                {sections.map(({ heading, paragraphs = [], list = [], after }) => (
                    <section key={heading}>
                        <h2 className="text-xl font-semibold">{heading}</h2>
                        {paragraphs.map((text) => (
                            <p key={text} className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                        ))}
                        {list.length > 0 && (
                            <ul className="mt-3 space-y-2">
                                {list.map((item) => (
                                    <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {after && <p className="mt-3 leading-relaxed text-muted-foreground">{after}</p>}
                    </section>
                ))}
            </div>
        </div>
    </main>
)

export default LegalPage
