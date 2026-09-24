'use client'

import { useState, useEffect } from "react"

import Logo from "./Logo"
import Nav from "./Nav"
import MobileNav from "./MobileNav"
import ThemeToggler from "./ThemeToggler"

const glassButton = 'h-10 w-10 rounded-lg border-white/60 bg-white/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    return (
        <header className={`sticky top-0 z-30 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}>
            <div className={`flex w-full max-w-5xl items-center justify-between gap-x-4 rounded-2xl px-4 md:px-5 transition-all duration-300
                ${scrolled ? 'glass-strong py-2' : 'glass py-3'}`}>
                <Logo />

                <Nav
                    containerStyles='hidden md:flex items-center gap-x-1'
                    linkStyles='relative rounded-lg px-5 py-2.5 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors'
                    activeLinkStyles='text-foreground'
                    underLineStyles='absolute inset-0 rounded-lg border border-white/80 bg-white/80 shadow-sm dark:border-white/15 dark:bg-white/15'
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
