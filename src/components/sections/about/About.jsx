'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Check } from 'lucide-react'

import Tilt3D from '@/components/shared/Tilt3D'
import { skillGroups } from '@/data/skills'
import { aboutSummary, aboutStats, strengths, education, certifications, training } from '@/data/about'

const iconTile = 'flex shrink-0 items-center justify-center rounded-lg border border-white/70 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10'

const CardTitle = ({ children, note }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold">{children}</h3>
        {note && <p className="text-sm text-muted-foreground mt-1">{note}</p>}
    </div>
)

// Education and Certifications share this layout
const Timeline = ({ title, note, items }) => (
    <div data-about-reveal className="glass-card h-full p-6 xl:p-8">
        <CardTitle note={note}>{title}</CardTitle>
        <ul className="space-y-5">
            {items.map(({ Icon, title: itemTitle, place, period }) => (
                <li key={itemTitle} className="flex gap-4">
                    <span className={`${iconTile} h-11 w-11`}>
                        <Icon size={20} aria-hidden="true" className="text-primary" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <p className="font-semibold leading-snug">{itemTitle}</p>
                            <p className="text-sm tabular-nums text-muted-foreground">{period}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{place}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

const About = () => {
    const root = useRef(null)

    // hidden until the section is near the viewport, then a quick 0.3s reveal.
    // The browser's IntersectionObserver keeps GSAP's ScrollTrigger out of the bundle
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const reveal = gsap.from('[data-about-reveal]', {
                    y: 16,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                    stagger: 0.03,
                    paused: true
                })
                const observer = new IntersectionObserver(([entry]) => {
                    if (!entry.isIntersecting) return
                    reveal.play()
                    observer.disconnect()
                }, { rootMargin: '0px 0px -15% 0px' })
                observer.observe(root.current)

                return () => observer.disconnect()
            })

            return () => mm.revert()
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={root} id="about" aria-labelledby="about-heading" className="relative overflow-x-clip py-20 xl:py-28">
            {/* colour behind the glass, kept inside the section so it never meets an edge */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-40 bottom-40 -z-10">
                <div className="absolute left-[5%] top-[10%] h-80 w-80 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
                <div className="absolute right-[5%] top-[40%] h-96 w-96 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15" />
                <div className="absolute left-[30%] bottom-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* intro */}
                    <div data-about-reveal className="glass-card p-8 xl:p-10 lg:col-span-8">
                        <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">About me</p>
                        <h2 id="about-heading" className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-[-1px] mb-6">
                            Ideas, shipped as software that holds up.
                        </h2>
                        <div className="space-y-4">
                            {aboutSummary.map((paragraph) => (
                                <p key={paragraph} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* stats, stacked to the intro's height */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
                        {aboutStats.map(({ value, label, Icon }) => (
                            <div key={label} data-about-reveal className="h-full">
                                <Tilt3D className="glass-card flex h-full items-center gap-5 p-6">
                                    <span className={`${iconTile} h-12 w-12`}>
                                        <Icon size={22} aria-hidden="true" className="text-primary" />
                                    </span>
                                    <div>
                                        <div className="text-3xl font-bold leading-none tabular-nums">{value}</div>
                                        <div className="text-sm text-muted-foreground mt-1.5 leading-snug">{label}</div>
                                    </div>
                                </Tilt3D>
                            </div>
                        ))}
                    </div>

                    {/* strengths */}
                    <div data-about-reveal className="glass-card p-6 xl:p-8 lg:col-span-4">
                        <CardTitle>Core strengths</CardTitle>
                        <ul className="space-y-3.5">
                            {strengths.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                        <Check size={13} strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    <span className="leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* skills: one row per group, label column aligned */}
                    <div data-about-reveal className="glass-card p-6 xl:p-8 lg:col-span-8">
                        <CardTitle>Skills</CardTitle>
                        <dl className="divide-y divide-foreground/10">
                            {Object.entries(skillGroups).map(([key, { label, items }]) => (
                                <div key={key} className="grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
                                    <dt className="pt-1.5 text-xs uppercase tracking-[2px] font-semibold text-muted-foreground">{label}</dt>
                                    <dd>
                                        <ul className="flex flex-wrap gap-2">
                                            {items.map(({ name, Icon, color, tone }) => (
                                                <li
                                                    key={name}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/60 px-3 py-1.5 text-sm shadow-sm
                                                               transition-colors duration-200 hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-white/[0.14]"
                                                >
                                                    {Icon && (
                                                        <Icon size={15} aria-hidden="true" style={color ? { color } : undefined} className={tone || ''} />
                                                    )}
                                                    {name}
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* education + certifications */}
                    <div className="lg:col-span-6">
                        <Timeline title="Education" items={education} />
                    </div>
                    <div className="lg:col-span-6">
                        <Timeline title="Certifications" note={`Red Team Hacker Academy · ${training}`} items={certifications} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
