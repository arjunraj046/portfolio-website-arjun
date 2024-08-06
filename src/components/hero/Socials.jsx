'use client'

import {
  RiTwitterFill,
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstagramFill
} from 'react-icons/ri'

import Link from 'next/link'

const icons = [
  {
    path: 'https://www.linkedin.com/in/arjun046/',
    name: <RiLinkedinFill />
  }, {
    path: 'https://github.com/arjunraj046',
    name: < RiGithubFill />
  }, {
    path: 'https://x.com/arjun046G',
    name: <RiTwitterFill />
  }, {
    path: 'https://www.instagram.com/arjun_aju_/',
    name: <RiInstagramFill />
  }, {
    path: 'https://www.facebook.com/arjunaju046',
    name: <RiFacebookFill />
  },
]

const Socials = ({ containerStyles, iconsStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return <Link href={icon.path} key={index}>
          <div className={`${iconsStyles}`}>{icon.name}</div>
        </Link>
      })}
    </div>
  )
}

export default Socials