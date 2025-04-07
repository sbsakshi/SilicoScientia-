'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload, Settings, Bookmark, Bell, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const page=()=> {
  const [file, setFile] = useState(null)
  const [smiles, setSmiles] = useState('')
  const [toxicThreshold, setToxicThreshold] = useState(0.65)
  const [moderateThreshold, setModerateThreshold] = useState(0.35)
  const [nonToxicThreshold, setNonToxicThreshold] = useState(0.15)
  const [isDragging, setIsDragging] = useState(false)
  
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
    }
  }
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  
  const resetToDefaults = () => {
    setToxicThreshold(0.65)
    setModerateThreshold(0.35)
    setNonToxicThreshold(0.15)
  }

  // Custom slider component
  const CustomSlider = ({ 
    value, 
    onChange, 
    min = 0, 
    max = 1, 
    step = 0.01 
  }) => {
    return (
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div 
          className="absolute h-full rounded-full bg-emerald-600" 
          style={{ width: `${(value - min) / (max - min) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div 
          className="absolute h-5 w-5 -translate-y-1/2 translate-x-0 rounded-full border-2 border-emerald-600 bg-white"
          style={{ left: `${(value - min) / (max - min) * 100}%`, top: '50%' }}
        />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded">
        Skip to content
      </a>
      
      {/* Header */}
      <header className="bg-emerald-800 text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">
          SilicoXplore
        </h1>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-emerald-200 transition-colors">
            My Workflow
          </a>
          <a href="#" className="hover:text-emerald-200 transition-colors">
            My Result
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
            aria-label="Bookmark"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
            aria-label="User profile"
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-emerald-700 text-white p-2 flex justify-center">
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:text-emerald-200 transition-colors py-1">
            My Workflow
          </a>
          <a href="#" className="hover:text-emerald-200 transition-colors py-1">
            My Result
          </a>
        </nav>
      </div>
      
      {/* Main Content */}
      <main id="main-content" className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12 animate-[fadeIn_0.5s_ease-in-out]">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">ToxAI</h1>
          <p className="text-gray-600">Predict toxicity using advanced AI models</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Input Methods */}
          <div className="animate-[slideInLeft_0.5s_ease-in-out]">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Input Method</h2>
              </div>
              <div className="p-4 space-y-6">
                {/* File Upload */}
                <div>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-2">
                      Drag and drop molecular file here
                    </p>
                    {file && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border-emerald-200">
                        {file.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <label htmlFor="file-upload">
                      <button 
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-900 hover:bg-gray-200 h-10 px-4 py-2"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Browse Files
                      </button>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".mol,.sdf,.pdb,.xyz"
                      />
                    </label>
                  </div>
                </div>
                
                {/* SMILES Input */}
                <div className="space-y-2">
                  <label htmlFor="smiles" className="block text-sm font-medium text-gray-700">
                    SMILES String
                  </label>
                  <input
                    id="smiles"
                    type="text"
                    placeholder="Enter SMILES notation..."
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced Options */}
          <div className="animate-[slideInRight_0.5s_ease-in-out]">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Advanced Options</h2>
                <p className="text-sm text-gray-500">Configure thresholds for toxicity detection</p>
              </div>
              <div className="p-4 space-y-6">
                {/* Toxic Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Toxic Threshold (≥ {toxicThreshold})</label>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border-red-200">
                      High Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={toxicThreshold} 
                      onChange={(e) => setToxicThreshold(parseFloat(e.target.value))}
                      className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <CustomSlider 
                      value={toxicThreshold} 
                      onChange={setToxicThreshold} 
                    />
                  </div>
                </div>
                
                {/* Moderate Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Moderate Threshold 
                        ({moderateThreshold} - {toxicThreshold})
                    </label>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 border-amber-200">
                      Medium Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={moderateThreshold} 
                      onChange={(e) => setModerateThreshold(parseFloat(e.target.value))}
                      className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 :cursor-not-allowed disabled:opacity-50"
                    />disabled
                    <CustomSlider 
                      value={moderateThreshold} 
                      onChange={setModerateThreshold} 
                    />
                  </div>
                </div>
                
                {/* Non-Toxic Threshold */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Non-Toxic Threshold (≤ {nonToxicThreshold})</label>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                      Low Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={nonToxicThreshold} 
                      onChange={(e) => setNonToxicThreshold(parseFloat(e.target.value))}
                      className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <CustomSlider 
                      value={nonToxicThreshold} 
                      onChange={setNonToxicThreshold} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    onClick={resetToDefaults}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Reset to Defaults
                  </button>
                  <button 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Molecule Sketcher */}
        <div className="mt-8 animate-[fadeIn_0.5s_ease-in-out]">
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Molecule Sketcher</h2>
            </div>
            <div className="p-4">
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-white">
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Interactive Molecule Sketcher</p>
                  <p className="text-xs text-gray-400 mt-2">Click and drag to draw molecular structures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Run Prediction Button */}
        <div className="mt-8 text-center animate-[fadeIn_0.7s_ease-in-out]">
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-11 px-8 py-2 "
          >
            Run Prediction
          </button>
        </div>
      </main>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
export default page