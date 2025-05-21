"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Progress } from "@/components/ui/progress"
import { Info, Zap, Waves, Clock, Thermometer, Play, Download, CheckCircle2, Loader2, BarChart3 } from "lucide-react"

export default function MolecularDynamicsTool() {
  const [activeTab, setActiveTab] = useState("prot-lig")
  const [showPathInput, setShowPathInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [jobId, setJobId] = useState("")
  const [jobName, setJobName] = useState("")
  const [molName, setMolName] = useState("")
  const { toast } = useToast()

  // Simulate progress for demo purposes
  useEffect(() => {
    if (isSubmitting && simulationProgress < 100) {
      const timer = setTimeout(() => {
        setSimulationProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            setIsSubmitting(false)
            toast({
              title: "Simulation Complete",
              description: "Your molecular dynamics simulation has finished successfully.",
              variant: "default",
            })
          }
          return newProgress
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isSubmitting, simulationProgress, toast])

  // Handle simulation submission
  const handleSubmitSimulation = () => {
    if (!jobId) {
      toast({
        title: "Missing Information",
        description: "Please enter a Job ID before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setSimulationProgress(0)
    toast({
      title: "Simulation Started",
      description: "Your molecular dynamics simulation is now running.",
    })
  }

  // Handle analysis submission
  const handleRunAnalysis = () => {
    if (!jobName || !molName) {
      toast({
        title: "Missing Information",
        description: "Please enter Job Name and Mol Name before running analysis.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    toast({
      title: "Analysis Started",
      description: "Your analysis is being processed.",
    })

    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      toast({
        title: "Analysis Complete",
        description: "Your analysis results are ready to view.",
      })
    }, 3000)
  }

  return (
    <div
      className="min-h-screen flex flex-col"
    
    >
      <TooltipProvider>
        <header className="w-full py-6 bg-black/5 backdrop-blur-sm">
          <h1 className="text-center text-4xl font-bold text-black">MOLECULAR DYNAMIC STIMULATION TOOL</h1>
        </header>

        <main className="flex-1 container mx-auto p-4">
          <Tabs defaultValue="prot-lig" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger
                value="prot-lig"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "prot-lig"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="text-green-700">
                  <Zap className="h-5 w-5" />
                </div>
                <span className={activeTab === "prot-lig" ? "text-blue-600 font-medium" : "font-medium"}>
                  Prot-Lig Simulation
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="protein"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "protein"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="text-gray-700">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="font-medium">Protein Simulation</span>
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "analysis"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="text-gray-700">
                  <Waves className="h-5 w-5" />
                </div>
                <span className="font-medium">Analysis</span>
              </TabsTrigger>
            </TabsList>

            {/* Prot-Lig Simulation Tab */}
            <TabsContent value="prot-lig" className="animate-in fade-in-50 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Builder</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Configure your simulation parameters and workflow steps</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-1">
                    <Input
                      placeholder="Enter a job ID (e.g., my-flexible-docking-run)"
                      className="max-w-full bg-white border-gray-200"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 ml-1">Job ID is saved locally</p>
                  </div>

                  <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    <WorkflowStep
                      icon={<Zap className="h-6 w-6 text-blue-600" />}
                      title="Energy Minimization"
                      subtitle="em.mdp"
                      active={true}
                      tooltip="Minimizes the energy of the system to remove bad contacts"
                    />
                    <WorkflowStep
                      icon={<Waves className="h-6 w-6 text-gray-600" />}
                      title="Ion Placement"
                      subtitle="ions.mdp"
                      tooltip="Places ions in the solvent to neutralize the system"
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NVT Equilibration"
                      subtitle="nvt.mdp"
                      tooltip="Equilibrates the system at constant volume and temperature"
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NPT Equilibration"
                      subtitle="npt.mdp"
                      tooltip="Equilibrates the system at constant pressure and temperature"
                    />
                    <WorkflowStep
                      icon={<Play className="h-6 w-6 text-gray-600" />}
                      title="MD Production"
                      subtitle="md.mdp"
                      tooltip="Runs the production molecular dynamics simulation"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Choose Force Field</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Select the force field parameters for your simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Select defaultValue="charmm36">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select force field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="charmm36">CHARMM36 all-atom force field (March 2019)</SelectItem>
                      <SelectItem value="amber">AMBER force field</SelectItem>
                      <SelectItem value="gromos">GROMOS force field</SelectItem>
                      <SelectItem value="opls">OPLS force field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Input Files</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Upload the required files for your protein-ligand simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FileUpload
                      label="ligand File"
                      tooltip="Upload the ligand structure file (PDB, MOL2, SDF format)"
                      onFileChange={() =>
                        toast({ title: "File uploaded", description: "Ligand file has been uploaded successfully" })
                      }
                    />
                    <FileUpload
                      label="ligtp File"
                      tooltip="Upload the ligand topology file"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Ligand topology file has been uploaded successfully",
                        })
                      }
                    />
                    <FileUpload
                      label="lig.mol2 File"
                      tooltip="Upload the ligand in MOL2 format"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Ligand MOL2 file has been uploaded successfully",
                        })
                      }
                    />
                    <FileUpload
                      label="ligref File"
                      tooltip="Upload the ligand reference file"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Ligand reference file has been uploaded successfully",
                        })
                      }
                    />
                    <FileUpload
                      label="ligref.itp File"
                      tooltip="Upload the ligand reference topology include file"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Ligand reference topology file has been uploaded successfully",
                        })
                      }
                    />
                    <FileUpload
                      label="lig.itp File"
                      tooltip="Upload the ligand topology include file"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Ligand topology include file has been uploaded successfully",
                        })
                      }
                    />
                    <FileUpload
                      label="protein.pdb"
                      tooltip="Upload the protein structure file in PDB format"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Protein PDB file has been uploaded successfully",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <p className="text-sm">Upload necessary files and configure MDP settings to enable Submit.</p>
                </div>

                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Simulation progress</span>
                      <span>{simulationProgress}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleSubmitSimulation}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Simulation"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Protein Simulation Tab */}
            <TabsContent value="protein" className="animate-in fade-in-50 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Builder</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Configure your protein simulation parameters</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-1">
                    <Input
                      placeholder="Enter a job ID (e.g., my-flexible-docking-run)"
                      className="max-w-full bg-white border-gray-200"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 ml-1">Job ID is saved locally</p>
                  </div>

                  <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    <WorkflowStep
                      icon={<Zap className="h-6 w-6 text-blue-600" />}
                      title="Energy Minimization"
                      subtitle="em.mdp"
                      active={true}
                      tooltip="Minimizes the energy of the system to remove bad contacts"
                    />
                    <WorkflowStep
                      icon={<Waves className="h-6 w-6 text-gray-600" />}
                      title="Ion Placement"
                      subtitle="ions.mdp"
                      tooltip="Places ions in the solvent to neutralize the system"
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NVT Equilibration"
                      subtitle="nvt.mdp"
                      tooltip="Equilibrates the system at constant volume and temperature"
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NPT Equilibration"
                      subtitle="npt.mdp"
                      tooltip="Equilibrates the system at constant pressure and temperature"
                    />
                    <WorkflowStep
                      icon={<Play className="h-6 w-6 text-gray-600" />}
                      title="MD Production"
                      subtitle="md.mdp"
                      tooltip="Runs the production molecular dynamics simulation"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Choose Force Field</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Select the force field parameters for your simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Select defaultValue="charmm36">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select force field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="charmm36">CHARMM36 all-atom force field (March 2019)</SelectItem>
                      <SelectItem value="amber">AMBER force field</SelectItem>
                      <SelectItem value="gromos">GROMOS force field</SelectItem>
                      <SelectItem value="opls">OPLS force field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Input Files</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Upload the required protein structure file</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-4">
                    <FileUpload
                      label="protein.pdb"
                      tooltip="Upload the protein structure file in PDB format"
                      onFileChange={() =>
                        toast({
                          title: "File uploaded",
                          description: "Protein PDB file has been uploaded successfully",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <p className="text-sm">Upload necessary files and configure MDP settings to enable Submit.</p>
                </div>

                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Simulation progress</span>
                      <span>{simulationProgress}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleSubmitSimulation}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Simulation"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="animate-in fade-in-50 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Job Name</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter a name for this analysis job</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    placeholder="Enter Job name"
                    className="max-w-full bg-white border-gray-200"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Mol Name</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the name of the molecule being analyzed</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    placeholder="Enter Mol Name"
                    className="max-w-full bg-white border-gray-200"
                    value={molName}
                    onChange={(e) => setMolName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <FileUpload
                    label="TRP FILE"
                    tooltip="Upload trajectory file in TRP format"
                    onFileChange={() =>
                      toast({ title: "File uploaded", description: "TRP file has been uploaded successfully" })
                    }
                  />
                  <FileUpload
                    label="XTC FILE"
                    tooltip="Upload trajectory file in XTC format"
                    onFileChange={() =>
                      toast({ title: "File uploaded", description: "XTC file has been uploaded successfully" })
                    }
                  />
                </div>

                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">ENTER FILE PATH DIRECTLY</p>
                </div>

                <div className="text-sm text-gray-600 max-w-2xl">
                  Alternatively you can specify the direct path file TRP, XTC and working directory instead of Uploading
                  File
                </div>

                <div className="flex justify-between">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={() => setShowPathInput(!showPathInput)}
                  >
                    {showPathInput ? "Hide Path Input" : "Show Path Input"}
                  </Button>

                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run Analysis"
                    )}
                  </Button>
                </div>

                {showPathInput && (
                  <div className="space-y-4 border border-gray-200 rounded-md p-4 bg-white/80 animate-in slide-in-from-top duration-300">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">TRP File Path</label>
                      <Input placeholder="/path/to/trajectory.trp" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">XTC File Path</label>
                      <Input placeholder="/path/to/trajectory.xtc" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Working Directory</label>
                      <Input placeholder="/path/to/working/directory" />
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-6 border border-gray-200 rounded-md p-6 bg-white/90 animate-in fade-in-50 duration-500">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-700" />
                        Analysis Results
                      </h3>
                      <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
                        Hide Results
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">RMSD Analysis</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">RMSD Plot would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Radius of Gyration</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Rg Plot would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Hydrogen Bonds</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">H-Bond Analysis would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Secondary Structure</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Secondary Structure Analysis would appear here</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-500">Download Full Report</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Toaster />
      </TooltipProvider>
    </div>
  )
}

// File Upload Component with enhanced UI
function FileUpload({ label, tooltip, onFileChange }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (onFileChange) onFileChange()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      if (onFileChange) onFileChange()
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div
        className={`border border-dashed rounded-md p-4 bg-white transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center">
            {file ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                {file.name}
              </>
            ) : (
              "Drag & Drop or"
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor={`file-upload-${label}`} className="cursor-pointer">
              <span className="text-blue-600 text-sm hover:underline">Select file</span>
              <input id={`file-upload-${label}`} type="file" className="hidden" onChange={handleFileChange} />
            </label>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {!file && label.toLowerCase().includes("trp") && <p className="text-xs text-gray-500">No TRP File Uploaded</p>}
      {!file && label.toLowerCase().includes("xtc") && <p className="text-xs text-gray-500">No XTC File Uploaded</p>}
    </div>
  )
}

// Workflow Step Component
function WorkflowStep({
  icon,
  title,
  subtitle,
  active = false,
  tooltip,
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all group-hover:shadow-lg ${
              active ? "bg-white ring-2 ring-blue-300" : "bg-white group-hover:bg-gray-50"
            }`}
          >
            {icon}
          </div>
          <span
            className={`text-sm text-center transition-colors ${active ? "text-blue-600" : "text-gray-600 group-hover:text-gray-800"}`}
          >
            {title}
          </span>
          <span className="text-xs text-gray-500">{subtitle}</span>
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
