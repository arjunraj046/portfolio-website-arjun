'use client'

import { useEffect, useRef } from 'react'

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
