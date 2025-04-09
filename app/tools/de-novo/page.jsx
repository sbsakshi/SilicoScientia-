"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Download, Play } from "lucide-react"

export default function DeNovo() {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleFileSelect = (file) => {
    setFile(file)
    setIsCompleted(false)
  }

  const handleRunGenerator = () => {
    if (!file) {
      alert("Please upload a CSV file")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsCompleted(true)
    }, 3000)
  }

  const handleDownloadSample = () => {
    // In a real app, this would download sample files
    alert("Sample files would be downloaded here")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">De novo molecule Generation</CardTitle>
          <p className="text-sm text-muted-foreground">Generate novel drug molecules using advanced AI Models</p>
        </CardHeader>
        <div className="flex justify-center">
        <CardContent className="p-6 w-3/4">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Input Molecules</h2>
            <p className="text-sm text-muted-foreground">Generate molecules from your dataset</p>
          </div>

          <div className="grid gap-6">
            <div className="flex justify-center">
            <FileUpload
              label="Upload your CSV Files"
              description="Please provide a set of Molecules"
              onFileSelect={handleFileSelect}
              accept=".csv,.txt,.sdf"
            />
            </div>
            <div className="flex justify-between items-center">
              <Button variant="link" onClick={handleDownloadSample} className="text-[#006F7F]">
                <Download className="mr-2 h-4 w-4" /> Download Sample Files
              </Button>

              <Button onClick={handleRunGenerator} className="bg-[#006F7F] hover:bg-[#006F7F]/90 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Run De Novo Generator
                  </>
                )}
              </Button>
            </div>

            {isCompleted && (
              <Alert className="bg-green-50 border-green-200 mt-4">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Job Completed Successfully</AlertTitle>
                <AlertDescription>Your results are ready for download</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        </div>
      </Card>

      {isCompleted && (
        <Card className="mt-8   backdrop-blur-sm border-none shadow-lg">
          <CardHeader>
            <CardTitle>Generated Molecules</CardTitle>
          </CardHeader>
        
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-[#CEE6F1] rounded-md mb-2 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Molecule Structure {index}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Molecule_{index}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          
        </Card>
      )}
    </div>
  )
}

