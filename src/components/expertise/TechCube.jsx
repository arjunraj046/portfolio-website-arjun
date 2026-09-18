'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiTypescript,
    SiAmazonaws
} from 'react-icons/si'

const SIZE = 208
const HALF = SIZE / 2

// --- feel of the drag ---------------------------------------------------
// FRICTION is the share of spin kept each 60fps frame after you let go:
// lower = grabbier, stops sooner. DRAG_SENSITIVITY is degrees turned per
// pixel dragged — lower makes the cube feel heavier in the hand.
const DRAG_SENSITIVITY = 0.32
const FRICTION = 0.9
const MIN_VELOCITY = 0.05
const VELOCITY_SMOOTHING = 0.25

// six faces of a real CSS 3D cube — each pushed out along its own axis
const faces = [
    { name: 'React.js', Icon: SiReact, color: '#61DAFB', transform: `rotateY(0deg) translateZ(${HALF}px)` },
    { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', transform: `rotateY(90deg) translateZ(${HALF}px)` },
    { name: 'Express', Icon: SiExpress, tone: 'text-slate-900 dark:text-slate-100', transform: `rotateY(180deg) translateZ(${HALF}px)` },
    { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', transform: `rotateY(-90deg) translateZ(${HALF}px)` },
    { name: 'AWS', Icon: SiAmazonaws, color: '#FF9900', transform: `rotateX(90deg) translateZ(${HALF}px)` },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', transform: `rotateX(-90deg) translateZ(${HALF}px)` }
]

const TechCube = () => {
    const stage = useRef(null)
    const cube = useRef(null)

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const ctx = gsap.context(() => {
            const el = cube.current
            const surface = stage.current

            // perspective lives on the stage wrapper, not here
            gsap.set(el, {
                transformStyle: 'preserve-3d',
                rotationX: -18,
                rotationY: 24
            })

            let spin = null
            let hovering = false

            // a fresh relative tween each time, so it always picks up the
            // rotation the user left the cube at instead of snapping back
            const startSpin = () => {
                if (reduced) return
                spin?.kill()
                spin = gsap.to(el, {
                    rotationY: '+=360',
                    duration: 24,
                    ease: 'none',
                    repeat: -1
                })
                if (hovering) spin.pause()
            }

            const stopSpin = () => {
                spin?.kill()
                spin = null
            }

            startSpin()

            // pointer drag — works for mouse, pen and touch
            let dragging = false
            let lastX = 0
            let lastY = 0
            let velY = 0   // degrees per 60fps frame
            let velX = 0
            let gliding = false

            // friction decay, applied every frame after release until the
            // cube is practically still, then the idle spin takes back over
            const glide = () => {
                const dt = gsap.ticker.deltaRatio()
                const decay = Math.pow(FRICTION, dt)
                velY *= decay
                velX *= decay

                if (Math.abs(velY) < MIN_VELOCITY && Math.abs(velX) < MIN_VELOCITY) {
                    stopGlide()
                    startSpin()
                    return
                }

                gsap.set(el, {
                    rotationY: `+=${velY * dt}`,
                    rotationX: `+=${velX * dt}`
                })
            }

            const startGlide = () => {
                if (gliding) return
                gliding = true
                gsap.ticker.add(glide)
            }

            const stopGlide = () => {
                if (!gliding) return
                gliding = false
                gsap.ticker.remove(glide)
            }

            const onDown = (e) => {
                dragging = true
                lastX = e.clientX
                lastY = e.clientY
                velY = velX = 0
                stopGlide()
                stopSpin()
                gsap.killTweensOf(el)
                surface.setPointerCapture?.(e.pointerId)
                surface.classList.add('cursor-grabbing')
            }

            const onMove = (e) => {
                if (!dragging) return
                const dx = e.clientX - lastX
                const dy = e.clientY - lastY
                lastX = e.clientX
                lastY = e.clientY

                // smooth the running velocity so a twitch at release
                // doesn't throw the cube across three turns
                velY += (dx * DRAG_SENSITIVITY - velY) * VELOCITY_SMOOTHING
                velX += (-dy * DRAG_SENSITIVITY - velX) * VELOCITY_SMOOTHING

                gsap.set(el, {
                    rotationY: `+=${dx * DRAG_SENSITIVITY}`,
                    rotationX: `-=${dy * DRAG_SENSITIVITY}`
                })
            }

            const onUp = (e) => {
                if (!dragging) return
                dragging = false
                surface.releasePointerCapture?.(e.pointerId)
                surface.classList.remove('cursor-grabbing')

                if (reduced) return
                startGlide()
            }

            // hovering pauses the idle spin so a face can be read
            const onEnter = () => { hovering = true; if (!dragging) spin?.pause() }
            const onLeave = () => { hovering = false; if (!dragging) spin?.play() }

            surface.addEventListener('pointerdown', onDown)
            surface.addEventListener('pointermove', onMove)
            surface.addEventListener('pointerup', onUp)
            surface.addEventListener('pointercancel', onUp)
            surface.addEventListener('pointerenter', onEnter)
            surface.addEventListener('pointerleave', onLeave)

            return () => {
                stopGlide()
                stopSpin()
                surface.removeEventListener('pointerdown', onDown)
                surface.removeEventListener('pointermove', onMove)
                surface.removeEventListener('pointerup', onUp)
                surface.removeEventListener('pointercancel', onUp)
                surface.removeEventListener('pointerenter', onEnter)
                surface.removeEventListener('pointerleave', onLeave)
            }
        }, stage)

        return () => ctx.revert()
    }, [])

    // arrow keys step the cube a quarter turn at a time
    const onKeyDown = (e) => {
        const step = { ArrowLeft: ['rotationY', -90], ArrowRight: ['rotationY', 90], ArrowUp: ['rotationX', 90], ArrowDown: ['rotationX', -90] }[e.key]
        if (!step) return
        e.preventDefault()
        gsap.to(cube.current, { [step[0]]: `+=${step[1]}`, duration: 0.6, ease: 'power2.inOut', overwrite: 'auto' })
    }

    return (
        <div
            ref={stage}
            tabIndex={0}
            role="img"
            aria-label={`Rotating cube showing the technologies I work with: ${faces.map((f) => f.name).join(', ')}. Drag it, or use the arrow keys to turn it.`}
            onKeyDown={onKeyDown}
            className="relative grid place-items-center cursor-grab touch-none select-none rounded-lg
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            style={{ height: SIZE * 1.9, perspective: 900 }}
        >
            <div
                ref={cube}
                className="relative will-change-transform"
                style={{ width: SIZE, height: SIZE, transformStyle: 'preserve-3d' }}
            >
                {faces.map(({ name, Icon, color, tone, transform }) => (
                    <div
                        key={name}
                        style={{ transform, width: SIZE, height: SIZE }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg border
                                   bg-card/80 backdrop-blur-sm shadow-lg"
                    >
                        <Icon size={64} style={color ? { color } : undefined} className={tone || ''} />
                        <span className="text-sm font-medium text-muted-foreground">{name}</span>
                    </div>
                ))}
            </div>

            <p className="absolute bottom-2 text-xs text-muted-foreground">Drag to spin · arrow keys to turn</p>
        </div>
    )
}

export default TechCube
