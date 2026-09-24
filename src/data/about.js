import { Blocks, Briefcase, CalendarClock, Cloud, Database, Gauge, GraduationCap, KeyRound, Layers, Server, ShieldCheck, Zap } from 'lucide-react'

// everything here comes from the owner's resume; don't add facts it doesn't state

export const aboutSummary = [
    "I'm Arjun Raj, a MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. I'm strong in Node.js performance optimisation, MongoDB indexing, Redis caching and AWS deployment, and I've designed production backend systems, authentication flows and high-traffic chat modules with Socket.IO.",
    'I care about clean, scalable architecture and code quality: consistent error handling, validation layers and defensive programming. On the frontend I build modular React components, use code-splitting and lazy loading for faster first loads, and use RTK Query to cut redundant network requests.'
]

export const aboutStats = [
    { value: '3+', label: 'Years building for the web', Icon: CalendarClock },
    { value: '3', label: 'Companies, plus freelance work', Icon: Briefcase },
    { value: '2', label: 'Security certifications: CEH and CPT', Icon: ShieldCheck }
]

// each with its own icon, shown in a small tile
export const strengths = [
    { label: 'Scalable REST APIs', Icon: Server },
    { label: 'Real-time apps with Socket.IO', Icon: Zap },
    { label: 'Node.js performance optimisation', Icon: Gauge },
    { label: 'MongoDB indexing and query efficiency', Icon: Database },
    { label: 'Redis caching', Icon: Layers },
    { label: 'AWS deployment (EC2, S3, Route 53)', Icon: Cloud },
    { label: 'Authentication flows', Icon: KeyRound },
    { label: 'Clean, scalable architecture', Icon: Blocks }
]

export const education = [
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
    }
]

export const certifications = [
    {
        Icon: ShieldCheck,
        title: 'CEH — Certified Ethical Hacker',
        place: 'Red Team Hacker Academy',
        period: '2021'
    },
    {
        Icon: ShieldCheck,
        title: 'CPT — Certified Penetration Tester',
        place: 'Red Team Hacker Academy',
        period: '2021'
    }
]

// the 6-month cybersecurity programme both certifications came from
export const training = 'Cybersecurity programme · 6 months'
