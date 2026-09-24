'use client'

import Link from "next/link"
import { ArrowUp, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Socials from "@/components/shared/Socials"
import { site, navLinks, services } from "@/data/site"
import Logo from "./Logo"

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-6">

      <div className="container relative mx-auto flex flex-col gap-6">

        {/* call to action */}
        <div className="glass flex flex-col items-center justify-between gap-6 rounded-3xl p-8 text-center md:flex-row md:p-10 md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Have a project in mind?</h2>
            <p className="mt-2 text-muted-foreground">Let&apos;s talk about what you&apos;re building.</p>
          </div>
          <Button asChild size='cta' className='shrink-0'>
            <Link href='/contact'>
              Get in touch
              <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        {/* columns */}
        <div className="glass grid gap-10 rounded-3xl p-8 sm:grid-cols-2 md:p-10 lg:grid-cols-4">
          <div className="flex flex-col gap-y-5 lg:col-span-2 lg:pr-16">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[2px]">Navigation</h3>
            <ul className="flex flex-col gap-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm capitalize text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[2px]">What I do</h3>
            <ul className="flex flex-col gap-y-3">
              {services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground">{service}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="glass flex flex-col-reverse items-center justify-between gap-6 rounded-2xl px-6 py-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-x-6">
            <Socials
              containerStyles='flex gap-x-2'
              iconsStyles='flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/40 text-base text-muted-foreground
                hover:bg-white/80 hover:text-foreground transition-colors dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15'
            />
            <Button variant='outline' size='icon' onClick={scrollToTop} aria-label="Back to top"
              className='rounded-lg border-white/60 bg-white/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15'>
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
