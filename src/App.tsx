import { useState, useEffect } from "react"
import { FooterCta } from "@/components/ui/ember-footer-cta"

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

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
      <section id="about-section" className="about-section py-24 md:py-36 px-6 border-b border-black/10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="space-y-4">
            <h2 className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight font-bold">
              About Us
            </h2>
            <p className="font-subtitle text-xl sm:text-2xl md:text-3xl text-[#222222] leading-snug font-medium">
              We’re a Think Tank — built for public figures, brands, and change-makers.
            </p>
          </div>

          <div className="font-body text-base sm:text-lg md:text-xl text-[#444444] space-y-4 leading-relaxed pt-2 border-t border-black/10">
            <p>
              BonBern Think Tank Studio is a{" "}
              <span className="font-bold text-[#D0362B]">behavior-first</span> consultancy.
            </p>
            <p>
              We believe the world doesn’t move on logic — it moves on emotions, stories, and belief.
            </p>
            <p>So we go beyond marketing — into minds, memories, and meaning.</p>
            <p>
              We blend psychology with creativity to shape perception — from image-building and viral campaigns to solving real-world problems that demand attention.
            </p>
          </div>

          {/* Secret Subsection */}
          <div className="sketch-card bg-black/5 border border-black/10 p-8 rounded-2xl space-y-3">
            <h3 className="font-subtitle text-xl sm:text-2xl text-[#e23028] font-semibold">
              Our secret?
            </h3>
            <p className="font-body text-base sm:text-lg text-[#222222]">
              A rare mix of psychological insight, creative storytelling, and tech-powered execution.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SUBTLE BACKGROUND WRAPPER ==================== */}
      <div className="subtle-bg-wrapper">
        <div className="subtle-bg-image"></div>
        <div className="subtle-bg-overlay"></div>

        <div className="subtle-bg-content space-y-32 py-24 md:py-36 px-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  1. Understand the Brief
                </h3>
                <p className="font-body text-base text-white/70">
                  We decode what’s said, what’s unsaid, and why it matters. This is where the foundation of perception begins.
                </p>
              </div>

              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  2. Decode Behavior
                </h3>
                <p className="font-body text-base text-white/70">
                  We dive deep into psychology, audience patterns, and cultural signals — so that what we create is not just creative, but correctly wired.
                </p>
              </div>

              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  3. Design the Narrative
                </h3>
                <p className="font-body text-base text-white/70">
                  Every message is engineered to not just be seen, but felt and remembered.
                </p>
              </div>

              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  4. Develop Communication Assets
                </h3>
                <p className="font-body text-base text-white/70">
                  From content to campaigns, we build assets that are platform-fit — digital, physical, or phygital. We don’t just follow trends. We often start them.
                </p>
              </div>

              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  5. Adapt & Amplify
                </h3>
                <p className="font-body text-base text-white/70">
                  We observe how the world reacts, learn from signals, and evolve the message accordingly.
                </p>
              </div>

              <div className="sketch-card space-y-3">
                <h3 className="font-subtitle text-xl text-[#e23028] font-semibold">
                  6. Reflect & Reinvent
                </h3>
                <p className="font-body text-base text-white/70">
                  We circle back, learn what shifted perception, and explore new opportunities. What we build today should make tomorrow smarter.
                </p>
              </div>
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

          {/* ==================== SECTION 5: FOUNDER SECTION ==================== */}
          <section id="founder-section" className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-white tracking-tight font-bold">
                Team
              </h2>
              <p className="font-subtitle text-xl sm:text-2xl text-[#e23028] leading-snug font-medium">
                Aakashraj Kusum Ambre — Founder & CEO · Behavioural Strategist · Celebrity Consultant
              </p>
            </div>

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
