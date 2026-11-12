export const eyebrow = 'font-mono text-xs sm:text-sm uppercase font-medium mb-3 text-brand tracking-[3px]'

export const SectionHeading = ({ id, index, label, children }) => (
    <div className="mb-10 xl:mb-14">
        <p className={eyebrow}>{index} / {label}</p>
        <h2 id={id} className="max-w-3xl text-balance text-3xl font-semibold tracking-[-1px] md:text-5xl">{children}</h2>
    </div>
)

export const Row = ({ label, note, children, className = '' }) => (
    <div data-reveal className={`grid grid-cols-1 gap-4 border-t border-border py-7 md:grid-cols-12 md:gap-8 ${className}`}>
        <div className="md:col-span-4 xl:col-span-3">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[2px] text-muted-foreground md:pt-1.5">{label}</h3>
            {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
        </div>
        <div className="md:col-span-8 xl:col-span-9">{children}</div>
    </div>
)
