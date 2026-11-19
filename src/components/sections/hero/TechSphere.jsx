'use client'

import { useEffect, useRef } from 'react'

import { skillGroups } from '@/data/skills'
import HeroAnimation from './HeroAnimation'

const RADIUS = 0.4
const CORE = 0.55
const AUTO_SPIN = 0.0035
const REDUCED_SPIN = 0.001
const DRAG = 0.008
const FRICTION = 0.95

const items = Object.values(skillGroups).flatMap((group) => group.items).filter((item) => item.Icon)

const points = items.map((_, i) => {
    const y = 1 - (i / (items.length - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
})

const TechSphere = () => {
    const stage = useRef(null)
    const nodes = useRef([])

    useEffect(() => {
        const el = stage.current
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let rotX = -0.25
        let rotY = 0
        let velX = 0
        const idleSpin = reduced ? REDUCED_SPIN : AUTO_SPIN
        let velY = idleSpin
        let tiltTarget = -0.25
        let dragging = false
        let lastX = 0
        let lastY = 0
        let radius = el.offsetWidth * RADIUS

        const render = () => {
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY)

            points.forEach((p, i) => {
                const node = nodes.current[i]
                if (!node) return
                const x1 = p.x * cosY - p.z * sinY
                const z1 = p.x * sinY + p.z * cosY
                const y1 = p.y * cosX - z1 * sinX
                const z = p.y * sinX + z1 * cosX
                const depth = (z + 1) / 2

                const distance = Math.hypot(x1, y1)
                const clear = z > 0 ? Math.min(1, Math.max(0.12, distance / CORE)) : 1

                node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y1 * radius}px, 0) scale(${0.55 + depth * 0.6})`
                node.style.opacity = (0.2 + depth * 0.8) * clear
                node.style.zIndex = Math.round(depth * 100)
            })
        }

        render()

        const resize = new ResizeObserver(() => {
            radius = el.offsetWidth * RADIUS
            render()
        })
        resize.observe(el)

        const tick = () => {
            const dt = frameRatio()
            if (!dragging) {
                velY += (idleSpin - velY) * (1 - Math.pow(FRICTION, dt))
                velX *= Math.pow(FRICTION, dt)
                rotY += velY * dt
                rotX += velX * dt + (tiltTarget - rotX) * 0.04 * dt
            }
            render()
        }

        const onPointerMove = (e) => {
            if (!dragging) return
            const dx = e.clientX - lastX
            const dy = e.clientY - lastY
            lastX = e.clientX
            lastY = e.clientY
            rotY -= dx * DRAG
            rotX += dy * DRAG
            velY = -dx * DRAG
            velX = dy * DRAG
        }

        const onPointerDown = (e) => {
            dragging = true
            lastX = e.clientX
            lastY = e.clientY
            el.setPointerCapture?.(e.pointerId)
            el.classList.add('cursor-grabbing')
        }

        const onPointerUp = (e) => {
            if (!dragging) return
            dragging = false
            tiltTarget = rotX
            el.releasePointerCapture?.(e.pointerId)
            el.classList.remove('cursor-grabbing')
        }

        let frame = 0
        let last = 0
        const frameRatio = () => {
            const now = performance.now()
            const ratio = Math.min((now - last) / (1000 / 60), 4)
            last = now
            return ratio
        }
        const loop = () => {
            if (!running) return
            tick()
            frame = requestAnimationFrame(loop)
        }

        let running = false
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !running) { running = true; last = performance.now(); frame = requestAnimationFrame(loop) }
            if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(frame) }
        })
        observer.observe(el)

        el.addEventListener('pointerdown', onPointerDown)
        el.addEventListener('pointermove', onPointerMove)
        el.addEventListener('pointerup', onPointerUp)
        el.addEventListener('pointercancel', onPointerUp)

        return () => {
            observer.disconnect()
            resize.disconnect()
            running = false
            cancelAnimationFrame(frame)
            el.removeEventListener('pointerdown', onPointerDown)
            el.removeEventListener('pointermove', onPointerMove)
            el.removeEventListener('pointerup', onPointerUp)
            el.removeEventListener('pointercancel', onPointerUp)
        }
    }, [])

    return (
        <div
            ref={stage}
            role="img"
            aria-label={`Technologies I work with: ${items.map((item) => item.name).join(', ')}`}
            className="relative h-[520px] w-[520px] 2xl:h-[600px] 2xl:w-[600px] cursor-grab touch-none select-none"
        >
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full
                bg-[radial-gradient(circle,rgba(56,189,248,0.35),rgba(16,185,129,0.14)_45%,transparent_70%)] blur-2xl" />

            <div aria-hidden="true" className="absolute inset-0 [perspective:900px]">
                <div className="absolute inset-[30px] rounded-full border border-foreground/10 [transform:rotateX(72deg)]" />
                <div className="absolute inset-[30px] rounded-full border border-foreground/10 [transform:rotateX(72deg)_rotateY(60deg)]" />
                <div className="absolute inset-[30px] rounded-full border border-foreground/10 [transform:rotateX(72deg)_rotateY(-60deg)]" />
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-[50] aspect-[4/3] w-[62%] -translate-x-1/2 -translate-y-1/2">
                <HeroAnimation className="h-full w-full" />
            </div>

            {items.map(({ name, Icon, color, tone }, i) => (
                <div
                    key={name}
                    ref={(node) => { nodes.current[i] = node }}
                    aria-hidden="true"
                    title={name}
                    className="surface absolute left-1/2 top-1/2 flex h-14 w-14 2xl:h-16 2xl:w-16 items-center justify-center rounded-lg text-[28px] 2xl:text-[32px] will-change-transform"
                >
                    <Icon style={color ? { color } : undefined} className={tone || ''} />
                </div>
            ))}
        </div>
    )
}

export default TechSphere
