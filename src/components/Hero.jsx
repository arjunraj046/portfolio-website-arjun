"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { Download, Send } from "lucide-react"

import {
    RiBriefcase4Fill,
    // RiTeamFill,
    // RiTodoFill,
    RiArrowDownSLine
} from 'react-icons/ri'
import Socials from "./hero/Socials"
import HeroImg from "./hero/HeroImg"
import  Badge  from "./hero/Badge";



const Hero = () => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = "https://drive.google.com/uc?export=download&id=1DYVvs_Zs12ksDZ5n8SDEegVwHiWlf1rr";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
    };


    return (
        <section className="py-12 xl:py-24 h-[84vh] xl:pt-28 bg-slate-200 dark:bg-black ">
            <div className="container mx-auto">
                <div className="flex justify-between gap-x-8">
                    {/* text */}
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Web Developer</div>
                        <h1 className="h1">Hello, my name is Arjun Raj</h1>
                        <p className="subtitle max-w-[490px] mx-auto xl:mx-0 mt-4">Passionate about leveraging cutting-edge technologies to create impactful solutions that exceed
                            expectations</p>
                        {/* buttons */}
                        <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
                            <Link href='/contact'>
                                <Button className='gap-x-2' >Contact me<Send size={18} /> </Button>
                            </Link>
                            <Button variant="secondary" className='gap-x-2' onClick={handleDownload} >Download CV<Download size={18} /> </Button>

                        </div>
                        {/* Socials */}
                        <Socials containerStyles='flex gap-x-6 mx-auto xl:mx-0'
                            iconsStyles={`text-foreground text-[22px] hover:text-primary transition-all`}
                        // iconsStyles='text-foreground text-[22px] hover:text-primary transition-all ' 
                        />
                    </div>

                    {/* image */}
                    <div className="hidden xl:flex relative">
                        <Badge containerStyles='absolute top-[20%] -left-[5rem]' icon={<RiBriefcase4Fill/>} endCountNum={2} badgeText={'Years of Experience'} />
                        <div className="w-[500px] h-[462px] relative bg-bottom">
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