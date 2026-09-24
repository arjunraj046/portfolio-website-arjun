'use client'

import { useRef } from 'react'

// A card that tilts towards the mouse and settles back when it leaves. Mouse
// only (touch and pen are ignored), and it runs even with reduced motion on,
// as the owner asked. `max` is the largest tilt in degrees
const TiltCard = ({ max = 4, className = '', children, ...props }) => {
    const ref = useRef(null)

    const onPointerMove = (e) => {
        if (e.pointerType !== 'mouse') return
        const el = ref.current
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `perspective(900px) rotateX(${(-y * max * 2).toFixed(2)}deg) rotateY(${(x * max * 2).toFixed(2)}deg) translateY(-3px)`
    }

    const onPointerLeave = () => {
        ref.current.style.transform = ''
    }

    return (
        <div
            ref={ref}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export default TiltCard
