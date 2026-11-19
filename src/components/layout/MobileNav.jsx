'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AlignRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const loadSheet = () => import('./MobileSheet')
const prefetch = () => { loadSheet().catch(() => {}) }
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
        onPointerEnter={prefetch}
        onFocus={prefetch}
        onTouchStart={prefetch}
        onClick={() => { setLoaded(true); setOpen(true) }}
      >
        <AlignRight className="h-5 w-5" />
      </Button>

      {loaded && <MobileSheet open={open} onOpenChange={setOpen} triggerRef={triggerRef} />}
    </>
  )
}

export default MobileNav
