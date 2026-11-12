const LegalPage = ({ title, updated, intro, sections }) => (
    <main id="main" className="container mx-auto py-16 xl:py-24">
        <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-4 text-brand tracking-[3px]">Legal</p>
            <h1 className="text-4xl xl:text-5xl font-semibold tracking-[-1px]">{title}</h1>
            <p className="mt-3 font-mono text-xs text-muted-foreground">Last updated: {updated}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>

            <div className="mt-10 border-b border-border">
                {sections.map(({ heading, paragraphs = [], list = [], after }) => (
                    <section key={heading} className="border-t border-border py-7">
                        <h2 className="text-xl font-semibold">{heading}</h2>
                        {paragraphs.map((text) => (
                            <p key={text} className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                        ))}
                        {list.length > 0 && (
                            <ul className="mt-3 space-y-2">
                                {list.map((item) => (
                                    <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                                        <span aria-hidden="true" className="mt-[0.8rem] h-px w-3 shrink-0 bg-brand" />
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
