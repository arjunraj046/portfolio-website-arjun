export const iconTile = 'flex shrink-0 items-center justify-center rounded-md border border-white/70 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10'

export const eyebrow = 'text-sm uppercase font-semibold mb-3 text-primary tracking-[4px]'

export const SectionHeading = ({ id, label, children }) => (
    <div className="mb-10 text-center xl:text-left">
        <p className={eyebrow}>{label}</p>
        <h2 id={id} className="text-2xl md:text-4xl font-bold tracking-[-1px]">{children}</h2>
    </div>
)

export const CardTitle = ({ children, note }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold">{children}</h3>
        {note && <p className="text-sm text-muted-foreground mt-1">{note}</p>}
    </div>
)

export const SectionGlows = ({ children }) => (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 bottom-24 -z-10">
        {children}
    </div>
)
