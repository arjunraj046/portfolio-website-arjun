import { site } from './site'

const updated = '12 November 2026'

export const privacy = {
    title: 'Privacy Policy',
    updated,
    intro: `This page explains what information ${site.url.replace('https://', '')} collects, why, and what your choices are. It's my personal portfolio, run by me, ${site.name}.`,
    sections: [
        {
            heading: 'What I collect',
            paragraphs: [
                "The only personal information I receive is what you choose to send through the contact form: your name, email address, an optional subject and your message. Your browser sends it to Web3Forms, a form service, which emails it to me.",
                "I use it only to read and reply to your message. I don't add you to a mailing list, sell it or share it with anyone else. It stays in my email inbox until it's no longer needed, and you can ask me to delete it at any time.",
                "The site also has a chat assistant, built on Mozhi AI, my own project. It's a small button in the corner of every page. If you open it and type a message, that message is sent to the Mozhi AI server so it can answer, and the conversation is kept there so you can continue it later. Please don't put personal details into the chat; use the contact form or email instead."
            ]
        },
        {
            heading: 'What I don\'t collect',
            list: [
                'No accounts or sign-ups.',
                'No cookies.',
                'No analytics, tracking pixels or advertising.'
            ]
        },
        {
            heading: 'What is saved on your device',
            paragraphs: [
                'A few small items are saved in your own browser (local storage) so the site works the way you left it:'
            ],
            list: [
                'theme: whether you chose light or dark mode. It never leaves your device.',
                'A random visitor ID and a conversation ID for the chat assistant, so it can show you your earlier messages. They are sent to the Mozhi AI server only when you use the chat.'
            ],
            after: 'You can remove it at any time by clearing this site\'s data in your browser settings.'
        },
        {
            heading: 'Services your browser connects to',
            paragraphs: [
                'Like any website, these services receive standard technical information such as your IP address when your browser connects to them. Their own privacy policies apply:'
            ],
            list: [
                'Vercel hosts this website and keeps standard server logs.',
                'Web3Forms receives your message, only when you submit the contact form.',
                'Radio Browser provides the list of radio stations when you open the radio, and the station you play streams from that broadcaster\'s own server. Nothing plays unless you press play.',
                'Mozhi AI (mozhiai.duckdns.org) loads the chat assistant on every page and receives your messages only when you use it.',
                'Google Drive serves my CV when you download it.',
                'LinkedIn, GitHub and WhatsApp open only when you click their links.'
            ]
        },
        {
            heading: 'Your choices',
            paragraphs: [
                `You can ask me what information I hold from you, or ask me to correct or delete it, by emailing ${site.email}. I'll reply as soon as I can.`
            ]
        },
        {
            heading: 'Children',
            paragraphs: ['This site is meant for adults, such as recruiters and clients, and isn\'t directed at children.']
        },
        {
            heading: 'Changes to this policy',
            paragraphs: ['If anything here changes, I\'ll update this page and the date at the top.']
        },
        {
            heading: 'Contact',
            paragraphs: [`Questions about this policy? Email me at ${site.email}.`]
        }
    ]
}

export const terms = {
    title: 'Terms and Conditions',
    updated,
    intro: `These terms apply when you use ${site.url.replace('https://', '')}, the personal portfolio of ${site.name}. By using the site, you agree to them.`,
    sections: [
        {
            heading: 'About this site',
            paragraphs: ['This site describes my work, skills and projects. It\'s provided for information only and doesn\'t sell any products or services.']
        },
        {
            heading: 'Ownership of content',
            paragraphs: [
                `The text, design and code of this site belong to ${site.name}.`,
                'Project names, screenshots, company names and technology logos belong to their respective owners. Minbar and Kutubi were built at Avaibe and are shown only to describe my role in them.'
            ]
        },
        {
            heading: 'Using this site',
            list: [
                'You\'re welcome to view the site and share links to it.',
                'Please don\'t copy its content or design as your own.',
                'Please don\'t use the contact form to send spam, abuse or unlawful content.'
            ]
        },
        {
            heading: 'Accuracy',
            paragraphs: ['I keep the information here accurate and up to date as far as I can, but the site is provided "as is", without any guarantee that it\'s complete or error-free.']
        },
        {
            heading: 'Links and radio',
            paragraphs: [
                'Links to other websites, including my projects\' live sites, lead to services I don\'t control, and their own terms apply.',
                'The radio plays streams from independent broadcasters listed by Radio Browser. I don\'t control or own that content, and stations can change or go offline.'
            ]
        },
        {
            heading: 'Liability',
            paragraphs: ['To the extent the law allows, I\'m not liable for any loss or damage that comes from using this site or the sites it links to.']
        },
        {
            heading: 'Governing law',
            paragraphs: ['These terms are governed by the laws of India.']
        },
        {
            heading: 'Changes to these terms',
            paragraphs: ['If these terms change, I\'ll update this page and the date at the top.']
        },
        {
            heading: 'Contact',
            paragraphs: [`Questions about these terms? Email me at ${site.email}.`]
        }
    ]
}
