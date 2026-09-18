'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Tips its children in 3D towards the cursor. Sits out entirely on touch
 * devices (no hover to track) and when reduced motion is requested.
 */
const Tilt3D = ({ children, className = '', max = 10, scale = 1.03 }) => {
    const node = useRef(null)

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const noHover = window.matchMedia('(hover: none)').matches
        if (reduced || noHover) return

        const ctx = gsap.context(() => {
            const el = node.current
            gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' })

            const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
            const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
            const sc = gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3.out' })

            const onMove = (e) => {
                const r = el.getBoundingClientRect()
                const px = (e.clientX - r.left) / r.width - 0.5
                const py = (e.clientY - r.top) / r.height - 0.5
                ry(px * max * 2)
                rx(-py * max * 2)
            }
            const onEnter = () => sc(scale)
            const onLeave = () => { rx(0); ry(0); sc(1) }

            el.addEventListener('pointermove', onMove)
            el.addEventListener('pointerenter', onEnter)
            el.addEventListener('pointerleave', onLeave)

            return () => {
                el.removeEventListener('pointermove', onMove)
                el.removeEventListener('pointerenter', onEnter)
                el.removeEventListener('pointerleave', onLeave)
            }
        }, node)

        return () => ctx.revert()
    }, [max, scale])

    return (
        <div ref={node} className={`will-change-transform ${className}`}>
            {children}
        </div>
    )
}

export default Tilt3D
