'use client'

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { GraduationCap, ShieldCheck } from 'lucide-react'

import RoleCard from './experience/RoleCard'

const roles = [
    {
        title: 'Full Stack Developer',
        company: 'Avaibe',
        period: 'Aug 2024 — Present',
        type: 'Full-time',
        current: true,
        stack: ['Node.js', 'Express', 'React.js', 'TypeScript', 'AWS'],
        highlights: [
            'Built scalable web applications with Node.js, Express, React and TypeScript',
            'Deployed and managed infrastructure on AWS EC2, S3 and Route 53',
            'Optimized database interactions — indexing strategies and fewer redundant reads and writes',
            'Introduced code-splitting and lazy loading to improve initial load time',
            'Designed RTK Query consumption patterns to cut duplicate network requests'
        ]
    },
    {
        title: 'Associate Full Stack Developer',
        company: 'Cygnotechlabs',
        period: 'Nov 2023 — Apr 2024',
        type: 'Full-time',
        stack: ['Node.js', 'Express', 'React.js', 'MongoDB', 'PostgreSQL'],
        highlights: [
            'Built scalable web applications with Node.js, Express, React and TypeScript',
            'Managed MongoDB and PostgreSQL databases for efficient data storage',
            'Handled deployment and infrastructure across AWS S3, Route 53 and EC2',
            'Contributed to clean, scalable application architecture'
        ]
    },
    {
        title: 'React and Java Developer',
        company: 'Inmakes Infotech Pvt Ltd',
        period: 'Jan 2023 — Jun 2023',
        type: 'Full-time',
        stack: ['React.js', 'Tailwind CSS', 'Core Java'],
        highlights: [
            'Developed dynamic, responsive web applications with React.js and Tailwind CSS',
            'Supported the team on core Java tasks across backend development activities'
        ]
    },
    {
        title: 'Freelance Developer',
        company: 'Independent',
        period: 'Ongoing',
        type: 'Freelance',
        stack: ['React.js', 'Tailwind CSS'],
        highlights: [
            'Built dynamic, responsive web applications with React.js and Tailwind CSS',
            'Delivered consistent experiences across multiple devices and platforms'
        ]
    },
    {
        title: 'MERN Full Stack Developer',
        company: 'Brototype',
        period: '2022 — 1 year',
        type: 'Internship',
        stack: ['MongoDB', 'Express', 'React.js', 'Node.js'],
        highlights: [
            'Developed and deployed personal projects across the full MERN stack',
            'Focused on scalability and optimization techniques throughout'
        ]
    }
]

const filters = ['All', 'Full-time', 'Freelance', 'Internship']

const education = [
    {
        Icon: GraduationCap,
        title: 'Master of Computer Applications — AI & ML',
        place: 'Amity University Online',
        period: 'Jan 2023 — Mar 2025'
    },
    {
        Icon: GraduationCap,
        title: 'B.Com — Computer Application',
        place: "Mahatma Gandhi University · St Mary's College, Thuruthiply",
        period: 'Mar 2017 — Mar 2020'
    },
    {
        Icon: ShieldCheck,
        title: 'CEH — Certified Ethical Hacker · CPT — Certified Penetration Tester',
        place: 'Red Team Hacker Academy',
        period: 'Cybersecurity'
    }
]

const Experience = () => {
    const reduce = useReducedMotion()
    const [filter, setFilter] = useState('All')

    const visible = filter === 'All' ? roles : roles.filter((r) => r.type === filter)

    // reduced motion keeps the choreography but drops the movement
    const headingWord = reduce
        ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
        : {
            hidden: { opacity: 0, rotateX: -90, y: 14 },
            show: { opacity: 1, rotateX: 0, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } }
        }

    const card = reduce
        ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            hidden: { opacity: 0, y: 44, rotateX: -20 },
            show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 110, damping: 18 } },
            exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } }
        }

    return (
        <section id="experience" className="relative py-20 xl:py-28 bg-background overflow-hidden">
            <div className="container mx-auto">
                {/* heading — each word flips up on its own axis */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ staggerChildren: 0.07 }}
                    className="mb-10"
                >
                    <motion.div
                        variants={headingWord}
                        className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]"
                    >
                        Experience
                    </motion.div>

                    <h2 className="text-4xl xl:text-5xl font-bold tracking-[-1px]" style={{ perspective: 800 }}>
                        {'Where I have shipped.'.split(' ').map((word) => (
                            <motion.span
                                key={word}
                                variants={headingWord}
                                className="inline-block mr-[0.25em]"
                                style={{ transformOrigin: 'bottom center' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>

                {/* filters — the active pill slides between options via layoutId */}
                <LayoutGroup>
                    <div role="group" aria-label="Filter roles by type" className="flex flex-wrap gap-2 mb-10">
                        {filters.map((name) => {
                            const active = filter === name
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setFilter(name)}
                                    className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors
                                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                                                ${active ? 'text-background' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="experience-filter-pill"
                                            className="absolute inset-0 rounded-full bg-primary"
                                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{name}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* roles — cards flip in on scroll, and reshuffle when filtered */}
                    <motion.div
                        layout
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ staggerChildren: 0.08 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        style={{ perspective: 1400 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {visible.map((role) => (
                                <RoleCard key={role.company + role.title} role={role} variants={card} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>

                {/* education and certifications */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t"
                >
                    {education.map(({ Icon, title, place, period }) => (
                        <motion.div key={title} variants={card} className="flex gap-4">
                            <Icon size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold leading-snug mb-1">{title}</h3>
                                <p className="text-sm text-muted-foreground">{place}</p>
                                <p className="text-sm text-muted-foreground mt-1">{period}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Experience
