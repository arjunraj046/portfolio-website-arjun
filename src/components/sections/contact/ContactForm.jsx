'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/data/site'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const rules = {
    name: {
        validate: (v) => v.trim().length >= 2 || 'Please enter your name.',
        maxLength: { value: 100, message: 'Please keep your name under 100 characters.' }
    },
    email: {
        validate: (v) => EMAIL.test(v.trim()) || 'Please enter a valid email address.'
    },
    subject: {
        maxLength: { value: 150, message: 'Please keep the subject under 150 characters.' }
    },
    message: {
        validate: (v) => v.trim().length >= 10 || 'Please write at least 10 characters.',
        maxLength: { value: 3000, message: 'Please keep it under 3000 characters.' }
    }
}

const fieldStyles = 'h-11 rounded-lg border-white/60 bg-white/50 dark:border-white/10 dark:bg-white/5'

const ContactForm = () => {
    const [status, setStatus] = useState('idle')

    const form = useForm({
        defaultValues: { name: '', email: '', subject: '', message: '' }
    })

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
            <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle2 size={44} aria-hidden="true" className="text-emerald-500" />
                <h3 className="text-2xl font-semibold">Message sent</h3>
                <p className="max-w-sm text-muted-foreground">Thanks for getting in touch. I&apos;ll reply to you by email.</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>Send another message</Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        rules={rules.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input autoComplete="name" placeholder="Your name" className={fieldStyles} {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" autoComplete="email" placeholder="you@example.com" className={fieldStyles} {...field} />
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
                                <Input placeholder="What's it about?" className={fieldStyles} {...field} />
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
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={6}
                                    placeholder="Tell me a little about your project or question"
                                    className={`${fieldStyles} h-auto min-h-[150px] resize-y`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
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
