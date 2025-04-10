"use client"

import { useState } from "react"
import {
  Download,
  FileCode,
  Play,
  RefreshCw,
  Trash2,
  Upload,
  Save,
  AlignLeftIcon as ObjectsAlignLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileUpload } from "@/components/file-upload"

// Sample protein data
const proteinData = {
  protein_structure_1: {
    pockets: [
      {
        id: "pocket1",
        score: -0.0539,
        drugScore: 0.0,
        alphaCount: 18,
        alphaRadius: 3.8564,
        solventAcc: 0.6187,
        bFactor: 0.3696,
      },
      {
        id: "pocket2",
        score: -0.0638,
        drugScore: 0.0002,
        alphaCount: 15,
        alphaRadius: 4.1749,
        solventAcc: 0.5815,
        bFactor: 0.1994,
      },
      {
        id: "pocket3",
        score: -0.0479,
        drugScore: 0.0042,
        alphaCount: 36,
        alphaRadius: 3.9692,
        solventAcc: 0.5717,
        bFactor: 0.2876,
      },
    ],
  },
}

export default function PocketFinder() {
  const [file, setFile] = useState(null)
  const [selectedPockets, setSelectedPockets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Handle file selection
  const handleFileSelect = (uploadedFile) => {
    setFile(uploadedFile)
    setSelectedPockets([])
    setShowResults(false)
  }

  // Delete file
  const handleDeleteFile = () => {
    setFile(null)
    setSelectedPockets([])
    setShowResults(false)
  }

  // Toggle pocket selection
  const togglePocketSelection = (pocketId) => {
    setSelectedPockets((prev) => {
      if (prev.includes(pocketId)) {
        return prev.filter((id) => id !== pocketId)
      } else {
        return [...prev, pocketId]
      }
    })
  }

  // Run pocket finding
  const handleFindPockets = () => {
    if (!file) {
      alert("Please upload a protein file first")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg mb-8">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">POCKET FINDER</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" justify-center">
              <h2 className="text-xl font-bold mb-4">Upload Protein</h2>
              <FileUpload
                label="Upload your PDB Files"
                description="Please provide a protein structure file"
                onFileSelect={handleFileSelect}
                accept=".pdb"
              />

              {file && (
                <div className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-[#006F7F] text-white flex items-center justify-center">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB • <span className="text-[#006F7F]">Uploaded</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      onClick={handleDeleteFile}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete file</span>
                    </Button>
                  </div>
                </div>
              )}

              {file && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Select Pockets</h3>
                  <div className="space-y-3 bg-white/30 p-4 rounded-lg">
                    {proteinData["protein_structure_1"].pockets.map((pocket) => (
                      <div key={pocket.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={pocket.id}
                          checked={selectedPockets.includes(pocket.id)}
                          onCheckedChange={() => togglePocketSelection(pocket.id)}
                        />
                        <label
                          htmlFor={pocket.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {pocket.id} (Score: {pocket.score.toFixed(4)})
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={handleFindPockets}
                      className="bg-[#006F7F] hover:bg-[#006F7F]/90 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Find Pockets
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Protein Visualization</h2>
              <div className="border-2 border-[#00B3DC]/30 rounded-lg overflow-hidden">
                <div className="h-[300px] bg-white/20 flex items-center justify-center">
                  {!file ? (
                    <div className="text-center text-muted-foreground">
                      <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Upload a protein file to view visualization</p>
                    </div>
                  ) : (
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hvLCdyH9aXOBNBZFfVLLoPulGqvEiK.png"
                      alt="Protein Visualization"
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>

                {file && (
                  <div className="bg-white/30 p-3 border-t border-[#00B3DC]/30 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <ObjectsAlignLeft className="h-3.5 w-3.5 mr-1" /> Center
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Save className="h-3.5 w-3.5 mr-1" /> Save
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">Representation:</span>
                      <Select defaultValue="cartoon">
                        <SelectTrigger className="w-[120px] h-8 bg-white">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="surface">Surface</SelectItem>
                          <SelectItem value="stick">Stick</SelectItem>
                          <SelectItem value="sphere">Sphere</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="  backdrop-blur-sm border-none shadow-lg">
          <CardHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <CardTitle>Pocket Analysis Results</CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs border-[#006F7F] text-[#006F7F]">
                <Download className="h-3.5 w-3.5 mr-1" /> Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/30">
                    <TableHead className="font-medium">Pocket ID</TableHead>
                    <TableHead className="font-medium">Pocket Score</TableHead>
                    <TableHead className="font-medium">Drug Score</TableHead>
                    <TableHead className="font-medium">Alpha Spheres</TableHead>
                    <TableHead className="font-medium">Alpha Radius</TableHead>
                    <TableHead className="font-medium">Solvent Acc.</TableHead>
                    <TableHead className="font-medium">B-factor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proteinData["protein_structure_1"].pockets.map((pocket) => (
                    <TableRow key={pocket.id} className="hover:bg-white/10">
                      <TableCell className="font-medium">{pocket.id}</TableCell>
                      <TableCell>{pocket.score.toFixed(4)}</TableCell>
                      <TableCell>{pocket.drugScore.toFixed(4)}</TableCell>
                      <TableCell>{pocket.alphaCount}</TableCell>
                      <TableCell>{pocket.alphaRadius.toFixed(4)}</TableCell>
                      <TableCell>{pocket.solventAcc.toFixed(4)}</TableCell>
                      <TableCell>{pocket.bFactor.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Pocket Properties</h3>
                <div className="bg-white/20 p-4 rounded-lg h-[200px] flex items-center justify-center">
                  <p className="text-muted-foreground">Select a pocket to view detailed properties</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Binding Site Analysis</h3>
                <div className="bg-white/20 p-4 rounded-lg h-[200px] flex items-center justify-center">
                  <p className="text-muted-foreground">Select a pocket to view binding site analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

