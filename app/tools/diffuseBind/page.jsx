"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Search, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function DiffuseBind() {
  const [proteinFile, setProteinFile] = useState(null)
  const [ligandFile, setLigandFile] = useState(null)
  const [jobId, setJobId] = useState("")
  const [jobStatus, setJobStatus] = useState("idle")
  const [selectedSample, setSelectedSample] = useState("")

  const handleRunPrediction = () => {
    if (!proteinFile || !ligandFile) {
      alert("Please upload both protein and ligand files")
      return
    }

    setJobStatus("running")

    setTimeout(() => {
      setJobStatus("completed")
      setJobId("DIFF-2023-04-07-123456")
    }, 3000)
  }

  const handleCheckResult = () => {
    if (!jobId) {
      alert("Please enter a Job ID")
      return
    }

    setJobStatus("running")

    setTimeout(() => {
      setJobStatus("completed")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">DIFFUSE BIND TOOL</CardTitle>
        </CardHeader>
        <div className="flex justify-center">
        <CardContent className="p-6 w-3/4">
          <div className="mb-6">
            <p className="text-center text-sm">
              State of the art method for protein-ligand docking using the diffusion model without requiring a known
              binding site.
            </p>
          </div>

          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Name</label>
              <Input placeholder="Enter your job ID" className="bg-white" />
            </div>
            <div className="flex justify-center">
            <FileUpload
              label="Protein File"
              description="No protein file uploaded"
              onFileSelect={(file) => setProteinFile(file)}
              accept=".pdb"
            />
            </div>
            <div className="flex justify-center">
            <FileUpload
              label="Ligand File"
              description="No ligand file uploaded"
              onFileSelect={(file) => setLigandFile(file)}
              accept=".mol,.mol2,.sdf"
            />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleRunPrediction}
                className="bg-[#006F7F] text-white hover:bg-[#006F7F]/90"
                disabled={jobStatus === "running"}
              >
                <Play className="mr-2 h-4 w-4 " /> Run Prediction
              </Button>
            </div>
          </div>
        </CardContent>
        </div>
      </Card>

      <div className="mt-8">
        <Card className="  backdrop-blur-sm border-none shadow-lg">
          <CardHeader className="text-center border-b pb-4">
            <CardTitle className="text-2xl">RESULT</CardTitle>
          </CardHeader>
          <div className="flex justify-center">
          <CardContent className="p-6 w-3/4">
            <div className="grid gap-6">
              <div className="flex space-x-2 ">
                <Input
                  placeholder="Enter your Job ID"
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  className="bg-white"
                />
                <Button onClick={handleCheckResult} variant="outline" className="border-[#006F7F] text-[#006F7F]">
                  <Search className="h-4 w-4" /> Check Result
                </Button>
              </div>

              {jobStatus === "running" && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006F7F]"></div>
                </div>
              )}

              {jobStatus === "completed" && (
                <>
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Job Completed Successfully</AlertTitle>
                    <AlertDescription>Your results are ready to download.</AlertDescription>
                  </Alert>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Output Files</h3>
                    <div className="flex justify-between items-center p-3 bg-[#CEE6F1]/50 rounded-md">
                      <span>results_final.zip</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Ranked Samples</h3>
                    <Select value={selectedSample} onValueChange={setSelectedSample}>
                      <SelectTrigger className="bg-[#CEE6F1]">
                        <SelectValue placeholder="Select a sample" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sample1">Sample 1 (Best Score)</SelectItem>
                        <SelectItem value="sample2">Sample 2</SelectItem>
                        <SelectItem value="sample3">Sample 3</SelectItem>
                        <SelectItem value="sample4">Sample 4</SelectItem>
                        <SelectItem value="sample5">Sample 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Folder Contents</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-[#CEE6F1]/30 rounded-md flex items-center">
                        <span className="text-sm">document1.txt</span>
                      </div>
                      <div className="p-2 bg-[#CEE6F1]/30 rounded-md flex items-center">
                        <span className="text-sm">document2.txt</span>
                      </div>
                      <div className="p-2 bg-[#CEE6F1]/30 rounded-md flex items-center">
                        <span className="text-sm">document3.txt</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}

