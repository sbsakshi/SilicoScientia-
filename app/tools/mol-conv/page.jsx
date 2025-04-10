"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUpload } from "@/components/file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowRight, CheckCircle2, Download, FileDown, FileUp, Loader2, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export default function MoleculeConverter() {
  const [files, setFiles] = useState([])
  const [outputFormat, setOutputFormat] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [conversionResults, setConversionResults] = useState([])
  const [showResultsDialog, setShowResultsDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  // Options
  const [addHydrogen, setAddHydrogen] = useState(false)
  const [generate3D, setGenerate3D] = useState(false)
  const [generate2D, setGenerate2D] = useState(false)
  const [deleteHydrogen, setDeleteHydrogen] = useState(false)
  const [partialCharge, setPartialCharge] = useState(false)
  const [removeDuplicate, setRemoveDuplicate] = useState(false)
  const [removeSalt, setRemoveSalt] = useState(false)

  const handleFileSelect = (file) => {
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.name.split(".").pop()?.toLowerCase() || "",
    }
    setFiles((prev) => [...prev, fileInfo])
  }

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClearAll = () => {
    setFiles([])
  }

  const handleConvert = () => {
    if (files.length === 0) {
      alert("Please select at least one file to convert")
      return
    }

    if (!outputFormat) {
      alert("Please select an output format")
      return
    }

    setIsConverting(true)
    setConversionProgress(0)

    // Simulate conversion process
    const interval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate completion after 2 seconds
    setTimeout(() => {
      clearInterval(interval)
      setConversionProgress(100)

      // Generate mock results
      const results = files.map((file) => ({
        fileName: file.name.split(".")[0] + "." + outputFormat,
        originalFormat: file.type,
        convertedFormat: outputFormat,
        size: Math.floor(file.size * 0.8), // Simulate smaller file size after conversion
        downloadUrl: "#", // In a real app, this would be a real URL
      }))

      setConversionResults(results)
      setIsConverting(false)
      setShowResultsDialog(true)
    }, 2000)
  }

  const formatFileSize = (bytes)  => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdb":
        return "🧬"
      case "mol":
      case "mol2":
        return "⚗️"
      case "sdf":
        return "📊"
      case "xyz":
        return "🔬"
      case "smi":
        return "🧪"
      case "inchi":
        return "🔍"
      default:
        return "📄"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className=" backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">Molecule Converter</CardTitle>
          <p className="text-muted-foreground">Convert molecular files between different formats</p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="options">Conversion Options</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Input Files</h2>
                  <FileUpload
                    label="Upload Molecular Files"
                    description="Drag and drop files here or click to browse"
                    onFileSelect={handleFileSelect}
                    accept=".pdb,.mol2,.sdf,.xyz,.mol,.smi,.inchi"
                  />

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Supported file formats:</h3>
                    <div className="flex flex-wrap gap-2">
                      {[".pdb", ".mol2", ".sdf", ".xyz", ".mol", ".smi", ".inchi"].map((format) => (
                        <Badge key={format} variant="outline" className="bg-[#CEE6F1]/50">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Selected Files</h2>
                    {files.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearAll}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Clear All
                      </Button>
                    )}
                  </div>

                  <div className="border rounded-lg bg-[#CEE6F1]/10 min-h-[200px]">
                    {files.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                        <FileUp className="h-12 w-12 mb-2 opacity-50" />
                        <p>No files selected</p>
                      </div>
                    ) : (
                      <ul className="divide-y">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-3 hover:bg-[#CEE6F1]/20">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{getFileIcon(file.type)}</span>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFile(index)}
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Output Format</h3>
                    <div className="flex space-x-4">
                      <div className="w-2/3">
                        <Select value={outputFormat} onValueChange={setOutputFormat}>
                          <SelectTrigger className="bg-[#CEE6F1]">
                            <SelectValue placeholder="Choose Output Format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdb">PDB</SelectItem>
                            <SelectItem value="mol2">MOL2</SelectItem>
                            <SelectItem value="sdf">SDF</SelectItem>
                            <SelectItem value="xyz">XYZ</SelectItem>
                            <SelectItem value="mol">MOL</SelectItem>
                            <SelectItem value="smi">SMILES</SelectItem>
                            <SelectItem value="inchi">InChI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-1/3 bg-[#006F7F] hover:bg-[#006F7F]/90"
                        onClick={handleConvert}
                        disabled={isConverting || files.length === 0 || !outputFormat}
                      >
                        {isConverting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...
                          </>
                        ) : (
                          <>
                            Convert <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Conversion Options</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Structure Modifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="add-hydrogen" checked={addHydrogen} onCheckedChange={setAddHydrogen} />
                        <label
                          htmlFor="add-hydrogen"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Add Hydrogen
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delete-hydrogen" checked={deleteHydrogen} onCheckedChange={setDeleteHydrogen} />
                        <label
                          htmlFor="delete-hydrogen"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Delete Hydrogen
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remove-salt" checked={removeSalt} onCheckedChange={setRemoveSalt} />
                        <label
                          htmlFor="remove-salt"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remove Salt
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remove-duplicate"
                          checked={removeDuplicate}
                          onCheckedChange={setRemoveDuplicate}
                        />
                        <label
                          htmlFor="remove-duplicate"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remove Duplicate
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Geometry & Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="generate-3d" checked={generate3D} onCheckedChange={setGenerate3D} />
                        <label
                          htmlFor="generate-3d"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Generate 3D
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="generate-2d" checked={generate2D} onCheckedChange={setGenerate2D} />
                        <label
                          htmlFor="generate-2d"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Generate 2D
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="partial-charge" checked={partialCharge} onCheckedChange={setPartialCharge} />
                        <label
                          htmlFor="partial-charge"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Partial Charge
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-[#CEE6F1]/30 border-[#00B3DC]/30">
                <AlertCircle className="h-4 w-4 text-[#006F7F]" />
                <AlertTitle>Conversion Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                    <li>Generate 3D and Generate 2D options are mutually exclusive</li>
                    <li>Add Hydrogen and Delete Hydrogen should not be used together</li>
                    <li>Some file formats may not support all molecular properties</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Conversion Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> Conversion Complete
            </DialogTitle>
            <DialogDescription>Your files have been successfully converted.</DialogDescription>
          </DialogHeader>

          <div className="max-h-[300px] overflow-y-auto">
            <ul className="divide-y">
              {conversionResults.map((result, index) => (
                <li key={index} className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{result.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.originalFormat} → {result.convertedFormat} • {formatFileSize(result.size)}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowResultsDialog(false)
                setFiles([])
                setOutputFormat("")
              }}
            >
              Start New Conversion
            </Button>
            <Button className="bg-[#006F7F] hover:bg-[#006F7F]/90">
              <FileDown className="h-4 w-4 mr-2" /> Download All Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
