export const projects = [
    {
        slug: 'minbar',
        title: 'Minbar',
        tagline: 'Full stack learning management platform (LMS)',
        company: 'Avaibe',
        role: 'Full stack',
        status: 'In active development',
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
    },
    {
        slug: 'kutubi',
        title: 'Kutubi',
        tagline: "Microservices backend and admin dashboard for a children's reading and learning app",
        company: 'Avaibe',
        role: 'Backend + admin web app',
        status: 'In production',
        summary:
            'Kutubi is an educational, digital reading platform for children, with a mobile app for readers and a web admin platform. I built the scalable backend: a microservices architecture with independent services for users, administration, books, schools, communication channels, notifications, activity tracking, translation and book-content processing. I also built the React admin dashboard, where admins manage books, schools, students, teachers, parents, quizzes, rewards and short-video content, and track engagement on analytics dashboards.',
        stack: [
            { label: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'OrientDB', 'Redis', 'RabbitMQ', 'Kafka', 'Socket.IO', 'FFmpeg'] },
            { label: 'Frontend', items: ['React 18', 'Vite', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form + Zod', 'Recharts', 'AWS Amplify'] }
        ],
        images: [
            { src: '/projects/kutubi/admin-dashboard.webp', width: 1600, height: 785, alt: 'Kutubi admin dashboard with totals for students, teachers, parents and schools, an engagement overview, a platform distribution donut chart and an active users overview', caption: 'Admin dashboard and engagement analytics' },
            { src: '/projects/kutubi/school-management.webp', width: 1600, height: 789, alt: 'Kutubi school management page for one school, with enrolment counts, tabs for members, grades, classes and classrooms, and a filterable members table', caption: 'School management with members, grades and classes' }
        ],
        highlights: [
            'Designed and maintained a modular microservices backend.',
            'Developed APIs for users, books, schools, administration, notifications and activity tracking.',
            'Implemented authentication, authorization, validation, rate limiting and security middleware.',
            'Built asynchronous workflows using Redis, RabbitMQ, Kafka, SNS, SQS and EventBridge.',
            'Added media processing capabilities using FFmpeg and AWS services.',
            'Built the React admin dashboard, including an in-browser book editor with read-along audio sync.'
        ],
        features: [
            {
                title: 'Microservices backend',
                points: [
                    'Independent services for user management, administration, books, schools, communication channels, notifications, user activity tracking, translation and book-content processing',
                    'Secure REST APIs with authentication and role-based access',
                    'File and media management, notifications and real-time communication with Socket.IO',
                    'Redis for caching and queues; MongoDB and OrientDB for data storage'
                ]
            },
            {
                title: 'Event-driven and background processing',
                points: [
                    'Event-driven communication between services with RabbitMQ and Kafka',
                    'Asynchronous workflows using Redis, RabbitMQ, Kafka, SNS, SQS and EventBridge',
                    'Background processing for book and video-related tasks',
                    'Media processing with FFmpeg and AWS services such as Rekognition and Transcribe'
                ]
            },
            {
                title: 'Security',
                points: [
                    'Authentication, authorization and role-based access',
                    'Validation, rate limiting and security middleware'
                ]
            },
            {
                title: 'Book editor with read-along audio sync',
                points: [
                    'An in-browser editor that shows an EPUB next to an audio waveform (WaveSurfer.js with regions and timeline plugins)',
                    'Editors create, drag and resize audio regions to line narration up with the text',
                    'Timing data is saved straight to cloud storage through signed URLs'
                ]
            },
            {
                title: 'Book publishing pipeline',
                points: [
                    'A multi-step book creation form with EPUB and ZIP uploads',
                    'Thumbnail upload with in-browser image cropping and compression',
                    'Categories with drag-and-drop ordering (dnd-kit)'
                ]
            },
            {
                title: 'Reading missions and quizzes',
                points: [
                    'Missions attached to each book, such as multiple-choice quizzes and word-hunt games, plus learning resources',
                    'A live preview before publishing'
                ]
            },
            {
                title: 'School management',
                points: [
                    'A nested hierarchy of schools, grades, classes and students',
                    'Bulk CSV uploads for students and schools, and guardian linking',
                    'Homework tracking and a classroom chat moderation view'
                ]
            },
            {
                title: 'Users and gamification',
                points: [
                    'Separate modules for admins, teachers, parents and students, each with a detail page, activity data, time-spent tracking and rewards',
                    'Badges, rewards and leaderboards to keep young readers motivated'
                ]
            },
            {
                title: 'Short-video (Reels) content',
                points: [
                    'Management for reels, background music, filters and prompt questions'
                ]
            },
            {
                title: 'Analytics dashboards',
                points: [
                    'Daily active users, engagement, user distribution, revenue and school analytics',
                    'Channel insights such as subscriber growth and trending videos, built with Recharts'
                ]
            },
            {
                title: 'Content, configuration and sign-in',
                points: [
                    'Home-screen sliders with a responsive form for desktop and mobile',
                    'Custom fonts, announcements, user reports and system logs',
                    'Login, registration, email verification and password reset using AWS Amplify and JWT, with protected routes'
                ]
            },
            {
                title: 'Admin frontend engineering',
                points: [
                    'TanStack Query for server state, with a separate query module per feature; Zustand for client state such as auth and breadcrumbs',
                    'React Hook Form with Zod schemas for complex, multi-step and nested forms',
                    'Virtualized large tables and lists (TanStack Virtual, React Virtuoso, react-window), debounced search and images compressed before upload',
                    'A reusable component library on Radix UI, Tailwind CSS and shadcn/ui, with dark mode and a shared TanStack Table data table with sorting, filtering and pagination',
                    'Feature-based folders and React Router v6 with nested routes and error boundaries',
                    'ESLint, Prettier and Husky with lint-staged pre-commit hooks'
                ]
            }
        ]
    },
    {
        slug: 'gameo',
        title: 'Gameo',
        tagline: 'E-commerce web app for games and consoles',
        company: 'Personal project',
        personal: true,
        role: 'Full stack',
        summary:
            'Gameo is an e-commerce web app for games and consoles, with a storefront for customers and an admin panel for running the shop. I built the backend with Node.js and MongoDB, storing product and user data in MongoDB and files in Cloudinary, and the frontend with HTML, CSS and Bootstrap. It takes payments through Razorpay, verifies users by OTP and messages through Twilio, and gives admins Chart.js dashboards.',
        stack: [
            { label: 'Backend', items: ['Node.js', 'MongoDB', 'bcrypt.js', 'Cloudinary', 'Razorpay', 'Twilio'] },
            { label: 'Frontend', items: ['HTML', 'CSS', 'Bootstrap', 'Chart.js'] }
        ],
        images: [
            { src: '/projects/gameo/store-home.webp', width: 1600, height: 789, alt: 'Gameo storefront showing a New Games section with a search bar and product cards for an Xbox, a Spider-Man game with category and product offers, and a PS5 controller', caption: 'Storefront with search and offers' },
            { src: '/projects/gameo/product-page.webp', width: 1600, height: 790, alt: 'Gameo product page for a Spider-Man game with its price, offers, category, stock level, description and Add to cart and wishlist buttons', caption: 'Product page' },
            { src: '/projects/gameo/checkout-razorpay.webp', width: 1600, height: 785, alt: 'Gameo checkout with cash on delivery, online and wallet payment options, and the Razorpay payment window open in test mode', caption: 'Checkout with Razorpay (test mode)' },
            { src: '/projects/gameo/admin-dashboard.webp', width: 1600, height: 785, alt: 'Gameo admin dashboard with totals for orders, revenue and customers, an order report bar chart and a payment method donut chart', caption: 'Admin dashboard built with Chart.js' }
        ],
        highlights: [
            'Built the backend with Node.js and the frontend with HTML, CSS and Bootstrap.',
            'Stored product and user data in MongoDB, and files in Cloudinary.',
            'Encrypted passwords with bcrypt.js.',
            'Integrated Razorpay for online payments.',
            'Implemented message and OTP verification through Twilio.',
            'Built admin dashboards with Chart.js.'
        ],
        features: [
            {
                title: 'Storefront',
                points: [
                    'Product listing with search',
                    'Product pages with price, stock, category and description',
                    'Category offers and product offers shown on each product',
                    'Cart and wishlist'
                ]
            },
            {
                title: 'Checkout and payments',
                points: [
                    'Cash on delivery, online payment and wallet payment',
                    'Online payments through Razorpay',
                    'Coupon codes redeemed at checkout'
                ]
            },
            {
                title: 'Accounts and security',
                points: [
                    'Passwords encrypted with bcrypt.js',
                    'Message and OTP verification through Twilio'
                ]
            },
            {
                title: 'Admin panel',
                points: [
                    'Dashboard with order, revenue and customer totals, an order report and a payment method chart (Chart.js)',
                    'Management of users, products, categories, orders and banners',
                    'Category offers, product offers and coupons',
                    'Sales report'
                ]
            }
        ]
    }
]
