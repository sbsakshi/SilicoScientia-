"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Download, Eye, FileUp, Loader2, Menu, RefreshCw, RotateCw, Save, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
// First, make sure the FileUpload component is imported at the top
import { FileUpload } from "@/components/file-upload"


export default function LigandLock() {
  // Update the sidebar width to be wider
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("pda")
  const [pdbId, setPdbId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [loadedFiles, setLoadedFiles] = useState([
    {
      id: 1,
      name: "Complex_A1",
      type: "Protein",
      size: "445.36KB",
      status: "Updated",
    },
    {
      id: 2,
      name: "Complex_A1",
      type: "Ligand",
      size: "445.36KB",
      status: "Updated",
    },
  ])
  const [jobId, setJobId] = useState("")

  const handleFileSelect = (file) => {
    setIsLoading(true)
    // Simulate loading a molecule
    setTimeout(() => {
      setIsLoading(false)
      setIsModelLoaded(true)

      // Add the file to loaded files
      const newFile= {
        id: loadedFiles.length + 1,
        name: file.name.split(".")[0],
        type: file.name.endsWith(".pdb") ? "Protein" : "Ligand",
        size: `${(file.size / 1024).toFixed(2)}KB`,
        status: "Updated",
      }

      setLoadedFiles([...loadedFiles, newFile])
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

      // Add the PDB to loaded files
      const newFile= {
        id: loadedFiles.length + 1,
        name: `PDB_${pdbId}`,
        type: "Protein",
        size: "512.45KB",
        status: "Updated",
      }

      setLoadedFiles([...loadedFiles, newFile])
    }, 1500)
  }

  const handleDeleteFile = (id) => {
    setLoadedFiles(loadedFiles.filter((file) => file.id !== id))
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div
      className="flex h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white/80 backdrop-blur-sm border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "w-80" : "w-0",
        )}
      >
        {sidebarOpen && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">File Manager</h2>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Upload Files</h3>
                {activeTab === "protine" && (
                  <div className="space-y-4">
                    <FileUpload
                      label="Upload Protein File"
                      description="Please provide a protein structure"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".pdb"
                      className="mb-2"
                    />
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                      <Eye className="mr-2 h-4 w-4" /> Show Ligand File
                    </Button>
                  </div>
                )}

                {activeTab === "ligand" && (
                  <div className="space-y-4">
                    <FileUpload
                      label="Upload Ligand File"
                      description="Please provide a ligand structure"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".mol,.mol2,.sdf"
                      className="mb-2"
                    />
                    <FileUpload
                      label="Upload Text File"
                      description="Please provide a text file"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".txt,.csv"
                      className="mb-2"
                    />
                  </div>
                )}

                {activeTab === "docking" && (
                  <div className="space-y-4">
                    <FileUpload
                      label="Upload Config File"
                      description="Please provide a config file"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".txt,.cfg,.json"
                      className="mb-2"
                    />
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                      <FileUp className="mr-2 h-4 w-4" /> Find pocket
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[#f0f7fa] hover:bg-[#e0f0f7]"
                    >
                      <RotateCw className="mr-2 h-4 w-4 text-[#006F7F]" /> Run Docking
                    </Button>
                  </div>
                )}

                {activeTab === "result" && (
                  <div className="space-y-4">
                    <FileUpload
                      label="Upload Result File"
                      description="Please provide a result file"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".pdb,.mol,.sdf"
                      className="mb-2"
                    />
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                      <Eye className="mr-2 h-4 w-4" /> Show Ligand File
                    </Button>
                  </div>
                )}

                {activeTab === "pda" && (
                  <div className="space-y-4">
                    <FileUpload
                      label="Upload Protein File"
                      description="Please provide a protein structure"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".pdb"
                      className="mb-2"
                    />
                    <FileUpload
                      label="Upload Text File"
                      description="Please provide a text file"
                      onFileSelect={(file) => handleFileSelect(file)}
                      accept=".txt,.csv"
                      className="mb-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">PDB Loader</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter PDB ID"
                    value={pdbId}
                    onChange={(e) => setPdbId(e.target.value)}
                    className="bg-white"
                  />
                  <Button
                    onClick={handleLoadPDB}
                    className="bg-[#006F7F] hover:bg-[#006F7F]/90"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Loaded Files</h3>
                <div className="space-y-2">
                  {loadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-[#f0f7fa] rounded-md">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-[#006F7F] mr-2" />
                        <div>
                          <p className="text-sm font-medium">{`${file.type}: ${file.name}`}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loadedFiles.length === 0 && (
                    <div className="text-center p-4 text-gray-500 text-sm">No files loaded</div>
                  )}
                </div>
              </div>

              {/* File Properties Section */}
              {activeTab === "pda" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">File Properties</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm">Threshold bind energy</label>
                      <Select defaultValue="none">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Sorting Method</label>
                      <Select defaultValue="threshold">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Threshold energy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="threshold">Threshold energy</SelectItem>
                          <SelectItem value="binding">Binding affinity</SelectItem>
                          <SelectItem value="interaction">Interaction score</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-[#006F7F] hover:bg-[#006F7F]/90 text-white">Analyze</Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-center relative">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="absolute left-0">
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
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
                    Results
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
                  <Button className="bg-[#006F7F] hover:bg-[#006F7F]/90 text-white">New Job</Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="protine" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Protine</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-white rounded-lg border-2 border-[#f0f7fa] flex items-center justify-center">
                    {isLoading ? (
                      <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#006F7F]" />
                        <p className="mt-4 text-muted-foreground">Loading molecule...</p>
                      </div>
                    ) : isModelLoaded ? (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-13%20at%2022.41.20_6376739c.jpg-4pJNOkdWxnpItltfRJLxs7bFq4GmyW.jpeg"
                        alt="Protein Visualization"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                        <p className="mt-4 text-muted-foreground">
                          Upload a protein structure or enter a PDB ID to visualize
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ligand" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Ligand</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-white rounded-lg border-2 border-[#f0f7fa] flex items-center justify-center">
                    {isModelLoaded ? (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-13%20at%2022.41.20_6376739c.jpg-4pJNOkdWxnpItltfRJLxs7bFq4GmyW.jpeg"
                        alt="Ligand Visualization"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                        <p className="mt-4 text-muted-foreground">Upload a ligand structure to visualize</p>
                      </div>
                    )}
                  </div>
                </div>

                {isModelLoaded && (
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#f0f7fa]">
                          <TableHead className="w-[100px]">S.No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.id}</TableCell>
                            <TableCell>{file.name}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                              <span className="text-[#006F7F]">{file.status}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-center space-x-4 mt-6">
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
                )}
              </TabsContent>

              <TabsContent value="docking" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Docking</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-white rounded-lg border-2 border-[#f0f7fa] flex items-center justify-center">
                    {isModelLoaded ? (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-13%20at%2022.52.16_b4157e5c.jpg-jMD7gegxEZdXT8NtZRrmIwYuFTulk9.jpeg"
                        alt="Docking Visualization"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                        <p className="mt-4 text-muted-foreground">Configure docking parameters</p>
                      </div>
                    )}
                  </div>
                </div>

                {isModelLoaded && (
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#f0f7fa]">
                          <TableHead className="w-[100px]">S.No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.id}</TableCell>
                            <TableCell>{file.name}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                              <span className="text-[#006F7F]">{file.status}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-center space-x-4 mt-6">
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
                )}
              </TabsContent>

              <TabsContent value="result" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">Results</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-white rounded-lg border-2 border-[#f0f7fa] flex items-center justify-center">
                    {isModelLoaded ? (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-13%20at%2023.08.52_eea6a5b2.jpg-95AOhYjzngOK9MtiCFM1erVs2b3Fh2.jpeg"
                        alt="Results Visualization"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                        <p className="mt-4 text-muted-foreground">No results available</p>
                      </div>
                    )}
                  </div>
                </div>

                {isModelLoaded && (
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#f0f7fa]">
                          <TableHead className="w-[100px]">S.No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Visiluaze</TableHead>
                          <TableHead>Bind Energy</TableHead>
                          <TableHead className="text-right">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.id}</TableCell>
                            <TableCell>{file.name}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                              <span className="text-[#006F7F]">Updated</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-center space-x-4 mt-6">
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
                )}
              </TabsContent>

              <TabsContent value="pda" className="mt-0 h-full">
                <div className="mb-4">
                  <h2 className="text-2xl font-medium text-[#006F7F]">PDA</h2>
                </div>
                <div className="relative h-[calc(100%-3rem)]">
                  <div className="h-full bg-white rounded-lg border-2 border-[#f0f7fa] flex items-center justify-center">
                    {isModelLoaded ? (
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-13%20at%2023.25.06_fa33e73f.jpg-mB7waJF0B1S7QFjqiHzj9eVZwFB7B4.jpeg"
                        alt="PDA Visualization"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileUp className="h-16 w-16 mx-auto text-[#006F7F]/50" />
                        <p className="mt-4 text-muted-foreground">Upload files for post-docking analysis</p>
                      </div>
                    )}
                  </div>
                </div>

                {isModelLoaded && (
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#f0f7fa]">
                          <TableHead className="w-[100px]">S.No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Visiluaze</TableHead>
                          <TableHead>Bind Energy</TableHead>
                          <TableHead className="text-right">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.id}</TableCell>
                            <TableCell>{file.name}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                              <span className="text-[#006F7F]">{file.status}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-center space-x-4 mt-6">
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
v                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

             
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
