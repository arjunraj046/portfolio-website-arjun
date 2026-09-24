'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const TechSphere = dynamic(() => import('./TechSphere'), { ssr: false })

const DESKTOP = '(min-width: 1280px)'

const HeroArt = () => {
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
