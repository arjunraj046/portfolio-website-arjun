'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Radio as RadioIcon } from 'lucide-react'

const loadPanel = () => import('./RadioPanel')
const RadioPanel = dynamic(loadPanel, { ssr: false })

const Radio = () => {
    const root = useRef(null)
    const trigger = useRef(null)
    const audio = useRef(null)
    const [open, setOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [station, setStation] = useState(null)
    const [status, setStatus] = useState('idle')
    const [volume, setVolume] = useState(0.7)

    const close = useCallback(() => {
        setOpen(false)
        trigger.current?.focus()
    }, [])

    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') close() }
        const onPointer = (e) => { if (!root.current?.contains(e.target)) setOpen(false) }
        document.addEventListener('keydown', onKey)
        document.addEventListener('pointerdown', onPointer)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('pointerdown', onPointer)
        }
    }, [open, close])

    useEffect(() => {
        const el = audio.current
        const on = {
            playing: () => setStatus('playing'),
            pause: () => setStatus('paused'),
            waiting: () => setStatus('loading'),
            error: () => setStatus('error')
        }
        Object.entries(on).forEach(([event, handler]) => el.addEventListener(event, handler))
        return () => {
            Object.entries(on).forEach(([event, handler]) => el.removeEventListener(event, handler))
            el.pause()
        }
    }, [])

    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    const play = useCallback((next) => {
        const el = audio.current
        if (next) {
            setStation(next)
            el.src = next.url
        }
        if (!el.src) return
        setStatus('loading')
        el.play().catch(() => setStatus('error'))
    }, [])

    const pause = useCallback(() => audio.current.pause(), [])

    const playing = status === 'playing'

    return (
        <div ref={root} className="fixed bottom-5 left-5 z-40">
            <audio ref={audio} preload="none" />

            {loaded && (
                <RadioPanel
                    open={open}
                    onClose={close}
                    station={station}
                    status={status}
                    volume={volume}
                    onVolume={setVolume}
                    onPlay={play}
                    onPause={pause}
                />
            )}

            <button
                ref={trigger}
                type="button"
                aria-label={open ? 'Close radio' : playing ? `Radio: playing ${station?.name}` : 'Open radio'}
                aria-expanded={open}
                aria-haspopup="dialog"
                onPointerEnter={loadPanel}
                onFocus={loadPanel}
                onTouchStart={loadPanel}
                onClick={() => { setLoaded(true); setOpen((value) => !value) }}
                className="glass-strong relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 ease-out
                    hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {playing ? (
                    <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
                        <span className="radio-bar w-[3px] rounded-full bg-primary" />
                        <span className="radio-bar w-[3px] rounded-full bg-primary [animation-delay:-0.4s]" />
                        <span className="radio-bar w-[3px] rounded-full bg-primary [animation-delay:-0.8s]" />
                    </span>
                ) : (
                    <RadioIcon size={20} aria-hidden="true" />
                )}
            </button>
        </div>
    )
}

export default Radio
