'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AlignRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

// the panel (and Radix Dialog with it) is a separate chunk, fetched the first
// time the button is touched, hovered or focused, so it's ready by the click
const loadSheet = () => import('./MobileSheet')
const MobileSheet = dynamic(loadSheet, { ssr: false })

const MobileNav = ({ triggerStyles = '' }) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const triggerRef = useRef(null)

  return (
    <>
      <Button
        ref={triggerRef}
        variant='outline'
        size='icon'
        className={triggerStyles}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={loadSheet}
        onFocus={loadSheet}
        onTouchStart={loadSheet}
        onClick={() => { setLoaded(true); setOpen(true) }}
      >
        <AlignRight className="h-5 w-5" />
      </Button>

      {loaded && <MobileSheet open={open} onOpenChange={setOpen} triggerRef={triggerRef} />}
    </>
  )
}

export default MobileNav
