'use client'

import Link from 'next/link'
import { Send } from 'lucide-react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Socials from '@/components/shared/Socials'
import Logo from './Logo'
import Nav from './Nav'

const MobileSheet = ({ open, onOpenChange, triggerRef }) => {
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onCloseAutoFocus={(e) => { e.preventDefault(); triggerRef.current?.focus() }}
        className="flex flex-col justify-between overflow-hidden border-l border-white/60 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/60"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl dark:bg-sky-500/20" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-500/20" />
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <div className="relative flex flex-col gap-y-12">
          <Logo onClick={close} />
          <Nav
            containerStyles='flex flex-col gap-y-2'
            linkStyles='relative rounded-md px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/5 transition-colors'
            activeLinkStyles='text-foreground'
            underLineStyles='absolute inset-0 rounded-md border border-white/70 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10'
            onLinkClick={close}
          />
        </div>

        <div className="relative flex flex-col gap-y-6">
          <Button asChild size='cta' className='w-full'>
            <Link href='/contact' onClick={close}>Let&apos;s talk <Send size={18} /></Link>
          </Button>
          <Socials
            containerStyles='flex justify-center gap-x-5'
            iconsStyles='text-xl text-muted-foreground hover:text-foreground transition-colors'
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet
