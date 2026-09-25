'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        area.remove()
        return ok
    }
}

const CopyDetails = ({ text }) => {
    const [state, setState] = useState('idle')
    const timer = useRef(0)

    useEffect(() => () => clearTimeout(timer.current), [])

    const onCopy = async () => {
        const ok = await copyText(text)
        setState(ok ? 'copied' : 'failed')
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setState('idle'), 2500)
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" size="cta" onClick={onCopy}>
                {state === 'copied' ? <Check size={18} aria-hidden="true" className="text-emerald-500" /> : <Copy size={18} aria-hidden="true" />}
                {state === 'copied' ? 'Copied' : 'Copy my details'}
            </Button>
            <p aria-live="polite" className="text-sm text-muted-foreground">
                {state === 'copied' && 'My intro and contact details are on your clipboard.'}
                {state === 'failed' && "Couldn't copy automatically. Please select the details above instead."}
            </p>
        </div>
    )
}

export default CopyDetails
