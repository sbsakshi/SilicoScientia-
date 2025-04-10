"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResultsDisplay } from "@/components/results-display"
import { Play } from "lucide-react"
import Image from "next/image"

export default function PharmFrag() {
  const [queryFile, setQueryFile] = useState(null)
const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  const handleRunPrediction = () => {
    if (!queryFile) {
      alert("Please upload a query file")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResults([
        { id: 1, molecule: "CHEMBL123456", features: "HBA,HBD,Aromatic" },
        { id: 2, molecule: "CHEMBL789012", features: "HBA,Hydrophobic" },
        { id: 3, molecule: "CHEMBL345678", features: "HBD,Aromatic,Hydrophobic" },
        { id: 4, molecule: "CHEMBL901234", features: "HBA,HBD,Ionic" },
        { id: 5, molecule: "CHEMBL567890", features: "Aromatic,Hydrophobic,HBA" },
      ])
      setIsLoading(false)
      setShowViewer(true)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">PHARMFRAG</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Generate Pharmacophoric Features of Molecules</h2>
          </div>

          <div className="grid gap-6">
            <div className="flex justify-center">
            <FileUpload
              label="Upload your Query file"
              description="Please provide a set of query molecules"
              onFileSelect={(file) => setQueryFile(file)}
            />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleRunPrediction} className="bg-[#006F7F] hover:bg-[#006F7F]/90 text-white">
                <Play className="mr-2 h-4 w-4" /> Run Prediction
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <ResultsDisplay title="Pharmacophore Results" results={results} isLoading={isLoading} />

        {showViewer && (
          <Card className="  backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Pharmacophore Viewer</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4">
              <div className="w-full h-64 md:h-80 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="Protein structure visualization"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

