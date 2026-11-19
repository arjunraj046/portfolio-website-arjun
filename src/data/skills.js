import {
    SiReact,
    SiPython,
    SiDjango,
    SiNginx,
    SiGithubactions,
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

export const skillGroups = {
    languages: {
        label: 'Languages',
        items: [
            { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
            { name: 'Python', Icon: SiPython, color: '#3776AB' },
            { name: 'Core Java', Icon: SiOpenjdk, tone: 'text-slate-900 dark:text-slate-100' }
        ]
    },
    frameworks: {
        label: 'Frameworks & libraries',
        items: [
            { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
            { name: 'Express', Icon: SiExpress, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Django', Icon: SiDjango, tone: 'text-emerald-800 dark:text-emerald-300' },
            { name: 'Django REST Framework' },
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
            { name: 'nginx', Icon: SiNginx, color: '#009639' },
            { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
            { name: 'REST API' },
            { name: 'Socket.IO', Icon: SiSocketdotio, tone: 'text-slate-900 dark:text-slate-100' },
            { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
            { name: 'RabbitMQ', Icon: SiRabbitmq, color: '#FF6600' }
        ]
    }
}
