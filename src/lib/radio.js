import { radioServers } from '@/data/radio'

const cache = new Map()

const load = async (tag) => {
    const query = new URLSearchParams({
        tag,
        hidebroken: 'true',
        is_https: 'true',
        order: 'clickcount',
        reverse: 'true',
        limit: '30'
    })
    for (const server of radioServers) {
        try {
            const response = await fetch(`${server}/json/stations/search?${query}`)
            if (!response.ok) continue
            const list = await response.json()
            const unique = new Map()
            list
                .filter((s) => s.url_resolved?.startsWith('https://'))
                .forEach((s) => { if (!unique.has(s.name.trim().toLowerCase())) unique.set(s.name.trim().toLowerCase(), s) })
            return [...unique.values()]
                .slice(0, 15)
                .map((s) => ({
                    id: s.stationuuid,
                    name: s.name.trim(),
                    country: s.countrycode || s.country,
                    detail: [s.codec, s.bitrate ? `${s.bitrate} kbps` : ''].filter(Boolean).join(' · '),
                    url: s.url_resolved
                }))
        } catch {
            continue
        }
    }
    throw new Error('unavailable')
}

export const fetchStations = (tag) => {
    if (!cache.has(tag)) {
        const request = load(tag)
        request.catch(() => cache.delete(tag))
        cache.set(tag, request)
    }
    return cache.get(tag)
}

const AUTOPLAY_KEY = 'radio-autoplay'

export const autoplayAllowed = () => {
    try {
        return localStorage.getItem(AUTOPLAY_KEY) !== 'off'
    } catch {
        return true
    }
}

export const rememberAutoplay = (on) => {
    try {
        localStorage.setItem(AUTOPLAY_KEY, on ? 'on' : 'off')
    } catch {}
}
