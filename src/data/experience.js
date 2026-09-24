// titles, companies, types and locations come from the owner's LinkedIn;
// highlights and stacks from their resume, backend first (the owner wants the
// backend work to lead). Which role had REST APIs, auth flows and Socket.IO chat
// was confirmed by the owner. Don't add facts they haven't stated.
// The owner doesn't want dates or durations shown, so there are none here.
// `mark` is the monogram tile shown in place of a logo (decorative colours)

export const roles = [
    {
        title: 'Full Stack Developer',
        company: 'Avaibe',
        employment: 'Full-time',
        location: 'Remote',
        current: true,
        mark: { text: 'AV', className: 'bg-neutral-950 text-violet-400 border-white/10' },
        stack: ['Node.js', 'Express', 'TypeScript', 'Socket.IO', 'AWS', 'React.js', 'RTK Query', 'Tailwind CSS'],
        highlights: [
            'Built scalable REST APIs with Node.js, Express and TypeScript',
            'Designed authentication flows for production backend systems',
            'Built high-traffic real-time chat modules with Socket.IO',
            'Optimised database access with indexing strategies and fewer redundant reads and writes',
            'Raised code quality with consistent error handling, validation layers and defensive programming',
            'Deployed and managed infrastructure on AWS EC2, S3 and Route 53',
            'Introduced code-splitting and lazy loading in React to improve initial load time',
            'Used RTK Query to cut duplicate network requests and keep data consistent'
        ]
    },
    {
        title: 'Full Stack Engineer',
        company: 'Cygnotech Labs',
        employment: 'Full-time',
        location: 'Kochi, Kerala, India',
        mark: { text: 'CL', className: 'bg-gradient-to-br from-emerald-400 to-sky-500 text-white border-white/20' },
        stack: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'React.js'],
        highlights: [
            'Built scalable REST APIs with Node.js, Express and TypeScript',
            'Designed authentication flows',
            'Managed MongoDB and PostgreSQL databases for efficient data storage',
            'Helped design a clean, scalable application architecture',
            'Handled deployment and infrastructure across AWS S3, Route 53 and EC2',
            'Built the front end of these web applications with React.js'
        ]
    },
    {
        title: 'Java Developer',
        company: 'Inmakes Infotech Pvt Ltd',
        employment: 'Internship',
        location: 'Kochi, Kerala, India · Hybrid',
        mark: { text: 'IN', className: 'bg-white text-teal-600 border-neutral-200' },
        stack: ['Core Java', 'React.js', 'Tailwind CSS'],
        highlights: [
            'Supported the team on core Java tasks across backend development',
            'Developed dynamic, responsive web applications with React.js and Tailwind CSS'
        ]
    }
]

// a shorter entry from the resume, shown in one compact card below the roles
export const otherRoles = [
    {
        title: 'MERN Full Stack Developer · Packapeer Academy Private Limited',
        detail: 'Internship. Built and deployed personal MERN projects with a focus on scalability and optimisation'
    }
]
