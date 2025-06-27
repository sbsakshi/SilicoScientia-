"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Download, TrendingUp, Upload, Info, X, Settings, HelpCircle, FolderOpen } from "lucide-react"

export default function QSARBioactivityPredictor() {
  const [trainingFiles, setTrainingFiles] = useState<File[]>([])
  const [predictionFiles, setPredictionFiles] = useState<File[]>([])
  const [isDraggingTraining, setIsDraggingTraining] = useState(false)
  const [isDraggingPrediction, setIsDraggingPrediction] = useState(false)
  const [descriptorCount, setDescriptorCount] = useState([100])
  const [selectedFeatures, setSelectedFeatures] = useState(["f_regression"])
  const [useStacking, setUseStacking] = useState(false)
  const [validateSmiles, setValidateSmiles] = useState(false)
  const [fixInvalidSmiles, setFixInvalidSmiles] = useState(false)
  const [outputDirectory, setOutputDirectory] = useState("/path/to/output")
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState<{ title: string; content: React.ReactNode } | null>(null)

  const trainingFileInputRef = useRef<HTMLInputElement>(null)
  const predictionFileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent, type: "training" | "prediction") => {
    e.preventDefault()
    if (type === "training") {
      setIsDraggingTraining(true)
    } else {
      setIsDraggingPrediction(true)
    }
  }

  const handleDragLeave = (type: "training" | "prediction") => {
    if (type === "training") {
      setIsDraggingTraining(false)
    } else {
      setIsDraggingPrediction(false)
    }
  }

  const handleDrop = (e: React.DragEvent, type: "training" | "prediction") => {
    e.preventDefault()
    if (type === "training") {
      setIsDraggingTraining(false)
    } else {
      setIsDraggingPrediction(false)
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files), type)
    }
  }

  const handleBrowseFiles = (type: "training" | "prediction") => {
    if (type === "training" && trainingFileInputRef.current) {
      trainingFileInputRef.current.click()
    } else if (type === "prediction" && predictionFileInputRef.current) {
      predictionFileInputRef.current.click()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "training" | "prediction") => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files), type)
    }
  }

  const handleFiles = (newFiles: File[], type: "training" | "prediction") => {
    const validExtensions = [".csv", ".sdf", ".smiles"]
    const validFiles = newFiles.filter(
      (file) => validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext)) && file.size <= 200 * 1024 * 1024, // 200MB limit
    )

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload CSV, SDF, or SMILES files under 200MB.",
        variant: "destructive",
      })
      return
    }

    if (type === "training") {
      setTrainingFiles((prev) => [...prev, ...validFiles])
    } else {
      setPredictionFiles((prev) => [...prev, ...validFiles])
    }

    toast({
      title: "Files uploaded",
      description: `${validFiles.length} ${type} file(s) uploaded successfully.`,
    })
  }

  const removeFeature = (feature: string) => {
    setSelectedFeatures((prev) => prev.filter((f) => f !== feature))
  }

  const addFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature)) {
      setSelectedFeatures((prev) => [...prev, feature])
    }
  }

  const openPopup = (title: string, content: React.ReactNode) => {
    setPopupContent({ title, content })
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setPopupContent(null)
  }

  const showDescriptorInfo = () => {
    openPopup(
      "Descriptor Settings",
      <div className="space-y-4">
        <p>
          Molecular descriptors are numerical representations of molecular structure that can be used in machine
          learning models.
        </p>
        <div className="space-y-2">
          <h4 className="font-medium">2D Descriptors:</h4>
          <p className="text-sm text-gray-600">
            Two-dimensional molecular descriptors calculated from the molecular graph structure.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Number of Descriptors:</h4>
          <p className="text-sm text-gray-600">
            Controls how many descriptors to calculate. More descriptors provide more information but increase
            computational cost.
          </p>
        </div>
      </div>,
    )
  }

  const showFeatureInfo = () => {
    openPopup(
      "Feature Selection & Scaling",
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Feature Selection Methods:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <strong>f_regression:</strong> Uses F-test to select features based on linear relationship with target
            </li>
            <li>
              <strong>Mutual_Info:</strong> Selects features based on mutual information with target variable
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Feature Scaling:</h4>
          <p className="text-sm text-gray-600">
            StandardScaler normalizes features to have zero mean and unit variance.
          </p>
        </div>
      </div>,
    )
  }

  const showActivityInfo = () => {
    openPopup(
      "Activity Settings",
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Activity Conversion:</h4>
          <p className="text-sm text-gray-600">
            pIC50 is the negative logarithm of IC50 values, commonly used in drug discovery.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Activity Unit:</h4>
          <p className="text-sm text-gray-600">nM (nanomolar) is a common unit for measuring drug concentration.</p>
        </div>
      </div>,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900">QSAR Bioactivity Predictor</h1>
            <p className="text-sm text-gray-600">Machine Learning for Drug Discovery</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FolderOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-blue-600 font-medium">Upload Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-gray-500">Configure Model</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-gray-500">Run & Output</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 space-y-8">
        {/* File Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Data Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Training Data</h3>
                <p className="text-sm text-gray-600">Upload training data (CSV, SDF, or SMILES)</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingTraining ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => handleDragOver(e, "training")}
              onDragLeave={() => handleDragLeave("training")}
              onDrop={(e) => handleDrop(e, "training")}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-gray-700 font-medium mb-2">Drag and drop your file here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse</p>
              <Button
                onClick={() => handleBrowseFiles("training")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Browse Files
              </Button>
              <p className="text-xs text-gray-500 mt-4">Max 200MB per file • CSV, SDF, SMILES</p>
            </div>

            <input
              ref={trainingFileInputRef}
              type="file"
              multiple
              accept=".csv,.sdf,.smiles"
              className="hidden"
              onChange={(e) => handleFileInputChange(e, "training")}
            />

            {trainingFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {trainingFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prediction Data Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Prediction Data</h3>
                <p className="text-sm text-gray-600">Upload prediction data (CSV, SDF, or SMILES)</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingPrediction ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onDragOver={(e) => handleDragOver(e, "prediction")}
              onDragLeave={() => handleDragLeave("prediction")}
              onDrop={(e) => handleDrop(e, "prediction")}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-gray-700 font-medium mb-2">Drag and drop your file here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse</p>
              <Button
                onClick={() => handleBrowseFiles("prediction")}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Browse Files
              </Button>
              <p className="text-xs text-gray-500 mt-4">Max 200MB per file • CSV, SDF, SMILES</p>
            </div>

            <input
              ref={predictionFileInputRef}
              type="file"
              multiple
              accept=".csv,.sdf,.smiles"
              className="hidden"
              onChange={(e) => handleFileInputChange(e, "prediction")}
            />

            {predictionFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {predictionFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Descriptor Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900">Descriptor Settings</h3>
              <Button variant="ghost" size="sm" onClick={showDescriptorInfo}>
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descriptor Type</label>
                <Select defaultValue="2d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select descriptor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2d">2D Descriptors</SelectItem>
                    <SelectItem value="3d">3D Descriptors</SelectItem>
                    <SelectItem value="fingerprints">Fingerprints</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Descriptors</label>
                <div className="px-3">
                  <Slider
                    value={descriptorCount}
                    onValueChange={setDescriptorCount}
                    max={1000}
                    min={100}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>100</span>
                    <span className="font-medium text-blue-600">{descriptorCount[0]}</span>
                    <span>1000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Selection & Scaling */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900">Feature Selection & Scaling</h3>
              <Button variant="ghost" size="sm" onClick={showFeatureInfo}>
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature Selection Methods</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {feature}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-blue-200"
                        onClick={() => removeFeature(feature)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {!selectedFeatures.includes("Mutual_Info") && (
                    <Button variant="outline" size="sm" onClick={() => addFeature("Mutual_Info")} className="text-xs">
                      Mutual_Info
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature Scaling Method</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select scaling method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">StandardScaler</SelectItem>
                    <SelectItem value="minmax">MinMaxScaler</SelectItem>
                    <SelectItem value="robust">RobustScaler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Configuration Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Model Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Type</label>
                <Select defaultValue="random-forest">
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random-forest">Random Forest</SelectItem>
                    <SelectItem value="svm">Support Vector Machine</SelectItem>
                    <SelectItem value="xgboost">XGBoost</SelectItem>
                    <SelectItem value="neural-network">Neural Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stacking"
                  checked={useStacking}
                  onCheckedChange={(checked) => setUseStacking(checked === true)}
                />
                <label htmlFor="stacking" className="text-sm font-medium text-gray-700">
                  Use Stacking
                </label>
              </div>
            </div>
          </div>

          {/* Activity Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900">Activity Settings</h3>
              <Button variant="ghost" size="sm" onClick={showActivityInfo}>
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Conversion</label>
                <Select defaultValue="pic50">
                  <SelectTrigger>
                    <SelectValue placeholder="Select conversion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pic50">pIC50</SelectItem>
                    <SelectItem value="pic90">pIC90</SelectItem>
                    <SelectItem value="pec50">pEC50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Unit</label>
                <Select defaultValue="nm">
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nm">nM</SelectItem>
                    <SelectItem value="um">μM</SelectItem>
                    <SelectItem value="mm">mM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Output & SMILES */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Output & SMILES</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Directory</label>
                <div className="flex">
                  <Input
                    value={outputDirectory}
                    onChange={(e) => setOutputDirectory(e.target.value)}
                    className="flex-1"
                    placeholder="/path/to/output"
                  />
                  <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validate-smiles"
                    checked={validateSmiles}
                    onCheckedChange={(checked) => setValidateSmiles(checked === true)}
                  />
                  <label htmlFor="validate-smiles" className="text-sm font-medium text-gray-700">
                    Validate SMILES
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fix-smiles"
                    checked={fixInvalidSmiles}
                    onCheckedChange={(checked) => setFixInvalidSmiles(checked === true)}
                  />
                  <label htmlFor="fix-smiles" className="text-sm font-medium text-gray-700">
                    Fix invalid SMILES
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Modal */}
      {showPopup && popupContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">{popupContent.title}</h3>
              <Button variant="ghost" size="sm" onClick={closePopup}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto">{popupContent.content}</div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  )
}
