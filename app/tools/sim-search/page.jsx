"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResultsDisplay } from "@/components/results-display"
import { Play } from "lucide-react"

export default function SimSearch() {
  const [queryFile, setQueryFile] = useState(null)
  const [targetFile, setTargetFile] = useState(null)
  const [fingerprint, setFingerprint] = useState("morgan")
const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRunPrediction = () => {
    if (!queryFile || !targetFile) {
      alert("Please upload both query and target files")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResults([
        { id: 1, molecule: "CHEMBL123456", similarity: 0.95 },
        { id: 2, molecule: "CHEMBL789012", similarity: 0.87 },
        { id: 3, molecule: "CHEMBL345678", similarity: 0.82 },
        { id: 4, molecule: "CHEMBL901234", similarity: 0.78 },
        { id: 5, molecule: "CHEMBL567890", similarity: 0.75 },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const handleDownloadSample = () => {
    // In a real app, this would download sample files
    alert("Sample files would be downloaded here")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className=" backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">SIM SEARCH</CardTitle>
        </CardHeader>
        <div className="flex justify-center">
        <CardContent className="p-6 w-3/4">
          <div className="mb-6 flex justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Similarity Search</h2>
            <p className="text-sm text-muted-foreground">Search Similar Molecules</p>
            </div>
            <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-2">Select Fingerprint Method</label>
                <Select value={fingerprint} onValueChange={setFingerprint}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Fingerprint Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morgan">Morgan</SelectItem>
                    <SelectItem value="maccs">MACCS</SelectItem>
                    <SelectItem value="rdkit">RDKit</SelectItem>
                    <SelectItem value="atom_pairs">Atom Pairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full flex justify-center">
                <FileUpload
                  label="Upload your Query file"
                  description="Please provide a set of query molecules"
                  onFileSelect={(file) => setQueryFile(file)}
                />
              </div>
              
            </div>
            <div className="flex justify-center">
            <FileUpload
              label="Upload your Target file"
              description="Please provide a set of target molecules"
              onFileSelect={(file) => setTargetFile(file)}
            />
            </div>
            <div className="flex justify-between items-center">
              <Button variant="link" onClick={handleDownloadSample} className="text-[#006F7F]">
                Download Sample Files
              </Button>

              <Button onClick={handleRunPrediction} className="bg-[#006F7F] hover:bg-[#006F7F]/90 text-white">
                <Play className="mr-2 h-4 w-4" /> Run Prediction
              </Button>
            </div>
          </div>
        </CardContent>
        </div>
      </Card>

      <div className="mt-8">
        <ResultsDisplay title="Similarity Results" results={results} isLoading={isLoading} />
      </div>
    </div>
  )
}

