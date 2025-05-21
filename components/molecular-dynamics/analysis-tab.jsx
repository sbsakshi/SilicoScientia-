"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUpload } from "./file-upload"
import { Info } from "lucide-react"

export function AnalysisTab() {
  const [showPathInput, setShowPathInput] = useState(false)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Job Name</h2>
          <Info className="h-5 w-5 text-gray-400" />
        </div>

        <Input placeholder="Enter Job name" className="max-w-full bg-white border-gray-200" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Mol Name</h2>
          <Info className="h-5 w-5 text-gray-400" />
        </div>

        <Input placeholder="Enter Mol Name" className="max-w-full bg-white border-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FileUpload label="TRP FILE" infoTooltip="Upload trajectory file in TRP format" />

        <FileUpload label="XTC FILE" infoTooltip="Upload trajectory file in XTC format" />
      </div>

      <div className="flex items-center gap-2 text-blue-600">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <Info className="h-4 w-4" />
        </div>
        <p className="text-sm font-medium">ENTER FILE PATH DIRECTLY</p>
      </div>

      <div className="text-sm text-gray-600 max-w-2xl">
        Alternatively you can specify the direct path file TRP, XTC and working directory instead of Uploading File
      </div>

      <div className="flex justify-between">
        <Button
          className="bg-green-800 hover:bg-green-700 text-white px-8"
          onClick={() => setShowPathInput(!showPathInput)}
        >
          Show Path Input
        </Button>

        <Button className="bg-green-800 hover:bg-green-700 text-white px-8">Run Analysis</Button>
      </div>

      {showPathInput && (
        <div className="space-y-4 border border-gray-200 rounded-md p-4 bg-white/80">
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
    </div>
  )
}
