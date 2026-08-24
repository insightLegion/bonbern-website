"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Ember CTA button. A dark #2a2a2a base whose face holds a
// 3px-cell doom-fire canvas: when `lit`, molten red fire fills the button from the
// bottom like a liquid gauge (exponential ease, churning waterline), hovering
// bends the flames toward the cursor, pressing fires a burst pulse. The label
// dims to 40% white while the fire is out.

const STEPS = 38
const CELL = 3
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Red doom-fire palette for BonBern branding (#e23028 / crimson to bright ruby core)
function buildPalette(alpha: number) {
  const p = new Uint8Array(STEPS * 4)
  for (let s = 0; s < STEPS; s++) {
    const t = s / (STEPS - 1)
    let r: number
    let g: number
    let b: number
    if (t < 0.4) {
      const e = t / 0.4
      r = lerp(110, 200, e)
      g = lerp(10, 30, e)
      b = lerp(10, 25, e)
    } else if (t < 0.75) {
      const e = (t - 0.4) / 0.35
      r = lerp(200, 245, e)
      g = lerp(30, 65, e)
      b = lerp(25, 45, e)
    } else {
      const e = (t - 0.75) / 0.25
      r = 255
      g = lerp(65, 200, e)
      b = lerp(45, 170, e)
    }
    p[s * 4] = Math.round(r)
    p[s * 4 + 1] = Math.round(g)
    p[s * 4 + 2] = Math.round(b)
    p[s * 4 + 3] = Math.round(t ** 1.2 * alpha)
  }
  return p
}

function FireCanvas({
  litRef,
  hoverRef,
  pressedRef,
}: {
  litRef: React.RefObject<boolean>
  hoverRef: React.RefObject<boolean>
  pressedRef: React.RefObject<boolean>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cols = Math.max(8, Math.ceil((canvas.offsetWidth || 160) / CELL))
    const rows = Math.max(8, Math.ceil((canvas.offsetHeight || 38) / CELL))
    canvas.width = cols
    canvas.height = rows

    const palette = buildPalette(180)
    const heat = new Uint8Array(cols * rows)
    const waterline = new Float32Array(cols)
    let maxHeat = 0
    let pointerX = cols / 2
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0) pointerX = ((e.clientX - rect.left) / rect.width) * cols
    }
    const parent = canvas.parentElement
    parent?.addEventListener("pointermove", onMove)

    const img = ctx.createImageData(cols, rows)
    let level = litRef.current ? 1 : 0

    // First paint synchronously: a lit button is molten from frame zero
    if (level === 1) {
      const d = img.data
      for (let o = 0; o < d.length; o += 4) {
        d[o] = 226
        d[o + 1] = 48
        d[o + 2] = 40
        d[o + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }

    let raf = 0
    let lastT = 0
    let acc = 0
    let burst = 0
    let wasPressed = false
    let alive = true
    const TICK = 1000 / 30

    const step = (t: number) => {
      if (!alive) return
      raf = requestAnimationFrame(step)
      lastT ||= t
      const dt = Math.min(64, t - lastT)
      lastT = t

      // Fill level eases toward the lit state.
      if (litRef.current) level += (1 - level) * (1 - Math.exp(-dt / 240))
      else if (level > 0) {
        level += (0 - level) * (1 - Math.exp(-dt / 320))
        if (level < 0.02) level = 0
      }

      acc += dt
      if (acc >= TICK) {
        acc %= TICK

        // Churning waterline: random walk per column, smoothed 1-2-1.
        for (let x = 0; x < cols; x++) {
          waterline[x] = Math.max(
            -4,
            Math.min(4, (waterline[x] ?? 0) + (Math.random() - 0.5) * 1.6),
          )
        }
        for (let x = 1; x < cols - 1; x++) {
          waterline[x] =
            ((waterline[x - 1] ?? 0) + (waterline[x] ?? 0) * 2 + (waterline[x + 1] ?? 0)) /
            4
        }

        // Propagate upward; cooling is harsher while unlit.
        const cool = litRef.current ? 0 : 1
        for (let y = 0; y < rows - 1; y++) {
          for (let x = 0; x < cols; x++) {
            const src = (y + 1) * cols + x
            const dst =
              y * cols +
              Math.min(cols - 1, Math.max(0, x + ((Math.random() * 3) | 0) - 1))
            const v = (heat[src] ?? 0) - (1 + cool + ((Math.random() * 2.4) | 0))
            heat[dst] = v > 0 ? v : 0
          }
        }

        const churn = level * (1 - level) * 4
        const fill = level * (rows + 6)

        // Press pulse: spikes on press, sustains while held, decays after.
        if (pressedRef.current && !wasPressed) burst = 1
        wasPressed = !!pressedRef.current
        burst = pressedRef.current ? Math.max(burst * 0.86, 0.45) : burst * 0.8

        if (litRef.current) {
          for (let x = 0; x < cols; x++) {
            const h = fill + (waterline[x] ?? 0) * (0.4 + churn)
            const surface = rows - 1 - Math.floor(h)
            // The molten surface line burns at max heat.
            if (level > 0.02 && surface >= 0 && surface < rows) {
              heat[surface * cols + x] = STEPS - 1
              if (surface + 1 < rows) heat[(surface + 1) * cols + x] = STEPS - 1
            }
            if (level > 0.97) {
              if (burst > 0.05) {
                heat[(rows - 1) * cols + x] = STEPS - 1
                heat[(rows - 2) * cols + x] = STEPS - 1
                if (rows > 2 && Math.random() < burst)
                  heat[(rows - 3) * cols + x] = STEPS - 1
                if (Math.random() < burst * 0.3)
                  heat[((Math.random() * rows) | 0) * cols + x] = STEPS - 1
              } else if (hoverRef.current) {
                heat[(rows - 1) * cols + x] = STEPS - 1
                if (Math.random() < 0.7) heat[(rows - 2) * cols + x] = STEPS - 2
                const d = x - pointerX
                const near = Math.exp(-(d * d) / 18)
                if (near > 0.35 && rows > 2) heat[(rows - 3) * cols + x] = STEPS - 1
                if (near > 0.7 && rows > 3) heat[(rows - 4) * cols + x] = STEPS - 3
              } else if (Math.random() < 0.55) {
                heat[(rows - 1) * cols + x] =
                  Math.random() < 0.5 ? STEPS - 11 : STEPS - 17
              }
            }
          }
        }
      }

      if (level === 0 && maxHeat === 0) {
        ctx.clearRect(0, 0, cols, rows)
        return
      }

      // Render: solid molten red body below the fill line, translucent flames above it.
      maxHeat = 0
      const d = img.data
      const churn = level * (1 - level) * 4
      const fill = level * (rows + 6)
      for (let x = 0; x < cols; x++) {
        const h = fill + (waterline[x] ?? 0) * (0.4 + churn)
        for (let y = 0; y < rows; y++) {
          const idx = y * cols + x
          const o = idx * 4
          const v = heat[idx] ?? 0
          if (v > maxHeat) maxHeat = v
          const pi = v * 4
          const a = palette[pi + 3]!
          if (rows - y <= h) {
            d[o] = 226 + (((palette[pi]! - 226) * a) >> 8)
            d[o + 1] = 48 + (((palette[pi + 1]! - 48) * a) >> 8)
            d[o + 2] = 40 + (((palette[pi + 2]! - 40) * a) >> 8)
            d[o + 3] = 255
          } else {
            d[o] = palette[pi]!
            d[o + 1] = palette[pi + 1]!
            d[o + 2] = palette[pi + 2]!
            d[o + 3] = a
          }
        }
      }
      ctx.putImageData(img, 0, 0)
    }
    raf = requestAnimationFrame(step)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      parent?.removeEventListener("pointermove", onMove)
    }
  }, [litRef, hoverRef, pressedRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]"
    />
  )
}

export function PixelFireButton({
  children,
  lit = true,
  variant = "primary",
  className,
  style,
  overlay,
  tabIndex,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  /** Fire on or out. Out = dark base, dimmed label, embers dying. */
  lit?: boolean
  variant?: "primary" | "ghost"
  className?: string
  /** Merged into the button style, e.g. the width morph while submitting */
  style?: React.CSSProperties
  /** Absolute layers over the fire, e.g. spinner and success check */
  overlay?: React.ReactNode
  tabIndex?: number
  type?: "button" | "submit"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {
  const litRef = useRef(lit)
  const hoverRef = useRef(false)
  const pressedRef = useRef(false)
  litRef.current = lit

  if (variant === "ghost") {
    return (
      <button
        type={type ?? "button"}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-[38px] items-center justify-center gap-2 rounded-md border border-[#f4f1ea]/15 bg-[#16140f] px-4 font-subtitle text-sm font-semibold tracking-[-0.015em] text-[#f4f1ea]",
          "transition-[scale,border-color,box-shadow,color] duration-150 active:scale-[0.985]",
          "hover:border-[#e23028]/40 hover:text-[#ffb4b0]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e23028]",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => {
        hoverRef.current = true
      }}
      onMouseLeave={() => {
        hoverRef.current = false
        pressedRef.current = false
      }}
      onPointerDown={() => {
        pressedRef.current = true
      }}
      onPointerUp={() => {
        pressedRef.current = false
      }}
      tabIndex={tabIndex}
      style={{
        color: lit ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
        transition:
          "color 400ms ease, transform 120ms ease-out, width 380ms cubic-bezier(0.65, 0, 0.2, 1), padding 380ms cubic-bezier(0.65, 0, 0.2, 1)",
        ...style,
      }}
      className={cn(
        "relative inline-flex h-[38px] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-none bg-[#241f1f] px-4 font-subtitle text-sm font-semibold tracking-[-0.015em] shadow-[0_2px_12px_rgba(226,48,40,0.3)] active:scale-[0.985]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e23028]",
        disabled && "pointer-events-none",
        className,
      )}
    >
      <FireCanvas litRef={litRef} hoverRef={hoverRef} pressedRef={pressedRef} />
      <span className="relative z-10">{children}</span>
      {overlay}
    </button>
  )
}

// Section-wide fire band: doom-fire on a 10px grid with a rolling
// sine crest, pointer wind and plus-lighter compositing. Pin it to the bottom
// of any relative dark section.

const BAND_STEPS = 38
const bandLerp = (a: number, b: number, t: number) => a + (b - a) * t

type RGB = [number, number, number]

// Deep indigo -> electric violet -> pale lilac.
const VIOLET_STOPS: [RGB, RGB, RGB, RGB] = [
  [28, 16, 96],
  [78, 40, 210],
  [168, 110, 255],
  [232, 210, 255],
]

function buildBandPalette(alpha: number, stops: [RGB, RGB, RGB, RGB]) {
  const [s0, s1, s2, s3] = stops
  const p = new Uint8Array(BAND_STEPS * 4)
  for (let s = 0; s < BAND_STEPS; s++) {
    const t = s / (BAND_STEPS - 1)
    let rgb: RGB
    if (t < 0.4) {
      const e = t / 0.4
      rgb = [bandLerp(s0[0], s1[0], e), bandLerp(s0[1], s1[1], e), bandLerp(s0[2], s1[2], e)]
    } else if (t < 0.75) {
      const e = (t - 0.4) / 0.35
      rgb = [bandLerp(s1[0], s2[0], e), bandLerp(s1[1], s2[1], e), bandLerp(s1[2], s2[2], e)]
    } else {
      const e = (t - 0.75) / 0.25
      rgb = [bandLerp(s2[0], s3[0], e), bandLerp(s2[1], s3[1], e), bandLerp(s2[2], s3[2], e)]
    }
    p[s * 4] = rgb[0]
    p[s * 4 + 1] = rgb[1]
    p[s * 4 + 2] = rgb[2]
    p[s * 4 + 3] = Math.round(t ** 1.2 * alpha)
  }
  return p
}

export function FlameBand({
  height = 240,
  cell = 10,
  alpha = 85,
  speed = 30,
  wave = 1,
  wind = 1,
  stops = VIOLET_STOPS,
  className,
}: {
  /** Band height in px (flames occupy roughly the lower half of it) */
  height?: number
  /** Sim cell size in px, bigger = chunkier pixels */
  cell?: number
  /** Peak pixel alpha, 0-255. Low values + plus-lighter = soft glow */
  alpha?: number
  speed?: number
  /** Crest amplitude, 0 flattens the fire line */
  wave?: number
  /** Pointer wind strength, 0 disables */
  wind?: number
  /** Four gradient stops, dark to bright */
  stops?: [RGB, RGB, RGB, RGB]
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stopsRef = useRef(stops)
  stopsRef.current = stops

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const palette = buildBandPalette(alpha, stopsRef.current)
    let cols = 8
    let rows = 8
    let m = new Uint8Array(0)
    let img: ImageData | null = null
    let windArr = new Float32Array(0)

    const size = () => {
      cols = Math.max(8, Math.ceil(parent.clientWidth / cell))
      rows = Math.max(8, Math.ceil(height / cell))
      canvas.width = cols
      canvas.height = rows
      m = new Uint8Array(cols * rows)
      img = ctx.createImageData(cols, rows)
      windArr = new Float32Array(cols)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(parent)

    const pointer = { x: 0, y: 0, lastX: 0, vel: 0, active: false }
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = e.pointerType !== "touch"
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    let raf = 0
    let last = 0
    let running = true
    let visible = true

    const step = (tms: number) => {
      if (!running || !visible) return
      raf = requestAnimationFrame(step)
      if (tms - last < 1000 / speed) return
      last = tms
      const t = tms / 1000

      const crest = wave * (BAND_STEPS * 0.55)
      for (let x = 0; x < cols; x++) {
        const n =
          0.5 +
          0.5 *
            (Math.sin(x * 0.035 + t * 0.45) * 0.6 +
              Math.sin(x * 0.011 - t * 0.2) * 0.4)
        const ripple = Math.sin(x * 0.21 + t * 1.7) + Math.sin(x * 0.047 - t * 0.9)
        const jitter = (Math.random() * 6) | 0
        m[(rows - 1) * cols + x] = Math.max(
          0,
          Math.round(BAND_STEPS - 3 - crest * (1 - n) + ripple * 1.5 - jitter),
        )
      }

      pointer.vel = pointer.vel * 0.8 + (pointer.x - pointer.lastX) * 0.2
      pointer.lastX = pointer.x
      windArr.fill(0)
      if (wind > 0 && pointer.active && Math.abs(pointer.vel) > 0.5) {
        const rect = canvas.getBoundingClientRect()
        if (
          rect.width > 0 &&
          pointer.y >= rect.top - 120 &&
          pointer.y <= rect.bottom + 40 &&
          pointer.x >= rect.left - 100 &&
          pointer.x <= rect.right + 100
        ) {
          const px = ((pointer.x - rect.left) / rect.width) * cols
          const amp = Math.max(-1, Math.min(1, pointer.vel / 28)) * wind
          for (let x = 0; x < cols; x++) {
            const d = (x - px) / 20
            windArr[x] = amp * Math.exp(-d * d)
          }
        }
      }

      for (let y = 1; y < rows; y++) {
        const rowStart = y * cols
        for (let x = 0; x < cols; x++) {
          const idx = rowStart + x
          const v = m[idx] ?? 0
          const r4 = (Math.random() * 3.99) | 0
          let drift = r4 > 1 ? r4 - 2 : 0
          const w = windArr[x] ?? 0
          if (w !== 0 && Math.random() < Math.abs(w)) drift += w > 0 ? 1 : -1
          const decay = r4 & 1 ? 2 : 1
          const target = idx - cols + drift
          m[Math.max(0, Math.min(cols * rows - 1, target))] = v > decay ? v - decay : 0
        }
      }

      if (!img) return
      const d = img.data
      for (let i = 0, o = 0; i < cols * rows; i++, o += 4) {
        const pi = (m[i] ?? 0) * 4
        d[o] = palette[pi]!
        d[o + 1] = palette[pi + 1]!
        d[o + 2] = palette[pi + 2]!
        d[o + 3] = palette[pi + 3]!
      }
      ctx.putImageData(img, 0, 0)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
      if (visible && running) {
        last = 0
        raf = requestAnimationFrame(step)
      }
    })
    io.observe(canvas)
    raf = requestAnimationFrame(step)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [height, cell, alpha, speed, wave, wind])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ height }}
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 w-full mix-blend-plus-lighter [image-rendering:pixelated]",
        className,
      )}
    />
  )
}

// Waitlist form. A 420px pill: email input + the red fire
// button. Invalid email shakes the pill and reddens the border. Submitting
// morphs the button to a square with a 12-tick spinner, then the typed email
// scrambles character by character into the confirmation line, each glyph
// locking in ember tone, the final period burning as a tiny pixel flame.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789"
const NBSP = "\u00A0"

type Status = "idle" | "processing" | "success"

// The matchstick flame that replaces the final period: a 6x6 doom-fire grid
// rendered into the bottom of a 6x13 canvas, sparks drifting up above it.
function FlamePeriod() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = 6
    canvas.height = 13

    const palette = new Uint8Array(96)
    const mix = (a: number, b: number, t: number) => a + (b - a) * t
    for (let s = 0; s < 24; s++) {
      const t = s / 23
      let r: number
      let g: number
      let b: number
      if (t < 0.4) {
        const e = t / 0.4
        r = mix(100, 200, e)
        g = mix(10, 30, e)
        b = mix(10, 25, e)
      } else if (t < 0.75) {
        const e = (t - 0.4) / 0.35
        r = mix(200, 245, e)
        g = mix(30, 65, e)
        b = mix(25, 45, e)
      } else {
        const e = (t - 0.75) / 0.25
        r = 255
        g = mix(65, 200, e)
        b = mix(45, 170, e)
      }
      palette[s * 4] = Math.round(r)
      palette[s * 4 + 1] = Math.round(g)
      palette[s * 4 + 2] = Math.round(b)
      palette[s * 4 + 3] = Math.round(t ** 1.2 * 255)
    }

    const heat = new Uint8Array(36)
    const sparks: { x: number; y: number; vy: number; vx: number; life: number }[] = []
    const img = ctx.createImageData(6, 13)
    let raf = 0
    let alive = true
    let lastT = 0
    let acc = 0
    const TICK = 1000 / 30

    const step = (t: number) => {
      if (!alive) return
      raf = requestAnimationFrame(step)
      lastT ||= t
      acc += t - lastT
      lastT = t
      if (acc < TICK) return
      acc %= TICK

      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 6; x++) {
          const src = (y + 1) * 6 + x
          const dst = y * 6 + Math.min(5, Math.max(0, x + ((Math.random() * 3) | 0) - 1))
          const v = (heat[src] ?? 0) - +(Math.random() < 0.55)
          heat[dst] = v > 0 ? v : 0
        }
      }
      for (let x = 0; x < 6; x++) {
        const edge = x === 0 || x === 5
        heat[30 + x] = edge
          ? Math.random() < 0.35
            ? 23
            : 0
          : Math.random() < 0.9
            ? 23
            : 18
      }
      if (sparks.length < 8 && Math.random() < 0.45) {
        sparks.push({
          x: 1.5 + Math.random() * 3,
          y: 7 + Math.random() * 1.5,
          vy: 0.45 + Math.random() * 0.5,
          vx: (Math.random() - 0.5) * 0.25,
          life: 1,
        })
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]!
        s.y -= s.vy
        s.x += s.vx
        s.life -= 0.08
        if (s.life <= 0 || s.y < 0) sparks.splice(i, 1)
      }

      const d = img.data
      d.fill(0)
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
          const pi = (heat[y * 6 + x] ?? 0) * 4
          const o = ((y + 7) * 6 + x) * 4
          d[o] = palette[pi]!
          d[o + 1] = palette[pi + 1]!
          d[o + 2] = palette[pi + 2]!
          d[o + 3] = palette[pi + 3]!
        }
      }
      for (const s of sparks) {
        const x = Math.round(s.x)
        const y = Math.round(s.y)
        if (x < 0 || x >= 6 || y < 0 || y >= 13) continue
        const o = (y * 6 + x) * 4
        const fade = 1 - s.life
        d[o] = 255
        d[o + 1] = Math.round(mix(80, 200, fade))
        d[o + 2] = Math.round(mix(60, 180, fade))
        d[o + 3] = Math.round(s.life * 255)
      }
      ctx.putImageData(img, 0, 0)
    }
    raf = requestAnimationFrame(step)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute [image-rendering:pixelated]"
      style={{ left: 4, bottom: 5.5, width: 6, height: 13 }}
    />
  )
}

type ScrambleCell = { ch: string; locked: boolean; show: boolean; scrambling: boolean }

// The typed email scrambles into the confirmation, glyph by glyph.
function ScrambleText({
  active,
  seed,
  to,
}: {
  active: boolean
  seed: string
  to: string
}) {
  const [cells, setCells] = useState<ScrambleCell[]>([])

  useEffect(() => {
    if (!active) {
      setCells([])
      return
    }
    const chars = Array.from(to, (target, i) => {
      const start = i * 16 + Math.random() * 40
      return {
        seed: seed[i] ?? "",
        to: target,
        isSpace: target === " ",
        start,
        end: start + 260 + Math.random() * 140,
        glyph: "",
        lastSwap: 0,
      }
    })
    let raf = 0
    let alive = true
    let t0 = 0
    const tick = (t: number) => {
      if (!alive) return
      t0 ||= t
      const elapsed = t - t0
      let done = 0
      setCells(
        chars.map((c) => {
          if (c.isSpace) {
            done++
            return { ch: NBSP, locked: true, show: true, scrambling: false }
          }
          if (elapsed >= c.end) {
            done++
            return { ch: c.to, locked: true, show: true, scrambling: false }
          }
          if (elapsed >= c.start) {
            if (t - c.lastSwap > 45) {
              c.glyph = GLYPHS[(Math.random() * 36) | 0]!
              c.lastSwap = t
            }
            return { ch: c.glyph, locked: false, show: true, scrambling: true }
          }
          return { ch: c.seed || NBSP, locked: false, show: c.seed !== "", scrambling: false }
        }),
      )
      if (done === chars.length) {
        alive = false
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [active, seed, to])

  return (
    <span className="whitespace-nowrap font-body">
      {cells.map((cell, i) => (
        <span key={i} className="relative inline-grid">
          <span className="invisible [grid-area:1/1]">{to[i] === " " ? NBSP : to[i]}</span>
          <span
            className="[grid-area:1/1]"
            style={{
              opacity: cell.show ? 1 : 0,
              color: cell.locked
                ? "#FF8F8F"
                : cell.scrambling
                  ? "#F3F1FF"
                  : "rgba(243, 241, 255, 0.4)",
              transition: "opacity 200ms ease, color 190ms ease",
            }}
          >
            {cell.locked && i === to.length - 1 && to[i] === "." ? (
              <FlamePeriod />
            ) : (
              cell.ch
            )}
          </span>
        </span>
      ))}
    </span>
  )
}

export function WaitlistInput({
  lit = true,
  placeholder = "you@company.com",
  buttonLabel = "Get early access",
  successMessage = "You're on the list, we'll be in touch.",
  className,
  onSubmit,
}: {
  /** Keeps the button fire burning even before interaction */
  lit?: boolean
  placeholder?: string
  buttonLabel?: string
  /** End it with a period to get the tiny pixel flame */
  successMessage?: string
  className?: string
  onSubmit?: (email: string) => void
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [seed, setSeed] = useState("")

  const busy = status !== "idle"

  const shake = () => {
    setError(true)
    formRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-9px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(-2px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 440, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" },
    )
    inputRef.current?.focus()
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (busy) return
        const email = inputRef.current?.value.trim() ?? ""
        if (!EMAIL_RE.test(email)) {
          shake()
          return
        }
        setSeed(email)
        setStatus("processing")
        onSubmit?.(email)
        window.setTimeout(() => setStatus("success"), 900)
      }}
      style={{
        borderColor: error
          ? "rgba(226, 48, 40, 0.7)"
          : focus
            ? "rgba(226, 48, 40, 0.4)"
            : "rgba(243, 241, 255, 0.1)",
      }}
      className={cn(
        "relative box-border inline-flex w-[420px] max-w-full items-center rounded-[10px] border bg-[#1B1838] p-[5px] pl-[18px] text-left shadow-[0_16px_50px_rgba(10,8,30,0.45)] transition-[border-color] duration-200",
        className,
      )}
    >
      <style>{`
        @keyframes ek-cta-spin { to { transform: rotate(360deg) } }
        @keyframes ek-cta-dot { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

      <input
        ref={inputRef}
        type="email"
        placeholder={placeholder}
        autoComplete="email"
        disabled={busy}
        aria-label="Email address"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={() => error && setError(false)}
        style={{
          opacity: status === "success" ? 0 : status === "processing" ? 0.5 : 1,
          cursor: busy ? "default" : "text",
        }}
        className="h-[38px] min-w-0 flex-1 border-none bg-transparent p-0 font-body text-sm tracking-[-0.005em] text-[#F3F1FF] outline-none transition-opacity duration-[120ms] placeholder:text-[#A8A3C7]/60"
      />

      {/* Success line scrambling in over the input */}
      <span
        aria-live="polite"
        style={{ opacity: status === "success" ? 1 : 0 }}
        className="pointer-events-none absolute inset-y-0 left-[18px] right-[52px] flex items-center overflow-hidden whitespace-nowrap font-body text-sm font-normal tracking-[-0.005em]"
      >
        <ScrambleText active={status === "success"} seed={seed} to={successMessage} />
      </span>

      <PixelFireButton
        type="submit"
        tabIndex={-1}
        lit={lit || busy}
        disabled={busy}
        style={busy ? { width: 38, paddingLeft: 0, paddingRight: 0 } : undefined}
        overlay={
          <>
            {/* 12-tick spinner */}
            <span
              aria-hidden
              style={{ opacity: status === "processing" ? 1 : 0 }}
              className="absolute inset-0 grid place-items-center transition-opacity duration-200"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="block origin-center [animation:ek-cta-spin_0.9s_steps(12)_infinite]"
              >
                {(
                  [
                    ["M12 19V22", 0.5],
                    ["M19.01 19L19 19", 0.63],
                    ["M5.01 19L5 19", 0.38],
                    ["M17.01 17L17 17", 0.63],
                    ["M7.01 17L7 17", 0.38],
                    ["M22.005 11.995L19.005 11.995", 0.75],
                    ["M5.005 11.995L2.005 11.995", 0.25],
                    ["M17.01 7L17 7", 0.88],
                    ["M7.01 7L7 7", 0.13],
                    ["M19.01 5L19 5", 0.88],
                    ["M5.01 5L5 5", 0.13],
                    ["M12 2V5", 1],
                  ] as const
                ).map(([d, o]) => (
                  <path
                    key={d}
                    d={d}
                    opacity={o}
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="square"
                    fill="none"
                  />
                ))}
              </svg>
            </span>
            {/* Dotted check on success */}
            <span
              aria-hidden
              style={{ opacity: status === "success" ? 1 : 0 }}
              className="absolute inset-0 grid place-items-center transition-opacity duration-[220ms]"
            >
              {status === "success" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {[
                    "M4 12H4.01",
                    "M6 14H6.01",
                    "M8 16H8.01",
                    "M10 18H10.01",
                    "M12 16H12.01",
                    "M14 14H14.01",
                    "M16 12H16.01",
                    "M18 10H18.01",
                    "M20 8H20.01",
                    "M22 6H22.01",
                  ].map((d, i) => (
                    <path
                      key={d}
                      d={d}
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="square"
                      fill="none"
                      style={{
                        opacity: 0,
                        animation: "ek-cta-dot 0.14s ease forwards",
                        animationDelay: `${i * 34}ms`,
                      }}
                    />
                  ))}
                </svg>
              )}
            </span>
          </>
        }
      >
        <span
          style={{ opacity: status === "idle" ? 1 : 0 }}
          className="transition-opacity duration-[140ms]"
        >
          {buttonLabel}
        </span>
      </PixelFireButton>
    </form>
  )
}

// Footer CTA: a deep-indigo closer with the violet doom-fire band burning
// across the bottom of the whole block, and the red fire button as the
// vibrant ember in the room. Strict BonBern typography and brand styling applied.

export function FooterCta({
  eyebrow = "last call",
  heading = "Join the waitlist.",
  sub = "Leave an email, we will hold your spot.",
  brand = "BonBern, est. 2026",
  links = [
    { label: "Changelog", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  note = "no spam, one launch email",
  flameHeight = 260,
  className,
}: {
  eyebrow?: string
  heading?: string
  sub?: string
  brand?: string
  links?: { label: string; href: string }[]
  note?: string
  flameHeight?: number
  className?: string
}) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-[#131126] text-[#F3F1FF]",
        "bg-[radial-gradient(90%_70%_at_50%_100%,#221D4E_0%,#161331_45%,#131126_100%)]",
        className,
      )}
    >
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-10 pt-24 text-center">
        <p className="font-subtitle text-[11px] font-medium uppercase tracking-[0.14em] text-[#A99CFF]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-title text-5xl font-bold tracking-tight text-white sm:text-6xl">
          {heading}
        </h2>
        <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-[#A8A3C7]">
          {sub}
        </p>
        <WaitlistInput className="mt-9" />

        <div className="mt-24 flex w-full flex-col items-center gap-4 border-t border-white/10 pt-6 font-body text-[13px] text-[#A8A3C7] sm:flex-row sm:justify-between">
          <span className="font-title italic font-medium">{brand}</span>
          <nav className="flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#F3F1FF]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="font-subtitle text-[11px] tracking-[0.08em]">{note}</span>
        </div>
      </div>

      <FlameBand height={flameHeight} />
    </footer>
  )
}
