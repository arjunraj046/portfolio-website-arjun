'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { navLinks } from "@/data/site"

// each Nav instance needs its own layoutId, or the active pills of the
// desktop and mobile navs animate between each other
const Nav = ({ containerStyles, linkStyles, activeLinkStyles = '', underLineStyles, layoutId = 'underline', onLinkClick }) => {
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
                            <motion.span
                                layoutId={layoutId}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                className={underLineStyles}
                            />
                        )}
                        <span className="relative z-10">{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    )
}

export default Nav
