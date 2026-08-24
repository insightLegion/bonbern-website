"use client"

import React, { useState, useEffect, useRef } from "react"

export interface Frame {
  id: number
  title?: string
  description?: string
  stepNumber?: string
  video?: string
  image?: string
  defaultPos: { x: number; y: number; w?: number; h?: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize?: number
  borderThickness?: number
  borderSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  title?: string
  description?: string
  stepNumber?: string
  video?: string
  image?: string
  width: number | string
  height: number | string
  className?: string
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize?: number
  borderThickness?: number
  borderSize?: number
  showFrame?: boolean
  isHovered: boolean
}

function FrameComponent({
  title,
  description,
  stepNumber,
  video,
  image,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize = 1,
  borderThickness = 0,
  borderSize = 100,
  showFrame = false,
  isHovered,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {})
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [isHovered])

  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
        isHovered
          ? "border-[#e23028]/70 bg-white/[0.08] shadow-[0_12px_36px_rgba(226,48,40,0.2)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      } ${className}`}
      style={{
        width,
        height,
        transition: "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Media Background layer if video or image present */}
      {(video || image) && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${isHovered ? mediaSize * 1.05 : mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.4s ease-in-out",
            }}
          >
            {video ? (
              <video
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.5 : 0.15 }}
                src={video}
                loop
                muted
                playsInline
                ref={videoRef}
              />
            ) : image ? (
              <img
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.5 : 0.15 }}
                src={image}
                alt={title || "Frame image"}
              />
            ) : null}
          </div>
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-[2]" />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6 select-none">
        {/* Header Title (Centered when non-hovered, top-aligned when hovered) */}
        <div className={`transition-all duration-300 flex flex-col ${isHovered ? 'justify-start' : 'justify-center items-center my-auto'}`}>
          {stepNumber && (
            <span
              className={`font-subtitle text-[11px] uppercase tracking-widest text-[#e23028] font-semibold transition-all duration-300 block ${
                isHovered ? 'opacity-100 max-h-6 mb-1 translate-y-0' : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden mb-0'
              }`}
            >
              {stepNumber}
            </span>
          )}
          {title && (
            <h3
              className={`font-subtitle text-base sm:text-lg md:text-xl text-white font-semibold tracking-tight transition-all duration-300 ${
                isHovered ? 'text-left text-white' : 'text-center text-white/90'
              }`}
            >
              {title}
            </h3>
          )}
        </div>

        {/* Description - Appears ONLY on hover */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isHovered
              ? 'opacity-100 max-h-40 translate-y-0 mt-3'
              : 'opacity-0 max-h-0 translate-y-4 mt-0 pointer-events-none'
          }`}
        >
          {description && (
            <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10 pt-3">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Custom Decorative Corners/Edges if showFrame is true */}
      {showFrame && corner && edgeHorizontal && edgeVertical && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          <div
            className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${corner})` }}
          />
          <div
            className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
          />

          <div
            className="absolute top-0 left-16 right-16 h-16"
            style={{
              backgroundImage: `url(${edgeHorizontal})`,
              backgroundSize: "auto 64px",
              backgroundRepeat: "repeat-x",
            }}
          />
          <div
            className="absolute bottom-0 left-16 right-16 h-16"
            style={{
              backgroundImage: `url(${edgeHorizontal})`,
              backgroundSize: "auto 64px",
              backgroundRepeat: "repeat-x",
              transform: "rotate(180deg)",
            }}
          />
          <div
            className="absolute left-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url(${edgeVertical})`,
              backgroundSize: "64px auto",
              backgroundRepeat: "repeat-y",
            }}
          />
          <div
            className="absolute right-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url(${edgeVertical})`,
              backgroundSize: "64px auto",
              backgroundRepeat: "repeat-y",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      )}
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className = "",
  showFrames = false,
  hoverSize = 6,
  gapSize = 12,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  // Determine grid dimensions dynamically from frames
  const maxRowIndex = Math.max(...frames.map((f) => Math.floor(f.defaultPos.y / 4)), 0)
  const maxColIndex = Math.max(...frames.map((f) => Math.floor(f.defaultPos.x / 4)), 0)

  const numRows = maxRowIndex + 1
  const numCols = maxColIndex + 1

  const getRowSizes = () => {
    if (hovered === null) {
      return Array(numRows).fill("1fr").join(" ")
    }
    const { row } = hovered
    const totalRatio = numRows * 4
    const hoverRowShare = hoverSize
    const remainingShare = (totalRatio - hoverRowShare) / Math.max(numRows - 1, 1)

    return Array.from({ length: numRows }, (_, r) =>
      r === row ? `${hoverRowShare}fr` : `${remainingShare}fr`
    ).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return Array(numCols).fill("1fr").join(" ")
    }
    const { col } = hovered
    const totalRatio = numCols * 4
    const hoverColShare = hoverSize
    const remainingShare = (totalRatio - hoverColShare) / Math.max(numCols - 1, 1)

    return Array.from({ length: numCols }, (_, c) =>
      c === col ? `${hoverColShare}fr` : `${remainingShare}fr`
    ).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === maxRowIndex * 4 ? "bottom" : "center"
    const horizontal = x === 0 ? "left" : x === maxColIndex * 4 ? "right" : "center"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-[450px] sm:h-[500px] md:h-[540px] ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)
        const isCurrentlyHovered = hovered?.row === row && hovered?.col === col

        return (
          <div
            key={frame.id}
            className="relative w-full h-full overflow-hidden"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              title={frame.title}
              description={frame.description}
              stepNumber={frame.stepNumber}
              video={frame.video}
              image={frame.image}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={isCurrentlyHovered}
            />
          </div>
        )
      })}
    </div>
  )
}

export default DynamicFrameLayout
