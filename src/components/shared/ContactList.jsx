const ContactList = ({ channels, className = '' }) => (
    <ul className={`border-b border-border ${className}`}>
        {channels.map(({ label, value, href, Icon, external }) => (
            <li key={label} className="border-t border-border">
                <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex items-center gap-4 rounded-md py-4 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <Icon size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <span className="font-mono text-xs uppercase tracking-[2px] text-muted-foreground">{label}</span>
                        <span className="break-all font-medium">{value}</span>
                    </span>
                </a>
            </li>
        ))}
    </ul>
)

export default ContactList
