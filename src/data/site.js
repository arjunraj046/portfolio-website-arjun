import { Mail, Phone } from 'lucide-react'
import { RiLinkedinFill, RiGithubFill, RiWhatsappFill } from 'react-icons/ri'

export const site = {
    name: 'Arjun Raj',
    initials: 'AR',
    role: 'MERN Full Stack Developer',
    shortRole: 'Full Stack Dev',
    photo: '/images/arjun-photo.webp',
    description:
        'MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. Node.js performance, MongoDB indexing, Redis caching and AWS deployment.',
    heroIntro:
        'I build scalable REST APIs and real-time applications, with a focus on Node.js performance, MongoDB indexing, Redis caching and AWS deployment.',
    email: 'arjunraj004466@gmail.com',
    phone: '+91 8848 7849 10',
    phoneHref: 'tel:+918848784910',
    whatsappHref: `https://wa.me/918848784910?text=${encodeURIComponent("Hi Arjun, I came across your portfolio and would like to connect.")}`,
    url: 'https://portfolio-website-arjun.vercel.app',
    availability: 'Open to full-time roles',
    currentRole: 'Currently at Avaibe',
    location: 'Kochi, India (UTC+5:30)',
    workSetup: 'Remote worldwide, or hybrid in Kochi',
    cvUrl: '/arjun-raj-resume.pdf'
}

export const navLinks = [
    { path: '/', name: 'home' },
    { path: '/projects', name: 'projects' },
    { path: '/contact', name: 'contact' }
]

export const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arjun046/', Icon: RiLinkedinFill },
    { label: 'GitHub', href: 'https://github.com/arjunraj046', Icon: RiGithubFill }
]

export const profileUrl = (label) => socials.find((social) => social.label === label)?.href

export const contactChannels = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, Icon: Mail },
    { label: 'Phone', value: site.phone, href: site.phoneHref, Icon: Phone },
    { label: 'WhatsApp', value: 'Chat with me on WhatsApp', href: site.whatsappHref, Icon: RiWhatsappFill, external: true },
    { label: 'LinkedIn', value: 'in/arjun046', href: profileUrl('LinkedIn'), Icon: RiLinkedinFill, external: true },
    { label: 'GitHub', value: 'arjunraj046', href: profileUrl('GitHub'), Icon: RiGithubFill, external: true }
]
