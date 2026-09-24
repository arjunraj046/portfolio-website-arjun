'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiGit,
    SiRedis,
    SiDocker,
    SiPostgresql
} from 'react-icons/si'

// position / size / drift are tuned per icon so the field feels hand placed
// instead of evenly scattered. `depth` drives the mouse parallax strength.
const icons = [
    { Icon: SiReact, color: '#61DAFB', top: '12%', left: '5%', size: 48, depth: 1, className: '' },
    { Icon: SiDocker, color: '#2496ED', top: '68%', left: '9%', size: 40, depth: 0.6, className: '' },
    { Icon: SiTailwindcss, color: '#38BDF8', top: '36%', left: '2%', size: 34, depth: 1.4, className: 'hidden md:block' },
    { Icon: SiJavascript, color: '#F7DF1E', top: '84%', left: '22%', size: 32, depth: 0.8, className: 'hidden md:block' },
    { Icon: SiTypescript, color: '#3178C6', top: '8%', left: '32%', size: 30, depth: 1.2, className: 'hidden xl:block' },
    { Icon: SiNodedotjs, color: '#5FA04E', top: '18%', right: '6%', size: 44, depth: 1.1, className: '' },
    { Icon: SiMongodb, color: '#47A248', top: '74%', right: '10%', size: 38, depth: 0.7, className: '' },
    { Icon: SiGit, color: '#F05033', top: '46%', right: '3%', size: 32, depth: 1.5, className: 'hidden md:block' },
    { Icon: SiRedis, color: '#FF4438', top: '88%', right: '28%', size: 28, depth: 0.9, className: 'hidden xl:block' },
    { Icon: SiPostgresql, color: '#4169E1', top: '4%', right: '30%', size: 30, depth: 1.3, className: 'hidden xl:block' }
]

const FloatingIcons = () => {
    const root = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const shells = gsap.utils.toArray('[data-icon-shell]', root.current)
            const floaters = gsap.utils.toArray('[data-icon-float]', root.current)

            const mm = gsap.matchMedia()

            // reduced motion: no pop-in or parallax, just a slow, small drift
            mm.add('(prefers-reduced-motion: reduce)', () => {
                gsap.set(shells, { opacity: 1, scale: 1 })
                floaters.forEach((el) => {
                    gsap.to(el, {
                        y: gsap.utils.random(-8, -4),
                        duration: gsap.utils.random(5, 7),
                        delay: gsap.utils.random(0, 2),
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    })
                })
            })

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // entrance: pop each icon in from nothing
                gsap.from(shells, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.out(1.8)',
                    stagger: { each: 0.01, from: 'random' }
                })

                // endless float — every icon gets its own drift, spin and rhythm
                floaters.forEach((el) => {
                    gsap.to(el, {
                        y: gsap.utils.random(-28, -14),
                        x: gsap.utils.random(-12, 12),
                        rotation: gsap.utils.random(-14, 14),
                        duration: gsap.utils.random(2.6, 4.6),
                        delay: gsap.utils.random(0, 1.5),
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    })
                })

                // mouse parallax, deeper icons travel further
                const movers = shells.map((el) => ({
                    x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
                    y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
                    depth: Number(el.dataset.depth) || 1
                }))

                const onPointerMove = (e) => {
                    const cx = (e.clientX / window.innerWidth - 0.5) * 2
                    const cy = (e.clientY / window.innerHeight - 0.5) * 2
                    movers.forEach((m) => {
                        m.x(cx * 26 * m.depth)
                        m.y(cy * 22 * m.depth)
                    })
                }

                window.addEventListener('pointermove', onPointerMove)
                return () => window.removeEventListener('pointermove', onPointerMove)
            })

            return () => mm.revert()
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={root}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            {icons.map(({ Icon, color, tone, top, left, right, size, depth, className }, index) => (
                <div
                    key={index}
                    data-icon-shell
                    data-depth={depth}
                    style={{ top, left, right }}
                    className={`absolute will-change-transform ${className}`}
                >
                    <div data-icon-float className="will-change-transform">
                        <span
                            style={color ? { color } : undefined}
                            className={`block opacity-30 drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] dark:opacity-40 ${tone || ''}`}
                        >
                            <Icon size={size} />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FloatingIcons
