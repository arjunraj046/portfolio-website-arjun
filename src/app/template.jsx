'use client'

import useScrollProgress from "@/hooks/useScrollProgress"

// wraps every page: a CSS fade-in on navigation (it needs no JavaScript,
// so content is never stuck hidden) + the scroll progress bar
const Template = ({ children }) => {
    const completion = useScrollProgress()

    return (
        <>
            <div className="animate-in fade-in duration-300 motion-reduce:animate-none">
                {children}
            </div>

            <span
                aria-hidden="true"
                style={{ transform: `translateY(${completion - 100}%)` }}
                className="fixed z-50 bg-primary w-1 top-0 right-0 bottom-0 transition-transform duration-300"
            />
        </>
    )
}

export default Template
