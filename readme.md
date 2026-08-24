# BonBern Design System & Website Documentation

This repository houses the official website for **BonBern Think Tank Labs / Perception Building Lab**.

---

## ⚠️ Core Architectural Principles & Rules

1. **NEVER modify files inside the `structure/` directory.** The `structure/` directory contains strict reference files (`index2.html`, `style.css`). All active code modifications, component additions, and feature developments MUST be made in the main repository codebase (`src/` and root `components/`).
2. **Strict Font & Typography Rules**: Use **ONLY** the designated fonts defined in `structure/style.css` (`Avenir Next`, `Unageo`, `Louis George Cafe`). Do NOT introduce unapproved default sans-serif or arbitrary web fonts.
3. **Strict Color Palette**: Use **ONLY** the approved color palette defined in `structure/style.css` and detailed below.

---

## 🎨 Design Tokens, Typography & Color Palette

### 1. Typography Hierarchy

| Font Family | Font Files / Weights | CSS Class / Selector | Usage Scope |
| :--- | :--- | :--- | :--- |
| **Avenir Next** | `Avenir-Next-Regular.otf` (400)<br>`Avenir-Next-Bold.otf` (700) | `.font-title`, `.sketch-title`, `h1`, `h2`, `h3` | Section Headers, Brand Name, Primary Titles |
| **Unageo** | `Unageo-Light.ttf` (300)<br>`Unageo-Regular.ttf` (400)<br>`Unageo-Medium.ttf` (500)<br>`Unageo-Bold.ttf` (700) | `.font-subtitle`, `.sketch-subtitle`, `.subtitle`, `.section-label` | Section Subtitles, Card Headers, Badges, Button Text |
| **Louis George Cafe** | `Louis George Cafe Light.ttf` (300)<br>`Louis George Cafe.ttf` (400)<br>`Louis George Cafe Bold.ttf` (700) | `.font-body`, `.sketch-body`, `p`, `li`, `span`, `a` | Body Paragraphs, Descriptions, Nav Links, Card Body |

#### CSS Custom Properties
```css
:root {
  --font-title: 'Avenir Next', system-ui, -apple-system, sans-serif;
  --font-subtitle: 'Unageo', system-ui, -apple-system, sans-serif;
  --font-body: 'Louis George Cafe', system-ui, -apple-system, sans-serif;
}
```

---

### 2. Color Palette

| Token Name | Hex Code / Value | Usage Description |
| :--- | :--- | :--- |
| `var(--bg-void)` | `#050505` | Primary dark void background for main site sections |
| `var(--bg-surface)` | `#0e0e0e` | Dark surface container background |
| `var(--accent)` | `#e23028` / `#D0362B` | Brand Accent Red for highlights, tags, borders & hover states |
| `var(--cream)` | `#ffffff` | Light section background (e.g. About Us section) |
| `var(--text-light)` | `#f0f0f0` | Light text on dark background sections |
| `var(--text-dark)` | `#111111` | Dark primary title text on light background sections |
| Subtitle Dark Tone | `#222222` | Dark subtitle text on light background sections |
| Body Dark Tone | `#444444` | Dark body text on light background sections |

---

## 📝 Site Structure & Copywriting Guide

Below is the elaborate reference for all page sections and copy as defined in `structure/index2.html`:

### Section 1: Hero / Landing Page (`#hero`)
- **Brand Name**: `BonBern`
- **Subtitle** (`font-subtitle`): `Perception Building Lab`
- **Body Copy** (`font-body`):
  - *"We work with celebrities to build iconic images."*
  - *"We work with labels and brands to craft viral campaigns."*
  - *"And we are passionate about solving real-world problems — because we can, and we love it!"*

### Section 2: About Us (`#about-section`)
- **Title** (`font-title`): `ABOUT US`
- **Subtitle** (`font-subtitle`): `We’re a Think Tank — built for public figures, brands, and change-makers.`
- **Body Copy** (`font-body`):
  - *"BonBern Think Tank Studio is a **behavior-first** consultancy."*
  - *"We believe the world doesn’t move on logic — it moves on emotions, stories, and belief."*
  - *"So we go beyond marketing — into minds, memories, and meaning."*
  - *"We blend psychology with creativity to shape perception — from image-building and viral campaigns to solving real-world problems that demand attention."*
- **Secret Subsection Card**:
  - Subtitle: `Our secret?`
  - Body: *"A rare mix of psychological insight, creative storytelling, and tech-powered execution."*

### Section 3: Our Process (`#process-section`)
- **Title** (`font-title`): `Our Process`
- **Subtitle** (`font-subtitle`): `Whether we’re building celebrity personas, launching brand movements, or solving public challenges — here’s how we work:`
- **Process Steps**:
  1. `1. Understand the Brief` — We decode what’s said, what’s unsaid, and why it matters. This is where the foundation of perception begins.
  2. `2. Decode Behavior` — We dive deep into psychology, audience patterns, and cultural signals — so that what we create is not just creative, but correctly wired.
  3. `3. Design the Narrative` — Every message is engineered to not just be seen, but felt and remembered.
  4. `4. Develop Communication Assets` — From content to campaigns, we build assets that are platform-fit — digital, physical, or phygital. We don’t just follow trends. We often start them.
  5. `5. Adapt & Amplify` — We observe how the world reacts, learn from signals, and evolve the message accordingly.
  6. `6. Reflect & Reinvent` — We circle back, learn what shifted perception, and explore new opportunities. What we build today should make tomorrow smarter.

### Section 4: Who We Work With (`#partnerships`)
- **Title** (`font-title`): `Who We Work With`
- **Subtitle** (`font-subtitle`): `Over the years, we’ve collaborated with some of the most influential names across music, media, and brands.`
- **Interactive Component**: `ImageAutoSlider` (`@/components/ui/image-auto-slider`) — An infinite horizontal auto-scrolling gallery showcasing partner visual assets.
- **Category Cards**:
  - `#ARTISTS`: Badshah · Sunidhi Chauhan · Jasleen Royal · Tanishk Bagchi
  - `#LABELS`: UMG · Saregama · T-Series · Artiste First
  - `#BRANDS`: SonyLiv · Discovery · Hindustan Times · Nobel Chemist

### Section 5: Team & Founder (`#founder-section`)
- **Title** (`font-title`): `Team`
- **Subtitle** (`font-subtitle`): `Aakashraj Kusum Ambre — Founder & CEO · Behavioural Strategist · Celebrity Consultant`
- **Interactive Component**: `TailwindImageAccordion` (`@/components/ui/tailwind-image-accordion`)
- **Founder Biography**:
  - *"Aakashraj blends over a decade of experience in advertising, celebrity marketing, and psychology-driven strategy."*
  - *"BonBern is his brainchild — built to help individuals and brands shape how they are seen, heard, and remembered."*
  - *"From crafting iconic public personas to launching culture-shifting campaigns, his approach combines behavioural science, creative storytelling, and a deep understanding of Indian culture, media, and tech."*

### Section 6: Footer Call To Action (`FooterCta`)
- **Headline**: `Let’s Build Something Worth Remembering` / `Join the waitlist.`

---

## 🛠️ Project Technical Setup & Component Architecture

### Tech Stack
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom CSS Tokens
- **Icons**: `lucide-react`

### Component Folder Structure & Path Conventions

The project adheres to the **shadcn component structure convention**:
- `src/components/ui/`: Contains the primary React TSX implementations of UI components.
- `components/ui/`: Contains re-export wrappers mapping root components to `src/components/ui/` via path alias (`@/components/ui/...`).

#### Why `/components/ui/` is Essential
Creating and maintaining the `/components/ui/` directory ensures compatibility with:
1. Standard **shadcn CLI** tooling (`npx shadcn@latest add <component>`), which defaults to writing to `/components/ui` or `@/components/ui`.
2. Path alias mapping (`@/components/ui/...`), enabling clean imports across the entire codebase regardless of file depth.

---

## 💻 Integrated Components

### 1. `ImageAutoSlider` (`image-auto-slider.tsx`)
- **Location**: [`src/components/ui/image-auto-slider.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/image-auto-slider.tsx) & [`components/ui/image-auto-slider.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/components/ui/image-auto-slider.tsx)
- **Exports**: `Component`, `ImageAutoSlider`
- **Description**: Features infinite marquee scrolling with non-destructive edge gradient masks and hover zoom effects. Integrated into the **Who We Work With** section of [`src/App.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/App.tsx).
- **Demo File**: [`src/components/ui/demo.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/demo.tsx) exports `DemoOne` demonstrating standalone usage of `Component`.

### 2. `DynamicFrameLayout` (`dynamic-frame-layout.tsx`)
- **Location**: [`src/components/ui/dynamic-frame-layout.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/dynamic-frame-layout.tsx) & [`components/ui/dynamic-frame-layout.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/components/ui/dynamic-frame-layout.tsx)
- **Exports**: `DynamicFrameLayout`, `Frame`
- **Description**: An interactive fluid grid layout that expands the hovered row and column dynamically while playing video/media backgrounds. Integrated into the **Our Process** section of [`src/App.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/App.tsx) with **6 process boxes** (2x3 grid) matching BonBern process steps.
- **Demo File**: [`src/components/ui/demo.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/demo.tsx) exports `DemoPage` demonstrating standalone usage of `DynamicFrameLayout`.

### 3. `MarqueeAlongSvgPath` (`marquee-along-svg-path.tsx`)
- **Location**: [`src/components/ui/marquee-along-svg-path.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/marquee-along-svg-path.tsx) & [`components/ui/marquee-along-svg-path.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/components/ui/marquee-along-svg-path.tsx)
- **Exports**: `MarqueeAlongSvgPath`
- **Dependencies**: `motion`
- **Description**: Animates items along an arbitrary curved SVG path with support for scroll velocity, drag interaction, slow down on hover, dynamic z-indexing, and responsive scaling. Integrated directly beneath the About Us text in [`src/App.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/App.tsx) with a minimalist GSAP `ScrollTrigger` fade-in effect (`y: 40, opacity: 0, stagger: 0.15`).
- **Demo File**: [`src/components/ui/demo.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/demo.tsx) exports `MarqueeAlongSvgPathDemo` demonstrating standalone usage.

### 4. `TextEffect` (`text-effect.tsx`)
- **Location**: [`src/components/ui/text-effect.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/text-effect.tsx) & [`components/ui/text-effect.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/components/ui/text-effect.tsx)
- **Exports**: `TextEffect`
- **Dependencies**: `framer-motion`
- **Description**: Staggered character, word, or line text animations with preset types (`blur`, `shake`, `scale`, `fade`, `slide`), customizable delay, and spring physics. Integrated throughout the **About Us** section in [`src/App.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/App.tsx) with custom staggered delays.
- **Demo File**: [`src/components/ui/demo.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/demo.tsx) exports `TextEffectWithCustomDelay`, `TextEffectPerChar`, and `TextEffectWithPreset`.

### 5. `TextRotate` (`text-rotate.tsx`)
- **Location**: [`src/components/ui/text-rotate.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/text-rotate.tsx) & [`components/ui/text-rotate.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/components/ui/text-rotate.tsx)
- **Exports**: `TextRotate`
- **Dependencies**: `motion`
- **Description**: Rotates text arrays with word-by-word and character-by-character stagger spring animations using `motion/react`.
- **Demo File**: [`src/components/ui/demo.tsx`](file:///e:/darshi/bonbern-website/bonbern-design/src/components/ui/demo.tsx) exports `Preview` demonstrating standalone usage.

---

## 🚀 Development Commands

```bash
# Start local development server
npm run dev

# Build production bundle
npm run build

# Run Oxlint code analysis
npm run lint
```