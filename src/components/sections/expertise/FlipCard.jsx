'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const FlipCard = ({ Icon, color, tone, title, blurb, points }) => {
    const inner = useRef(null)
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        gsap.to(inner.current, {
            rotationY: flipped ? 180 : 0,
            duration: reduced ? 0 : 0.7,
            ease: 'power3.inOut',
            overwrite: 'auto'
        })
    }, [flipped])

    return (
        <button
            type="button"
            aria-expanded={flipped}
            aria-label={`${title}. ${flipped ? 'Hide' : 'Show'} details.`}
            onClick={() => setFlipped((v) => !v)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onFocus={() => setFlipped(true)}
            onBlur={() => setFlipped(false)}
            className="group relative block h-[260px] w-full text-left rounded-lg
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            style={{ perspective: 1000 }}
        >
            <div
                ref={inner}
                className="relative h-full w-full will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* front */}
                <div
                    aria-hidden={flipped}
                    className="absolute inset-0 flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm
                               transition-colors group-hover:border-primary/40"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <Icon size={40} style={color ? { color } : undefined} className={tone || ''} />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{blurb}</p>
                    </div>
                </div>

                {/* back */}
                <div
                    aria-hidden={!flipped}
                    className="absolute inset-0 flex flex-col justify-center rounded-lg border border-primary/40 bg-card p-6 shadow-md"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <h3 className="text-sm uppercase tracking-[2px] text-primary font-semibold mb-4">{title}</h3>
                    <ul className="space-y-2.5">
                        {points.map((point) => (
                            <li key={point} className="flex gap-2.5 text-sm text-muted-foreground leading-snug">
                                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </button>
    )
}

export default FlipCard
