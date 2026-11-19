'use client'

import { useEffect } from 'react'

const EASE = 0.1
const LINE = 40

const scrollableParent = (node, deltaY) => {
    for (let el = node; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
        const { overflowY } = getComputedStyle(el)
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
            const atTop = el.scrollTop <= 0
            const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight
            if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true
        }
    }
    return false
}

const isMouseWheel = (e) => e.deltaMode === 1 || (e.deltaX === 0 && Math.abs(e.deltaY) >= 50 && Number.isInteger(e.deltaY))

const SmoothScroll = () => {
    useEffect(() => {
        let target = window.scrollY
        let current = window.scrollY
        let frame = 0
        let last = 0

        const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

        const step = (now) => {
            const dt = last ? Math.min(now - last, 64) : 16.7
            last = now
            current += (target - current) * (1 - Math.pow(1 - EASE, dt / 16.7))
            if (Math.abs(target - current) < 0.3) current = target
            window.scrollTo({ top: current, behavior: 'instant' })
            frame = current === target ? 0 : requestAnimationFrame(step)
            if (!frame) last = 0
        }

        const onWheel = (e) => {
            if (e.defaultPrevented || e.ctrlKey || !isMouseWheel(e) || scrollableParent(e.target, e.deltaY)) return
            e.preventDefault()
            if (!frame) current = target = window.scrollY
            const delta = e.deltaMode === 1 ? e.deltaY * LINE : e.deltaY
            target = Math.max(0, Math.min(maxScroll(), target + delta))
            if (!frame) frame = requestAnimationFrame(step)
        }

        const onScroll = () => {
            if (!frame) current = target = window.scrollY
        }

        const stop = () => {
            cancelAnimationFrame(frame)
            frame = 0
            last = 0
            current = target = window.scrollY
        }

        window.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('keydown', stop)
        window.addEventListener('pointerdown', stop)
        return () => {
            window.removeEventListener('wheel', onWheel)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('keydown', stop)
            window.removeEventListener('pointerdown', stop)
            cancelAnimationFrame(frame)
        }
    }, [])

    return null
}

export default SmoothScroll
