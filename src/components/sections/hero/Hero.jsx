'use client'

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import gsap from "gsap"
import { ArrowRight, Download } from "lucide-react"
import { RiArrowDownSLine } from 'react-icons/ri'

import { Button } from "@/components/ui/button"
import Socials from "@/components/shared/Socials"
import { site } from "@/data/site"
import FloatingIcons from "./FloatingIcons"

// decorative and desktop-only, so it loads after the page instead of with it
const TechSphere = dynamic(() => import("./TechSphere"), { ssr: false })

const Hero = () => {
    const section = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .from('[data-hero-reveal]', { y: 16, opacity: 0, duration: 0.25, stagger: 0.02 })
                    .from('[data-hero-art]', { scale: 0.96, opacity: 0, duration: 0.3 }, 0)

                // the sphere breathes along with the icon field
                gsap.to('[data-hero-art]', { y: -18, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            })

            return () => mm.revert()
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={section} className="relative overflow-hidden py-12 xl:py-16 min-h-[84vh] flex items-center">
            <FloatingIcons />
            <div className="container mx-auto relative z-10 w-full">
                <div className="flex items-center justify-between gap-x-8">
                    {/* text */}
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <p data-hero-reveal className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">{site.role}</p>
                        <h1 data-hero-reveal className="h1">Hello, my name is {site.name}</h1>
                        <p data-hero-reveal className="subtitle max-w-[490px] mx-auto xl:mx-0 mt-4">{site.heroIntro}</p>

                        <div data-hero-reveal className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
                            <Button asChild size='cta'>
                                <Link href='/contact'>
                                    Contact me
                                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                            <Button asChild variant='outline' size='cta'>
                                <a href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                                    Download CV
                                    <Download size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                                </a>
                            </Button>
                        </div>

                        <div data-hero-reveal>
                            <Socials
                                containerStyles='flex gap-x-6 justify-center xl:justify-start'
                                iconsStyles='text-foreground text-[22px] hover:text-primary transition-colors'
                            />
                        </div>
                    </div>

                    {/* 3D tech sphere */}
                    <div className="hidden xl:flex relative">
                        <div data-hero-art className="relative flex items-center justify-center will-change-transform">
                            <TechSphere />
                        </div>
                    </div>
                </div>
            </div>

            {/* scroll hint */}
            <div aria-hidden="true" className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 z-10 animate-bounce">
                <RiArrowDownSLine className="text-3xl text-primary" />
            </div>
        </section>
    )
}

export default Hero
