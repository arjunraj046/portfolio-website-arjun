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
        <section className="relative overflow-hidden py-12 xl:py-16 min-h-[84vh] flex items-center">
            <FloatingIcons />
            <div className="container mx-auto relative z-10 w-full">
                <div className="flex items-center justify-between gap-x-8">
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <p className="mx-auto mb-6 inline-flex w-fit flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md border border-foreground/10 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur xl:mx-0">
                            <span className="inline-flex items-center gap-2 font-medium text-foreground">
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
                                {site.availability}
                            </span>
                            <span aria-hidden="true" className="text-foreground/30">|</span>
                            <span>{site.currentRole}</span>
                        </p>
                        <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">{site.role}</p>
                        <h1 className="h1">Hello, my name is {site.name}</h1>
                        <p className="subtitle max-w-[490px] mx-auto xl:mx-0 mt-4">{site.heroIntro}</p>

                        <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
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
                                containerStyles='flex gap-x-6 justify-center xl:justify-start'
                                iconsStyles='text-foreground text-[22px] hover:text-primary transition-colors'
                            />
                        </div>
                    </div>

                    <HeroArt />
                </div>
            </div>

            <div aria-hidden="true" className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 z-10 animate-bounce">
                <RiArrowDownSLine className="text-3xl text-primary" />
            </div>
        </section>
    )
}

export default Hero
