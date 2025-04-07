"use client"

import { useState } from "react"
import { Search, Upload, Play, Download, Droplet, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PharmaPrediction() {
  const [selectedMolecule, setSelectedMolecule] = useState({
    id: "a-123",
    name: "Molecule A-123",
    formula: "C₁₇H₂₁O₆",
  })
  const [smilesInput, setSmilesInput] = useState("")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const runPrediction = () => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setResults({
        absorption: {
          intestinal: {
            value: 0.9891,
            status: "GOOD",
          },
          caco2: {
            value: -0.5723,
            status: "BAD",
          },
        },
        distribution: {
          bbb: {
            value: 0.8754,
            status: "GOOD",
          },
          ppb: {
            value: 0.9234,
            status: "GOOD",
          },
        },
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" style={{ backgroundImage: "public/img.png" }}>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">PHARMA K-AI</h1>
          <Button className="bg-[#28574E] hover:bg-teal-700">
            <span className="mr-2">+</span> New Prediction
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="relative mb-4">
              <Input type="text" placeholder="Search molecules..." className="pl-9" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="border-t border-gray-100 pt-3">
              <div
                className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-100 cursor-pointer"
                onClick={() =>
                  setSelectedMolecule({
                    id: "a-123",
                    name: "Molecule A-123",
                    formula: "C₁₇H₂₁O₆",
                  })
                }
              >
                <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 mr-3">
                  <Droplet size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedMolecule.name}</p>
                  <p className="text-xs text-gray-500">{selectedMolecule.formula}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* File upload area */}
            <div className="bg-white rounded-lg border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-2">
                <Upload size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">Drop Files Here</h3>
              <p className="text-sm text-gray-500">or click to upload</p>
            </div>

            {/* SMILES input */}
            <Card className="mb-6 bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">SMILES Input</h3>
                <Textarea
                  placeholder="Enter SMILES notation..."
                  className="bg-white"
                  value={smilesInput}
                  onChange={(e) => setSmilesInput(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                className="bg-[#28574E] hover:bg-[#28574E] h-14 text-base"
                onClick={runPrediction}
                disabled={isLoading}
              >
                <Play className="mr-2 h-5 w-5" /> Run Prediction
              </Button>
              <Button variant="outline" className="border-[#28574E] text-[#28574E] hover:bg-teal-50 h-14 text-base">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
