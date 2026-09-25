'use client'

import { useState, useEffect } from "react"

import Logo from "./Logo"
import Nav from "./Nav"
import MobileNav from "./MobileNav"
import ThemeToggler from "./ThemeToggler"

const glassButton = 'glass-pill h-10 w-10 rounded-md border-transparent bg-white/[0.18] hover:bg-white/40 dark:border-transparent dark:bg-white/[0.06] dark:hover:bg-white/[0.12]'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    return (
        <header className={`sticky top-0 z-30 flex h-24 items-start justify-center px-4 transition-[padding] duration-500 ease-out ${scrolled ? 'pt-3' : 'pt-5 xl:px-8'}`}>
            <div className={`flex w-full items-center justify-between gap-x-4 rounded-xl px-4 md:px-5 transition-all duration-500 ease-out
                glass-header ${scrolled ? 'max-w-5xl py-2 bg-white/[0.35] dark:bg-slate-900/[0.35]' : 'max-w-5xl py-3 xl:max-w-[83.5rem] xl:py-3.5'}`}>
                <Logo />

                <Nav
                    containerStyles='hidden md:flex items-center gap-x-1'
                    linkStyles='relative rounded-md px-5 py-2.5 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors'
                    activeLinkStyles='text-foreground'
                    underLineStyles='glass-pill absolute inset-0 rounded-md bg-white/35 dark:bg-white/[0.1]'
                />

                <div className="flex items-center gap-x-2">
                    <ThemeToggler className={glassButton} />
                    <div className="md:hidden">
                        <MobileNav triggerStyles={glassButton} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
