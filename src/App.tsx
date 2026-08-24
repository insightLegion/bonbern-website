import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FooterCta } from "@/components/ui/ember-footer-cta"
import { TailwindImageAccordion } from "@/components/ui/tailwind-image-accordion"
import { ImageAutoSlider } from "@/components/ui/image-auto-slider"
import { DynamicFrameLayout, Frame } from "@/components/ui/dynamic-frame-layout"
import { MarqueeAlongSvgPath } from "@/components/ui/marquee-along-svg-path"
import { TextRotate } from "@/components/ui/text-rotate"
import { TextEffect } from "@/components/ui/text-effect"

gsap.registerPlugin(ScrollTrigger)

const aboutPatternItems = [
  {
    type: "img",
    src: "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-sm font-bold italic text-white leading-none">
        &amp;
      </span>
    ),
    bg: "bg-[#D0362B]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <svg className="w-3.5 h-3.5 text-[#D0362B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    bg: "bg-[#111111] border border-white/10",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-subtitle text-[10px] uppercase font-bold tracking-widest text-[#D0362B]">
        BB
      </span>
    ),
    bg: "bg-black border border-[#D0362B]/30",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    bg: "bg-[#D0362B]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-xs font-bold text-black">
        ✦
      </span>
    ),
    bg: "bg-[#e4e4e7] border border-black/10",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-[11px] font-bold text-white">
        01
      </span>
    ),
    bg: "bg-[#111111]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-sm font-serif font-bold text-[#D0362B]">
        g
      </span>
    ),
    bg: "bg-white border border-black/10",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    bg: "bg-[#D0362B]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-xs font-bold text-white">
        02
      </span>
    ),
    bg: "bg-[#111111]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-xs font-bold text-white">
        ★
      </span>
    ),
    bg: "bg-[#D0362B]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-sm font-bold text-black">
        A
      </span>
    ),
    bg: "bg-[#fed7aa] border border-orange-300",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <svg className="w-3.5 h-3.5 text-[#D0362B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    bg: "bg-[#111111]",
  },
  {
    type: "img",
    src: "https://cdn.cosmos.so/cd346bce-f415-4ea7-8060-99c5f7c1741a?format=jpeg",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-xs font-bold text-white">
        03
      </span>
    ),
    bg: "bg-[#D0362B]",
  },
  {
    type: "svg",
    content: (
      <span className="font-title text-xs font-bold text-black">
        3
      </span>
    ),
    bg: "bg-[#bbf7d0] border border-emerald-300",
  },
  {
    type: "svg",
    content: (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    bg: "bg-[#111111]",
  },
]

const aboutMarqueePath =
  "M -40 60 C 160 170, 380 250, 620 220 C 720 205, 830 140, 800 50 C 760 -30, 640 30, 670 220 C 700 280, 950 270, 1160 200 C 1280 155, 1380 95, 1480 35"

const processFrames: Frame[] = [
  {
    id: 1,
    stepNumber: "STEP 01",
    title: "1. Understand the Brief",
    description: "We decode what’s said, what’s unsaid, and why it matters. This is where the foundation of perception begins.",
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
  },
  {
    id: 2,
    stepNumber: "STEP 02",
    title: "2. Decode Behavior",
    description: "We dive deep into psychology, audience patterns, and cultural signals — so that what we create is correctly wired.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
  },
  {
    id: 3,
    stepNumber: "STEP 03",
    title: "3. Design the Narrative",
    description: "Every message is engineered to not just be seen, but felt and remembered.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
  },
  {
    id: 4,
    stepNumber: "STEP 04",
    title: "4. Develop Communication Assets",
    description: "From content to campaigns, we build assets that are platform-fit — digital, physical, or phygital. We don’t just follow trends. We often start them.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
  },
  {
    id: 5,
    stepNumber: "STEP 05",
    title: "5. Adapt & Amplify",
    description: "We observe how the world reacts, learn from signals, and evolve the message accordingly.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
  },
  {
    id: 6,
    stepNumber: "STEP 06",
    title: "6. Reflect & Reinvent",
    description: "We circle back, learn what shifted perception, and explore new opportunities. What we build today should make tomorrow smarter.",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
  },
]

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isNavOpen && !(e.target as HTMLElement).closest("#main-nav")) {
        setIsNavOpen(false)
      }
    }
    document.addEventListener("click", handleGlobalClick)
    return () => document.removeEventListener("click", handleGlobalClick)
  }, [isNavOpen])

  // GSAP ScrollTrigger fade-in effect for About Us section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-fade-el", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ==================== FLOATING PILL NAVBAR ==================== */}
      <nav id="main-nav" className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="navbar-pill flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-2xl">
          <a
            href="#hero"
            className="navbar-brand text-lg text-black select-none font-title font-bold"
          >
            BonBern
          </a>
          <button
            id="hamburger-btn"
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="flex flex-col gap-[5px] items-center justify-center w-8 h-8 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[2px] bg-black transition-transform duration-200 ${
                isNavOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-[2px] bg-black transition-transform duration-200 ${
                isNavOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Dropdown */}
        <div
          id="nav-dropdown"
          className={`navbar-dropdown absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-3 min-w-[210px] border border-black/5 ${
            isNavOpen ? "open" : ""
          }`}
        >
          <a
            href="#hero"
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
          >
            <span className="text-[#e23028] text-xs w-4">●</span> Home
          </a>
          <a
            href="#about-section"
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
          >
            <span className="text-[#e23028] text-xs w-4">●</span> About Us
          </a>
          <a
            href="#process-section"
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
          >
            <span className="text-[#e23028] text-xs w-4">●</span> Our Process
          </a>
          <a
            href="#partnerships"
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
          >
            <span className="text-[#e23028] text-xs w-4">●</span> Partnerships
          </a>
          <a
            href="#founder-section"
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
          >
            <span className="text-[#e23028] text-xs w-4">●</span> Founder
          </a>
        </div>
      </nav>

      {/* ==================== PAGE 1: HERO / LANDING PAGE ==================== */}
      <section
        id="hero"
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/Enhanced Clipify Eye TV.mp4" type="video/mp4" />
        </video>
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        {/* Hero Content */}
        <div
          id="hero-content"
          className="relative z-10 flex flex-col justify-between h-full px-6 pt-24 pb-12 text-center"
        >
          {/* Giant Center Logo in Hero */}
          <div id="hero-logo" className="flex justify-center items-center flex-1 my-auto pt-4">
            <img
              src="/images/logo.svg"
              alt="BonBern Logo"
              className="h-20 sm:h-32 md:h-44 lg:h-52 w-auto max-w-[320px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[850px] filter drop-shadow-[0_8px_32px_rgba(0,0,0,0.75)]"
            />
          </div>
          {/* Text Content */}
          <div className="max-w-4xl mx-auto space-y-3 mt-auto pb-4">
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white font-bold">
              BonBern
            </h1>
            <p className="font-subtitle text-lg sm:text-xl md:text-2xl text-[#e23028] font-medium">
              Perception Building Lab
            </p>
            <div className="font-body text-sm sm:text-base md:text-lg text-white/85 space-y-1 max-w-2xl mx-auto leading-relaxed">
              <p>We work with celebrities to build iconic images.</p>
              <p>We work with labels and brands to craft viral campaigns.</p>
              <p className="text-white font-semibold pt-1">
                And we are passionate about solving real-world problems — because we can, and we love it!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PAGE 2: ABOUT US ==================== */}
      <section
        id="about-section"
        ref={aboutRef}
        className="about-section pt-10 pb-16 sm:pt-14 sm:pb-24 px-4 sm:px-6 border-b border-black/10 relative overflow-visible"
      >
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10">
          {/* Header Block */}
          <div className="space-y-2.5 about-fade-el">
            <TextEffect
              as="h2"
              per="char"
              preset="fade"
              delay={0.2}
              className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight font-bold"
            >
              About Us
            </TextEffect>
            <TextEffect
              as="p"
              per="word"
              preset="slide"
              delay={0.5}
              className="font-subtitle text-xl sm:text-2xl md:text-3xl text-[#222222] leading-snug font-medium"
            >
              We’re a Think Tank — built for public figures, brands, and change-makers.
            </TextEffect>
          </div>

          <div className="about-fade-el font-body text-base sm:text-lg md:text-xl text-[#444444] space-y-2.5 leading-relaxed pt-2 border-t border-black/10">
            <TextEffect
              as="p"
              per="word"
              delay={0.8}
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } },
                item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } }
              }}
            >
              BonBern Think Tank Studio is a behavior-first consultancy.
            </TextEffect>
            <TextEffect
              as="p"
              per="word"
              delay={1.2}
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } },
                item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } }
              }}
            >
              We believe the world doesn’t move on logic — it moves on emotions, stories, and belief.
            </TextEffect>
            <TextEffect
              as="p"
              per="word"
              delay={1.6}
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } },
                item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } }
              }}
            >
              So we go beyond marketing — into minds, memories, and meaning.
            </TextEffect>
            <TextEffect
              as="p"
              per="word"
              delay={2.0}
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } },
                item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } }
              }}
            >
              We blend psychology with creativity to shape perception — from image-building and viral campaigns to solving real-world problems that demand attention.
            </TextEffect>
          </div>

          {/* Secret Subsection */}
          <div className="about-fade-el sketch-card bg-black/5 border border-black/10 p-5 sm:p-7 rounded-2xl space-y-2">
            <TextEffect
              as="h3"
              per="char"
              delay={2.3}
              className="font-subtitle text-xl sm:text-2xl text-[#e23028] font-semibold"
            >
              Our secret?
            </TextEffect>
            <TextEffect
              as="p"
              per="word"
              delay={2.5}
              className="font-body text-base sm:text-lg text-[#222222]"
            >
              A rare mix of psychological insight, creative storytelling, and tech-powered execution.
            </TextEffect>
          </div>
        </div>

        {/* Marquee Along SVG Path - Extended Edge-to-Edge across entire screen with rich SVG pattern */}
        <div className="about-fade-el w-screen relative left-1/2 -translate-x-1/2 h-[200px] sm:h-[240px] md:h-[280px] -mt-10 sm:-mt-14 md:-mt-18 flex items-center justify-center pointer-events-auto overflow-visible">
          <MarqueeAlongSvgPath
            path={aboutMarqueePath}
            viewBox="0 0 1440 320"
            baseVelocity={7}
            slowdownOnHover={true}
            draggable={true}
            repeat={3}
            dragSensitivity={0.1}
            className="w-full h-full overflow-visible"
            scaleMode="width"
            responsive
            grabCursor
          >
            {aboutPatternItems.map((item, i) => (
              <div
                key={i}
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg shadow-sm overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-150 ${
                  item.type === "svg" ? item.bg : "border border-black/10 bg-white"
                }`}
              >
                {item.type === "img" ? (
                  <img
                    src={item.src}
                    alt={`Tile ${i}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  item.content
                )}
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      </section>

      {/* ==================== SUBTLE BACKGROUND WRAPPER ==================== */}
      <div className="subtle-bg-wrapper">
        <div className="subtle-bg-image"></div>
        <div className="subtle-bg-overlay"></div>

        <div className="subtle-bg-content space-y-32 pt-28 pb-24 sm:pt-36 sm:pb-36 md:pt-44 md:pb-40 px-6">
          {/* ==================== SECTION 3: OUR PROCESS ==================== */}
          <section id="process-section" className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-white tracking-tight font-bold">
                Our Process
              </h2>
              <p className="font-subtitle text-xl sm:text-2xl text-white/85 leading-snug max-w-3xl font-medium">
                Whether we’re building celebrity personas, launching brand movements, or solving public challenges — here’s how we work:
              </p>
            </div>

            {/* Interactive Dynamic 6-Frame Process Grid */}
            <div className="pt-4">
              <DynamicFrameLayout 
                frames={processFrames} 
                className="w-full" 
                hoverSize={6}
                gapSize={16}
              />
            </div>
          </section>

          {/* ==================== SECTION 4: WHO WE WORK WITH ==================== */}
          <section id="partnerships" className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-white tracking-tight font-bold">
                Who We Work With
              </h2>
              <p className="font-subtitle text-xl sm:text-2xl text-white/85 leading-snug max-w-3xl font-medium">
                Over the years, we’ve collaborated with some of the most influential names across music, media, and brands.
              </p>
            </div>

            {/* Infinite Image Auto Slider Showcase */}
            <div className="pt-2 pb-2">
              <ImageAutoSlider
                images={[
                  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="sketch-card space-y-4">
                <span className="font-subtitle text-xs uppercase tracking-widest text-[#e23028] font-semibold">
                  #ARTISTS
                </span>
                <p className="font-body text-lg text-white/90 leading-relaxed">
                  Badshah · Sunidhi Chauhan · Jasleen Royal · Tanishk Bagchi
                </p>
              </div>
              <div className="sketch-card space-y-4">
                <span className="font-subtitle text-xs uppercase tracking-widest text-[#e23028] font-semibold">
                  #LABELS
                </span>
                <p className="font-body text-lg text-white/90 leading-relaxed">
                  UMG · Saregama · T-Series · Artiste First
                </p>
              </div>
              <div className="sketch-card space-y-4">
                <span className="font-subtitle text-xs uppercase tracking-widest text-[#e23028] font-semibold">
                  #BRANDS
                </span>
                <p className="font-body text-lg text-white/90 leading-relaxed">
                  SonyLiv · Discovery · Hindustan Times · Nobel Chemist
                </p>
              </div>
            </div>
          </section>

          {/* ==================== SECTION 5: TEAM SECTION WITH IMAGE ACCORDION ==================== */}
          <section id="founder-section" className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-4">
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-white tracking-tight font-bold">
                Team
              </h2>
              <p className="font-subtitle text-xl sm:text-2xl text-[#e23028] leading-snug font-medium">
                Aakashraj Kusum Ambre — Founder & CEO · Behavioural Strategist · Celebrity Consultant
              </p>
            </div>

            {/* Interactive Image Accordion */}
            <TailwindImageAccordion />

            {/* Founder Biography Card */}
            <div className="sketch-card space-y-6 p-8 md:p-12">
              <div className="font-body text-base sm:text-lg md:text-xl text-white/80 space-y-4 leading-relaxed">
                <p>
                  Aakashraj blends over a decade of experience in advertising, celebrity marketing, and psychology-driven strategy.
                </p>
                <p>
                  BonBern is his brainchild — built to help individuals and brands shape how they are seen, heard, and remembered.
                </p>
                <p>
                  From crafting iconic public personas to launching culture-shifting campaigns, his approach combines behavioural science, creative storytelling, and a deep understanding of Indian culture, media, and tech.
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e23028] transition-colors font-body text-sm"
                >
                  IG
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e23028] transition-colors font-body text-sm"
                >
                  IN
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e23028] transition-colors font-body text-sm"
                >
                  𝕏
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ==================== SECTION 6: EMBER FOOTER CTA ==================== */}
      <FooterCta
        eyebrow="last call"
        heading="Join the waitlist."
        sub="Leave an email, we will hold your spot."
        brand="Ember Kit, est. 2026"
        links={[
          { label: "Changelog", href: "#" },
          { label: "Twitter", href: "#" },
          { label: "GitHub", href: "#" },
        ]}
        note="no spam, one launch email"
        flameHeight={260}
      />
    </div>
  )
}
