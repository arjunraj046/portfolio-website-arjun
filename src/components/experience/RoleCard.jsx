'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const RoleCard = ({ role, variants }) => {
    const reduce = useReducedMotion()
    const [hovered, setHovered] = useState(false)
    const [pinned, setPinned] = useState(false)

    // hover flips it for mouse users; the button pins it for keyboard and touch
    const flipped = hovered || pinned

    // the face a keyboard user came from rotates out of reach, so move
    // focus across to the face that is now showing
    const detailsRef = useRef(null)
    const backRef = useRef(null)
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
            return
        }
        if (pinned) backRef.current?.focus()
        else detailsRef.current?.focus()
    }, [pinned])

    const faceBase = 'absolute inset-0 flex flex-col justify-between rounded-lg border bg-card p-6'

    return (
        <motion.div
            layout
            variants={variants}
            exit="exit"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative h-[340px]"
            style={{ perspective: 1200 }}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 16 }}
            >
                {/* front */}
                <div
                    aria-hidden={flipped}
                    className={`${faceBase} shadow-sm`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs uppercase tracking-[2px] text-primary font-semibold">
                                {role.type}
                            </span>
                            {role.current && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Current
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold leading-tight mb-1">{role.title}</h3>
                        <p className="text-base font-medium text-foreground/80">{role.company}</p>
                        <p className="text-sm text-muted-foreground mt-1">{role.period}</p>
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {role.stack.map((tech) => (
                                <span key={tech} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <button
                            ref={detailsRef}
                            type="button"
                            aria-expanded={flipped}
                            tabIndex={flipped ? -1 : 0}
                            onClick={() => setPinned(true)}
                            className="text-sm font-medium text-primary underline-offset-4 hover:underline
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                        >
                            What I did →
                        </button>
                    </div>
                </div>

                {/* back */}
                <div
                    aria-hidden={!flipped}
                    className={`${faceBase} border-primary/40 shadow-md`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div>
                        <h3 className="text-sm uppercase tracking-[2px] text-primary font-semibold mb-1">
                            {role.company}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">{role.period}</p>
                        <ul className="space-y-2">
                            {role.highlights.map((item) => (
                                <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-snug">
                                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        ref={backRef}
                        type="button"
                        tabIndex={flipped ? 0 : -1}
                        onClick={() => { setPinned(false); setHovered(false) }}
                        className="inline-flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground transition-colors
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                    >
                        <ArrowLeft size={15} /> Back
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RoleCard
