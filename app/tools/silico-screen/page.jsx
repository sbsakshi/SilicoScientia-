"use client"

import React from "react"

import { useState, useRef } from "react"
import { ArrowRight, ArrowLeft, Upload, RotateCw, RefreshCw } from "lucide-react"
import Image from "next/image"

import { useRouter } from "next/navigation"


const ScreenView = {
    MODEL_TRAINING: "training",
    MODEL_TESTING: "testing",
    ANALYSIS_RESULT: "analysis",
    PREDICTION_RESULT: "prediction",
  };

export default function SilicoScreen() {


  const [view, setView] = useState(ScreenView.MODEL_TRAINING)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [threshold, setThreshold] = useState("")
  const fileInputRef = useRef(null)
  const router = useRouter()

  // Form values
  const [batchSize, setBatchSize] = useState("")
  const [epochs, setEpochs] = useState("")
  const [dropOut, setDropOut] = useState("")

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleAnalyze = () => {
    if (files.length === 0) return

    setIsLoading(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzed(true)
      setIsLoading(false)
    }, 2000)
  }

  const handlePredictAnalysis = () => {
    setIsLoading(true)

    // Simulate loading and then navigate to analysis result
    setTimeout(() => {
      setView(ScreenView.ANALYSIS_RESULT)
      setIsLoading(false)
    }, 1500)
  }

  const handleRunPrediction = () => {
    if (files.length === 0 || !threshold) return

    setIsLoading(true)

    // Simulate prediction process
    setTimeout(() => {
      setView(ScreenView.PREDICTION_RESULT)
      setIsLoading(false)
    }, 2000)
  }

  const toggleView = () => {
    if (view === ScreenView.MODEL_TRAINING || view === ScreenView.ANALYSIS_RESULT) {
      setView(ScreenView.MODEL_TESTING)
    } else {
      setView(ScreenView.MODEL_TRAINING)
    }
    setIsAnalyzed(false)
    setFiles([])
  }

  const resetView = () => {
    if (view === ScreenView.ANALYSIS_RESULT) {
      setView(ScreenView.MODEL_TRAINING)
    } else if (view === ScreenView.PREDICTION_RESULT) {
      setView(ScreenView.MODEL_TESTING)
    }
    setIsAnalyzed(false)
    setFiles([])



  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">SILICO SCREEN</h1>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background Image */}
       

        <div className="relative z-10 container mx-auto px-4 py-6">
          {/* Toggle View Button */}
          <button
            onClick={toggleView}
            className="absolute top-2 right-6 bg-[#006f7f] text-white p-2 rounded-full hover:bg-[#005a66] transition-colors z-20"
            aria-label={view === ScreenView.MODEL_TRAINING ? "Switch to Model Testing" : "Switch to Model Training"}
          >
            {view === ScreenView.MODEL_TRAINING || view === ScreenView.ANALYSIS_RESULT ? (
              <ArrowRight size={20} />
            ) : (
              <ArrowLeft size={20} />
            )}
          </button>

          {/* Model Training View */}
          {view === ScreenView.MODEL_TRAINING && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Set Model Parameters for Training</h2>

                <div className="mb-4">
                  <label htmlFor="batchSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Batch size
                  </label>
                  <input
                    type="text"
                    id="batchSize"
                    value={batchSize}
                    onChange={(e) => setBatchSize(e.target.value)}
                    placeholder="Enter ...."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="batchSize2" className="block text-sm font-medium text-gray-700 mb-1">
                    Batch size
                  </label>
                  <input
                    type="text"
                    id="batchSize2"
                    placeholder="Enter ...."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="epochs" className="block text-sm font-medium text-gray-700 mb-1">
                    Epochs
                  </label>
                  <input
                    type="text"
                    id="epochs"
                    value={epochs}
                    onChange={(e) => setEpochs(e.target.value)}
                    placeholder="Enter..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dropOut" className="block text-sm font-medium text-gray-700 mb-1">
                    Drop out
                  </label>
                  <input
                    type="text"
                    id="dropOut"
                    value={dropOut}
                    onChange={(e) => setDropOut(e.target.value)}
                    placeholder="Enter..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full bg-[#006f7f] text-white py-2 px-4 rounded-md hover:bg-[#005a66] transition-colors disabled:opacity-50 mb-3"
                >
                  {isLoading ? "Processing..." : "Analyze"}
                </button>

                {isAnalyzed && (
                  <button
                    onClick={handlePredictAnalysis}
                    disabled={isLoading}
                    className="w-full bg-[#006f7f] text-white py-2 px-4 rounded-md hover:bg-[#005a66] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Processing..." : "Predict analysis"}
                  </button>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-center text-[#006f7f] mb-4">Model Training</h2>
                <div
                  className="border-2 border-dashed border-[#006f7f] rounded-lg p-10 h-80 flex flex-col items-center justify-center bg-white bg-opacity-30"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                  <Upload className="w-12 h-12 text-[#006f7f] mb-2" />
                  <h3 className="text-lg font-medium text-[#006f7f]">Drop Files Here</h3>
                  <p className="text-sm text-gray-500">or click to upload</p>

                  {files.length > 0 && (
                    <div className="mt-4 w-full">
                      <p className="text-sm font-medium text-gray-700">{files.length} file(s) selected</p>
                      <ul className="mt-2 text-sm text-gray-600 max-h-32 overflow-y-auto">
                        {files.map((file, index) => (
                          <li key={index} className="truncate">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Model Testing View */}
          {view === ScreenView.MODEL_TESTING && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Prediction options</h2>

                <div className="mb-4">
                  <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    Prediction Threshold
                  </label>
                  <input
                    type="text"
                    id="threshold"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    placeholder="Enter ...."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  onClick={handleRunPrediction}
                  disabled={isLoading || !threshold}
                  className="w-full bg-[#006f7f] text-white py-2 px-4 rounded-md hover:bg-[#005a66] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Run prediction"}
                </button>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-center text-[#006f7f] mb-4">Model Testing</h2>
                <div
                  className="border-2 border-dashed border-[#006f7f] rounded-lg p-10 h-80 flex flex-col items-center justify-center bg-white bg-opacity-30"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                  <Upload className="w-12 h-12 text-[#006f7f] mb-2" />
                  <h3 className="text-lg font-medium text-[#006f7f]">Drop Files Here</h3>
                  <p className="text-sm text-gray-500">or click to upload</p>

                  {files.length > 0 && (
                    <div className="mt-4 w-full">
                      <p className="text-sm font-medium text-gray-700">{files.length} file(s) selected</p>
                      <ul className="mt-2 text-sm text-gray-600 max-h-32 overflow-y-auto">
                        {files.map((file, index) => (
                          <li key={index} className="truncate">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analysis Result View */}
          {view === ScreenView.ANALYSIS_RESULT && (
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-[#006f7f] mb-6">Analysis Results</h2>

              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250508-WA0004.jpg-BUhQhvW3AJSRMzzmkT3MLU2ce9wFkC.jpeg"
                    alt="Training and validation loss and accuracy graphs"
                    className="w-full max-w-2xl mx-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Prediction Result View */}
          {view === ScreenView.PREDICTION_RESULT && (
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-[#006f7f] mb-6">Prediction Result</h2>

              <div className="flex justify-end mb-4 gap-2">
                <input type="text" placeholder="Search" className="p-2 border border-gray-300 rounded-md" />
                <button className="bg-[#006f7f] text-white py-2 px-4 rounded-md hover:bg-[#005a66] transition-colors">
                  CSV
                </button>
                <button className="bg-[#006f7f] text-white py-2 px-4 rounded-md hover:bg-[#005a66] transition-colors">
                  Copy
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Prediction</th>
                      <th className="py-2 px-4 border-b text-left">Probability</th>
                      <th className="py-2 px-4 border-b text-left">Smilies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">1</td>
                      <td className="py-2 px-4 border-b">Complex_A1</td>
                      <td className="py-2 px-4 border-b">445.36KB</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">2</td>
                      <td className="py-2 px-4 border-b">Complex_A1</td>
                      <td className="py-2 px-4 border-b">445.36KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250508-WA0006.jpg-zxMiNCVhvN72NLoiZL4dFoq7Ue6gED.jpeg"
                    alt="Prediction results charts"
                    className="w-full max-w-2xl mx-auto"
                  />
                </div>
              </div>

             
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#006f7f] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium">Processing...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
