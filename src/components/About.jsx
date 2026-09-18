'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import Tilt3D from './ui/tilt3d'
import {
    SiReact,
    SiRedux,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiHtml5,
    SiNodedotjs,
    SiExpress,
    SiSocketdotio,
    SiOpenjdk,
    SiJest,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiFirebase,
    SiAmazonaws,
    SiDocker,
    SiGit,
    SiPostman
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const paragraph = `I'm Arjun Raj, a MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. I work across Node.js, Express, React and TypeScript — tuning Node.js performance, designing MongoDB indexing strategies, caching with Redis and deploying on AWS. I've shipped production backend systems, authentication flows and high-traffic chat modules on Socket.IO, and I care about clean architecture, honest validation layers and code that stays maintainable long after it ships.`

const stack = {
    frontend: {
        label: 'Frontend',
        items: [
            { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
            { name: 'Redux Toolkit', Icon: SiRedux, color: '#764ABC' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
            { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
            { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
            { name: 'HTML / CSS', Icon: SiHtml5, color: '#E34F26' }
        ]
    },
    backend: {
        label: 'Backend',
        items: [
            { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
            { name: 'Express', Icon: SiExpress, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Socket.IO', Icon: SiSocketdotio, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Core Java', Icon: SiOpenjdk, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Jest', Icon: SiJest, color: '#C21325' }
        ]
    },
    data: {
        label: 'Data',
        items: [
            { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' }
        ]
    },
    cloud: {
        label: 'Cloud',
        items: [
            { name: 'AWS EC2 / S3 / Route 53', Icon: SiAmazonaws, color: '#FF9900' },
            { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
            { name: 'Git', Icon: SiGit, color: '#F05033' },
            { name: 'Postman', Icon: SiPostman, color: '#FF6C37' }
        ]
    }
}

const stats = [
    { value: 3, suffix: '+', label: 'Years building for the web' },
    { value: 4, suffix: '', label: 'Teams shipped with, plus freelance' },
    { value: 2, suffix: '', label: 'Security certifications: CEH and CPT' }
]

const About = () => {
    const root = useRef(null)
    const spotlight = useRef(null)
    const [tab, setTab] = useState('frontend')

    // scroll-scrubbed word reveal + stat counters + spotlight
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: reduce)', () => {
                gsap.set('[data-word]', { opacity: 1 })
                gsap.utils.toArray('[data-counter]').forEach((el) => {
                    el.textContent = el.dataset.counter
                })
            })

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // each word lights up as the section scrolls past
                gsap.fromTo('[data-word]',
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.4,
                        scrollTrigger: {
                            trigger: '[data-paragraph]',
                            start: 'top 78%',
                            end: 'bottom 55%',
                            scrub: 0.6
                        }
                    }
                )

                gsap.from('[data-about-reveal]', {
                    y: 32,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: root.current, start: 'top 70%' }
                })

                // counters tick up the first time the tiles come into view
                gsap.utils.toArray('[data-counter]').forEach((el) => {
                    const target = Number(el.dataset.counter)
                    const obj = { n: 0 }
                    gsap.to(obj, {
                        n: target,
                        duration: 1.6,
                        ease: 'power2.out',
                        snap: { n: 1 },
                        onUpdate: () => { el.textContent = Math.round(obj.n) },
                        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                    })
                })

                // soft spotlight trailing the cursor across the section
                const glow = spotlight.current
                const xTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3.out' })
                const yTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3.out' })

                const onMove = (e) => {
                    const rect = root.current.getBoundingClientRect()
                    xTo(e.clientX - rect.left)
                    yTo(e.clientY - rect.top)
                }
                const onEnter = () => gsap.to(glow, { opacity: 1, duration: 0.4 })
                const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.5 })

                const el = root.current
                el.addEventListener('pointermove', onMove)
                el.addEventListener('pointerenter', onEnter)
                el.addEventListener('pointerleave', onLeave)

                return () => {
                    el.removeEventListener('pointermove', onMove)
                    el.removeEventListener('pointerenter', onEnter)
                    el.removeEventListener('pointerleave', onLeave)
                }
            })

            return () => mm.revert()
        }, root)

        return () => ctx.revert()
    }, [])

    // re-stagger the chips whenever a different category is picked
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const chips = gsap.utils.toArray(`[data-chips="${tab}"] [data-chip]`)
        if (!chips.length) return
        gsap.fromTo(chips,
            { y: 14, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.05, overwrite: true }
        )
    }, [tab])

    return (
        <section
            ref={root}
            id="about"
            className="relative overflow-hidden py-20 xl:py-28 bg-background"
        >
            {/* cursor spotlight */}
            <div
                ref={spotlight}
                aria-hidden="true"
                className="pointer-events-none absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full opacity-0 blur-[100px] bg-primary/20 dark:bg-primary/10"
            />

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-12 xl:gap-20 items-start">
                    {/* narrative */}
                    <div>
                        <div data-about-reveal className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
                            About me
                        </div>
                        <h2 data-about-reveal className="text-4xl xl:text-5xl font-bold tracking-[-1px] mb-8">
                            Ideas, shipped as software that holds up.
                        </h2>

                        <p data-paragraph className="text-lg xl:text-xl leading-relaxed font-light text-foreground">
                            {paragraph.split(' ').map((word, i) => (
                                <span key={i} data-word className="inline-block mr-[0.28em]">
                                    {word}
                                </span>
                            ))}
                        </p>

                        {/* stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                            {stats.map(({ value, suffix, label }) => (
                                <div key={label} data-about-reveal>
                                    <Tilt3D className="h-full rounded-lg border bg-card p-5 transition-colors hover:border-primary/40">
                                        <div className="text-4xl font-bold text-primary tabular-nums">
                                            <span data-counter={value}>0</span>{suffix}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-2 leading-snug">{label}</div>
                                    </Tilt3D>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* interactive stack */}
                    <div data-about-reveal className="rounded-lg border bg-card p-6 xl:p-8 w-full">
                        <h3 className="text-xl font-semibold mb-1">What I build with</h3>
                        <p className="text-sm text-muted-foreground mb-6">Pick a layer to see the tools.</p>

                        <Tabs value={tab} onValueChange={setTab}>
                            <TabsList className="grid w-full grid-cols-4 h-auto">
                                {Object.entries(stack).map(([key, { label }]) => (
                                    <TabsTrigger key={key} value={key} className="text-xs sm:text-sm py-2">
                                        {label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {Object.entries(stack).map(([key, { items }]) => (
                                <TabsContent key={key} value={key} className="mt-6 focus-visible:outline-none">
                                    <div data-chips={key} className="flex flex-wrap gap-2.5">
                                        {items.map(({ name, Icon, color, tone }) => (
                                            <span
                                                key={name}
                                                data-chip
                                                className="group inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-2 text-sm
                                                           transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md cursor-default"
                                            >
                                                <Icon
                                                    size={16}
                                                    style={color ? { color } : undefined}
                                                    className={`transition-transform duration-200 group-hover:scale-110 ${tone || ''}`}
                                                />
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
