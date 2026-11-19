const SiteBackground = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background">
            <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.045)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>
    )
}

export default SiteBackground
