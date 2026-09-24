import { socials } from '@/data/site'

const Socials = ({ containerStyles = '', iconsStyles = '' }) => {
  return (
    <div className={containerStyles}>
      {socials.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconsStyles}>
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default Socials
