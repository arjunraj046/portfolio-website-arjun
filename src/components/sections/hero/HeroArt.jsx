'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// decorative and desktop-only, so it loads after the page instead of with it.
// `ssr: false` needs a client component, so this small wrapper holds it and
// the Hero itself can stay a server component
const TechSphere = dynamic(() => import('./TechSphere'), { ssr: false })

// matches Tailwind's `xl` breakpoint, where the sphere is shown
const DESKTOP = '(min-width: 1280px)'

const HeroArt = () => {
    // only mount the sphere (and the Lottie inside it) on desktop, so phones
    // and tablets never download its code or the animation file
    const [desktop, setDesktop] = useState(false)

    useEffect(() => {
        const query = window.matchMedia(DESKTOP)
        const update = () => setDesktop(query.matches)
        update()
        query.addEventListener('change', update)
        return () => query.removeEventListener('change', update)
    }, [])

    return (
        <div className="hidden xl:flex relative">
            <div className="animate-hero-breathe relative flex items-center justify-center will-change-transform">
                {desktop && <TechSphere />}
            </div>
        </div>
    )
}

export default HeroArt
