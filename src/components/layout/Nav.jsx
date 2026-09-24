'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navLinks } from "@/data/site"

const Nav = ({ containerStyles, linkStyles, activeLinkStyles = '', underLineStyles, onLinkClick }) => {
    const path = usePathname();

    return (
        <nav className={containerStyles} aria-label="Main navigation">
            {navLinks.map((link) => {
                const isActive = link.path === path;
                return (
                    <Link
                        href={link.path}
                        key={link.path}
                        onClick={onLinkClick}
                        aria-current={isActive ? 'page' : undefined}
                        className={`capitalize ${linkStyles} ${isActive ? activeLinkStyles : ''}`}
                    >
                        {isActive && (
                            <span aria-hidden="true" className={`animate-in fade-in zoom-in-95 duration-200 ${underLineStyles}`} />
                        )}
                        <span className="relative z-10">{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    )
}

export default Nav
