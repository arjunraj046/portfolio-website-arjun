const SectionDivider = ({ className = '' }) => (
    <div aria-hidden="true" className={`container mx-auto ${className}`}>
        <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
            <div className="absolute inset-x-[20%] inset-y-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
            <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="divider-spark h-full w-1/5 bg-gradient-to-r from-transparent via-brand to-transparent" />
            </div>
        </div>
    </div>
)

export default SectionDivider
