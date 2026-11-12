import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { RiArrowDownSLine } from 'react-icons/ri'

import { Button } from "@/components/ui/button"
import Socials from "@/components/shared/Socials"
import { site } from "@/data/site"
import FloatingIcons from "./FloatingIcons"
import HeroArt from "./HeroArt"

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-8 pb-14 md:py-12 xl:py-16 md:min-h-[84vh] flex items-center">
            <FloatingIcons />
            <div className="container mx-auto relative z-10 w-full">
                <div className="flex items-center justify-between gap-x-8">
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <p className="mx-auto mb-6 hidden sm:inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-muted-foreground xl:mx-0">
                            <span className="inline-flex items-center gap-2 font-medium text-foreground">
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                                {site.availability}
                            </span>
                            <span aria-hidden="true" className="text-foreground/30">|</span>
                            <span>{site.currentRole}</span>
                        </p>
                        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[3px] text-brand sm:text-sm">{site.role}</p>
                        <h1 className="h1">Hello, my name is {site.name}</h1>
                        <p className="subtitle max-w-[490px] mx-auto xl:mx-0 mt-4">{site.heroIntro}</p>

                        <div className="mx-auto mb-12 flex w-full max-w-xs flex-col gap-y-3 md:w-auto md:max-w-none md:flex-row md:gap-x-3 xl:mx-0">
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

                        <div>
                            <Socials
                                containerStyles='flex gap-x-3 justify-center xl:justify-start xl:-ml-2'
                                iconsStyles='flex h-9 w-9 items-center justify-center rounded-md text-foreground text-[22px] hover:text-brand transition-colors'
                            />
                        </div>

                        <p className="mt-8 font-mono text-xs text-muted-foreground xl:mt-10">
                            Based in {site.location} <span aria-hidden="true">·</span> {site.workSetup}
                        </p>
                    </div>

                    <HeroArt />
                </div>
            </div>

            <div aria-hidden="true" className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 z-10 animate-bounce">
                <RiArrowDownSLine className="text-3xl text-brand" />
            </div>
        </section>
    )
}

export default Hero
