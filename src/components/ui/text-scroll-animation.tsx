"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
};

export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.2, 0.7, 1]);

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-3 sm:w-4", className)}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
};

export const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

export const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain will-change-transform"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

export const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={cn("h-10 sm:h-12", className)}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

export const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  const text = "see more from ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const macIcon = [
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-white">
        {/* Шапка-подсказка */}
        <div className="top-22 absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
            Scroll to see more
          </span>
        </div>

        {/* Блок 1 — текст */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <div
            className="font-geist w-full max-w-4xl text-center text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-black"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                className="text-orange-500"
              />
            ))}
          </div>
        </div>

        {/* Блок 2 — иконки */}
        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <p className="font-geist flex items-center justify-center gap-3 text-xl sm:text-2xl font-medium tracking-tight text-black">
            <Bracket className="h-10 sm:h-12 text-black" />
            <span className="font-geist font-medium">integrate with your fav tech stack</span>
            <Bracket className="h-10 sm:h-12 scale-x-[-1] text-black" />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {macIcon.map((char, index) => (
              <CharacterV2
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress2}
              />
            ))}
          </div>
        </div>

        {/* Блок 3 — иконки (вариант с поворотом) */}
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <p className="font-geist flex items-center justify-center gap-3 text-xl sm:text-2xl font-medium tracking-tight text-black">
            <Bracket className="h-10 sm:h-12 text-black" />
            <span className="font-geist font-medium">integrate with your fav tech stack</span>
            <Bracket className="h-10 sm:h-12 scale-x-[-1] text-black" />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8" style={{ perspective: "500px" }}>
            {macIcon.map((char, index) => (
              <CharacterV3
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
        </div>
      </main>
    </ReactLenis>
  );
};

export interface BonBernTransitionSectionProps {
  className?: string;
}

export const BonBernTransitionSection = ({ className = "" }: BonBernTransitionSectionProps) => {
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: p1 } = useScroll({
    target: line1Ref,
    offset: ["start end", "center center"],
  });
  const { scrollYProgress: p2 } = useScroll({
    target: line2Ref,
    offset: ["start end", "center center"],
  });
  const { scrollYProgress: p3 } = useScroll({
    target: line3Ref,
    offset: ["start end", "center center"],
  });

  const line1 = "We work with celebrities to build iconic images.";
  const line2 = "We work with labels and brands to craft viral campaigns.";
  const line3 = "And we are passionate about solving real-world problems";
  const line3Highlight = "because we can, and we love it!";

  const chars1 = line1.split("");
  const chars2 = line2.split("");
  const chars3 = line3.split("");

  const c1 = Math.floor(chars1.length / 2);
  const c2 = Math.floor(chars2.length / 2);
  const c3 = Math.floor(chars3.length / 2);

  return (
    <section className={cn("w-full bg-[#070707] text-white relative overflow-hidden py-24 sm:py-32 md:py-40 px-6", className)}>
      {/* Scroll helper indicator */}
      <div className="flex justify-center mb-16 sm:mb-24">
        <span className="relative text-[11px] uppercase tracking-[0.25em] text-white/40 flex items-center gap-3">
          <span className="w-8 h-px bg-white/20"></span>
          Scroll to explore
          <span className="w-8 h-px bg-white/20"></span>
        </span>
      </div>

      <div className="max-w-5xl mx-auto space-y-24 sm:space-y-36 md:space-y-48">
        {/* LINE 1 */}
        <div
          ref={line1Ref}
          className="flex flex-col items-center justify-center text-center min-h-[40vh]"
        >
          <span className="text-xs uppercase tracking-widest text-[#D0362B] font-bold mb-4">
            01 / Persona & Image
          </span>
          <div
            className="font-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            style={{ perspective: "600px" }}
          >
            {chars1.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={c1}
                scrollYProgress={p1}
                className="text-white hover:text-[#D0362B] transition-colors"
              />
            ))}
          </div>
        </div>

        {/* LINE 2 */}
        <div
          ref={line2Ref}
          className="flex flex-col items-center justify-center text-center min-h-[40vh]"
        >
          <span className="text-xs uppercase tracking-widest text-[#D0362B] font-bold mb-4">
            02 / Viral Movements
          </span>
          <div
            className="font-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/90 leading-tight"
            style={{ perspective: "600px" }}
          >
            {chars2.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={c2}
                scrollYProgress={p2}
                className="text-white hover:text-[#D0362B] transition-colors"
              />
            ))}
          </div>
        </div>

        {/* LINE 3 */}
        <div
          ref={line3Ref}
          className="flex flex-col items-center justify-center text-center min-h-[45vh] space-y-6"
        >
          <span className="text-xs uppercase tracking-widest text-[#D0362B] font-bold">
            03 / Purpose & Passion
          </span>
          <div
            className="font-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            style={{ perspective: "600px" }}
          >
            {chars3.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={c3}
                scrollYProgress={p3}
                className="text-white"
              />
            ))}
          </div>

          {/* Styled Brackets Callout */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
            <Bracket className="h-8 sm:h-12 text-[#D0362B]" />
            <span className="font-subtitle text-lg sm:text-2xl md:text-3xl font-bold italic text-[#D0362B] tracking-wide">
              {line3Highlight}
            </span>
            <Bracket className="h-8 sm:h-12 scale-x-[-1] text-[#D0362B]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skiper31;
