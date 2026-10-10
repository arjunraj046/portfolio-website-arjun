'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Radio as RadioIcon } from 'lucide-react'

const loadPanel = () => import('./RadioPanel')
const prefetch = () => { loadPanel().catch(() => {}) }
const RadioPanel = dynamic(loadPanel, { ssr: false })

const DEFAULT_VOLUME = 0.6

const Radio = () => {
    const root = useRef(null)
    const trigger = useRef(null)
    const audio = useRef(null)
    const [open, setOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [station, setStation] = useState(null)
    const [status, setStatus] = useState('idle')
    const [volume, setVolume] = useState(DEFAULT_VOLUME)
    const [muted, setMuted] = useState(false)
    const [volumeControl, setVolumeControl] = useState(true)

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
        const probe = document.createElement('audio')
        probe.volume = 0.5
        setVolumeControl(probe.volume === 0.5)
    }, [])

    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    useEffect(() => {
        audio.current.muted = muted
    }, [muted])

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

    const changeVolume = useCallback((value) => {
        setVolume(value)
        setMuted(value === 0)
    }, [])

    useEffect(() => {
        if (!('mediaSession' in navigator) || !station) return
        navigator.mediaSession.metadata = new MediaMetadata({
            title: station.name,
            artist: [station.country, station.detail].filter(Boolean).join(' · ') || 'Live radio',
            album: 'Arjun Raj · Radio'
        })
        navigator.mediaSession.setActionHandler('play', () => play())
        navigator.mediaSession.setActionHandler('pause', pause)
        return () => {
            navigator.mediaSession.setActionHandler('play', null)
            navigator.mediaSession.setActionHandler('pause', null)
        }
    }, [station, play, pause])

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
                    onVolume={changeVolume}
                    muted={muted}
                    onMute={setMuted}
                    volumeControl={volumeControl}
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
                onPointerEnter={prefetch}
                onFocus={prefetch}
                onTouchStart={prefetch}
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
