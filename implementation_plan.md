# BonBern Website Redesign Plan

We will overhaul the BonBern website using the new Noir, Cinematic, and Brutalist design system provided in the prompt. We will follow the `ui-ux-pro-max` skill checklist to ensure the UI is professional, responsive, and polished.

## Proposed Changes

### 1. `index.html`
- **[MODIFY]** `e:\darshi\bonbern-website\index.html`: completely replace the old layout with the new "Psychological Protagonist" code structure.
- **Content Integration**:
  - **Kinetic Typography Section**: Keep the new cinematic feel ("BonBern for Artists, Producers, etc.") but ensure it aligns with our target audience.
  - **Perception Section**: Use the blurred atmospheric video background but update the text to feature our original hero: "DECODING PERCEPTION. WIRED FOR IMPACT."
  - **Manifesto**: Fill out the "About Us" editorial columns with actual BonBern methodology (Understand the Brief, Decode Behavior, Design the Narrative, Develop Assets).
  - **Who We Work With**: The new code already has beautiful hover states. We will replace the placeholder data (Nike, Red Bull, etc.) with BonBern's actual roster:
    - **Artists**: Badshah, Sunidhi Chauhan, Jasleen Royal, Tanishk Bagchi
    - **Labels**: Universal Music Group, Saregama, T-Series, Artiste First
    - **Brands**: SonyLiv, Discovery, Hindustan Times, Nobel Chemist
  - **The Dream Team**: Replace the generic 4-person team with the specific founder section for **Aakashraj Kusum Ambre**. We will use `akashraj_image.jpg` with the 3D hover/sparkle effect but format it to highlight him as the "Founder & Lead Strategist." The remaining slots can be removed or used for core Pillars/Processes (Adapt & Amplify).
- **UI/UX Pro Max Adjustments**:
  - Ensure all clickable cards have `cursor-pointer`.
  - Add smooth transitions (`duration-300` / `duration-500`) consistently.
  - Fix any Light/Dark mode contrast issues (the new site is heavily dark-mode-focused).

### 2. Assets & Cleanup
- **[DELETE]** `e:\darshi\bonbern-website\style.css`: The new site relies entirely on Tailwind CSS within `<style>` / script tags in `index.html`, making external `style.css` unnecessary.
- Provide cleanup of unused SVGs/Styles if any remain.

## User Review Required

> [!WARNING]
> Since the new code uses a "Dream Team" grid of 4 people, and BonBern usually highlights one Founder (Aakashraj), I plan to modify this section to feature Aakashraj prominently and use the other slots for the "Process Cycle" (Adapt & Amplify, Reflect & Reinvent) or simply center his profile. Let me know if you prefer to keep the 4 slots for placeholders or customize it heavily!

## Verification Plan

### Automated Tests
- Syntax validation of the injected Tailwind configuration.

### Manual Verification
- Verify the 3D hover effects, Noir gradients, and Kinetic text animations render correctly.
- Test responsive layout across mobile and desktop.
- Ensure all content from the initial brief (Pillars, Network, Founder) is present in the new layout without breaking the aesthetic.
