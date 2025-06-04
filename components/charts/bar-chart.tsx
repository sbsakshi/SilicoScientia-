"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  type?: "normal" | "stacked"
  colors?: string[]
}

export function BarChart({ type = "normal", colors = ["#4CAF50", "#FFC107", "#F44336"] }: BarChartProps) {
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
    if (type === "stacked") {
      drawStackedBarChart(ctx, rect.width, rect.height, colors)
    } else {
      drawBarChart(ctx, rect.width, rect.height, colors[0])
    }
  }, [type, colors])

  // Function to draw a regular bar chart
  const drawBarChart = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string) => {
    const padding = 10
    const effectiveWidth = width - padding * 2
    const effectiveHeight = height - padding * 2
    const barCount = 10
    const barWidth = effectiveWidth / barCount - 4

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * (effectiveHeight * 0.8) + effectiveHeight * 0.2
      const x = padding + i * (barWidth + 4)
      const y = height - padding - barHeight

      ctx.fillStyle = color
      ctx.fillRect(x, y, barWidth, barHeight)
    }
  }

  // Function to draw a stacked bar chart
  const drawStackedBarChart = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: string[]) => {
    const padding = 10
    const effectiveWidth = width - padding * 2
    const effectiveHeight = height - padding * 2
    const barCount = 10
    const barWidth = effectiveWidth / barCount - 4

    for (let i = 0; i < barCount; i++) {
      let currentHeight = 0

      // Draw each segment of the stacked bar
      colors.forEach((color, index) => {
        // Calculate segment height (decreasing as we go up)
        const segmentHeightFactor = 0.7 - index * 0.2
        const segmentHeight = Math.random() * (effectiveHeight * 0.3) + effectiveHeight * segmentHeightFactor

        const x = padding + i * (barWidth + 4)
        const y = height - padding - currentHeight - segmentHeight

        ctx.fillStyle = color
        ctx.fillRect(x, y, barWidth, segmentHeight)

        currentHeight += segmentHeight
      })
    }
  }

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
}
