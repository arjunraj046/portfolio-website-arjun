import { site, socials } from '@/data/site'
import { skillGroups } from '@/data/skills'
import { education, certifications } from '@/data/about'
import { roles } from '@/data/experience'
import { projects } from '@/data/projects'

const profile = (label) => socials.find((social) => social.label === label)?.href

const personId = `${site.url}/#person`

export const person = () => ({
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.photo}`,
    email: `mailto:${site.email}`,
    telephone: site.phone.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    sameAs: [profile('LinkedIn'), profile('GitHub')].filter(Boolean),
    worksFor: roles.filter((role) => role.current).map((role) => ({ '@type': 'Organization', name: role.company })),
    alumniOf: [...new Set(education.map((item) => item.place.split(' · ')[0]))].map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    hasCredential: certifications.map((item) => ({ '@type': 'EducationalOccupationalCredential', name: item.title })),
    knowsAbout: Object.values(skillGroups).flatMap((group) => group.items.map((item) => item.name))
})

export const homeGraph = () => ({
    '@context': 'https://schema.org',
    '@graph': [
        { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: `${site.name} | ${site.role}`, inLanguage: 'en', publisher: { '@id': personId } },
        { '@type': 'ProfilePage', url: site.url, name: `${site.name} | ${site.role}`, mainEntity: { '@id': personId } },
        person()
    ]
})

export const projectsGraph = () => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${site.url}/projects`,
    name: `Projects | ${site.name}`,
    author: { '@id': personId },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((project, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'CreativeWork',
                name: project.title,
                headline: project.tagline,
                description: project.summary,
                url: `${site.url}/projects#${project.slug}`,
                sameAs: project.liveUrl,
                image: project.images[0] ? `${site.url}${project.images[0].src}` : undefined,
                keywords: (project.stack ?? []).flatMap((group) => group.items).join(', ') || undefined,
                creator: { '@id': personId }
            }
        }))
    }
})

export const contactGraph = () => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${site.url}/contact`,
    name: `Contact | ${site.name}`,
    mainEntity: person()
})

export const JsonLd = ({ data }) => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
)
