'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

// A swipeable, scroll-snapping image gallery. Native scrolling does the work
// (touch swipe, trackpad, keyboard), so it needs no carousel library
const ImageCarousel = ({ images, title, priority = false, className = '' }) => {
    const track = useRef(null)
    const [active, setActive] = useState(0)

    // keep the dots in sync with whatever slide is showing
    useEffect(() => {
        const el = track.current
        const slides = Array.from(el.children)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(slides.indexOf(entry.target))
            })
        }, { root: el, threshold: 0.6 })
        slides.forEach((slide) => observer.observe(slide))
        return () => observer.disconnect()
    }, [])

    const goTo = (index) => {
        const el = track.current
        const next = (index + images.length) % images.length
        el.scrollTo({ left: el.clientWidth * next, behavior: 'smooth' })
    }

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1) }
    }

    const multiple = images.length > 1
    const arrow = 'glass absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

    return (
        <div className={cn('group relative', className)}>
            <div
                ref={track}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label={`${title} screenshots`}
                onKeyDown={onKeyDown}
                className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {images.map((image, i) => (
                    <figure
                        key={image.src}
                        aria-roledescription="slide"
                        aria-label={`${i + 1} of ${images.length}: ${image.caption}`}
                        className="relative w-full shrink-0 snap-center"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            priority={priority && i === 0}
                            sizes="(min-width: 1280px) 720px, (min-width: 768px) 90vw, 100vw"
                            className="aspect-[2/1] w-full rounded-xl border border-white/60 object-cover object-top dark:border-white/10"
                        />
                    </figure>
                ))}
            </div>

            {multiple && (
                <>
                    <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous image" className={`${arrow} left-3`}>
                        <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => goTo(active + 1)} aria-label="Next image" className={`${arrow} right-3`}>
                        <ChevronRight size={20} aria-hidden="true" />
                    </button>
                </>
            )}

            <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground" aria-live="polite">{images[active].caption}</p>
                {multiple && (
                    <div className="flex items-center gap-1.5">
                        {images.map((image, i) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Show image ${i + 1}: ${image.caption}`}
                                aria-current={i === active}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    i === active ? 'w-6 bg-primary' : 'w-2 bg-foreground/25 hover:bg-foreground/40'
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageCarousel
