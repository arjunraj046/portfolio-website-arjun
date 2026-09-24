'use client'

import { useEffect, useRef } from 'react'

// counts a stat up from 0 (0, 1, 2, 3+) the first time it scrolls into view.
// `value` is the final text, like '3+': its number is animated and anything
// after it is kept as a suffix. The server HTML holds the final value, and
// screen readers only ever read that, never the ticking digits. It runs even
// with reduced motion on, as the owner asked
const DURATION = 1200

const CountUp = ({ value, className = '' }) => {
    const ref = useRef(null)
    const [, digits = '', suffix = value] = String(value).match(/^(\d+)(.*)$/) || []
    const target = Number(digits)

    useEffect(() => {
        const el = ref.current
        if (!digits) return

        let frame = 0
        el.textContent = `0${suffix}`

        const run = () => {
            const start = performance.now()
            const tick = (now) => {
                const t = Math.min((now - start) / DURATION, 1)
                const eased = 1 - (1 - t) * (1 - t) // gentle ease-out, so each number shows
                el.textContent = `${Math.round(eased * target)}${suffix}`
                if (t < 1) frame = requestAnimationFrame(tick)
            }
            frame = requestAnimationFrame(tick)
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            run()
        }, { threshold: 0.6 })
        observer.observe(el)

        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [digits, suffix, target])

    return (
        <span className={className}>
            <span className="sr-only">{value}</span>
            <span ref={ref} aria-hidden="true">{value}</span>
        </span>
    )
}

export default CountUp
