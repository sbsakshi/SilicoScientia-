"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Upload } from "lucide-react"

export default function LigandInteraction() {
  const [pdbFile, setPdbFile] = useState(null)
  const [pdbIds, setPdbIds] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdbFile(e.target.files[0])
    }
  }

  const handleRunAnalysis = () => {
    if (activeTab === "upload" && !pdbFile) {
      alert("Please upload a PDB file")
      return
    }

    if (activeTab === "id" && !pdbIds) {
      alert("Please enter PDB IDs")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to results page or show results
      alert("Analysis complete! Results would be displayed here.")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            Ligand Interaction Tool
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Analyze protein-ligand interactions with ease. Upload PDB files or enter PDB IDs to get started.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload PDB Files</TabsTrigger>
              <TabsTrigger value="id">Enter PDB IDs</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 bg-[#00B3DC]/10">
                <input type="file" id="pdb-file" className="hidden" accept=".pdb" onChange={handleFileChange} />
                <label htmlFor="pdb-file" className="flex flex-col items-center justify-center cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-[#00B3DC]/20 flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-[#006F7F]" />
                  </div>
                  <span className="text-sm font-medium">Choose Files</span>
                  <span className="text-xs text-muted-foreground mt-1">Supports multiple PDB files</span>
                </label>
              </div>
              {pdbFile && (
                <div className="text-sm text-center">
                  Selected file: <span className="font-medium">{pdbFile.name}</span>
                </div>
              )}
            </TabsContent>
            <TabsContent value="id" className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Enter PDB IDs</label>
                <Input
                  placeholder="Enter PDB IDs (space-separated)"
                  value={pdbIds}
                  onChange={(e) => setPdbIds(e.target.value)}
                  className="bg-white"
                />
              </div>
            </TabsContent>
            <div className="mt-6">
              <Button
                onClick={handleRunAnalysis}
                className="w-full bg-[#006F7F] hover:bg-[#006F7F]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Run Analysis
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

