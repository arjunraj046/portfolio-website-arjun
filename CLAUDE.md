# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quality bar

The owner wants everything built here to be professional, production-standard work: the look and feel of a polished senior developer's portfolio. Every change should meet all of these:

- **Responsive:** works from 360px phones to wide desktops, with no horizontal scroll. Check the `md` and `xl` breakpoints this codebase uses.
- **Light and dark mode:** style both. Use the theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`) rather than hard-coded colours, unless a colour is decorative.
- **Accessible:**
  - Use semantic elements (`header`, `nav`, `main`, `footer`, `h1`–`h3` in order).
  - Give icon-only controls an `aria-label`. Mark decorative elements `aria-hidden`.
  - Keep visible focus states and enough contrast.
  - Open external links with `target="_blank" rel="noopener noreferrer"`.
- **Motion:** keep it subtle and purposeful (roughly 200–700ms, ease-out), and disable it when `prefers-reduced-motion` is set.
- **Consistent:** reuse the existing pieces (`Button` variants, `Nav` `links`, `Socials`, `.glass`) rather than making one-off copies. Match the existing spacing, softly rounded shapes and type scale.
- **Real content only:** no lorem ipsum and no made-up claims, numbers or testimonials. If a fact isn't available (location, availability, project details), ask the owner instead of guessing.
- **Clean code:** no leftover `console.log`, no dead code, and clean up event listeners. Keep everything that runs in the browser inside client components.
- **SEO-friendly:**
  - Every route exports `metadata` (a unique `title` and `description`; add Open Graph tags when there's a share image).
  - Exactly one `<h1>` per page. Descriptive link text and `alt` text.
  - Keep real text as HTML, not baked into images or canvas, so search engines can read it.
  - Prefer server components and static rendering, so content is in the first HTML response.
- **Fast loading, nothing heavy:**
  - Use `next/image` for images, sized to how they're displayed. Prefer SVG, WebP or AVIF, and keep raster images under ~200 KB. Only above-the-fold images get `priority`.
  - Use `next/font` for fonts. Don't add Google Fonts `<link>` tags or large icon fonts.
  - Don't add videos, large Lottie/JSON animations or big libraries without asking. Use CSS, requestAnimationFrame or IntersectionObserver rather than an animation library (see Stack).
  - Import icons one at a time (`import { SiReact } from 'react-icons/si'`), never a whole icon set.
  - Load heavy, below-the-fold or browser-only pieces lazily with `next/dynamic` (as the hero Lottie does). Keep `'use client'` on the smallest component that needs it.
  - After a build, check the "First Load JS" column in the `next build` output. The home page is currently ~101 kB, `/projects` ~102 kB and `/contact` ~112 kB; don't let changes grow them without a good reason.
- **Smooth, no waiting (owner's rule):** every page should flow smoothly. Don't add artificial delays. Page transitions and component entrance animations should finish within about 300ms, and content must show straight away rather than waiting on an animation.
- **Verified:** the build must pass before calling work done (use the `.next-check` build below).

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: production build into `.next`. Building is the only automated check; see below for how to run it safely.
- `npm start`: serve the production build

There is no test framework. `npm run lint` (`next lint`) is wired up, but there is no ESLint config or `eslint` dependency, so it will try to start an interactive setup. Don't rely on it.

**Never run a plain `next build` while the owner's dev server may be running.** Both use `.next`, and the build overwrites the dev server's files, so the running site starts returning 500s for its JS chunks. To check that the code compiles, build into a separate folder instead:

```bash
NEXT_DIST_DIR=.next-check npx next build     # bash
$env:NEXT_DIST_DIR='.next-check'; npx next build   # PowerShell
```

If the dev server does break (500s on `/_next/static/chunks/*`, or "Failed to read source code" after files were moved): stop it, delete `.next`, and run `npm run dev` again.

## Stack

Next.js 14 App Router in plain JavaScript/JSX (no TypeScript), React 18, Tailwind CSS 3 and shadcn/ui (`components.json`: JSX, RSC on, CSS variables). The `@/*` import path maps to `src/*`.

**No animation library runs on the live pages.** framer-motion and GSAP are still installed, but only the unused Expertise section imports them. A speed pass removed them: the home page went from 159 kB to 122 kB First Load JS, and to 101 kB after a second pass (server-rendered sections and hero icons, desktop-only sphere, lazy mobile menu). Keep it that way. Use CSS (keyframes, transitions, tailwindcss-animate), `requestAnimationFrame` and IntersectionObserver instead:
- nav active highlight: CSS `animate-in fade-in` (no framer `layoutId`)
- hero icon drift and sphere "breathe": CSS keyframes in `globals.css` (`.icon-float`, `.animate-hero-breathe`); `FloatingIcons` is a server component (its SVGs are HTML, not JS); only the mouse parallax, a small eased rAF loop, runs in the client wrapper `IconParallax`. Don't import `react-icons/si` in a client component that loads with the page: webpack bundles every `si` icon used anywhere in client code into one shared chunk, so it would pull in all the sphere's icons too (it cost ~20 kB)
- `TechSphere`: its own rAF loop with a 60fps frame ratio
- reveal-on-scroll: `shared/Reveal.jsx`, a small client wrapper whose IntersectionObserver toggles `.reveal-pending` on `[data-reveal]` cards, and only on cards below the fold, so nothing on screen is ever hidden

## Architecture

### Folder structure

```
src/
  app/                    routes only: layout, template, page.jsx per route (+ metadata)
  components/
    layout/               site chrome: Header, Footer, Logo, Nav, MobileNav (+ MobileSheet),
                          ThemeToggler, ScrollProgress, SiteBackground, BackToTop
    sections/<section>/   one folder per page section, holding the section and its sub-parts
                          (hero/, about/, experience/, expertise/)
    shared/               small pieces reused across sections (Socials, TiltCard, SectionDivider)
    providers/            context providers (ThemeProvider)
    ui/                   shadcn/ui primitives only; add new ones with the shadcn CLI
  data/                   all site content as plain JS: site.js (name, role, CV link, nav links,
                          socials), about.js, experience.js, projects.js, skills.js
  lib/utils.js            `cn()` class merger
```

Rules for new code:
- **Content goes in `src/data/`, not in components.** Components import it and only handle layout. When the content changes (a new job, a new social link), edit the data file. Facts must come from the owner's resume, never be made up.
- A new page section gets its own `components/sections/<name>/` folder. Only move something to `shared/` once a second section needs it.
- Import across folders with `@/…`; import files in the same folder with `./…`.
- Only `ui/` uses lowercase filenames (the shadcn convention). Everything else is PascalCase.

### How it fits together

- `app/layout.jsx` wraps every page in `ThemeProvider` (next-themes, `attribute='class'`, default light) and renders `Header` and `Footer`. Its `metadata` sets a title template (`%s | Arjun Raj`), so each page's `metadata.title` only needs the page name.
- `app/template.jsx` wraps each page in a CSS fade-in (`animate-in fade-in` from tailwindcss-animate, in a `div`; each page provides its own `<main>`). Don't swap it for a JS animation that starts at `opacity: 0`: the page content would stay invisible until JavaScript ran, and it did get stuck that way once. It's a server component; the scroll-progress bar on the right edge is the client component `layout/ScrollProgress.jsx`, which writes its transform directly once per frame (no React state on scroll).
- Pages: `/` (Hero, About, Skills, Education, Experience, with a `SectionDivider` between each), `/projects` and `/contact`.
- Projects are data-driven from `data/projects.js`, and `/projects` shows each one as a single compact section (`sections/projects/ProjectSection.jsx`): gallery beside the badges, title, summary and stack (vertically centred), then the highlights plus every feature group as accordion rows in two independent columns, all closed by default so the columns stay the same height. The owner wants it compact, with no empty areas. The owner explicitly doesn't want per-project case-study pages or projects spread over a whole page, so keep it to one section each. The accordion is native `<details>`/`<summary>` sharing a `name`, so only one row is open at a time, it works without JS, and the text stays in the HTML. The owner sends projects one at a time, with a write-up and screenshots: use their wording, and don't add claims they didn't make.
- Project screenshots go in `public/projects/<slug>/` as WebP, resized to 1600px wide and kept under ~200 KB (the Minbar ones are 41–81 KB, from 1.5–1.9 MB PNGs). Pillow is installed for the user's Python and can do the conversion. Every image needs real `alt` text, a `caption` and its `width`/`height`.
- `sections/projects/ImageCarousel.jsx` is a library-free gallery: native horizontal scroll with CSS scroll-snap (touch swipe, trackpad and arrow keys), plus arrow buttons and dots kept in sync by an IntersectionObserver. Don't add Swiper for this; it's installed but unused and much heavier.
- The owner found one big About section too much, so it's split into three server-component sections in `sections/about/`: `About.jsx` (photo, story, stats), `Skills.jsx` (core strengths and all five skill groups) and `Credentials.jsx` (education and certifications). Their content is in `data/about.js` and `data/skills.js`. They share `shared/SectionParts.jsx` (`SectionHeading`, `CardTitle`, `SectionGlows`, `iconTile`, `eyebrow`); only `TiltCard` and `Reveal` inside them run in the browser, so they don't need `next/dynamic`.
- The About stats count up from 0 when they scroll into view (`sections/about/CountUp.jsx`, rAF, ~1.2s; the owner asked for it). The final value is in the server HTML and in an `sr-only` span, so search engines and screen readers get the real number.
- `sections/experience/Experience.jsx` is a server-component timeline of `RoleCard`s (newest first, a pulsing dot on the current role), with the Packapeer Academy internship in one compact "Also" card. The owner doesn't want dates, durations or freelancing shown in Experience. `data/experience.js` takes titles, companies, employment type and location from the owner's LinkedIn, and highlights and stacks from the resume. Companies show a monogram tile, not a logo: swap in real logos only if the owner provides them.
- `/contact` is a server page with the owner's email, phone, LinkedIn and GitHub (they approved showing these) and `sections/contact/ContactForm.jsx`. The form uses react-hook-form with its built-in `rules` (zod was dropped to save ~14 kB; zod and @hookform/resolvers are still installed but unused) and posts from the browser to Web3Forms, which emails the owner. It needs `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (see `.env.example`); without it, the form shows an error with the email address as a fallback. The key is designed to be public; Web3Forms' free plan only accepts browser-side submissions.
- The Expertise section is finished but not used on any page, and still uses GSAP. If you add it, rebuild it without GSAP like Experience, and use `shared/Reveal` for reveal-on-scroll.
- `MobileNav` is only the menu button. The panel, `MobileSheet` (Radix Dialog, ~38 kB), is loaded with `next/dynamic` the first time the button is hovered, focused, touched or clicked. It has no `SheetTrigger`, so it returns focus to the button itself in `onCloseAutoFocus`.
- `HeroArt` only mounts `TechSphere` (and the Lottie and its JSON inside it) when `(min-width: 1280px)` matches, so phones and tablets never download them.
- Home sections below the fold (Skills, Credentials, Experience) use `.render-lazy` (`content-visibility: auto`), so the browser skips their layout and paint until they're near the viewport. It clips paint to the section, so keep glows and shadows inside its padding. Don't use it on sections with sticky children.
- `Nav` reads `navLinks` from `data/site.js` and is rendered by both the header and the mobile nav.
- `Footer` is a server component; its only interactive piece, the back-to-top button, is the separate client component `layout/BackToTop.jsx`.
- `shared/Socials` reads `socials` from `data/site.js`. It takes the styling props `containerStyles` / `iconsStyles`, so the hero, mobile nav and footer can each style it differently.
- `sections/hero/TechSphere.jsx` is the hero visual: the icons from `skillGroups` spread over a sphere, rotated by hand-written projection maths in its own requestAnimationFrame loop (no three.js, no GSAP). It only runs while it's on screen, and it can be dragged. `Hero` itself is a server component (the heading is in the first HTML and never waits on JS); the client-only parts are `IconParallax` (inside `FloatingIcons`) and `HeroArt`, a tiny wrapper that lazy-loads `TechSphere` with `next/dynamic` and `ssr: false`. Under reduced motion it turns at about a third of the speed and doesn't tilt with the cursor. It's decorative and desktop-only (`xl`). The hero's `FloatingIcons` also keep a slow, small drift under reduced motion; the owner asked for the icons to keep moving gently.
- At the sphere's centre is `HeroAnimation`, the owner's Lottie animation (`public/hero-animation.json`). They asked to keep it and to have it always play, even under reduced motion (the owner's own PC has Windows animation effects off, which turns on `prefers-reduced-motion`). Lottie is loaded with `ssr: false`, because lottie-web touches `document` at import time. It uses `react-lottie-player/dist/LottiePlayerLight` (164 KB instead of 298 KB), which works because the animation has no expressions; if the animation is ever replaced, check it for expressions first.
- The owner's photo is `public/images/arjun-photo.webp`: their original photo, unedited (only resized to 360×640). **Don't modify it**: no background removal, colour grading, fades or cropping. The owner explicitly wants it shown normally. About shows it small (`w-24`/`md:w-28`/`xl:w-32`) as a plain rounded rectangle beside the "About me" label and heading, with a small lift on hover only. The Next.js image cache keys on the URL, so rename the file when you replace the photo.
- The favicon is `src/app/icon.svg` (the "AR" monogram), which Next.js picks up automatically.

## Styling conventions

- Theme colours are HSL CSS variables in `src/app/globals.css` (`:root` and `.dark`), exposed through `tailwind.config.js`. The palette is monochrome: `primary` is near-black in light mode and near-white in dark mode. Dark mode is class-based.
- `globals.css` also defines the custom classes `.h1`, `.subtitle`, `.glass`, `.glass-strong` and `.glass-card`. The header, footer and mobile menu use `.glass`/`.glass-strong`. Content boxes use `.glass-card`, a stronger frosted gradient card with a light sheen (the owner asked for more glassmorphism). It clips with `overflow-clip`, not `overflow-hidden`: `overflow: hidden` turns the card into a scroll container, which breaks `position: sticky` inside it (the project gallery is sticky on desktop).
- The page background is one continuous layer, `layout/SiteBackground.jsx`: a tinted blue-grey (`#e6ebf3`; slate-950 in dark mode) with fixed, blurred sky, violet, indigo and green glows and a faint dot grid, rendered once in the root layout. Light mode needs the stronger glows and the tinted base: on near-white the glass disappears and the page looks washed out (the owner flagged this). Check light mode as carefully as dark mode. Sections and the footer stay transparent, so there are no hard edges between them, and glass always has colour behind it. Don't give sections glows that reach their top or bottom edge. About adds a few glows inset well away from its edges (`overflow-x-clip`, not `overflow-hidden`) so its glass cards have colour behind them. The mobile sheet has its own glows because it opens over the page.
- `.glass` / `.glass-strong` are in the `components` layer, so a `bg-*` utility on the same element wins. For example, shadcn `SheetContent` defaults to `bg-background`, so glass is applied there with explicit utility classes instead.
- Buttons (`ui/button.jsx`) are rectangles with softly rounded corners, never pills: `rounded-lg` by default, and `rounded-xl` for `size='cta'`, the standard call-to-action size. The owner rejected glass, gradient and pill buttons and chose a minimal solid style: `default` is solid, and `outline` is transparent with a thin border. Other controls use the same shape (nav, icon buttons, badges), except the decorative circles.
- The header is a glass bar floating at the top centre, up to `max-w-5xl` wide: logo with name and role on the left, links in the middle, theme toggle on the right. Below `md` the links move into the mobile menu. The owner rejected a smaller compact version as too small.
- The header has no CTA button (the owner removed "Hire me"); the Contact nav link does that job. The CTAs are in the hero, footer and mobile menu.
- Cards tilt towards the mouse with `shared/TiltCard.jsx`: a tiny client component that sets the transform on pointermove (mouse only) with a 200ms CSS transition and resets it on leave. `max` is the tilt in degrees: 2–3 for big cards, 6 for small stat cards. It deliberately runs even with reduced motion on, because the owner's PC has Windows animation effects off and they want to see it.
- Sections are separated by `shared/SectionDivider.jsx` (owner's choice): a 1px line fading in from both ends with a sky centre and a streak of light running along it in a seamless CSS loop (`.divider-spark`). The owner removed the blurred glow: keep it to the line and its movement. It sits between the hero and About, between projects, and at the top of the footer, so every page has one before the footer.
- To make a link look like a button, use `<Button asChild><Link …/></Button>`. Don't put a `<Button>` inside a `<Link>`; that nests a button inside a link, which is invalid HTML.
