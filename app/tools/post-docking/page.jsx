"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResultsDisplay } from "@/components/results-display"
import { Search, ArrowRight } from "lucide-react"

export default function PostDocking() {
  const [jobId, setJobId] = useState("")
  const [dockingTool, setDockingTool] = useState("autodock")
  const [threshold, setThreshold] = useState("")
  const [sortBy, setSortBy] = useState("energy-asc")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFetchJob = () => {
    if (!jobId) {
      alert("Please enter a Job ID")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResults([
        { complex: "Complex_A1", bindingEnergy: -8.2, rmsd: 1.2, interactions: 5 },
        { complex: "Complex_B2", bindingEnergy: -7.9, rmsd: 1.5, interactions: 4 },
        { complex: "Complex_C3", bindingEnergy: -7.5, rmsd: 1.8, interactions: 6 },
        { complex: "Complex_D4", bindingEnergy: -7.2, rmsd: 2.1, interactions: 3 },
        { complex: "Complex_E5", bindingEnergy: -6.8, rmsd: 2.4, interactions: 4 },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const handleAnalyzeResults = () => {
    // In a real app, this would perform additional analysis
    alert("Analysis would be performed here")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">POST DOCKING ANALYSIS</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Docking Tool</label>
                <Select value={dockingTool} onValueChange={setDockingTool}>
                  <SelectTrigger className="bg-[#CEE6F1]">
                    <SelectValue placeholder="Select Docking Tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="autodock">AutoDock Vina</SelectItem>
                    <SelectItem value="glide">Glide</SelectItem>
                    <SelectItem value="gold">GOLD</SelectItem>
                    <SelectItem value="rdock">rDock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Job ID</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Job ID"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    className="bg-[#CEE6F1]"
                  />
                  <Button onClick={handleFetchJob} className="bg-[#006F7F] hover:bg-[#006F7F]/90">
                    <Search className="h-4 w-4" /> Fetch Job
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Analyze Your Docking Result</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Protein</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Choose a Protein Molecule" className="bg-[#CEE6F1]" readOnly />
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Choose a Protein Molecule</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ligand</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Choose a Ligand Molecule" className="bg-[#CEE6F1]" readOnly />
                    <Button variant="outline" className="border-[#006F7F] text-[#006F7F]">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Choose a Ligand Molecule</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Threshold Binding Energy</label>
                  <Input
                    placeholder="Enter threshold value"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="bg-[#CEE6F1]"
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort Results</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-[#CEE6F1]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energy-asc">Binding Energy (Ascending)</SelectItem>
                      <SelectItem value="energy-desc">Binding Energy (Descending)</SelectItem>
                      <SelectItem value="rmsd-asc">RMSD (Ascending)</SelectItem>
                      <SelectItem value="rmsd-desc">RMSD (Descending)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleAnalyzeResults} className="bg-[#006F7F] hover:bg-[#006F7F]/90">
                  <ArrowRight className="mr-2 h-4 w-4" /> Analyze Results
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <ResultsDisplay title="Docking Analysis Results" results={results} isLoading={isLoading} />
      </div>
    </div>
  )
}

