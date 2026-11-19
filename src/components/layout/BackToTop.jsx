'use client'

import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

const BackToTop = () => (
  <Button
    variant='outline'
    size='icon'
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Back to top"
    className='rounded-md border-border bg-card hover:bg-muted '
  >
    <ArrowUp className="h-4 w-4" />
  </Button>
)

export default BackToTop
