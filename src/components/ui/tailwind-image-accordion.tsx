"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

export interface TeamMemberItem {
  id: string
  url: string
  title: string
  description: string
  tags?: string[]
}

const defaultTeamItems: TeamMemberItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    title: "Adrian Paul",
    description: "COO & Co-Founder",
    tags: ["Strategy", "Operations", "Consultancy"],
  },
  {
    id: "2",
    url: "/images/akashraj_image.jpg",
    title: "Aakashraj Kusum Ambre",
    description: "Founder & CEO",
    tags: ["Behavioural Science", "Brand Image", "Think Tank"],
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    title: "Naymur Rahman",
    description: "CTO & Co-Founder",
    tags: ["Tech Architecture", "Creative AI", "Execution"],
  },
]

export function TailwindImageAccordion({
  items = defaultTeamItems,
  className,
}: {
  items?: TeamMemberItem[]
  className?: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div
      className={cn(
        "group flex w-full max-w-5xl flex-col justify-center gap-3.5 mx-auto my-6 md:flex-row md:h-[450px]",
        className,
      )}
    >
      {items.map((item, i) => {
        const isHoveredOrActive = activeId === item.id

        return (
          <article
            key={item.id || item.title}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(item.id)}
            onBlur={() => setActiveId(null)}
            tabIndex={0}
            className={cn(
              "group/article relative h-72 md:h-full w-full overflow-hidden rounded-2xl cursor-pointer select-none",
              "transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)]",
              // Default flex distribution: equal, or on hover hovered gets flex-[3.2] while others get flex-[0.8]
              "md:flex-1 md:hover:flex-[3.2] md:focus-within:flex-[3.2]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e23028]",
              // Gradient shadow overlay at the bottom for text legibility
              "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-1/2 before:z-[5]",
              "before:bg-gradient-to-t before:from-black/85 before:via-black/40 before:to-transparent",
              "before:transition-opacity before:duration-300",
              "md:before:opacity-0 md:hover:before:opacity-100 md:focus-within:before:opacity-100",
              // Blur & frosted glass overlay for inactive items when group is hovered
              "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:z-[6]",
              "after:bg-black/25 after:backdrop-blur-md after:transition-all after:duration-400 after:opacity-0",
              "md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100",
              "border border-white/10 hover:border-[#e23028]/60 shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
            )}
          >
            {/* Text Overlay (Name + Role) positioned bottom-left */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 text-white">
              {/* Title / Name (Unageo font) */}
              <h3
                className={cn(
                  "font-subtitle text-base md:text-lg font-semibold tracking-wide text-white/90",
                  "transition-all duration-300 ease-[cubic-bezier(.25,1,.5,1)]",
                  "md:translate-y-3 md:opacity-0 md:group-hover/article:translate-y-0 md:group-hover/article:opacity-100",
                  "md:group-focus-within/article:translate-y-0 md:group-focus-within/article:opacity-100",
                  "group-hover/article:delay-150 group-focus-within/article:delay-150",
                )}
              >
                {item.title}
              </h3>

              {/* Description / Role (Avenir Next Bold font) */}
              <p
                className={cn(
                  "font-title text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mt-1",
                  "transition-all duration-300 ease-[cubic-bezier(.25,1,.5,1)]",
                  "md:translate-y-4 md:opacity-0 md:group-hover/article:translate-y-0 md:group-hover/article:opacity-100",
                  "md:group-focus-within/article:translate-y-0 md:group-focus-within/article:opacity-100",
                  "group-hover/article:delay-250 group-focus-within/article:delay-250",
                )}
              >
                {item.description}
              </p>

              {/* Tags / Keywords (Louis George Cafe font) */}
              {item.tags && item.tags.length > 0 && (
                <div
                  className={cn(
                    "flex flex-wrap gap-2 mt-3 font-body text-xs text-white/70",
                    "transition-all duration-300 ease-[cubic-bezier(.25,1,.5,1)]",
                    "md:translate-y-4 md:opacity-0 md:group-hover/article:translate-y-0 md:group-hover/article:opacity-100",
                    "md:group-focus-within/article:translate-y-0 md:group-focus-within/article:opacity-100",
                    "group-hover/article:delay-300 group-focus-within/article:delay-300",
                  )}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Photo / Image */}
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover object-center",
                "transition-transform duration-700 ease-out group-hover/article:scale-105",
              )}
            />
          </article>
        )
      })}
    </div>
  )
}

export default TailwindImageAccordion
