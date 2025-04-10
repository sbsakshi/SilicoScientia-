"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  FileUp,
  Home,
  ImageIcon,
  Loader2,
  Maximize2,
  RefreshCw,
  RotateCw,
  Save,
  Search,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

export default function MolVisio() {
  const [pdbId, setPdbId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [colorScheme, setColorScheme] = useState("element")
  const [representation, setRepresentation] = useState("cartoon")
  const [activeTab, setActiveTab] = useState("viewer")
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    setIsLoading(true)
    // Simulate loading a molecule
    setTimeout(() => {
      setIsLoading(false)
      setIsModelLoaded(true)
    }, 1500)
  }

  const handleLoadPDB = () => {
    if (!pdbId) {
      alert("Please enter a PDB ID")
      return
    }

    setIsLoading(true)
    // Simulate loading a molecule from PDB ID
    setTimeout(() => {
      setIsLoading(false)
      setIsModelLoaded(true)
    }, 1500)
  }

  const handleResetView = () => {
    // Reset view logic would go here
  }

  return (
    <div className="container mx-auto px-4 py-8">
       
      <Card className=" backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">MolVisio</CardTitle>
          <p className="text-muted-foreground">Advanced Molecular Visualization Tool</p>
        </CardHeader>
        <div className="flex justify-center items-center">
        <CardContent className="p-6 w-1/2">

          <div className="">
            {/* Left sidebar with controls */}
            <div className="lg:col-span-1 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="viewer">Viewer</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
             

              <TabsContent value="viewer" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Load Structure</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PDB or UniProt ID</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter PDB or UniProt ID"
                        value={pdbId}
                        onChange={(e) => setPdbId(e.target.value)}
                        className="bg-white"
                      />
                      <Button
                        onClick={handleLoadPDB}
                        className="bg-[#006F7F] hover:bg-[#006F7F]/90"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Structure File</label>
                    <FileUpload
                      label=""
                      description="Upload PDB, mmCIF, or MOL2 files"
                      onFileSelect={handleFileSelect}
                      accept=".pdb,.cif,.mol2,.xyz"
                      className="bg-[#00B3DC]/20"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visualization Options</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color Scheme</label>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Color Options</SelectLabel>
                          <SelectItem value="element">Color by Element</SelectItem>
                          <SelectItem value="chain">Color by Chain</SelectItem>
                          <SelectItem value="residue">Color by Residue Index</SelectItem>
                          <SelectItem value="residueName">Color by Residue Name</SelectItem>
                          <SelectItem value="secondary">Color by Secondary Structure</SelectItem>
                          <SelectItem value="bfactor">Color by B-factor</SelectItem>
                          <SelectItem value="hydrophobicity">Color by Hydrophobicity</SelectItem>
                          <SelectItem value="charge">Color by Charge</SelectItem>
                          <SelectItem value="random">Random Colors</SelectItem>
                          <SelectItem value="uniform">Uniform Color</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Representation</label>
                    <Select value={representation} onValueChange={setRepresentation}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select representation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Representation Styles</SelectLabel>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="spacefill">Spacefill</SelectItem>
                          <SelectItem value="ballAndStick">Ball & Stick</SelectItem>
                          <SelectItem value="ribbon">Ribbon</SelectItem>
                          <SelectItem value="backbone">Backbone</SelectItem>
                          <SelectItem value="surface">Surface</SelectItem>
                          <SelectItem value="licorice">Licorice</SelectItem>
                          <SelectItem value="line">Line</SelectItem>
                          <SelectItem value="rope">Rope</SelectItem>
                          <SelectItem value="trace">Trace</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <Home className="h-4 w-4 mr-2" /> Home
                    </Button>
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]" onClick={handleResetView}>
                      <RefreshCw className="h-4 w-4 mr-2" /> Reset View
                    </Button>
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <ImageIcon className="h-4 w-4 mr-2" /> Export
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Settings</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["#FFFFFF", "#000000", "#F0F8FF", "#2E2E2E"].map((color) => (
                        <div
                          key={color}
                          className="h-8 rounded-md cursor-pointer border hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => {}}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quality</label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Structure Analysis</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Measurements</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="border-[#006F7F] text-[#006F7F] p-2">
                        Distance
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#006F7F] text-[#006F7F] p-2">
                        Angle
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#006F7F] text-[#006F7F] p-2">
                        Dihedral
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#006F7F] text-[#006F7F] p-2">
                        Label
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Calculations</label>
                    <Select defaultValue="none">
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select calculation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="hbonds">Hydrogen Bonds</SelectItem>
                        <SelectItem value="ssbonds">Disulfide Bonds</SelectItem>
                        <SelectItem value="contacts">Contacts</SelectItem>
                        <SelectItem value="cavities">Cavities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
               </Tabs>
            </div>

            {/* Main visualization area */}
            <div className="">
              <div className="relative">
                {/* <div className="h-[600px] bg-white/20 rounded-lg border-2 border-[#00B3DC]/30 flex items-center justify-center">
                  {isLoading ? (
                    <div className="text-center">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#006F7F]" />
                      <p className="mt-4 text-muted-foreground">Loading molecule...</p>
                    </div>
                  ) : isModelLoaded ? (
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hvLCdyH9aXOBNBZFfVLLoPulGqvEiK.png"
                      alt="Protein Visualization"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                      <p className="mt-4 text-muted-foreground">Upload a structure or enter a PDB ID to visualize</p>
                    </div>
                  )}
                </div> */}

                {/* Visualization controls overlay */}
                {isModelLoaded && (
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="secondary" className="bg-white/80 shadow-md">
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Zoom In</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="secondary" className="bg-white/80 shadow-md">
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Zoom Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="secondary" className="bg-white/80 shadow-md">
                            <RotateCw className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Rotate</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="secondary" className="bg-white/80 shadow-md">
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fullscreen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>

              {/* Command input */}
              {isModelLoaded && (
                <div className="mt-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Enter command here" className="bg-white" />
                    <Button className="bg-[#006F7F] hover:bg-[#006F7F]/90">Run</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Type commands to manipulate the molecule. Try "select :A" to select chain A.
                  </p>
                </div>
              )}

              {/* Structure information */}
              {isModelLoaded && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/90">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Structure Information</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">PDB ID:</span>
                          <span className="font-medium">6VXX</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Title:</span>
                          <span className="font-medium">SARS-CoV-2 Spike Protein</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chains:</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Residues:</span>
                          <span className="font-medium">3,819</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Atoms:</span>
                          <span className="font-medium">30,542</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Selection</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Selected:</span>
                          <span className="font-medium">None</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Atoms:</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Residues:</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chains:</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Molecules:</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        </div>
      </Card>
    </div>
  )
}
