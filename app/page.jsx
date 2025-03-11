"use client"

import { useState } from "react"
import {
  AlignCenter,
  ChevronDown,
  CloudUpload,
  Cog,
  CuboidIcon as Cube,
  Download,
  Expand,
  FileCode,
  FileOutputIcon as FileExport,
  Image,
  InfoIcon,
  AlignLeftIcon as ObjectsAlignLeft,
  Printer,
  RefreshCw,
  Save,
  Trash2,
  Undo,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// Sample protein data
const proteinData = {
  "2ykj": {
    pockets: [
      {
        id: "pocket10",
        score: -0.0539,
        drugScore: 0.0,
        alphaCount: 18,
        alphaRadius: 3.8564,
        solventAcc: 0.6187,
        bFactor: 0.3696,
      },
      {
        id: "pocket11",
        score: -0.0638,
        drugScore: 0.0002,
        alphaCount: 15,
        alphaRadius: 4.1749,
        solventAcc: 0.5815,
        bFactor: 0.1994,
      },
      {
        id: "pocket12",
        score: -0.0479,
        drugScore: 0.0042,
        alphaCount: 36,
        alphaRadius: 3.9692,
        solventAcc: 0.5717,
        bFactor: 0.2876,
      },
    ],
  },
}

export default function Home() {
  const { toast } = useToast()
  const [file, setFile] = useState(null)
  const [selectedPockets, setSelectedPockets] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0]

      // Validate file extension
      const fileExt = uploadedFile.name.split(".").pop()?.toLowerCase()
      if (fileExt !== "pdb") {
        toast({
          title: "Invalid File",
          description: "Please upload a valid .pdb file",
          variant: "destructive",
        })
        e.target.value = ""
        return
      }

      setFile(uploadedFile)
      setSelectedPockets([])

      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
    }
  }

  // Delete file
  const handleDeleteFile = () => {
    setFile(null)
    setSelectedPockets([])

    toast({
      title: "File Removed",
      description: "The file has been removed",
    })
  }

  // Toggle pocket selection
  const togglePocketSelection = (pocketId) => {
    setSelectedPockets((prev) => {
      if (prev.includes(pocketId)) {
        return prev.filter((id) => id !== pocketId)
      } else {
        return [...prev, pocketId]
      }
    })
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Show notification for actions
  const showNotification = (title, description) => {
    toast({
      title,
      description,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <div className="rounded-md bg-primary/10 p-2">
              <Cube className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Protein Pocket Finder</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-sm font-medium relative text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
            >
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Analysis
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Library
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  JD
                </div>
                <span className="hidden md:inline-block">John Doe</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 grid md:grid-cols-[350px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Protein</CardTitle>
              <CardDescription>Upload PDB files for pocket analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="file-upload" className="group cursor-pointer">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-10 text-center group-hover:border-primary/50 transition-colors">
                  <div className="rounded-full bg-primary/10 p-4 mb-4 group-hover:bg-primary/20 transition-colors">
                    <CloudUpload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Upload Protein</h3>
                  <p className="text-sm text-muted-foreground mt-1">Drag and drop or click to browse</p>
                  <input id="file-upload" type="file" accept=".pdb" className="hidden" onChange={handleFileUpload} />
                </div>
              </label>

              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <InfoIcon className="h-4 w-4 text-primary" />
                <span>Only .pdb format is supported</span>
              </div>
            </CardContent>
          </Card>

          {file && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Uploaded File</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg border border-border/50 hover:bg-secondary transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatFileSize(file.size)} • <span className="text-primary">Uploaded</span>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={handleDeleteFile}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {file && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Find Pockets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPockets.length < 2 && (
                  <Alert variant="warning" className="border-warning/50 text-warning-foreground bg-warning/10">
                    <AlertTitle className="flex items-center gap-2 text-sm font-medium">
                      Please select at least 2 pockets for analysis
                    </AlertTitle>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label htmlFor="pocket-dropdown" className="text-sm font-medium">
                    Select Protein Pockets
                  </label>

                  <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between font-normal">
                        {selectedPockets.length > 0 ? `2ykj (${selectedPockets.length} selected)` : "2ykj"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px]" align="start">
                      {proteinData["2ykj"].pockets.map((pocket) => (
                        <DropdownMenuItem
                          key={pocket.id}
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault()
                            togglePocketSelection(pocket.id)
                          }}
                        >
                          <Checkbox
                            id={pocket.id}
                            checked={selectedPockets.includes(pocket.id)}
                            onCheckedChange={() => togglePocketSelection(pocket.id)}
                          />
                          <label htmlFor={pocket.id} className="flex-1 cursor-pointer">
                            {pocket.id}
                          </label>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto gap-2"
                  disabled={selectedPockets.length < 2}
                  onClick={() => showNotification("Configuration", "Configuration panel would open here")}
                >
                  <Cog className="h-4 w-4" />
                  Configuration
                </Button>
                <Button
                  className="w-full sm:w-auto gap-2"
                  disabled={selectedPockets.length < 2}
                  onClick={() => showNotification("Compare", "Pocket comparison view would open here")}
                >
                  <AlignCenter className="h-4 w-4" />
                  Compare
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto gap-2"
                  disabled={selectedPockets.length < 2}
                  onClick={() => showNotification("Export", "Data export options would open here")}
                >
                  <FileExport className="h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>Protein Visualization</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Expand className="h-4 w-4" />
                  <span className="sr-only">Fullscreen</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Cog className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            </CardHeader>

            {!file ? (
              <div className="flex items-center justify-center h-[400px] bg-muted/30">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Cube className="h-16 w-16 mb-4 opacity-50" />
                  <p>Upload a protein file (.pdb) to view 3D visualization</p>
                </div>
              </div>
            ) : (
              <div className="h-[400px] bg-muted/30 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c6FmdPnIH0ZLPc6g9aBfwvfHQHWci7.png"
                  alt="Protein Visualization"
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            {file && (
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                    <Undo className="h-3.5 w-3.5" />
                    Reset
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                    <Image className="h-3.5 w-3.5" />
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    Export
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                    <ObjectsAlignLeft className="h-3.5 w-3.5" />
                    Align
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="representation" className="text-sm font-medium">
                    View:
                  </label>
                  <Select defaultValue="cartoon">
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="surface">Surface</SelectItem>
                      <SelectItem value="stick">Stick</SelectItem>
                      <SelectItem value="sphere">Sphere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </Card>

          {file && selectedPockets.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle>Pocket Analysis Results</CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 gap-1.5">
                    <Printer className="h-3.5 w-3.5" />
                    Print
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-medium">Protein:Pocket</TableHead>
                        <TableHead className="font-medium">Pocket Score</TableHead>
                        <TableHead className="font-medium">Drug Score</TableHead>
                        <TableHead className="font-medium">Alpha Spheres</TableHead>
                        <TableHead className="font-medium">Alpha Radius</TableHead>
                        <TableHead className="font-medium">Solvent Acc.</TableHead>
                        <TableHead className="font-medium">B-factor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPockets.map((pocketId) => {
                        const pocket = proteinData["2ykj"].pockets.find((p) => p.id === pocketId)
                        if (!pocket) return null

                        return (
                          <TableRow key={pocket.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">2ykj:{pocket.id}</TableCell>
                            <TableCell>{pocket.score.toFixed(4)}</TableCell>
                            <TableCell>{pocket.drugScore.toFixed(4)}</TableCell>
                            <TableCell>{pocket.alphaCount.toFixed(0)}</TableCell>
                            <TableCell>{pocket.alphaRadius.toFixed(4)}</TableCell>
                            <TableCell>{pocket.solventAcc.toFixed(4)}</TableCell>
                            <TableCell>{pocket.bFactor.toFixed(4)}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

