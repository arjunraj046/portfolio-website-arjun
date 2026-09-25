'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { site } from '@/data/site'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

const LIMITS = { name: 80, email: 254, subject: 120, message: 2000 }
const NAME = /^[\p{L}][\p{L}\s.'’-]*$/u
const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i

const rules = {
    name: {
        validate: (v) => {
            const value = v.trim()
            if (!value) return 'Please enter your name.'
            if (value.length < 2) return 'Your name should be at least 2 characters.'
            if (!NAME.test(value)) return 'Please use letters only (spaces, dots, hyphens and apostrophes are fine).'
            return true
        },
        maxLength: { value: LIMITS.name, message: `Please keep your name under ${LIMITS.name} characters.` }
    },
    email: {
        validate: (v) => {
            const value = v.trim()
            if (!value) return 'Please enter your email address.'
            if (!EMAIL.test(value)) return 'Please enter a valid email address, like name@example.com.'
            return true
        },
        maxLength: { value: LIMITS.email, message: 'That email address is too long.' }
    },
    subject: {
        maxLength: { value: LIMITS.subject, message: `Please keep the subject under ${LIMITS.subject} characters.` }
    },
    message: {
        validate: (v) => {
            const value = v.trim()
            if (!value) return 'Please write a message.'
            if (value.length < 10) return 'Please write at least 10 characters.'
            return true
        },
        maxLength: { value: LIMITS.message, message: `Please keep your message under ${LIMITS.message.toLocaleString()} characters.` }
    }
}

const fieldStyles = 'h-11 rounded-lg border-white/60 bg-white/50 dark:border-white/10 dark:bg-white/5 aria-[invalid=true]:border-destructive/60'

const Required = () => <span aria-hidden="true" className="ml-0.5 text-destructive">*</span>

const ContactForm = () => {
    const [status, setStatus] = useState('idle')

    const form = useForm({
        mode: 'onTouched',
        defaultValues: { name: '', email: '', subject: '', message: '' }
    })
    const messageLength = form.watch('message').length

    const onSubmit = async (raw, event) => {
        const values = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, value.trim()]))

        if (event?.target?.botcheck?.checked) return

        if (!ACCESS_KEY) {
            setStatus('error')
            return
        }

        setStatus('sending')
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    from_name: `${site.name} portfolio`,
                    subject: values.subject || `New message from ${values.name}`,
                    name: values.name,
                    email: values.email,
                    replyto: values.email,
                    message: values.message
                })
            })
            const result = await response.json()
            if (!result.success) throw new Error(result.message)
            form.reset()
            setStatus('sent')
        } catch {
            setStatus('error')
        }
    }

    if (status === 'sent') {
        return (
            <div role="status" className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle2 size={44} aria-hidden="true" className="text-emerald-500" />
                <h3 className="text-2xl font-semibold">Message sent</h3>
                <p className="max-w-sm text-muted-foreground">Thanks for getting in touch. I&apos;ll reply to you by email.</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>Send another message</Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-1 flex-col gap-5">
                <p className="-mt-2 text-xs text-muted-foreground">
                    Fields marked <span className="text-destructive">*</span> are required.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        rules={rules.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name<Required /></FormLabel>
                                <FormControl>
                                    <Input autoComplete="name" placeholder="Your name" maxLength={LIMITS.name} aria-required="true" className={fieldStyles} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        rules={rules.email}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email<Required /></FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        autoCapitalize="none"
                                        spellCheck={false}
                                        placeholder="you@example.com"
                                        maxLength={LIMITS.email}
                                        aria-required="true"
                                        className={fieldStyles}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="subject"
                    rules={rules.subject}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject <span className="font-normal text-muted-foreground">(optional)</span></FormLabel>
                            <FormControl>
                                <Input placeholder="What's it about?" maxLength={LIMITS.subject} className={fieldStyles} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    rules={rules.message}
                    render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col">
                            <FormLabel>Message<Required /></FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell me about your project, role or question. Write as much as you need."
                                    maxLength={LIMITS.message}
                                    aria-required="true"
                                    className={`${fieldStyles} h-auto min-h-[150px] flex-1 resize-none overflow-y-auto leading-relaxed`}
                                    {...field}
                                />
                            </FormControl>
                            <div className="flex items-start justify-between gap-4">
                                <FormMessage />
                                <p
                                    aria-live="polite"
                                    className={cn(
                                        'ml-auto shrink-0 text-xs tabular-nums text-muted-foreground',
                                        messageLength >= LIMITS.message && 'text-destructive'
                                    )}
                                >
                                    {messageLength.toLocaleString()} / {LIMITS.message.toLocaleString()}
                                </p>
                            </div>
                        </FormItem>
                    )}
                />

                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {status === 'error' && (
                    <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
                        Sorry, your message couldn&apos;t be sent. Please try again, or email me at{' '}
                        <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">{site.email}</a>.
                    </p>
                )}

                <Button type="submit" size="cta" disabled={status === 'sending'} className="self-start">
                    {status === 'sending' ? (
                        <>Sending <Loader2 size={18} aria-hidden="true" className="animate-spin" /></>
                    ) : (
                        <>Send message <Send size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" /></>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default ContactForm
