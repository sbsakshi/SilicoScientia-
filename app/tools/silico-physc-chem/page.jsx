"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResultsDisplay } from "@/components/results-display"
import { Play } from "lucide-react"
import { Pagination } from "@/components/pagination"

export default function SilicoPhycChem() {
  const [file, setFile] = useState(null)
  const [smiles, setSmiles] = useState("")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRunPrediction = () => {
    if (!file && !smiles) {
      alert("Please upload a file or enter SMILES")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResults([
        { smiles: "CC(=O)OC1=CC=CC=C1C(=O)O", alogp: 1.43, hba: 4, hbd: 1, mw: 180.16, tpsa: 63.6 },
        { smiles: "CCN(CC)CCOC(=O)C1=CC=CC=C1NC", alogp: 2.98, hba: 4, hbd: 1, mw: 264.36, tpsa: 41.9 },
        { smiles: "CN1C=NC2=C1C(=O)N(C)C(=O)N2C", alogp: -0.63, hba: 4, hbd: 0, mw: 194.19, tpsa: 69.3 },
        { smiles: "CC12CCC(=O)C=C1CCC3C2CCC4(C)C3CCC4O", alogp: 3.47, hba: 2, hbd: 1, mw: 288.42, tpsa: 37.3 },
        { smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", alogp: 3.79, hba: 2, hbd: 1, mw: 206.28, tpsa: 37.3 },
      ])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">SILICO-PHYC-CHEM</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Properties Prediction</h2>
            <p className="text-sm text-muted-foreground">Predict Pharmacokinetic Properties</p>
          </div>

          <div className="grid gap-6">
            <div className="flex justify-center">
            <FileUpload
              label="Upload your CSV Files"
              description="Please provide a set of molecules"
              onFileSelect={(file) => setFile(file)}
            />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SMILES Input</label>
              <Input
                placeholder="Enter SMILES notation..."
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                className="bg-[#CEE6F1]"
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

      <div className="mt-8">
        <ResultsDisplay title="Property Prediction Results" results={results} isLoading={isLoading} />

        {results && results.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination totalPages={5} currentPage={1} />
          </div>
        )}
      </div>
    </div>
  )
}

