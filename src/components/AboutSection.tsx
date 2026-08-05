import React from 'react';
import { Mail, Plus } from 'lucide-react';

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative z-20 rounded-t-[25px] py-20 md:py-32 px-6"
      style={{ backgroundColor: '#F6E4CF' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Top Area */}
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          <p 
            className="text-base md:text-lg text-center leading-relaxed max-w-lg"
            style={{ color: '#321C04' }}
          >
            We craft tools that move with your rhythm, not over it. Designed for ease, presence, and flow.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Say Hello Button */}
            <button 
              type="button"
              className="rounded-full pl-2 pr-6 py-2 flex items-center gap-3 transition-colors duration-200 cursor-pointer shadow-sm hover:opacity-95"
              style={{ backgroundColor: '#321C04', color: '#FFF9F2' }}
            >
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFF9F2', color: '#321C04' }}
              >
                <Mail size={16} />
              </span>
              <span className="text-xs uppercase tracking-wide font-medium">
                Say hello
              </span>
            </button>

            {/* Stay Informed Button */}
            <button 
              type="button"
              className="rounded-full pl-2 pr-6 py-2 flex items-center gap-3 transition-colors duration-200 cursor-pointer shadow-sm hover:opacity-95"
              style={{ backgroundColor: '#D9C4AA', color: '#321C04' }}
            >
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFF9F2', color: '#321C04' }}
              >
                <Plus size={16} />
              </span>
              <span className="text-xs uppercase tracking-wide font-medium">
                Stay informed
              </span>
            </button>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="w-full flex items-center gap-2 my-2">
          <div 
            className="w-2 h-2 rounded-full shrink-0" 
            style={{ backgroundColor: '#D9C4AA' }}
          />
          <div 
            className="flex-1 h-[2px]" 
            style={{ backgroundColor: '#D9C4AA' }}
          />
          <div 
            className="w-2 h-2 rounded-full shrink-0" 
            style={{ backgroundColor: '#D9C4AA' }}
          />
        </div>

        {/* Bottom Area */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-4 shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 256 256" 
              fill="none"
              style={{ color: '#321C04' }}
            >
              <path 
                d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" 
                fill="currentColor" 
              />
            </svg>
            <div 
              className="text-xs uppercase tracking-widest font-semibold leading-tight"
              style={{ color: '#321C04' }}
            >
              Calm /<br />Amplified
            </div>
          </div>

          {/* Right Main Paragraph */}
          <div className="max-w-3xl">
            <p 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal"
              style={{ color: '#321C04' }}
            >
              We make AI tools and assistants. But, most importantly, we help you remember what gentle productivity looks like when software moves with you, not over you. We create systems that carry the cognitive weight, so you can attend to what truly counts.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
