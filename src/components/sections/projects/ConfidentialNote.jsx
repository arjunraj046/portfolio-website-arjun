import { Lock } from 'lucide-react'

import { confidentialNote } from '@/data/projects'

const ConfidentialNote = ({ className = '' }) => (
    <div className={`grid grid-cols-[auto_1fr] gap-x-5 py-6 md:grid-cols-[3rem_1fr] md:gap-x-8 ${className}`}>
        <Lock size={18} aria-hidden="true" className="mt-1 text-muted-foreground" />
        <div className="max-w-2xl">
            <p className="text-lg font-semibold md:text-xl">{confidentialNote.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{confidentialNote.text}</p>
        </div>
    </div>
)

export default ConfidentialNote
