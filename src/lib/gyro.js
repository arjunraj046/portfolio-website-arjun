const RANGE = 18
const RECENTER = 0.02
const BOOST = 1.5

const cards = new Map()
const visible = new Set()
let observer = null
let listening = false
let asked = false
let granted = false
let frame = 0
let base = null
let tiltX = 0
let tiltY = 0

const clamp = (value) => Math.max(-1, Math.min(1, value))

const axes = (e) => {
    const angle = screen.orientation?.angle ?? window.orientation ?? 0
    if (angle === 90) return [-e.gamma, e.beta]
    if (angle === -90 || angle === 270) return [e.gamma, -e.beta]
    if (angle === 180) return [-e.beta, -e.gamma]
    return [e.beta, e.gamma]
}

const apply = () => {
    frame = 0
    for (const el of visible) {
        const max = (cards.get(el) || 0) * BOOST
        el.style.transform = `perspective(900px) rotateX(${(-tiltX * max).toFixed(2)}deg) rotateY(${(tiltY * max).toFixed(2)}deg)`
    }
}

const onOrientation = (e) => {
    if (e.beta == null || e.gamma == null) return
    const [pitch, roll] = axes(e)
    if (!base) base = { pitch, roll }
    base.pitch += (pitch - base.pitch) * RECENTER
    base.roll += (roll - base.roll) * RECENTER
    tiltX = clamp((pitch - base.pitch) / RANGE)
    tiltY = clamp((roll - base.roll) / RANGE)
    if (!frame) frame = requestAnimationFrame(apply)
}

const listen = () => {
    if (listening) return
    listening = true
    window.addEventListener('deviceorientation', onOrientation)
}

const stop = () => {
    if (!listening) return
    listening = false
    window.removeEventListener('deviceorientation', onOrientation)
    cancelAnimationFrame(frame)
    frame = 0
    base = null
}

const start = () => {
    if (granted) return listen()
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
        granted = true
        return listen()
    }
    if (asked) return
    asked = true
    const request = () => DeviceOrientationEvent.requestPermission().then((state) => {
        granted = state === 'granted'
        if (granted && cards.size) listen()
        return granted
    })
    const askOnTap = () => request().catch(() => {})
    request()
        .then((ok) => { if (!ok) document.addEventListener('touchend', askOnTap, { once: true }) })
        .catch(() => document.addEventListener('touchend', askOnTap, { once: true }))
}

export const gyroAvailable = () =>
    typeof window !== 'undefined' && 'DeviceOrientationEvent' in window && window.matchMedia('(hover: none) and (pointer: coarse)').matches

export const followGyro = (el, max) => {
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) visible.add(entry.target)
                else {
                    visible.delete(entry.target)
                    entry.target.style.transform = ''
                }
            })
        })
    }
    cards.set(el, max)
    observer.observe(el)
    start()

    return () => {
        cards.delete(el)
        visible.delete(el)
        observer.unobserve(el)
        if (!cards.size) stop()
    }
}
