import Logo from "./Logo"
import Nav from "./Nav"
import MobileNav from "./MobileNav"
import ThemeToggler from "./ThemeToggler"

const iconButton = 'h-10 w-10 rounded-md border-border bg-transparent hover:bg-muted'

const Header = () => {
    return (
        <header className="site-header sticky top-0 z-30 h-20">
            <div className="container mx-auto flex h-full items-center justify-between gap-x-4 !px-4 md:!px-8">
                <Logo />

                <Nav
                    containerStyles='hidden md:flex items-center gap-x-1'
                    linkStyles='relative px-4 py-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors'
                    activeLinkStyles='text-foreground'
                    underLineStyles='absolute inset-x-4 -bottom-[1.1rem] h-0.5 bg-brand'
                />

                <div className="flex items-center gap-x-2">
                    <ThemeToggler className={iconButton} />
                    <div className="md:hidden">
                        <MobileNav triggerStyles={iconButton} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
