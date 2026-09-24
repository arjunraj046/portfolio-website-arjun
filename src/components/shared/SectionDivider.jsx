// a thin line between sections that fades in from both ends, with a sky
// centre and a streak of light that runs along it in an endless loop.
// Pure CSS (.divider-spark in globals.css), decorative only
const SectionDivider = ({ className = '' }) => (
    <div aria-hidden="true" className={`container mx-auto ${className}`}>
        <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
            <div className="absolute inset-x-[20%] inset-y-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent dark:via-sky-300" />
            {/* the streak: clipped to the line, and faded out at both ends by the mask */}
            <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="divider-spark h-full w-1/5 bg-gradient-to-r from-transparent via-violet-500 to-transparent dark:via-sky-200" />
            </div>
        </div>
    </div>
)

export default SectionDivider
