'use client'

import { useEffect, useRef } from 'react'

const IconParallax = ({ children }) => {
    const root = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return

        const shells = Array.from(root.current.querySelectorAll('[data-icon-shell]'))
        const state = shells.map((el) => ({ el, depth: Number(el.dataset.depth) || 1, x: 0, y: 0 }))
        let targetX = 0
        let targetY = 0
        let frame = 0

        const step = () => {
            let moving = false
            state.forEach((s) => {
                const tx = targetX * 26 * s.depth
                const ty = targetY * 22 * s.depth
                s.x += (tx - s.x) * 0.08
                s.y += (ty - s.y) * 0.08
                if (Math.abs(tx - s.x) > 0.1 || Math.abs(ty - s.y) > 0.1) moving = true
                s.el.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`
            })
            frame = moving ? requestAnimationFrame(step) : 0
        }

        const onPointerMove = (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2
            targetY = (e.clientY / window.innerHeight - 0.5) * 2
            if (!frame) frame = requestAnimationFrame(step)
        }

        window.addEventListener('pointermove', onPointerMove, { passive: true })
        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {children}
        </div>
    )
}

export default IconParallax
