"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pencil, Download } from "lucide-react"

export default function Silicocg() {
  const [file, setFile] = useState(null)
  const [smiles, setSmiles] = useState("")
  const [conformers, setConformers] = useState("10")
  const [isDrawing, setIsDrawing] = useState(false)

  const handleRunPrediction = () => {
    if (!file && !smiles && !isDrawing) {
      alert("Please upload a file, enter SMILES, or draw a molecule")
      return
    }

    // Simulate API call
    alert("Prediction would run here")
  }

  const handleGetSmiles = () => {
    // In a real app, this would get SMILES from the drawing
    setSmiles("CC(=O)OC1=CC=CC=C1C(=O)O")
    setIsDrawing(false)
  }

  const handleMakeStructure = () => {
    setIsDrawing(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">SILICOCG</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <FileUpload
              label="Upload your CSV Files"
              description="Please provide a set of molecules"
              onFileSelect={(file) => setFile(file)}
            />

            <div>
              <label className="block text-sm font-medium mb-2">SMILES Input</label>
              <Input
                placeholder="Enter SMILES notation..."
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                className="bg-[#CEE6F1]"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium">Number of Conformers to be generated for each state</label>
              <Select value={conformers} onValueChange={setConformers}>
                <SelectTrigger className="w-20 bg-[#CEE6F1]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleRunPrediction} className="bg-[#006F7F] hover:bg-[#006F7F]/90">
                <Play className="mr-2 h-4 w-4" /> Run Prediction
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Sketch Your Molecule</h3>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-500 h-64 flex items-center justify-center">
                {isDrawing ? (
                  <div className="text-white">
                    <p>Molecule Drawing Area</p>
                    <p className="text-sm">(Drawing functionality would be implemented here)</p>
                  </div>
                ) : (
                  <Button onClick={handleMakeStructure} variant="outline" className="bg-white hover:bg-gray-100">
                    <Pencil className="mr-2 h-4 w-4" /> Draw Molecule
                  </Button>
                )}
              </div>

              {isDrawing && (
                <div className="flex justify-between p-4 bg-gray-50">
                  <Button variant="outline" onClick={() => setIsDrawing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGetSmiles} className="bg-[#006F7F] hover:bg-[#006F7F]/90">
                    Make molecule identifier
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                Get SMILES
              </Button>
              <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                <Download className="mr-2 h-4 w-4" /> Take molecule identifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

