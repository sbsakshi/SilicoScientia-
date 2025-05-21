"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "./file-upload"
import { Info, Zap, Waves, Thermometer, Play } from "lucide-react"


export function SimulationBuilder({ isProteinTab = false }) {
  const [jobId, setJobId] = useState("")

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Simulation Builder</h2>
          <Info className="h-5 w-5 text-gray-400" />
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
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 text-center">Energy Minimization</span>
            <span className="text-xs text-gray-500">em.mdp</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <Waves className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600 text-center">Ion Placement</span>
            <span className="text-xs text-gray-500">ions.mdp</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <Thermometer className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600 text-center">NVT Equilibration</span>
            <span className="text-xs text-gray-500">nvt.mdp</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <Thermometer className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600 text-center">NPT Equilibration</span>
            <span className="text-xs text-gray-500">npt.mdp</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <Play className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600 text-center">MD Production</span>
            <span className="text-xs text-gray-500">md.mdp</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Choose Force Field</h2>
          <Info className="h-5 w-5 text-gray-400" />
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
          <Info className="h-5 w-5 text-gray-400" />
        </div>

        {isProteinTab ? (
          <div className="space-y-4">
            <FileUpload label="protein.pdb" infoTooltip="Upload protein structure file in PDB format" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <FileUpload label="ligand File" infoTooltip="Upload ligand structure file" />
            <FileUpload label="ligtp File" infoTooltip="Upload ligand topology file" />
            <FileUpload label="lig.mol2 File" infoTooltip="Upload ligand mol2 file" />
            <FileUpload label="ligref File" infoTooltip="Upload ligand reference file" />
            <FileUpload label="ligref.itp File" infoTooltip="Upload ligand reference topology file" />
            <FileUpload label="lig.itp File" infoTooltip="Upload ligand topology include file" />
            <FileUpload label="protein.pdb" infoTooltip="Upload protein structure file in PDB format" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-blue-600">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <Info className="h-4 w-4" />
        </div>
        <p className="text-sm">Upload necessary files and configure MDP settings to enable Submit.</p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-green-800 hover:bg-green-700 text-white px-8">Submit Simulation</Button>
      </div>
    </div>
  )
}
