'use client'

import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

// the only interactive bit of the footer, split out so the footer itself
// renders on the server with no JavaScript
const BackToTop = () => (
  <Button
    variant='outline'
    size='icon'
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Back to top"
    className='rounded-lg border-white/60 bg-white/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15'
  >
    <ArrowUp className="h-4 w-4" />
  </Button>
)

export default BackToTop
