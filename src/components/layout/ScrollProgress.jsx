'use client'

import { useEffect, useRef } from 'react'

// the reading-progress bar on the right edge. It writes the transform straight
// to the element once per frame, so scrolling never re-renders React
const ScrollProgress = () => {
    const bar = useRef(null)

    useEffect(() => {
        let frame = 0

        const update = () => {
            frame = 0
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
            bar.current.style.transform = `translateY(${(progress - 1) * 100}%)`
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        // the page grows as lazily rendered sections get their real height,
        // so recalculate when the body resizes, not only on scroll
        const resize = new ResizeObserver(onScroll)
        resize.observe(document.body)
        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
        return () => {
            resize.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <span
            ref={bar}
            aria-hidden="true"
            style={{ transform: 'translateY(-100%)' }}
            className="fixed z-50 bg-primary w-1 top-0 right-0 bottom-0 will-change-transform"
        />
    )
}

export default ScrollProgress
