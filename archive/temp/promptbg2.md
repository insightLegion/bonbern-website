You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
forest.tsx
"use client"

// AsciiArt — "Forest", made with the 21st.dev ASCII editor and baked
// to its exact rendered output (looping video + poster). Zero dependencies:
// one <video> that fills its parent. Drop it behind or inside your content:
// <div className="relative h-96"><AsciiArt className="absolute inset-0" /></div>
// Remix the source recipe (styles, animation, palette) in the editor:
// https://21st.dev/community/ascii/editor?from=c694ace1-2012-4042-90c3-1c917fba61c7
export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src={"https://assets.21st.dev/ascii-recipes/videos/user_3GU9lDnevaFSdflC11GXo5RtDNq/4cb0df2f-41cd-4ae9-ae6e-a1aa2dcc5a8e.mp4"}
      poster={"https://assets.21st.dev/ascii-recipes/thumbnails/user_3GU9lDnevaFSdflC11GXo5RtDNq/f9062628-9f19-4141-a423-bd8346585b37.png"}
      autoPlay
      loop
      muted
      playsInline
      aria-label={"Forest — animated ASCII art"}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  )
}


demo.tsx
import { AsciiArt } from "@/components/ui/forest"

export default function AsciiArtDemo() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AsciiArt className="h-full w-full" />
    </div>
  )
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
