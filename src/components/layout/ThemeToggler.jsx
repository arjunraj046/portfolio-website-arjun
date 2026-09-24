'use client'

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const ThemeToggler = ({ className = '' }) => {
    // resolvedTheme is the theme actually showing, even when set to "system"
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button
            variant='outline'
            size='icon'
            className={className}
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            <SunIcon className="h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}

export default ThemeToggler
