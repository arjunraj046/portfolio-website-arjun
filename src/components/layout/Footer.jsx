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
    <footer className="relative pt-4 pb-8">
      <SectionDivider className="mb-16 xl:mb-24" />

      <div className="container relative mx-auto">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-1px] md:text-5xl">Hiring for a full-stack or backend role?</h2>
            <p className="mt-4 text-lg text-muted-foreground">I&apos;m open to full-time roles. Send me a message, or reach me by email, phone or WhatsApp.</p>
          </div>
          <Button asChild size='cta' className='shrink-0 self-start md:self-auto'>
            <Link href='/contact'>
              Get in touch
              <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
          <div className="flex flex-col gap-y-5 sm:col-span-2 lg:pr-16">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div className="sm:justify-self-end sm:pr-8">
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[2px] text-muted-foreground">Navigation</h3>
            <ul className="flex flex-col gap-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm capitalize text-foreground/80 hover:text-brand transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground md:flex-row md:gap-5">
            <p>&copy; {year} {site.name}. All rights reserved.</p>
            <nav aria-label="Legal" className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground underline-offset-4 hover:underline transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground underline-offset-4 hover:underline transition-colors">Terms</Link>
            </nav>
          </div>
          <div className="flex items-center gap-x-6">
            <Socials
              containerStyles='flex gap-x-2'
              iconsStyles='flex h-9 w-9 items-center justify-center rounded-md border border-border text-base text-muted-foreground
                hover:border-brand hover:text-brand transition-colors'
            />
            <BackToTop />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
