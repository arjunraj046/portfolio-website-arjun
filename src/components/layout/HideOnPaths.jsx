'use client'

import { usePathname } from 'next/navigation'

const HideOnPaths = ({ paths, children }) => (paths.includes(usePathname()) ? null : children)

export default HideOnPaths
