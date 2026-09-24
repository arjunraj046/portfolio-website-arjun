import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Socials from "@/components/shared/Socials"
import { site, navLinks } from "@/data/site"
import SectionDivider from "@/components/shared/SectionDivider"
import Logo from "./Logo"
import BackToTop from "./BackToTop"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-4 pb-6">
      <SectionDivider className="mb-16" />

      <div className="container relative mx-auto flex flex-col gap-6">

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

        <div className="glass grid gap-10 rounded-3xl p-8 sm:grid-cols-3 md:p-10">
          <div className="flex flex-col gap-y-5 sm:col-span-2 lg:pr-16">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div className="sm:justify-self-end sm:pr-8">
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

        </div>

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
            <BackToTop />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
