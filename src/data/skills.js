import {
    SiReact,
    SiNextdotjs,
    SiNestjs,
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
    SiPostman,
    SiLinux,
    SiRabbitmq
} from 'react-icons/si'

export const aboutText = `I'm Arjun Raj, a MERN stack developer with 3+ years of experience building scalable REST APIs and real-time applications. I work across Node.js, Express, React and TypeScript — tuning Node.js performance, designing MongoDB indexing strategies, caching with Redis and deploying on AWS. I've shipped production backend systems, authentication flows and high-traffic chat modules on Socket.IO, and I care about clean architecture, solid validation layers and code that stays maintainable long after it ships.`

export const skillGroups = {
    languages: {
        label: 'Languages',
        items: [
            { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
            { name: 'Core Java', Icon: SiOpenjdk, tone: 'text-slate-900 dark:text-slate-100' }
        ]
    },
    frameworks: {
        label: 'Frameworks & libraries',
        items: [
            { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
            { name: 'Express', Icon: SiExpress, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'NestJS', Icon: SiNestjs, color: '#E0234E' },
            { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
            { name: 'Next.js', Icon: SiNextdotjs, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Redux Toolkit', Icon: SiRedux, color: '#764ABC' },
            { name: 'Jest (familiar)', Icon: SiJest, color: '#C21325' }
        ]
    },
    databases: {
        label: 'Databases',
        items: [
            { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' }
        ]
    },
    architecture: {
        label: 'Architecture',
        items: [
            { name: 'Clean Architecture' },
            { name: 'MVC Architecture' },
            { name: 'Microservices Architecture' }
        ]
    },
    tools: {
        label: 'Tools & technologies',
        items: [
            { name: 'HTML / CSS', Icon: SiHtml5, color: '#E34F26' },
            { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
            { name: 'Git', Icon: SiGit, color: '#F05033' },
            { name: 'Linux (basic commands)', Icon: SiLinux, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
            { name: 'AWS (EC2, Route 53, S3)', Icon: SiAmazonaws, color: '#FF9900' },
            { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
            { name: 'REST API' },
            { name: 'Socket.IO', Icon: SiSocketdotio, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
            { name: 'RabbitMQ', Icon: SiRabbitmq, color: '#FF6600' }
        ]
    }
}

export const expertiseAreas = [
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
