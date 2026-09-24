// Projects shown on /projects, one full section each. Content comes from the
// owner's own write-ups; add a new project by adding an object here and its
// images under public/projects/<slug>/ (WebP, max ~1600px wide, under ~200 KB)

export const projects = [
    {
        slug: 'minbar',
        title: 'Minbar',
        tagline: 'Full stack learning management platform (LMS)',
        company: 'Avaibe',
        role: 'Full stack',
        status: 'In active development since Aug 2024',
        summary:
            'Minbar is an online learning platform with separate student and admin apps. Students take courses, sit assessments and earn certificates; admins build courses, manage question banks, grade submissions and run the platform. It supports English and Arabic, including full right-to-left layout. I built the backend with NestJS, TypeScript and MongoDB (REST and real-time WebSocket APIs) and worked on the React + TypeScript frontend.',
        stack: [
            { label: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Redux Toolkit', 'React Query', 'Tailwind CSS', 'Radix UI', 'TipTap', 'Socket.IO'] },
            { label: 'Backend', items: ['NestJS 10', 'TypeScript', 'MongoDB / Mongoose', 'Socket.IO', 'JWT + Passport', 'Argon2', 'AWS S3', 'SendGrid / Nodemailer', 'Swagger', 'Docker'] }
        ],
        images: [
            { src: '/projects/minbar/learner-home.webp', width: 1600, height: 792, alt: 'Minbar learner home page with a welcome banner and a "Start your journey by learning" button', caption: 'Learner home' },
            { src: '/projects/minbar/admin-dashboard.webp', width: 1600, height: 786, alt: 'Minbar admin dashboard with member and course totals, a student analysis chart and a top courses table', caption: 'Admin dashboard' },
            { src: '/projects/minbar/my-learnings.webp', width: 1600, height: 791, alt: 'Minbar My Learnings page listing enrolled courses with progress bars, completion percentage and a Continue Course button', caption: 'My learnings and course progress' },
            { src: '/projects/minbar/timed-assessment.webp', width: 1600, height: 693, alt: 'Minbar essay assessment with a countdown timer, question navigator, instructions, auto-save status and a rich-text answer editor', caption: 'Timed essay assessment with auto-save' },
            { src: '/projects/minbar/quiz-review.webp', width: 1600, height: 794, alt: 'Minbar quiz review showing attempt 3 of 3, the course module outline and the results of previous attempts for a question', caption: 'Quiz review across attempts' }
        ],
        highlights: [
            'Built a modular NestJS/MongoDB backend with 30+ feature modules covering courses, assessments, grading, forums and progress tracking.',
            'Designed an assessment engine with 6 question types, 4 grading methods, a question bank and per-student attempt grants.',
            'Added real-time notifications and discussions using Socket.IO gateways.',
            'Secured the API with JWT auth, role-based permissions, Argon2, rate limiting and input sanitization.',
            'Worked on the React 18 + TypeScript frontend: student and admin apps with lazy-loaded routes, React Query, Redux Persist and Arabic/English right-to-left support.',
            'A production app with 2,500+ commits across the team, about 390 of them mine.'
        ],
        features: [
            {
                title: 'Student experience',
                points: [
                    'Browse and search courses, keep a wishlist, and track progress in "My Learnings"',
                    'Work through course modules and chapters with rich content',
                    'Take assessments with MCQ, true/false, fill-in-the-blank, short answer, essay, assignment and project questions',
                    'Review submitted work and grades, and earn certificates',
                    'Real-time course discussion forums and notifications over WebSockets'
                ]
            },
            {
                title: 'Admin and tutor dashboard',
                points: [
                    'Course builder for courses, modules and chapters, with drag-and-drop ordering and a TipTap rich-text editor',
                    'Question-bank management and assessment assignment',
                    'Tutor evaluation: review pending submissions question by question, grade them (percentage, letter, number or rubric) and allow reattempts',
                    'Gradebook, analytics dashboard (Nivo/Recharts), and management of users, roles, categories, feedback and notifications',
                    'Role-based access control with protected admin routes'
                ]
            },
            {
                title: 'Frontend engineering',
                points: [
                    'Lazy-loaded routes, a central Axios API layer, React Query for server data and Redux Persist for the session',
                    'Arabic/English support with i18next and Tailwind RTL',
                    'Accessible UI built from Radix UI primitives, with Framer Motion animations',
                    'Type-safe forms with React Hook Form + Zod',
                    'Direct-to-S3 media uploads and image cropping',
                    'Code quality enforced with ESLint, Prettier and Husky pre-commit hooks'
                ]
            },
            {
                title: 'Assessment engine',
                points: [
                    'Quizzes, assignments, projects and peer reviews',
                    'Question types: multiple choice, true/false, fill-in-the-blank, short answer, essay and assignment',
                    'A reusable question bank',
                    'Grading by percentage, rubric, letter or number',
                    'Attempt grants let instructors give students extra tries',
                    'Word limits enforced on essay and short-answer questions',
                    'Deleted or retired assessments are handled without breaking existing submissions'
                ]
            },
            {
                title: 'Course building',
                points: [
                    'Courses organised into categories, modules and chapters, with video and content chapters',
                    'Difficulty levels and draft/published states',
                    'Media uploads to AWS S3'
                ]
            },
            {
                title: 'Moodle-style forums',
                points: [
                    'Five forum types: standard, single discussion, each-user, Q&A and blog',
                    'Group modes, and settings for who can start a discussion or reply',
                    'Subscription modes (optional, forced, auto), email digests and read tracking',
                    'Moderation, including flagged posts and a reported-content workflow'
                ]
            },
            {
                title: 'Real-time features',
                points: [
                    'Socket.IO gateways for live notifications, course discussions, forums and comments on videos'
                ]
            },
            {
                title: 'Video learning tools',
                points: [
                    'Timestamped comments and personal notes on chapter videos'
                ]
            },
            {
                title: 'Student progress tracking',
                points: [
                    'Progress tracked per chapter and per course',
                    'Submission states and assessment status recorded'
                ]
            },
            {
                title: 'Security and access control',
                points: [
                    'Sign-in with JWT and a local strategy; passwords hashed with Argon2',
                    'Email verification by OTP',
                    'Role-based permissions (manage users, courses, gradebook, question bank, tutor evaluation and more)',
                    'Helmet, rate limiting, protection against MongoDB injection, and request validation with DTOs'
                ]
            },
            {
                title: 'Admin and operations',
                points: [
                    'Admin dashboard with analytics',
                    'Scheduled jobs using cron',
                    'Activity logging and email notifications',
                    'Swagger API docs, Docker deployment and database seeding'
                ]
            }
        ]
    }
]
