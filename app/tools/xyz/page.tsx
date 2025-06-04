"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Play, Upload, CheckCircle2, X, Download } from "lucide-react"

export default function XYZTool() {
  const [files, setFiles] = useState<File[]>([])
  const [fileStatuses, setFileStatuses] = useState<{ name: string; uploaded: boolean; file: File }[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showGraphs, setShowGraphs] = useState(false)
  const [jobId, setJobId] = useState("JOB_" + Math.random().toString(36).substring(2, 10).toUpperCase())
  const [isJobIdEditing, setIsJobIdEditing] = useState(false)
  const [selectedGraph, setSelectedGraph] = useState<{ type: string; title: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Filter for CSV and TXT files
    const validFiles = newFiles.filter((file) => file.name.endsWith(".csv") || file.name.endsWith(".txt"))

    if (validFiles.length === 0) {
      toast({
        title: "Invalid file format",
        description: "Please upload CSV or TXT files only.",
        variant: "destructive",
      })
      return
    }

    setFiles((prev) => [...prev, ...validFiles])

    // Create file status entries with actual file data
    const newFileStatuses = validFiles.map((file) => ({
      name: file.name.length > 10 ? file.name.substring(0, 7) + "..." : file.name,
      uploaded: true, // Mark as uploaded since we have the file
      file: file,
    }))

    setFileStatuses((prev) => [...prev, ...newFileStatuses])

    // Read file contents for demonstration
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        console.log(`File ${file.name} content:`, content.substring(0, 200) + "...")
      }
      reader.readAsText(file)
    })

    toast({
      title: "Files uploaded successfully",
      description: `${validFiles.length} file(s) have been processed and are ready for analysis.`,
    })
  }

  const handleRun = () => {
    if (files.length === 0) {
      toast({
        title: "No files",
        description: "Please upload at least one file before running.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Processing",
      description: "Analyzing your data and generating graphs...",
    })

    // Simulate processing delay
    setTimeout(() => {
      setShowGraphs(true)
      toast({
        title: "Analysis Complete",
        description: "Graphs have been generated successfully from your data.",
      })
    }, 1500)
  }

  const handleJobIdClick = () => {
    setIsJobIdEditing(true)
  }

  const handleJobIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobId(e.target.value)
  }

  const handleJobIdBlur = () => {
    setIsJobIdEditing(false)
    if (!jobId.trim()) {
      setJobId("Enter job ID")
    }
    toast({
      title: "Job ID Updated",
      description: `Job ID has been set to ${jobId}`,
    })
  }

  const handleJobIdKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJobIdBlur()
    }
  }

  const openGraphPopup = (type: string, title: string) => {
    setSelectedGraph({ type, title })
  }

  const closeGraphPopup = () => {
    setSelectedGraph(null)
  }

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download Started",
      description: `Downloading ${file.name}`,
    })
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileStatuses((prev) => prev.filter((_, i) => i !== index))
    toast({
      title: "File Removed",
      description: "File has been removed from the upload list.",
    })
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      
    >
      <header className="w-full ">
        <h1 className="text-center text-5xl font-bold text-black bg-white my-6 py-4">XYZ</h1>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="flex justify-between items-start ">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Upload Your Data File</h2>
              <p className="text-gray-600 mt-2">
                Upload a CSV or TXT file containing your data. Once uploaded, click 'Run' to generate a graph based on
                the data.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Job ID:</span>
              {isJobIdEditing ? (
                <Input
                  value={jobId}
                  onChange={handleJobIdChange}
                  onBlur={handleJobIdBlur}
                  onKeyPress={handleJobIdKeyPress}
                  className="w-48 bg-white"
                  autoFocus
                />
              ) : (
                <Button
                  variant="outline"
                  className="bg-teal-600 hover:bg-teal-700 text-white border-teal-600"
                  onClick={handleJobIdClick}
                >
                  {jobId}
                </Button>
              )}
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center  bg-[#00B3DC]/20 transition-colors ${
              isDragging ? "border-blue-700 bg-blue-800/80" : "border-blue-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <button onClick={handleBrowseFiles} className="text-blue-600 font-medium mb-2 hover:underline">
              Browse Files
            </button>
            <p className="text-gray-600">Drag and drop your file or folder here.</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.txt"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          {/* File Status Indicators */}
          {fileStatuses.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Uploaded Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fileStatuses.map((fileStatus, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-800" title={fileStatus.file.name}>
                        {fileStatus.file.name}
                      </span>
                      <span className="text-xs text-gray-500">({(fileStatus.file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(fileStatus.file)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Button */}
          <div className="flex justify-center">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6" onClick={handleRun}>
              <Play className="mr-2 h-5 w-5" />
              Run Analysis
            </Button>
          </div>

          {/* Generated Graphs */}
          {showGraphs && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Generated Graphs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Graph 1 - Stacked Bar Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("stacked-bar", "Stacked Bar Chart - Complex_A1")}
                  >
                    <StackedBarChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 2 - Blue Area */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("blue-area", "Blue Area Chart - Complex_A1")}
                  >
                    <div className="w-full h-full bg-blue-700"></div>
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 3 - Line Chart with Red Line */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("line", "Line Chart - Complex_A1")}
                  >
                    <LineChart color="#ff0000" />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 4 - Multi-line Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("multi-line", "Multi-line Chart - Complex_A1")}
                  >
                    <MultiLineChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 5 - Bell Curve */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("bell-curve", "Bell Curve - Complex_A1")}
                  >
                    <BellCurveChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 6 - Line Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("line-2", "Line Chart 2 - Complex_A1")}
                  >
                    <LineChart color="#ff0000" />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 7 - Triangle Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("triangle", "Triangle Chart - Complex_A1")}
                  >
                    <TriangleChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 8 - Wavy Line Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("wave", "Wave Chart - Complex_A1")}
                  >
                    <WaveChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>

                {/* Graph 9 - Flat Line Chart */}
                <div className="space-y-2">
                  <div
                    className="bg-white rounded-md p-2 h-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openGraphPopup("flat-line", "Flat Line Chart - Complex_A1")}
                  >
                    <FlatLineChart />
                  </div>
                  <p className="text-center font-medium">Complex_A1</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Graph Popup Modal */}
      {selectedGraph && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">{selectedGraph.title}</h3>
              <Button variant="ghost" size="sm" onClick={closeGraphPopup} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <div className="bg-white rounded-md border h-96">
                {selectedGraph.type === "stacked-bar" && <StackedBarChart />}
                {selectedGraph.type === "blue-area" && <div className="w-full h-full bg-blue-700"></div>}
                {(selectedGraph.type === "line" || selectedGraph.type === "line-2") && <LineChart color="#ff0000" />}
                {selectedGraph.type === "multi-line" && <MultiLineChart />}
                {selectedGraph.type === "bell-curve" && <BellCurveChart />}
                {selectedGraph.type === "triangle" && <TriangleChart />}
                {selectedGraph.type === "wave" && <WaveChart />}
                {selectedGraph.type === "flat-line" && <FlatLineChart />}
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export Graph
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  )
}

// Chart Components (same as before but with better rendering)
function LineChart({ color = "#ff0000" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw line
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < rect.width; x++) {
      const y = rect.height / 2 + Math.sin(x * 0.05) * (rect.height / 4) + Math.random() * 20 - 10
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }, [color])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function StackedBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw stacked bars
    const colors = ["#a8e0a8", "#f8e3a8", "#f8b8b8"]
    const barCount = 10
    const barWidth = rect.width / barCount - 4

    for (let i = 0; i < barCount; i++) {
      let currentHeight = 0
      colors.forEach((color, index) => {
        const segmentHeight = (rect.height / 3) * (1 - index * 0.2) + Math.random() * 20
        const x = i * (barWidth + 4)
        const y = rect.height - currentHeight - segmentHeight

        ctx.fillStyle = color
        ctx.fillRect(x, y, barWidth, segmentHeight)
        currentHeight += segmentHeight
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function MultiLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw multiple lines
    const colors = ["#ff0000", "#00ff00", "#0000ff"]
    colors.forEach((color, index) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < rect.width; x++) {
        const y = rect.height / 2 + Math.sin(x * 0.03 + index) * (rect.height / 6) + index * 10
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function BellCurveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw bell curves
    const colors = ["#ff0000", "#0000ff"]
    colors.forEach((color, index) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < rect.width; x++) {
        const variance = 0.15 + index * 0.05
        const bellValue = Math.exp(-Math.pow((x - rect.width / 2) / (rect.width * variance), 2))
        const y = rect.height - bellValue * (rect.height * 0.8) - 20 + index * 10

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function TriangleChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw triangle
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(10, rect.height - 10)
    ctx.lineTo(rect.width / 2, 10)
    ctx.lineTo(rect.width - 10, rect.height - 10)
    ctx.stroke()
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function WaveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw wave
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < rect.width; x++) {
      const y = rect.height / 2 + Math.sin(x * 0.02) * (rect.height / 4)
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function FlatLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 0.5
    for (let i = 0; i < rect.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(rect.width, i)
      ctx.stroke()
    }

    // Draw flat line with small variations
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 2
    ctx.beginPath()

    const baseY = rect.height / 2
    for (let x = 0; x < rect.width; x++) {
      const y = baseY + Math.random() * 10 - 5
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
