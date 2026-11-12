'use client'

import Link from 'next/link'
import { Send } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
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
        className="flex flex-col justify-between overflow-hidden border-l border-border bg-card "
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation, contact button and social links.</SheetDescription>

        <div className="relative flex flex-col gap-y-12">
          <Logo onClick={close} />
          <Nav
            containerStyles='flex flex-col gap-y-2'
            linkStyles='relative rounded-md px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
            activeLinkStyles='text-foreground'
            underLineStyles='absolute inset-0 rounded-md border border-border bg-background'
            onLinkClick={close}
          />
        </div>

        <div className="relative flex flex-col gap-y-6">
          <Button asChild size='cta' className='w-full'>
            <Link href='/contact' onClick={close}>Contact me <Send size={18} /></Link>
          </Button>
          <Socials
            containerStyles='flex justify-center gap-x-2'
            iconsStyles='flex h-10 w-10 items-center justify-center rounded-md text-xl text-muted-foreground hover:text-brand transition-colors'
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet
