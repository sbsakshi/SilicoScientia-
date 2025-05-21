"use client"

import  React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Info, Play, Download, Loader2 } from "lucide-react"

export default function MolecularPredictionTool() {
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  // Sample table data
  const tableData = [
    { id: 1, name: "Complex_A1", score: 445, reScore: 600, revisedPoseNumber: 5 },
    { id: 2, name: "Complex_A1", score: 445, reScore: 600, revisedPoseNumber: 5 },
    { id: 3, name: "Complex_A1", score: 445, reScore: 600, revisedPoseNumber: 5 },
    { id: 4, name: "Complex_A1", score: 445, reScore: 600, revisedPoseNumber: 5 },
    { id: 5, name: "Complex_A1", score: 445, reScore: 600, revisedPoseNumber: 5 },
  ]

  const handleRunPrediction = () => {
    setIsRunning(true)
    toast({
      title: "Prediction Started",
      description: "Your prediction is now running.",
    })

    // Simulate prediction completion
    setTimeout(() => {
      setIsRunning(false)
      setShowResults(true)
      toast({
        title: "Prediction Complete",
        description: "Your prediction results are ready to view.",
      })
    }, 2000)
  }

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex flex-col"
   
      >
        <header className="w-full py-6">
          <h1 className="text-center text-4xl font-bold text-black">TOOL</h1>
        </header>

        <main className="flex-1 container mx-auto p-4">
          <div className="space-y-8">
            {/* File Upload Section */}
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-blue-600 mr-1"
                    >
                      <path d="M12 2v20M2 12h20" />
                      <path d="M12 2v20" />
                    </svg>
                    Protein
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload protein structure file</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FileUpload
                  onFileChange={() =>
                    toast({ title: "File uploaded", description: "Protein file has been uploaded successfully" })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-green-600 mr-1"
                    >
                      <path d="M9 22c-4.4-1.1-8-4.7-8-9.9C1 7 4 3 8 3c3.8 0 7 3 7 3s3.2-3 7-3c4 0 7 4 7 9.9 0 5.3-3.6 8.9-8 9.9" />
                      <path d="M9 17c-2.1-.6-4-2.4-4-5.4a5.8 5.8 0 0 1 4-5.2" />
                      <path d="M15 17c2.1-.6 4-2.4 4-5.4a5.8 5.8 0 0 0-4-5.2" />
                    </svg>
                    Ligand
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload ligand structure file</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FileUpload
                  onFileChange={() =>
                    toast({ title: "File uploaded", description: "Ligand file has been uploaded successfully" })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-purple-600 mr-1"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    Reference
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload reference structure file</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FileUpload
                  onFileChange={() =>
                    toast({ title: "File uploaded", description: "Reference file has been uploaded successfully" })
                  }
                />
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Model</h2>
              <Select defaultValue="protine">
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="protine">Protine</SelectItem>
                  <SelectItem value="alphafold">AlphaFold</SelectItem>
                  <SelectItem value="rosetta">Rosetta</SelectItem>
                  <SelectItem value="autodock">AutoDock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Run Prediction Button */}
            <div className="flex justify-center">
              <Button
                className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-6 text-lg"
                onClick={handleRunPrediction}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Run Prediction
                  </>
                )}
              </Button>
            </div>

            {/* Results Table */}
            {showResults && (
              <div className="space-y-4 animate-in fade-in-50 duration-300">
                <h2 className="text-2xl font-medium text-center text-teal-700">Table</h2>
                <div className="bg-white/80 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">S.No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="text-blue-600">Re Score</TableHead>
                        <TableHead>Revised Pose Number</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.score}</TableCell>
                          <TableCell className="text-blue-600 font-medium">{row.reScore}</TableCell>
                          <TableCell>{row.revisedPoseNumber}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
  )
}

// File Upload Component
function FileUpload({ onFileChange }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (onFileChange) onFileChange()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      if (onFileChange) onFileChange()
    }
  }

  return (
    <div
      className={`border border-dashed rounded-md p-4 bg-white transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{file ? file.name : "Drag & Drop or"}</div>

        <div className="flex items-center gap-2">
          <label htmlFor={`file-upload-${Math.random()}`} className="cursor-pointer">
            <span className="text-blue-600 text-sm hover:underline">Select file</span>
            <input id={`file-upload-${Math.random()}`} type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
