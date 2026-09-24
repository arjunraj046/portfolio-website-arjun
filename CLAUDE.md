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
  - Don't add videos, large Lottie/JSON animations or big libraries without asking. Use CSS or the existing framer-motion/GSAP before adding another animation library.
  - Import icons one at a time (`import { SiReact } from 'react-icons/si'`), never a whole icon set.
  - Load heavy, below-the-fold or browser-only pieces lazily with `next/dynamic` (as the hero Lottie does). Keep `'use client'` on the smallest component that needs it.
  - After a build, check the "First Load JS" column in the `next build` output. The home page is currently ~153 kB; don't let changes grow it without a good reason.
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

Animation uses two libraries, each with its own job:
- **framer-motion**: layout animations (for example, the nav's active-pill `layoutId`).
- **GSAP (+ ScrollTrigger)**: hero reveal, floating-icon parallax, scroll-triggered section animations and `shared/Tilt3D.jsx`. GSAP code runs inside `gsap.context()` / `gsap.matchMedia()` in a `useEffect` and is reverted on cleanup. It respects `prefers-reduced-motion`; keep that pattern.

## Architecture

### Folder structure

```
src/
  app/                    routes only: layout, template, page.jsx per route (+ metadata)
  components/
    layout/               site chrome: Header, Footer, Logo, Nav, MobileNav, ThemeToggler
    sections/<section>/   one folder per page section, holding the section and its sub-parts
                          (hero/, about/, experience/, expertise/)
    shared/               small pieces reused across sections (Socials, Tilt3D)
    providers/            context providers (ThemeProvider)
    ui/                   shadcn/ui primitives only; add new ones with the shadcn CLI
  data/                   all site content as plain JS: site.js (name, role, CV link, nav links,
                          socials, services), experience.js, skills.js
  hooks/                  custom hooks
  lib/utils.js            `cn()` class merger
```

Rules for new code:
- **Content goes in `src/data/`, not in components.** Components import it and only handle layout. When the content changes (a new job, a new social link), edit the data file. Facts must come from the owner's resume, never be made up.
- A new page section gets its own `components/sections/<name>/` folder. Only move something to `shared/` once a second section needs it.
- Import across folders with `@/…`; import files in the same folder with `./…`.
- Only `ui/` uses lowercase filenames (the shadcn convention). Everything else is PascalCase.

### How it fits together

- `app/layout.jsx` wraps every page in `ThemeProvider` (next-themes, `attribute='class'`, default light) and renders `Header` and `Footer`. Its `metadata` sets a title template (`%s | Arjun Raj`), so each page's `metadata.title` only needs the page name.
- `app/template.jsx` wraps each page in a CSS fade-in (`animate-in fade-in` from tailwindcss-animate, in a `div`; each page provides its own `<main>`). Don't swap it for a JS animation that starts at `opacity: 0`: the page content would stay invisible until JavaScript ran, and it did get stuck that way once. It also renders the scroll-progress bar on the right edge, driven by `hooks/useScrollProgress.jsx`.
- Pages: `/` (Hero, then About), `/projects` (only a heading so far) and `/contact`.
- `sections/about/About.jsx` shows everything on the resume except work experience and projects: summary, stats, core strengths, all five skill groups, education and certifications. Its content is in `data/about.js` and `data/skills.js`. `app/page.jsx` loads it with `next/dynamic` (still server-rendered), so its JavaScript is a separate chunk.
- `/contact` is a server page with the owner's email, phone, LinkedIn and GitHub (they approved showing these) and `sections/contact/ContactForm.jsx`. The form uses react-hook-form + zod and posts from the browser to Web3Forms, which emails the owner. It needs `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (see `.env.example`); without it, the form shows an error with the email address as a fallback. The key is designed to be public; Web3Forms' free plan only accepts browser-side submissions.
- The Experience and Expertise sections are finished but not used on any page. When you add them, lazy-load them with `next/dynamic` like About, and bring their animations down to ~300ms. Prefer an IntersectionObserver over GSAP's ScrollTrigger for simple reveal-on-scroll: About switched and saved ~17 kB.
- `Nav` reads `navLinks` from `data/site.js` and is rendered by both the header and the mobile nav. Each instance needs its own `layoutId` prop, or their framer-motion active pills animate between each other.
- `shared/Socials` reads `socials` from `data/site.js`. It takes the styling props `containerStyles` / `iconsStyles`, so the hero, mobile nav and footer can each style it differently.
- `sections/hero/TechSphere.jsx` is the hero visual: the icons from `skillGroups` spread over a sphere, rotated by hand-written projection maths on `gsap.ticker` (no three.js). It only runs while it's on screen, and it can be dragged. Under reduced motion it turns at about a third of the speed and doesn't tilt with the cursor. `Hero` loads it with `next/dynamic` and `ssr: false` because it's decorative and desktop-only (`xl`). The hero's `FloatingIcons` also keep a slow, small drift under reduced motion; the owner asked for the icons to keep moving gently.
- At the sphere's centre is `HeroAnimation`, the owner's Lottie animation (`public/hero-animation.json`). They asked to keep it and to have it always play, even under reduced motion (the owner's own PC has Windows animation effects off, which turns on `prefers-reduced-motion`). Lottie is loaded with `ssr: false`, because lottie-web touches `document` at import time.
- The favicon is `src/app/icon.svg` (the "AR" monogram), which Next.js picks up automatically.

## Styling conventions

- Theme colours are HSL CSS variables in `src/app/globals.css` (`:root` and `.dark`), exposed through `tailwind.config.js`. The palette is monochrome: `primary` is near-black in light mode and near-white in dark mode. Dark mode is class-based.
- `globals.css` also defines the custom classes `.h1`, `.subtitle`, `.glass`, `.glass-strong` and `.glass-card`. The header, footer and mobile menu use `.glass`/`.glass-strong`. Content boxes use `.glass-card`, a stronger frosted gradient card with a light sheen (the owner asked for more glassmorphism).
- The page background is one continuous layer, `layout/SiteBackground.jsx`: a tinted blue-grey (`#e6ebf3`; slate-950 in dark mode) with fixed, blurred sky, violet, indigo and green glows and a faint dot grid, rendered once in the root layout. Light mode needs the stronger glows and the tinted base: on near-white the glass disappears and the page looks washed out (the owner flagged this). Check light mode as carefully as dark mode. Sections and the footer stay transparent, so there are no hard edges between them, and glass always has colour behind it. Don't give sections glows that reach their top or bottom edge. About adds a few glows inset well away from its edges (`overflow-x-clip`, not `overflow-hidden`) so its glass cards have colour behind them. The mobile sheet has its own glows because it opens over the page.
- `.glass` / `.glass-strong` are in the `components` layer, so a `bg-*` utility on the same element wins. For example, shadcn `SheetContent` defaults to `bg-background`, so glass is applied there with explicit utility classes instead.
- Buttons (`ui/button.jsx`) are rectangles with softly rounded corners, never pills: `rounded-lg` by default, and `rounded-xl` for `size='cta'`, the standard call-to-action size. The owner rejected glass, gradient and pill buttons and chose a minimal solid style: `default` is solid, and `outline` is transparent with a thin border. Other controls use the same shape (nav, icon buttons, badges), except the decorative circles.
- The header is a glass bar floating at the top centre, up to `max-w-5xl` wide: logo with name and role on the left, links in the middle, theme toggle on the right. Below `md` the links move into the mobile menu. The owner rejected a smaller compact version as too small.
- The header has no CTA button (the owner removed "Hire me"); the Contact nav link does that job. The CTAs are in the hero, footer and mobile menu.
- To make a link look like a button, use `<Button asChild><Link …/></Button>`. Don't put a `<Button>` inside a `<Link>`; that nests a button inside a link, which is invalid HTML.
