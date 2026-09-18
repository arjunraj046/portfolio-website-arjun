"use client";

import { useEffect, useRef } from "react"
import gsap from "gsap"

import Link from "next/link"
import { Button } from "./ui/button"
import { Download, Send } from "lucide-react"

import {
    RiBriefcase4Fill,
    RiTeamFill,
    RiTodoFill,
    RiArrowDownSLine
} from 'react-icons/ri'
import Socials from "./hero/Socials"
import HeroImg from "./hero/HeroImg"
import FloatingIcons from "./hero/FloatingIcons"



const Hero = () => {
    const section = useRef(null)

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = "https://drive.google.com/uc?export=download&id=1DYVvs_Zs12ksDZ5n8SDEegVwHiWlf1rr";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .from('[data-hero-reveal]', {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        stagger: 0.12
                    })
                    .from('[data-hero-art]', {
                        scale: 0.9,
                        opacity: 0,
                        duration: 1.1
                    }, '-=0.7')

                // the portrait breathes along with the icon field
                gsap.to('[data-hero-art]', {
                    y: -18,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                })
            })

            return () => mm.revert()
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={section} className="relative overflow-hidden py-12 xl:py-24 h-[84vh] xl:pt-28 bg-slate-200 dark:bg-black ">
            <FloatingIcons />
            <div className="container mx-auto relative z-10">
                <div className="flex justify-between gap-x-8">
                    {/* text */}
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <div data-hero-reveal className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">MERN Full Stack Developer</div>
                        <h1 data-hero-reveal className="h1">Hello, my name is Arjun Raj</h1>
                        <p data-hero-reveal className="subtitle max-w-[490px] mx-auto xl:mx-0 mt-4">I build scalable REST APIs and real-time applications — Node.js performance,
                            MongoDB indexing, Redis caching and AWS deployment.</p>
                        {/* buttons */}
                        <div data-hero-reveal className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
                            <Link href='/contact'>
                                <Button className='gap-x-2' >Contact me<Send size={18} /> </Button>
                            </Link>
                            <Button variant="secondary" className='gap-x-2' onClick={handleDownload} >Download CV<Download size={18} /> </Button>

                        </div>
                        {/* Socials */}
                        <div data-hero-reveal>
                            <Socials containerStyles='flex gap-x-6 mx-auto xl:mx-0'
                                iconsStyles={`text-foreground text-[22px] hover:text-primary transition-all`}
                            />
                        </div>
                    </div>

                    {/* image */}
                    <div className="hidden xl:flex relative">
                        <div data-hero-art className="w-[500px] h-[462px] relative bg-bottom will-change-transform">
                            <HeroImg />
                        </div>
                    </div>
                </div>
                {/* icon for down scroll */}
                <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
                    <RiArrowDownSLine className="text-3xl text-primary" />
                </div>
            </div>
        </section>
    )
}

export default Hero
