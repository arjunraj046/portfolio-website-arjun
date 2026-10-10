import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiGit,
    SiRedis,
    SiDocker,
    SiPostgresql
} from 'react-icons/si'

const icons = [
    { Icon: SiReact, color: '#61DAFB', top: '12%', left: '5%', size: 48, float: [8, -22, 10, 3.6, 0], className: '' },
    { Icon: SiDocker, color: '#2496ED', top: '68%', left: '9%', size: 40, float: [-10, -18, -8, 4.2, 0.6], className: '' },
    { Icon: SiTailwindcss, color: '#38BDF8', top: '36%', left: '2%', size: 34, float: [6, -26, 12, 3.1, 1.1], className: 'hidden md:block' },
    { Icon: SiJavascript, color: '#F7DF1E', top: '84%', left: '22%', size: 32, float: [-8, -16, -12, 4.5, 0.3], className: 'hidden md:block' },
    { Icon: SiTypescript, color: '#3178C6', top: '8%', left: '32%', size: 30, float: [10, -20, 8, 3.8, 1.4], className: 'hidden xl:block' },
    { Icon: SiNodedotjs, color: '#5FA04E', top: '18%', right: '6%', size: 44, float: [-6, -24, -10, 3.3, 0.9], className: '' },
    { Icon: SiMongodb, color: '#47A248', top: '74%', right: '10%', size: 38, float: [12, -18, 14, 4.0, 0.2], className: '' },
    { Icon: SiGit, color: '#F05033', top: '46%', right: '3%', size: 32, float: [-12, -22, -14, 2.9, 1.2], className: 'hidden md:block' },
    { Icon: SiRedis, color: '#FF4438', top: '88%', right: '28%', size: 28, float: [8, -14, 10, 4.4, 0.5], className: 'hidden xl:block' },
    { Icon: SiPostgresql, color: '#4169E1', top: '4%', right: '30%', size: 30, float: [-9, -20, -9, 3.5, 1.0], className: 'hidden xl:block' }
]

const FloatingIcons = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
            {icons.map(({ Icon, color, top, left, right, size, float: [x, y, r, d, delay], className }, index) => (
                <div key={index} style={{ top, left, right }} className={`absolute ${className}`}>
                    <div
                        className="icon-float"
                        style={{ '--fx': `${x}px`, '--fy': `${y}px`, '--fr': `${r}deg`, animationDuration: `${d}s`, animationDelay: `-${delay}s` }}
                    >
                        <span style={{ color }} className="block opacity-30 drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] dark:opacity-40">
                            <Icon size={size} />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FloatingIcons
