// one continuous background behind every page, so sections never meet at a
// hard edge. It's fixed to the viewport, so the glass surfaces always have
// colour behind them while scrolling. Light mode uses a tinted base and
// stronger glows than dark mode; on a near-white base the glass disappears.
const SiteBackground = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#e6ebf3] dark:bg-slate-950">
            <div className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-sky-400/50 blur-3xl dark:bg-sky-600/20" />
            <div className="absolute top-[18%] -right-24 h-[36rem] w-[36rem] rounded-full bg-violet-400/45 blur-3xl dark:bg-violet-600/20" />
            <div className="absolute top-[45%] left-[18%] h-[24rem] w-[24rem] rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-600/10" />
            <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-emerald-300/50 blur-3xl dark:bg-emerald-600/15" />

            {/* faint dot grid for texture, fading out towards the bottom */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.09)_1px,transparent_1px)] [background-size:22px_22px]
                [mask-image:linear-gradient(to_bottom,black,transparent_85%)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        </div>
    )
}

export default SiteBackground
