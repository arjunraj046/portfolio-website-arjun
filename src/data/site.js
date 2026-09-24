import {
    RiLinkedinFill,
    RiGithubFill,
    RiTwitterXFill,
    RiInstagramFill,
    RiFacebookFill
} from 'react-icons/ri'

// who the site is about, used by the hero, footer and page metadata
export const site = {
    name: 'Arjun Raj',
    initials: 'AR',
    role: 'MERN Full Stack Developer',
    shortRole: 'Full Stack Dev',
    description:
        'MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. Node.js performance, MongoDB indexing, Redis caching and AWS deployment.',
    heroIntro:
        'I build scalable REST APIs and real-time applications — Node.js performance, MongoDB indexing, Redis caching and AWS deployment.',
    // shown on the contact page; the owner approved publishing these
    email: 'arjunraj004466@gmail.com',
    phone: '+91 8848 7849 10',
    phoneHref: 'tel:+918848784910',
    cvUrl: 'https://drive.google.com/uc?export=download&id=1DYVvs_Zs12ksDZ5n8SDEegVwHiWlf1rr'
}

export const navLinks = [
    { path: '/', name: 'home' },
    { path: '/projects', name: 'my projects' },
    { path: '/contact', name: 'contact' }
]

export const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arjun046/', Icon: RiLinkedinFill },
    { label: 'GitHub', href: 'https://github.com/arjunraj046', Icon: RiGithubFill },
    { label: 'X (Twitter)', href: 'https://x.com/arjun046G', Icon: RiTwitterXFill },
    { label: 'Instagram', href: 'https://www.instagram.com/arjun_aju_/', Icon: RiInstagramFill },
    { label: 'Facebook', href: 'https://www.facebook.com/arjunaju046', Icon: RiFacebookFill }
]

export const services = [
    'REST API development',
    'Real-time applications',
    'Performance optimisation',
    'AWS deployment'
]
