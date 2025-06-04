"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  color?: string
  colors?: string[]
  multiline?: boolean
  type?: "normal" | "bell" | "triangle" | "wave" | "flat"
}

export function LineChart({
  color = "#ff0000",
  colors = ["#ff0000", "#00ff00", "#0000ff"],
  multiline = false,
  type = "normal",
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5

    // Vertical grid lines
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw chart based on type
    if (multiline) {
      // Draw multiple lines
      colors.forEach((lineColor, index) => {
        drawLine(ctx, rect.width, rect.height, lineColor, type, index)
      })
    } else {
      // Draw single line
      drawLine(ctx, rect.width, rect.height, color, type)
    }
  }, [color, colors, multiline, type])

  // Function to draw a line based on type
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
    type: string,
    offset = 0,
  ) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()

    const padding = 10
    const effectiveWidth = width - padding * 2
    const effectiveHeight = height - padding * 2
    const midHeight = height / 2

    switch (type) {
      case "bell":
        // Bell curve
        for (let x = 0; x < effectiveWidth; x++) {
          const xPos = x + padding
          const variance = 0.15 + offset * 0.05
          const bellValue = Math.exp(-Math.pow((x - effectiveWidth / 2) / (effectiveWidth * variance), 2))
          const yPos = midHeight - bellValue * (effectiveHeight / 2) + offset * 10

          if (x === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
        break

      case "triangle":
        // Triangle shape
        ctx.moveTo(padding, height - padding)
        ctx.lineTo(width / 2, padding)
        ctx.lineTo(width - padding, height - padding)
        break

      case "wave":
        // Wavy line
        for (let x = 0; x < effectiveWidth; x++) {
          const xPos = x + padding
          const frequency = 0.02 + offset * 0.01
          const amplitude = effectiveHeight / 4
          const yPos = midHeight + Math.sin(x * frequency) * amplitude + offset * 5

          if (x === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
        break

      case "flat":
        // Mostly flat line with small variations
        for (let x = 0; x < effectiveWidth; x++) {
          const xPos = x + padding
          const noise = Math.random() * 5
          const yPos = midHeight + noise + offset * 10

          if (x === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
        break

      default:
        // Normal line with some randomness
        for (let x = 0; x < effectiveWidth; x++) {
          const xPos = x + padding
          const randomFactor = Math.sin(x * 0.05) * (effectiveHeight / 4)
          const trend = (x / effectiveWidth) * (effectiveHeight / 3)
          const yPos = midHeight - randomFactor - trend + offset * 15

          if (x === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
    }

    ctx.stroke()
  }

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
}
