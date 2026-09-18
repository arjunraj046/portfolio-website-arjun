'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TechCube from './expertise/TechCube'
import FlipCard from './expertise/FlipCard'

import { SiReact, SiNodedotjs, SiAmazonaws } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        Icon: SiReact,
        color: '#61DAFB',
        title: 'Frontend Engineering',
        blurb: 'Modular React that stays maintainable as the product grows.',
        points: [
            'Clean, modular, scalable React components',
            'RTK Query for efficient API consumption',
            'Code-splitting and lazy loading for faster first loads',
            'Styling with Tailwind CSS'
        ]
    },
    {
        Icon: SiNodedotjs,
        color: '#5FA04E',
        title: 'Backend & Real-time',
        blurb: 'Scalable REST services, auth flows and high-traffic sockets.',
        points: [
            'Scalable REST APIs on Node.js and Express',
            'High-traffic chat modules over Socket.IO',
            'Authentication flows and validation layers',
            'Node.js performance optimization'
        ]
    },
    {
        Icon: SiAmazonaws,
        color: '#FF9900',
        title: 'Data & Cloud',
        blurb: 'Query efficiency at the bottom, AWS infrastructure on top.',
        points: [
            'MongoDB indexing and query optimization',
            'Redis caching for hot read paths',
            'AWS EC2, S3 and Route 53 deployments',
            'Docker images and clean architecture'
        ]
    }
]

const Expertise = () => {
    const root = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: reduce)', () => {
                gsap.set('[data-xp-reveal], [data-xp-card]', { opacity: 1, y: 0, rotationX: 0 })
            })

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('[data-xp-reveal]', {
                    y: 34,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: { trigger: root.current, start: 'top 72%' }
                })

                // cards swing up out of the page plane as they come into view
                gsap.from('[data-xp-card]', {
                    y: 60,
                    opacity: 0,
                    rotationX: -35,
                    transformOrigin: '50% 100%',
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: { trigger: '[data-xp-cards]', start: 'top 82%' }
                })
            })

            return () => mm.revert()
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={root}
            id="expertise"
            className="relative overflow-hidden py-20 xl:py-28 bg-slate-100 dark:bg-slate-950"
        >
            <div className="container mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20 items-center mb-16">
                    <div>
                        <div data-xp-reveal className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
                            Expertise
                        </div>
                        <h2 data-xp-reveal className="text-4xl xl:text-5xl font-bold tracking-[-1px] mb-6">
                            The full stack, end to end.
                        </h2>
                        <p data-xp-reveal className="subtitle max-w-[520px] !mb-0">
                            Three years across the MERN stack, from React components through to EC2 —
                            give the cube a spin, and flip a card to see what each layer involves.
                        </p>
                    </div>

                    <div data-xp-reveal>
                        <TechCube />
                    </div>
                </div>

                <div data-xp-cards className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
                    {cards.map((card) => (
                        <div key={card.title} data-xp-card className="will-change-transform">
                            <FlipCard {...card} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Expertise
