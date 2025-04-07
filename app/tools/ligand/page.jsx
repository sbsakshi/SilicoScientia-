"use client"

import React from "react"

import { useState, useRef } from "react"
import { CloudUpload, Info, Play } from "lucide-react"

const page=()=> {
  const [files, setFiles] = useState([])
  const [pdbIds, setPdbIds] = useState("")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleRunAnalysis = () => {
    if (files.length > 0) {
      console.log("Analyzing files:", files)
    } else if (pdbIds.trim()) {
      console.log(
        "Analyzing PDB IDs:",
        pdbIds.split(" ").filter((id) => id),
      )
    } else {
      alert("Please upload PDB files or enter PDB IDs")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Background molecular pattern */}
      {/* <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-blue-300"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i + 100}
            className="absolute bg-transparent border border-blue-300"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div> */}

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Ligand-Interaction Tool</h1>
          <p className="text-gray-600 text-sm">
            Analyze protein-ligand interactions with ease. Upload PDB files or enter PDB IDs to get started.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Upload PDB File</p>

            <div
              onClick={handleChooseFile}
              className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdb"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <CloudUpload className="h-5 w-5 text-blue-500" />
                </div>

                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md transition-colors"
                >
                  Choose Files
                </button>

                {files.length > 0 && (
                  <div className="mt-2 text-sm text-blue-600">
                    {files.length} file{files.length !== 1 ? "s" : ""} selected
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-2">Supports multiple PDB files</p>
            </div>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <div className="mx-4 text-sm text-gray-400">OR</div>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <p className="text-sm text-gray-500">Enter PDB IDs</p>
              <button
                type="button"
                className="ml-1 text-blue-500 hover:text-blue-700"
                aria-label="Information about PDB IDs"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter PDB IDs (space-separated)"
              value={pdbIds}
              onChange={(e) => setPdbIds(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleRunAnalysis}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
