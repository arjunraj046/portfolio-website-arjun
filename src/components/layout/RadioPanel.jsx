'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { radioGenres } from '@/data/radio'
import { fetchStations } from '@/lib/radio'

const RadioPanel = ({ open, onClose, station, status, volume, onVolume, muted, onMute, volumeControl, onPlay, onPause }) => {
    const panel = useRef(null)
    const [genre, setGenre] = useState(radioGenres[0].id)
    const [stations, setStations] = useState({})
    const [loadError, setLoadError] = useState(false)

    useEffect(() => {
        if (open) panel.current?.querySelector('button, input')?.focus()
    }, [open])

    useEffect(() => {
        if (stations[genre]) return
        let active = true
        setLoadError(false)
        fetchStations(radioGenres.find((g) => g.id === genre).tag)
            .then((list) => { if (active) setStations((all) => ({ ...all, [genre]: list })) })
            .catch(() => { if (active) setLoadError(true) })
        return () => { active = false }
    }, [genre, stations])

    const list = stations[genre]
    const playing = status === 'playing'
    const loading = status === 'loading'

    const toggle = () => {
        if (playing || loading) return onPause()
        if (station) return onPlay()
        if (list?.length) onPlay(list[0])
    }

    return (
        <div
            ref={panel}
            role="dialog"
            aria-label="Radio"
            hidden={!open}
            className="absolute bottom-16 left-0 w-[min(21rem,calc(100vw-2.5rem))] rounded-xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/90 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[3px] text-muted-foreground">Radio</p>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close radio"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <X size={16} aria-hidden="true" />
                </button>
            </div>

            <div className="mt-2 flex items-center gap-3">
                <button
                    type="button"
                    onClick={toggle}
                    disabled={!station && !list?.length}
                    aria-label={playing || loading ? 'Pause' : 'Play'}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity
                        hover:opacity-90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    {loading ? <Loader2 size={20} aria-hidden="true" className="animate-spin" />
                        : playing ? <Pause size={20} aria-hidden="true" />
                            : <Play size={20} aria-hidden="true" className="translate-x-px" />}
                </button>
                <div className="min-w-0 flex-1" aria-live="polite">
                    <p className="truncate font-semibold leading-snug">{station ? station.name : 'Pick a station'}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {status === 'error' ? "This station isn't available. Try another one."
                            : loading ? 'Connecting…'
                                : station ? [station.country, station.detail].filter(Boolean).join(' · ')
                                    : 'Live internet radio'}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => {
                        if (muted && volume === 0) onVolume(0.6)
                        onMute(!muted)
                    }}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    aria-pressed={muted}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
                </button>
                {volumeControl ? (
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={muted ? 0 : volume}
                        onChange={(e) => onVolume(Number(e.target.value))}
                        aria-label="Volume"
                        className="h-6 w-full cursor-pointer touch-none accent-primary"
                    />
                ) : (
                    <p className="text-xs text-muted-foreground">Use your phone&apos;s volume buttons to change the volume.</p>
                )}
            </div>

            <div role="group" aria-label="Genre" className="mt-4 flex flex-wrap gap-1.5">
                {radioGenres.map((g) => (
                    <button
                        key={g.id}
                        type="button"
                        onClick={() => setGenre(g.id)}
                        aria-pressed={genre === g.id}
                        className={cn(
                            'shrink-0 rounded-md border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                            genre === g.id
                                ? 'border-transparent bg-primary text-primary-foreground'
                                : 'border-white/60 bg-white/40 text-muted-foreground hover:text-foreground dark:border-white/10 dark:bg-white/5'
                        )}
                    >
                        {g.label}
                    </button>
                ))}
            </div>

            <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-white/60 bg-white/30 dark:border-white/10 dark:bg-white/[0.03]">
                {loadError ? (
                    <p className="p-4 text-sm text-muted-foreground">Couldn&apos;t load stations right now. Please try again later.</p>
                ) : !list ? (
                    <p className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                        <Loader2 size={14} aria-hidden="true" className="animate-spin" /> Loading stations…
                    </p>
                ) : !list.length ? (
                    <p className="p-4 text-sm text-muted-foreground">No stations found for this genre.</p>
                ) : (
                    <ul>
                        {list.map((s) => {
                            const current = station?.id === s.id
                            return (
                                <li key={s.id} className="border-b border-foreground/5 last:border-b-0">
                                    <button
                                        type="button"
                                        onClick={() => onPlay(s)}
                                        aria-current={current}
                                        className={cn(
                                            'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:bg-foreground/5',
                                            current && 'bg-foreground/[0.06]'
                                        )}
                                    >
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium">{s.name}</span>
                                            <span className="block truncate text-xs text-muted-foreground">{[s.country, s.detail].filter(Boolean).join(' · ')}</span>
                                        </span>
                                        {current && playing && (
                                            <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
                                                <span className="radio-bar w-[2px] rounded-full bg-primary" />
                                                <span className="radio-bar w-[2px] rounded-full bg-primary [animation-delay:-0.4s]" />
                                                <span className="radio-bar w-[2px] rounded-full bg-primary [animation-delay:-0.8s]" />
                                            </span>
                                        )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
                Stations from{' '}
                <a href="https://www.radio-browser.info" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                    Radio Browser
                </a>
            </p>
        </div>
    )
}

export default RadioPanel
