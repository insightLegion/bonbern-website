import React, { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm flex flex-col items-center">
      {/* Floating Pill */}
      <div 
        className="w-full bg-white rounded-full shadow-lg px-6 py-3.5 flex items-center justify-between cursor-pointer select-none transition-shadow hover:shadow-xl"
        onClick={toggleMenu}
      >
        <span className="text-lg font-bold tracking-tight text-black">Drift.</span>
        
        {/* Animated Hamburger Icon */}
        <button 
          type="button"
          aria-label="Toggle menu"
          className="relative w-6 h-5 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
        >
          <span 
            className={`w-5 h-[2px] bg-black transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpen ? 'rotate-45 translate-y-[4px]' : ''
            }`}
          />
          <span 
            className={`w-5 h-[2px] bg-black transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpen ? '-rotate-45 -translate-y-[4px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`w-full mt-2 bg-white rounded-2xl p-4 shadow-xl border border-black/5 flex flex-col gap-1 transition-all duration-300 ease-out origin-top ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="text-left px-4 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('features')}
          className="text-left px-4 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
        >
          Drift AI
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="text-left px-4 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
        >
          FAQ
        </button>
      </div>
    </nav>
  );
}
