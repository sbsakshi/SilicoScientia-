"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import { Slider } from "@/components/ui/slider"

export default function ToxAI() {
  const [file, setFile] = useState(null)
  const [smiles, setSmiles] = useState("")
  const [toxicThreshold, setToxicThreshold] = useState(0.65)
  const [moderateThreshold, setModerateThreshold] = useState(0.35)
  const [nonToxicThreshold, setNonToxicThreshold] = useState(0.15)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = (uploadedFile) => {
    setFile(uploadedFile)
  }

  const resetToDefaults = () => {
    setToxicThreshold(0.65)
    setModerateThreshold(0.35)
    setNonToxicThreshold(0.15)
  }

  const runPrediction = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Prediction complete!")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className=" backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">ToxAI</CardTitle>
          <p className="text-muted-foreground">Predict toxicity using advanced AI models</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Methods */}
            <div>
              <h2 className="text-xl font-bold mb-4">Input Method</h2>
              <div className="w-3/4 mx-auto">
                <FileUpload
                  label="Upload Molecular File"
                  description="Drag and drop molecular file here"
                  onFileSelect={handleFileSelect}
                  accept=".mol,.sdf,.pdb,.xyz"
                />

                <div className="mt-6 space-y-2">
                  <label htmlFor="smiles" className="block text-sm font-medium">
                    SMILES String
                  </label>
                  <Input
                    id="smiles"
                    placeholder="Enter SMILES notation..."
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    className="bg-[#CEE6F1]"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <h2 className="text-xl font-bold mb-4">Advanced Options</h2>
              <div className="w-3/4 mx-auto space-y-6">
                {/* Toxic Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Toxic Threshold (≥ {toxicThreshold.toFixed(2)})</label>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                      High Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={toxicThreshold}
                      onChange={(e) => setToxicThreshold(Number.parseFloat(e.target.value))}
                      className="w-20 bg-[#CEE6F1]"
                    />
                    <div className="flex-1">
                      <Slider
                        defaultValue={[toxicThreshold]}
                        max={1}
                        step={0.01}
                        onValueChange={(value) => setToxicThreshold(value[0])}
                      />
                    </div>
                  </div>
                </div>

                {/* Moderate Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Moderate Threshold ({moderateThreshold.toFixed(2)} - {toxicThreshold.toFixed(2)})
                    </label>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      Medium Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={moderateThreshold}
                      onChange={(e) => setModerateThreshold(Number.parseFloat(e.target.value))}
                      className="w-20 bg-[#CEE6F1]"
                    />
                    <div className="flex-1">
                      <Slider
                        defaultValue={[moderateThreshold]}
                        max={1}
                        step={0.01}
                        onValueChange={(value) => setModerateThreshold(value[0])}
                      />
                    </div>
                  </div>
                </div>

                {/* Non-Toxic Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Non-Toxic Threshold (≤ {nonToxicThreshold.toFixed(2)})
                    </label>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      Low Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={nonToxicThreshold}
                      onChange={(e) => setNonToxicThreshold(Number.parseFloat(e.target.value))}
                      className="w-20 bg-[#CEE6F1]"
                    />
                    <div className="flex-1">
                      <Slider
                        defaultValue={[nonToxicThreshold]}
                        max={1}
                        step={0.01}
                        onValueChange={(value) => setNonToxicThreshold(value[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={resetToDefaults} className="border-[#006F7F] text-[#006F7F]">
                    Reset to Defaults
                  </Button>
                  <Button className="bg-[#006F7F] hover:bg-[#006F7F]/90">Save Changes</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Molecule Sketcher */}
          <div className="mt-8">
            <Card className="bg-white">
              <CardHeader className="border-b pb-4">
                <CardTitle>Molecule Sketcher</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-[#00B3DC]/50 rounded-lg bg-[#CEE6F1]/10">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto text-[#006F7F] mb-4" />
                    <p className="text-muted-foreground">Interactive Molecule Sketcher</p>
                    <p className="text-xs text-muted-foreground mt-2">Click and drag to draw molecular structures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Run Prediction Button */}
          <div className="mt-8 text-center">
            <Button
              className="bg-[#006F7F] hover:bg-[#006F7F]/90 h-11 px-8"
              onClick={runPrediction}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                  Processing...
                </>
              ) : (
                "Run Prediction"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
