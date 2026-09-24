import Link from "next/link"

import { site } from "@/data/site"

const Logo = ({ onClick }) => {
  return (
    <Link href='/' onClick={onClick} aria-label={`${site.name} — home`} className="group flex items-center gap-x-3">
      {/* monogram */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground
        font-bold tracking-tight shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        {site.initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">
          {site.name}<span className="text-muted-foreground">.</span>
        </span>
        <span className="hidden sm:block text-[11px] uppercase tracking-[3px] text-muted-foreground">
          {site.shortRole}
        </span>
      </span>
    </Link>
  )
}

export default Logo
