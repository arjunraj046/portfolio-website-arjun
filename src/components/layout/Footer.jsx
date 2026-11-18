import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Socials from "@/components/shared/Socials"
import ContactList from "@/components/shared/ContactList"
import { site, navLinks, contactChannels } from "@/data/site"
import SectionDivider from "@/components/shared/SectionDivider"
import Logo from "./Logo"
import BackToTop from "./BackToTop"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-4 pb-28">
      <SectionDivider className="mb-16 xl:mb-24" />

      <div className="container relative mx-auto">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-[-1px] md:text-5xl md:leading-[1.1]">Have a backend or full-stack role open?</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">I&apos;m looking for full-time work: {site.workSetup.charAt(0).toLowerCase() + site.workSetup.slice(1)}.</p>
            <Button asChild size='cta' className='mt-8 w-full sm:w-auto'>
              <Link href='/contact'>
                Discuss a role
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-5">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-muted-foreground">Or reach me directly</p>
            <ContactList channels={contactChannels.filter((channel) => ['Email', 'WhatsApp', 'LinkedIn'].includes(channel.label))} />
          </div>
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
                  <Link href={link.path} className="inline-block py-1 text-sm capitalize text-foreground/80 hover:text-brand transition-colors">
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
              <Link href="/privacy" className="inline-block py-1.5 hover:text-foreground underline-offset-4 hover:underline transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="inline-block py-1.5 hover:text-foreground underline-offset-4 hover:underline transition-colors">Terms</Link>
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
