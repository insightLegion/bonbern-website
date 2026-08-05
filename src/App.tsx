import React from 'react';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans antialiased">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[100dvh] min-h-[650px] w-full overflow-hidden mb-[-25px] flex flex-col justify-end">
        
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content (bottom-aligned) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-12 md:pb-16 flex flex-col items-center justify-end text-center gap-5 sm:gap-6">
          
          {/* Main Heading */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px] font-normal leading-[1.08] tracking-tight">
            <div>Own your time</div>
            <div>
              without{' '}
              <em 
                className="not-italic"
                style={{ 
                  fontFamily: "'Instrument Serif', serif", 
                  fontStyle: 'italic' 
                }}
              >
                the stress
              </em>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium max-w-[420px] mx-auto leading-relaxed">
            Drift is a calm, ADHD-friendly planner that turns scattered ideas into a clear path
          </p>

          {/* CTA Bar */}
          <div className="bg-black/25 backdrop-blur-md rounded-xl flex items-center gap-3 sm:gap-4 pl-5 sm:pl-6 pr-1 py-1 border border-white/10 shadow-2xl">
            <span className="text-white text-xs sm:text-sm font-medium hidden sm:block">
              No noise. No complicated systems. Just your day, gently sorted.
            </span>
            <span className="text-white text-xs sm:text-sm font-medium sm:hidden">
              No noise. Just your day, gently sorted.
            </span>
            <button 
              type="button"
              className="bg-white text-black text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-md shrink-0"
            >
              Start for free
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <AboutSection />

      {/* SECTION 3: FEATURES */}
      <FeaturesSection />

    </div>
  );
}
