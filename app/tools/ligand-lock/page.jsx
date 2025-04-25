"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Save, Download, Upload, FileText, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export default function LigandLock() {
  const [activeTab, setActiveTab] = useState("protine")
  const [pdbId, setPdbId] = useState("")
  const [jobId, setJobId] = useState("")
  const [propertiesDialogOpen, setPropertiesDialogOpen] = useState(false)
  const [partialCharge, setPartialCharge] = useState("None")
  const [pH, setPH] = useState("7.2")
  const [gen3D, setGen3D] = useState(false)
  const [hydrogen, setHydrogen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLigandPrepared, setIsLigandPrepared] = useState(false)
  const [thresholdEnergy, setThresholdEnergy] = useState("")
  const [sortingMethod, setSortingMethod] = useState("Threshold energy")
  const [allFilesUploaded, setAllFilesUploaded] = useState(false)
  const [showPreparedResults, setShowPreparedResults] = useState(false)

  // File upload refs
  const proteinFileRef = useRef(null)
  const textFileRef = useRef(null)
  const ligandFileRef = useRef(null)

  // Files for different tabs
  const [protineFiles, setProtineFiles] = useState([
    { id: 1, name: "xyz_1", size: "445.36KB", status: "Completed", selected: false },
    { id: 2, name: "xyz_2", size: "445.36KB", status: "Completed", selected: false },
    { id: 3, name: "xyz_3", size: "445.36KB", status: "Completed", selected: false },
  ])

  const [ligandFiles, setLigandFiles] = useState([
    { id: 1, name: "xyz_1", size: "445.36KB", status: "Completed", selected: false },
    { id: 2, name: "xyz_2", size: "445.36KB", status: "Completed", selected: false },
  ])

  const [dockingFiles, setDockingFiles] = useState([
    { id: 1, name: "Config_file", size: "445.36KB", status: "Completed", selected: true },
  ])

  const [resultsFiles, setResultsFiles] = useState([
    { name: "Complex_A1", size: "445.36KB", status: "Updated" },
    { name: "Complex_A1", size: "445.36KB", status: "Updated" },
  ])

  // Check if files are uploaded in all tabs
  useEffect(() => {
    if (protineFiles.length > 0 && ligandFiles.length > 0 && dockingFiles.length > 0) {
      setAllFilesUploaded(true)
    } else {
      setAllFilesUploaded(false)
    }
  }, [protineFiles, ligandFiles, dockingFiles])

  const toggleFileSelection = (id, fileType) => {
    if (fileType === "protine") {
      setProtineFiles(protineFiles.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
    } else if (fileType === "ligand") {
      setLigandFiles(ligandFiles.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
    } else if (fileType === "docking") {
      setDockingFiles(dockingFiles.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
    }
  }

  const handleProteinFileUpload = () => {
    if (proteinFileRef.current) {
      proteinFileRef.current.click()
    }
  }

  const handleTextFileUpload = () => {
    if (textFileRef.current) {
      textFileRef.current.click()
    }
  }

  const handleLigandFileUpload = () => {
    if (ligandFileRef.current) {
      ligandFileRef.current.click()
    }
  }

  const handleFileChange = (e, fileType) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}KB`,
        status: "Completed",
        selected: true,
      }

      if (fileType === "protein" || fileType === "text") {
        setProtineFiles((prev) => [...prev, newFile])
      } else if (fileType === "ligand") {
        setLigandFiles((prev) => [...prev, newFile])
      }
    }
  }

  const handlePrepareLigand = () => {
    // Simulate preparing ligand
    setTimeout(() => {
      setIsLigandPrepared(true)
      setShowResults(true)
    }, 1000)
  }

  const handlePrepareProperties = () => {
    // Simulate preparing properties
    setTimeout(() => {
      setShowPreparedResults(true)
      setActiveTab("result")
    }, 1000)
  }

  const handleAnalyze = () => {
    // Simulate analysis
    setTimeout(() => {
      setShowPreparedResults(true)
    }, 1000)
  }

  return (
    <div
      className="flex h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      {/* Left sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
        {activeTab === "protine" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Upload Files</h2>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              {/* Upload Protein File Button */}
              <div>
                <input
                  type="file"
                  ref={proteinFileRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "protein")}
                />
                <button
                  onClick={handleProteinFileUpload}
                  className="flex items-center text-[#006F7F] font-medium hover:text-[#005a66]"
                >
                  <Upload className="mr-2 h-4 w-4 text-[#006F7F]" />
                  Upload Protein File
                </button>
              </div>

              {/* Upload Text File Button */}
              <div>
                <input type="file" ref={textFileRef} className="hidden" onChange={(e) => handleFileChange(e, "text")} />
                <button
                  onClick={handleTextFileUpload}
                  className="flex items-center text-gray-600 font-medium hover:text-gray-800"
                >
                  <FileText className="mr-2 h-4 w-4 text-gray-600" />
                  Upload Test File
                </button>
              </div>

              {/* PDB Loader */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500">PDB Loader</h3>
                <Input
                  placeholder="Enter PDB ID"
                  value={pdbId}
                  onChange={(e) => setPdbId(e.target.value)}
                  className="bg-white"
                />
              </div>

              {/* Selected Files */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-sm">File name</h3>
                  <h3 className="font-medium text-sm">Status</h3>
                </div>
                <div className="space-y-2">
                  {protineFiles.map((file) => (
                    <div
                      key={file.id}
                      className={cn(
                        "flex items-center justify-between p-1.5 rounded file-row",
                        file.selected ? "bg-[#006F7F]/10" : "",
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-5 h-4 rounded-sm border border-[#006F7F] flex items-center justify-center cursor-pointer file-radio",
                            file.selected ? "selected bg-[#006F7F]" : "",
                          )}
                          onClick={() => toggleFileSelection(file.id, "protine")}
                        >
                          {file.selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="ml-2 text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">{file.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Properties and Delete Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  className="flex-1 bg-[#006F7F] text-white hover:bg-[#005a66]"
                  onClick={() => setPropertiesDialogOpen(true)}
                >
                  Properties
                </Button>
                <Button variant="outline" className="flex-1 border-[#006F7F] text-[#006F7F]">
                  Delete
                </Button>
              </div>

              {/* Prepare Properties Button */}
              <Button
                className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white"
                onClick={handlePrepareProperties}
                disabled={!allFilesUploaded}
              >
                Prepare Properties
              </Button>
            </div>
          </>
        )}

        {activeTab === "ligand" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Upload Files</h2>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              {/* Upload Ligand File Button */}
              <div>
                <input
                  type="file"
                  ref={ligandFileRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "ligand")}
                />
                <button
                  onClick={handleLigandFileUpload}
                  className="flex items-center text-[#006F7F] font-medium hover:text-[#005a66]"
                >
                  <Upload className="mr-2 h-4 w-4 text-[#006F7F]" />
                  Upload Ligand File
                </button>
              </div>

              {/* Upload Text File Button */}
              <div>
                <button
                  onClick={handleTextFileUpload}
                  className="flex items-center text-gray-600 font-medium hover:text-gray-800"
                >
                  <FileText className="mr-2 h-4 w-4 text-gray-600" />
                  Upload Text File
                </button>
              </div>

              {/* File Properties */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-700">File Properties</h3>

                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-5 h-4 rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer",
                      gen3D ? "bg-[#006F7F] border-[#006F7F]" : "bg-white",
                    )}
                    onClick={() => setGen3D(!gen3D)}
                  >
                    {gen3D && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <label className="text-sm">Gen3D</label>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-5 h-4 rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer",
                      hydrogen ? "bg-[#006F7F] border-[#006F7F]" : "bg-white",
                    )}
                    onClick={() => setHydrogen(!hydrogen)}
                  >
                    {hydrogen && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <label className="text-sm">Hydrogen</label>
                </div>
              </div>

              {/* Partial Charge */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Partial Charge</label>
                <Select value={partialCharge} onValueChange={setPartialCharge}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select charge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Gasteiger">Gasteiger</SelectItem>
                    <SelectItem value="MMFF94">MMFF94</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* pH */}
              <div className="space-y-2">
                <label className="text-sm font-medium">pH</label>
                <Input value={pH} onChange={(e) => setPH(e.target.value)} className="bg-white" />
              </div>

              {/* Selected Files */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Selected Files</h3>
                <div className="space-y-2">
                  {ligandFiles.map((file) => (
                    <div
                      key={file.id}
                      className={cn("flex items-center p-1.5 rounded file-row", file.selected ? "bg-[#006F7F]/10" : "")}
                    >
                      <div
                        className={cn(
                          "w-5 h-4 rounded-sm border border-[#006F7F]  flex items-center justify-center cursor-pointer file-radio",
                          file.selected ? "bg-[#006F7F] selected" : "",
                        )}
                        onClick={() => toggleFileSelection(file.id, "ligand")}
                      >
                        {file.selected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="ml-2 text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delete and Prepare Ligand Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 border-[#006F7F] text-[#006F7F]">
                  Delete
                </Button>
                <Button className="flex-1 bg-[#006F7F] hover:bg-[#005a66] text-white" onClick={handlePrepareLigand}>
                  Prepare Ligand
                </Button>
              </div>
            </div>
          </>
        )}

        {activeTab === "docking" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Docked Protine and ligand</h2>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              {/* Selected Files */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Config Files</h3>
                <div className="space-y-2">
                  {dockingFiles.map((file) => (
                    <div
                      key={file.id}
                      className={cn("flex items-center p-1.5 rounded file-row", file.selected ? "bg-[#006F7F]/10" : "")}
                    >
                      <div
                        className={cn(
                          "w-5 h-4 rounded-sm border border-[#006F7F] flex items-center justify-center cursor-pointer file-radio",
                          file.selected ? "selected bg-[#006F7F]" : "",
                        )}
                        onClick={() => toggleFileSelection(file.id, "docking")}
                      >
                        {file.selected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="ml-2 text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delete Button */}
              <Button variant="outline" className="w-full border-[#006F7F] text-[#006F7F]">
                Delete
              </Button>

              {/* Create config Button */}
              <Button variant="outline" className="w-full border-[#006F7F] text-[#006F7F]">
                Create config
              </Button>

              {/* Run Docking Button */}
              <Button className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white">Run Docking</Button>
            </div>
          </>
        )}

        {activeTab === "result" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <Button className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white">Show docked pair</Button>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              <Button className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white">Result</Button>
            </div>
          </>
        )}

        {activeTab === "pda" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <Button className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white">Show docked pair</Button>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">File Properties</h3>
                <div className="space-y-2">
                  <p className="text-sm">Threshold bind energy</p>
                  <Input
                    placeholder="Enter ...."
                    value={thresholdEnergy}
                    onChange={(e) => setThresholdEnergy(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm">Sorting Method</p>
                  <Select value={sortingMethod} onValueChange={setSortingMethod}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Threshold energy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Threshold energy">Threshold energy</SelectItem>
                      <SelectItem value="Binding affinity">Binding affinity</SelectItem>
                      <SelectItem value="Interaction score">Interaction score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white" onClick={handleAnalyze}>
                Analyze
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center">LIGAND LOCK</h1>
          </div>
        </header>

        {/* Main content area with tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <div className="flex justify-between items-center px-4">
                <TabsList className="h-12 bg-transparent border-b-0 p-0">
                  <TabsTrigger
                    value="protine"
                    className="h-12 px-6 data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:shadow-none rounded-none"
                  >
                    Protine
                  </TabsTrigger>
                  <TabsTrigger
                    value="ligand"
                    className="h-12 px-6 data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:shadow-none rounded-none"
                  >
                    Ligand
                  </TabsTrigger>
                  <TabsTrigger
                    value="docking"
                    className="h-12 px-6 data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:shadow-none rounded-none"
                  >
                    Docking
                  </TabsTrigger>
                  <TabsTrigger
                    value="result"
                    className="h-12 px-6 data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:shadow-none rounded-none"
                  >
                    Result
                  </TabsTrigger>
                  <TabsTrigger
                    value="pda"
                    className="h-12 px-6 data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:shadow-none rounded-none"
                  >
                    PDA
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Job ID"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    className="w-40 bg-white"
                  />
                  <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                    Existing Job
                  </Button>
                  <Button className="bg-[#006F7F] hover:bg-[#005a66] text-white">New Job</Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="protine" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Protine</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/protein.gif"
                        alt="DNA icon"
                        className="mx-auto mb-4 h-24 w-24"
                      />
                      <p className="text-lg text-gray-600">
                        No data available yet. Upload a file and click Analyze to view your results here.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ligand" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Ligand</h2>
                </div>
                {showResults && isLigandPrepared ? (
                  <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
                    <div className="bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] p-4">
                      <h3 className="text-xl font-medium text-[#006F7F] mb-4">Visualaizer</h3>
                      <div className="h-[calc(100%-2rem)] flex items-center justify-center">
                        <img
                          src="/protein.gif"
                          alt="Protein visualization"
                          className="max-w-full max-h-full"
                        />
                      </div>
                    </div>
                    <div className="bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] p-4">
                      <h3 className="text-xl font-medium text-[#006F7F] mb-4">Table</h3>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Size</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultsFiles.map((file, index) => (
                            <tr key={index}>
                              <td className="py-2">{file.name}</td>
                              <td className="py-2">{file.size}</td>
                              <td className="py-2 text-[#006F7F]">{file.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[calc(100%-3rem)]">
                    <div className="h-full bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-24%20at%2010.05.19_b98cf6e9.jpg-o2NQLl6wDCSRe401T64dg5361bZWAv.jpeg"
                          alt="DNA icon"
                          className="mx-auto mb-4 h-16 w-16"
                        />
                        <p className="text-lg text-gray-600">
                          No data available yet. Click "Prepare Ligand" to view your results here.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="docking" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Docking</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/protein.gif"
                        alt="DNA icon"
                        className="mx-auto mb-4 h-16 w-16"
                      />
                      <p className="text-lg text-gray-600">
                        No data available yet. Upload a file and click Analyze to view your results here.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="result" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Result</h2>
                </div>
                {showPreparedResults ? (
                  <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
                    <div className="bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] p-4">
                      <h3 className="text-xl font-medium text-[#006F7F] mb-4">Visualaizer</h3>
                      <div className="h-[calc(100%-2rem)] flex flex-col">
                        <div className="bg-white p-2 mb-2">
                          <div className="flex items-center space-x-1 overflow-x-auto">
                            <span className="text-xs font-bold">Chain A</span>
                            {Array.from({ length: 20 }).map((_, i) => (
                              <span key={i} className="text-[10px] whitespace-nowrap">
                                {210 + i}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-1 overflow-x-auto">
                            {[
                              "V",
                              "S",
                              "L",
                              "K",
                              "D",
                              "I",
                              "T",
                              "S",
                              "C",
                              "K",
                              "Y",
                              "F",
                              "I",
                              "P",
                              "Y",
                              "V",
                              "W",
                              "A",
                              "V",
                            ].map((letter, i) => (
                              <span
                                key={i}
                                className="text-xs font-bold w-4 h-4 flex items-center justify-center"
                                style={{
                                  backgroundColor: ["V", "L", "I", "F", "W"].includes(letter)
                                    ? "#9ACD32"
                                    : ["K", "R"].includes(letter)
                                      ? "#1E90FF"
                                      : ["D", "E"].includes(letter)
                                        ? "#FF4500"
                                        : ["S", "T", "Y"].includes(letter)
                                          ? "#FFD700"
                                          : "#FFFFFF",
                                }}
                              >
                                {letter}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src="/protein.gif"
                            alt="Protein structure visualization"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] p-4">
                      <h3 className="text-xl font-medium text-[#006F7F] mb-4">Table</h3>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Size</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">Complex_A1</td>
                            <td className="py-2">445.36KB</td>
                            <td className="py-2 text-[#006F7F]">Updated</td>
                          </tr>
                          <tr>
                            <td className="py-2">Complex_A1</td>
                            <td className="py-2">445.36KB</td>
                            <td className="py-2 text-[#006F7F]">Updated</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[calc(100%-3rem)]">
                    <div className="h-full bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="/protein.gif"
                          alt="DNA icon"
                          className="mx-auto mb-4 h-16 w-16"
                        />
                        <p className="text-lg text-gray-600">
                          No data available yet. Upload a file and click Analyze to view your results here.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pda" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">PDA</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-[#e6f7fc]/30 rounded-lg border-2 border-[#e6f7fc] flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/protein.gif"
                        alt="DNA icon"
                        className="mx-auto mb-4 h-16 w-16"
                      />
                      <p className="text-lg text-gray-600">
                        No data available yet. Upload a file and click Analyze to view your results here.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer with action buttons */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
              <RefreshCw className="h-4 w-4 mr-2" /> Reset View
            </Button>
            <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
              <Save className="h-4 w-4 mr-2" /> Save Image
            </Button>
            <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
              <Download className="h-4 w-4 mr-2" /> Save Molecule
            </Button>
            <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Dialog */}
      {propertiesDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setPropertiesDialogOpen(false)}
          ></div>

          {/* Dialog content */}
          <div className="relative z-10 bg-white rounded-lg shadow-lg w-[500px] max-w-md">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setPropertiesDialogOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            

            <div className="grid grid-cols-2 gap-8 p-6">
              <div>
                <h3 className="text-lg font-medium text-[#006F7F] mb-4">Ligand</h3>
                <div className="space-y-3">
                  {["Ligand_file_1", "Ligand_file_2", "Ligand_file_3", "Ligand_file_4", "Ligand_file_5"].map(
                    (name, id) => (
                      <div key={id} className="flex items-center">
                        <div
                          className={cn(
                            "w-5 h-4 rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer",
                            id === 1 || id === 2 ? "bg-[#006F7F] border-[#006F7F]" : "bg-white",
                          )}
                        >
                          {(id === 1 || id === 2) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <label className="ml-2 text-sm cursor-pointer">{name}</label>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#006F7F] mb-4">Protine</h3>
                <div className="space-y-3">
                  {["Protine_file_1", "Protine_file_2", "Protine_file_3", "Protine_file_4", "Protine_file_5"].map(
                    (name, id) => (
                      <div key={id} className="flex items-center">
                        <div
                          className={cn(
                            "w-5 h-4 rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer",
                            id === 2 ? "bg-[#006F7F] border-[#006F7F]" : "bg-white",
                          )}
                        >
                          {id === 2 && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <label className="ml-2 text-sm cursor-pointer">{name}</label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
