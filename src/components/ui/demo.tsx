import { Component } from "@/components/ui/image-auto-slider"
import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion"
import { FooterCta } from "@/components/ui/ember-footer-cta"
import { DynamicFrameLayout, Frame } from "@/components/ui/dynamic-frame-layout"

const DemoOne = () => {
  return <Component />
}

export function TeamAccordionDemo() {
  return (
    <div className="w-full py-10">
      <TailwindImageAccordion />
    </div>
  )
}

export function FooterCtaDemo() {
  return (
    <div className="w-full">
      <FooterCta />
    </div>
  )
}

const processDemoFrames: Frame[] = [
  {
    id: 1,
    stepNumber: "1. UNDERSTAND THE BRIEF",
    title: "Understand the Brief",
    description: "We decode what’s said, what’s unsaid, and why it matters. This is where the foundation of perception begins.",
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
  },
  {
    id: 2,
    stepNumber: "2. DECODE BEHAVIOR",
    title: "Decode Behavior",
    description: "We dive deep into psychology, audience patterns, and cultural signals — so that what we create is correctly wired.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
  },
  {
    id: 3,
    stepNumber: "3. DESIGN THE NARRATIVE",
    title: "Design the Narrative",
    description: "Every message is engineered to not just be seen, but felt and remembered.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
  },
  {
    id: 4,
    stepNumber: "4. DEVELOP COMMUNICATION ASSETS",
    title: "Develop Communication Assets",
    description: "From content to campaigns, we build assets that are platform-fit — digital, physical, or phygital.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
  },
  {
    id: 5,
    stepNumber: "5. ADAPT & AMPLIFY",
    title: "Adapt & Amplify",
    description: "We observe how the world reacts, learn from signals, and evolve the message accordingly.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
  },
  {
    id: 6,
    stepNumber: "6. REFLECT & REINVENT",
    title: "Reflect & Reinvent",
    description: "We circle back, learn what shifted perception, and explore new opportunities.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
  },
]

export function DemoPage() {
  return (
    <div className="w-full min-h-screen bg-[#050505] p-8">
      <DynamicFrameLayout 
        frames={processDemoFrames} 
        className="w-full max-w-6xl mx-auto" 
        hoverSize={6}
        gapSize={16}
      />
    </div>
  )
}

export { DemoOne }

export default function Default() {
  return (
    <div className="w-full py-10 space-y-16">
      <DemoPage />
      <DemoOne />
      <TailwindImageAccordion />
      <FooterCta />
    </div>
  )
}
