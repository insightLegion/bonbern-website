"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export interface MenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface FloatingMenuProps {
  items?: MenuItem[];
  className?: string;
}

function MenuButton({
  label,
  onClick,
  isOpen,
  index,
}: {
  label: string;
  onClick?: () => void;
  isOpen: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);
  const pendingLeaveRef = useRef(false);
  const chars = label.split("");
  const lockDuration = 30 * chars.length + 300;

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="text-[#f7f1ed] text-[20px] sm:text-[22px] uppercase leading-none overflow-hidden cursor-pointer w-full text-center"
      style={{
        fontFamily: "'Trobika', 'Bebas Neue', 'Avenir Next', sans-serif",
        letterSpacing: "-0.02em",
        height: "1em",
      }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isOpen ? 0.25 + 0.05 * index : 0,
        ease,
      }}
    >
      <div className="flex justify-center">
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em" }}
          >
            <span
              className="flex flex-col"
              style={{
                transitionProperty: "transform",
                transitionDuration: hovered ? "800ms" : "0ms",
                transitionDelay: hovered ? `${30 * i}ms` : "0ms",
                transform: hovered ? "translateY(-50%)" : "translateY(0%)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span
                className="block"
                style={{ height: "1em", lineHeight: "1em" }}
              >
                {char}
              </span>
              <span
                className="block text-[#D0362B]"
                style={{ height: "1em", lineHeight: "1em" }}
                aria-hidden
              >
                {char}
              </span>
            </span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

export default function FloatingMenu({ items, className }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = items ?? [
    { label: "Home" },
    { label: "About" },
    { label: "Process" },
    { label: "Partners" },
    { label: "Founder" },
  ];

  const menuHeight = Math.max(270, menuItems.length * 42 + 70);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <motion.div
      ref={containerRef}
      className={`fixed top-6 left-1/2 z-[100] ${className || ""}`}
      style={{ x: "-50%", pointerEvents: "auto" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className="relative overflow-hidden flex flex-col shadow-2xl"
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
        style={{
          fontFamily: "'Aeonik TRIAL', 'Inter', sans-serif",
          letterSpacing: "-0.02em",
          cursor: isOpen ? "default" : "pointer",
        }}
        animate={{
          width: isOpen ? 280 : 155,
          height: isOpen ? menuHeight : 48,
          borderRadius: isOpen ? 28 : 72,
          scale: 1,
        }}
        whileHover={isOpen ? undefined : { scale: 1.05 }}
        transition={{
          duration: 0.7,
          ease,
          height: { duration: isOpen ? 0.7 : 0.2 },
          scale: { duration: 0.25, ease },
        }}
      >
        {/* Full Red background layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isOpen ? "#D0362B" : "#D0362B",
            borderColor: isOpen ? "#b82a20" : "#b82a20",
          }}
          transition={{ duration: isOpen ? 0.1 : 0.3, ease }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: "inherit",
          }}
        />

        {/* Dark circle expanding from top - completely hidden when collapsed */}
        <motion.div
          className="absolute left-1/2 bg-[#121212] pointer-events-none"
          style={{
            width: "240%",
            height: "240%",
            borderRadius: "50%",
            x: "-50%",
          }}
          animate={{
            top: isOpen ? "-20%" : "-260%",
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease,
            delay: isOpen ? 0.05 : 0,
          }}
        />

        {/* Top bar: Menu label + hamburger icon */}
        <motion.div
          className="relative z-20 flex items-center justify-between w-full shrink-0 cursor-pointer px-5 h-12"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          style={{ alignItems: "center" }}
        >
          <motion.span
            className="text-[15px] sm:text-[16px] font-bold uppercase tracking-wider leading-none select-none text-white"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
          >
            Menu
          </motion.span>

          <div className="relative w-[24px] h-[24px] flex items-center justify-center">
            <motion.span
              className="absolute block w-[18px] h-[2px] bg-white rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
              }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              className="absolute block w-[18px] h-[2px] bg-white rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
              }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
        </motion.div>

        {/* Menu items unfolding downwards */}
        <div
          className="relative z-10 flex flex-col gap-3.5 items-center justify-center pt-2 pb-6 px-4"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            flex: isOpen ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {menuItems.map((item, idx) => (
            <MenuButton
              key={item.label}
              label={item.label}
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsOpen(false);
              }}
              isOpen={isOpen}
              index={idx}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export { FloatingMenu as LiquidMorphFloatingMenu };
