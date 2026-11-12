import Link from "next/link"

import { site } from "@/data/site"

const Logo = ({ onClick }) => {
  return (
    <Link href='/' onClick={onClick} aria-label={`${site.name}, home`} className="group flex items-center gap-x-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-sm text-primary-foreground
        font-semibold tracking-tight">
        {site.initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">
          {site.name}<span className="text-muted-foreground">.</span>
        </span>
        <span className="hidden sm:block font-mono text-xs uppercase tracking-[2px] text-muted-foreground">
          {site.shortRole}
        </span>
      </span>
    </Link>
  )
}

export default Logo
