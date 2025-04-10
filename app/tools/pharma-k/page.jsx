"use client"

import { useState } from "react"
import { Search, Play, Download, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"

export default function PharmaPrediction() {
  const [selectedMolecule, setSelectedMolecule] = useState({
    id: "a-123",
    name: "Molecule A-123",
    formula: "C₁₇H₂₁O₆",
  })
  const [smilesInput, setSmilesInput] = useState("")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState(null)

  const runPrediction = () => {
    setIsLoading(true)

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

  const handleFileSelect = (uploadedFile) => {
    setFile(uploadedFile)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className=" backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">PHARMA K-AI</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <div className="relative mb-4">
                <Input type="text" placeholder="Search molecules..." className="pl-9 bg-white" />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div
                  className="flex items-center p-2 bg-white/50 rounded-md border border-[#00B3DC]/30 cursor-pointer"
                  onClick={() =>
                    setSelectedMolecule({
                      id: "a-123",
                      name: "Molecule A-123",
                      formula: "C₁₇H₂₁O₆",
                    })
                  }
                >
                  <div className="h-8 w-8 bg-[#00B3DC]/30 rounded-md flex items-center justify-center text-[#006F7F] mr-3">
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
              <div className="w-3/4 mx-auto mb-6">
                <FileUpload
                  label="Upload your Molecule Files"
                  description="Please provide a set of molecules"
                  onFileSelect={handleFileSelect}
                  accept=".mol,.sdf,.pdb,.xyz"
                />
              </div>

              {/* SMILES input */}
              <Card className="mb-6  w-3/4 mx-auto">
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
              <div className="grid grid-cols-2 gap-4 mb-6 w-3/4 mx-auto">
                <Button
                  className="bg-[#006F7F] hover:bg-[#006F7F]/90 h-14 text-base text-white"
                  onClick={runPrediction}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" /> Run Prediction
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-[#006F7F] text-[#006F7F] hover:bg-white/20 h-14 text-base"
                >
                  <Download className="mr-2 h-5 w-5" /> Download
                </Button>
              </div>

              {results && (
                <Card className="w-3/4 mx-auto bg-white">
                  <CardHeader>
                    <CardTitle>Prediction Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Absorption</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/20 rounded">
                            <span>Intestinal Absorption</span>
                            <span
                              className={`px-2 py-0.5 rounded text-sm ${
                                results.absorption.intestinal.status === "GOOD"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.absorption.intestinal.value.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/20 rounded">
                            <span>Caco-2 Permeability</span>
                            <span
                              className={`px-2 py-0.5 rounded text-sm ${
                                results.absorption.caco2.status === "GOOD"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.absorption.caco2.value.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Distribution</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/20 rounded">
                            <span>Blood-Brain Barrier</span>
                            <span
                              className={`px-2 py-0.5 rounded text-sm ${
                                results.distribution.bbb.status === "GOOD"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.distribution.bbb.value.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/20 rounded">
                            <span>Plasma Protein Binding</span>
                            <span
                              className={`px-2 py-0.5 rounded text-sm ${
                                results.distribution.ppb.status === "GOOD"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.distribution.ppb.value.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
