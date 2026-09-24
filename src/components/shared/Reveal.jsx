'use client'

import { useEffect, useRef } from 'react'

// cards marked `data-reveal` that start below the fold are lowered and
// faded, then settle in over 0.3s as they scroll into view. Cards already on
// screen are never hidden, and without JavaScript everything simply shows.
// Sections using it stay server components; only this wrapper runs here
const Reveal = ({ className = '', children }) => {
    const root = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const cards = Array.from(root.current.querySelectorAll('[data-reveal]'))
            .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
        cards.forEach((el) => el.classList.add('reveal-pending'))

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                entry.target.classList.remove('reveal-pending')
                observer.unobserve(entry.target)
            })
        }, { rootMargin: '0px 0px -10% 0px' })
        cards.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return <div ref={root} className={className}>{children}</div>
}

export default Reveal
