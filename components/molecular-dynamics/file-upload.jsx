"use client"

import  React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Info, Download } from "lucide-react"


export function FileUpload({ label, infoTooltip }) {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {infoTooltip && <Info className="h-4 w-4 text-gray-400" />}
      </div>

      <div className="border border-dashed border-gray-300 rounded-md p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">{file ? file.name : "Drag & Drop or"}</div>

          <div className="flex items-center gap-2">
            <label htmlFor={`file-upload-${label}`} className="cursor-pointer">
              <span className="text-blue-600 text-sm">Select file</span>
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
