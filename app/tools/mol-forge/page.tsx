"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

interface PropertySection {
  id: string
  title: string
  isOpen: boolean
  normalization: string
  fields: {
    weight: string
    steepness: string
    min: string
    max: string
  }
}

interface ToxicitySection {
  id: string
  title: string
  isOpen: boolean
  normalization: string
  fields: {
    weight: string
    weight2?: string
    weight3?: string
  }
}

interface DiversitySection {
  id: string
  title: string
  isOpen: boolean
  normalization: string
  fields: Record<string, string>
}

interface NumberInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

function NumberInput({ label, value, onChange, min = 0, max = 1, step = 0.1, className = "" }: NumberInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        className="w-full p-2 bg-white border border-gray-200 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default function MolForge() {
  const [activeTab, setActiveTab] = useState("scoring")

  // Add these state variables at the top with the other state variables
  const [sequenceParametersOpen, setSequenceParametersOpen] = useState(true)
  const [samplingParametersOpen, setSamplingParametersOpen] = useState(true)
  const [outputParametersOpen, setOutputParametersOpen] = useState(true)
  const [weightParametersOpen, setWeightParametersOpen] = useState(true)

  // Molecular Properties sections
  const [molecularPropertiesOpen, setMolecularPropertiesOpen] = useState(true)
  const [molecularProperties, setMolecularProperties] = useState<PropertySection[]>([
    {
      id: "rotatable-bonds",
      title: "Rotatable Bonds",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "polar-surface-area",
      title: "Polar Surface Area",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "qed",
      title: "QED",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "aromatic-rings",
      title: "Aromatic Rings",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "aliphatic-rings",
      title: "Aliphatic Rings",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "ring-count",
      title: "Ring Count",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "chiral-centers",
      title: "Chiral Centers",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "fraction-sp3",
      title: "Fraction SP3",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "bridgehead-atoms",
      title: "Bridgehead Atoms",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "spiro-atoms",
      title: "Spiro Atoms",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "macrocycle",
      title: "Macrocycle",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "largest-ring-size",
      title: "Largest Ring Size",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "slogp",
      title: "SLogP",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "sa-score",
      title: "SA Score",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "glycosylation",
      title: "Glycosylation",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "antibiotic-likeness",
      title: "Antibiotic Likeness",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "molecular-weight",
      title: "Molecular Weight",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "logp",
      title: "LogP",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "hydrogen-bond-donors",
      title: "Hydrogen Bond Donors",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
    {
      id: "hydrogen-bond-acceptors",
      title: "Hydrogen Bond Acceptors",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", steepness: "1.0", min: "1.0", max: "1.0" },
    },
  ])

  // Toxicity Filters sections
  const [toxicityFiltersOpen, setToxicityFiltersOpen] = useState(true)
  const [commonToxicitySettingsOpen, setCommonToxicitySettingsOpen] = useState(true)
  const [toxicityFilters, setToxicityFilters] = useState<ToxicitySection[]>([
    {
      id: "aggregation-dna-metals",
      title: "Aggregation Propensity, DNA Reactive Groups, Heavy Metals",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", weight2: "1.0", weight3: "1.0" },
    },
  ])

  // Structural Diversity Filters sections
  const [structuralDiversityOpen, setStructuralDiversityOpen] = useState(true)
  const [activeFilterSettingsOpen, setActiveFilterSettingsOpen] = useState(true)
  const [scaffoldFilterOpen, setScaffoldFilterOpen] = useState(true)

  const [diversityFilters, setDiversityFilters] = useState<DiversitySection[]>([
    {
      id: "active-filter-settings",
      title: "Active Filter Settings",
      isOpen: true,
      normalization: "None",
      fields: {
        "initial threshold": "1.0",
        "min similarity": "1.0",
        "max similarity": "1.0",
        "adjustment step": "1.0",
        "fp radius": "1.0",
        "fp bit size": "1.0",
      },
    },
    {
      id: "scaffold-filter",
      title: "Scaffold Filter, Adaptive Filter, 3D Shape Filter",
      isOpen: true,
      normalization: "None",
      fields: { weight: "1.0", weight2: "1.0", weight3: "1.0" },
    },
  ])

  // Reinforcement Learning parameters
  const [propertyWeight, setPropertyWeight] = useState("0.7")
  const [diversityWeight, setDiversityWeight] = useState("0.2")
  const [toxicityWeight, setToxicityWeight] = useState("0.1")
  const [validityWeight, setValidityWeight] = useState("0.1")
  const [powerExponent, setPowerExponent] = useState("2.0")
  const [maxHistory, setMaxHistory] = useState("1000")
  const [strictValidityCheck, setStrictValidityCheck] = useState(true)
  const [invalidPenalty, setInvalidPenalty] = useState("-1")
  const [validReward, setValidReward] = useState("1")
  const [clipMin, setClipMin] = useState("-1")
  const [clipMax, setClipMax] = useState("1")
  const [enableDiagnostics, setEnableDiagnostics] = useState(false)
  const [normalizeWeights, setNormalizeWeights] = useState(false)

  // Optimization Settings
  const [optimizationSettingsEnabled, setOptimizationSettingsEnabled] = useState(true)
  const [learningRate, setLearningRate] = useState("0.001")
  const [epsilonClip, setEpsilonClip] = useState("0.2")
  const [valueCoefficient, setValueCoefficient] = useState("0.5")
  const [entropyCoefficient, setEntropyCoefficient] = useState("0.01")
  const [batchSize, setBatchSize] = useState("64")
  const [gradientAccumulationSteps, setGradientAccumulationSteps] = useState("1")
  const [maxGradientNorm, setMaxGradientNorm] = useState("1.0")

  // Training Settings
  const [trainingSettingsEnabled, setTrainingSettingsEnabled] = useState(true)
  const [bufferSize, setBufferSize] = useState("10000")
  const [rewardNormalization, setRewardNormalization] = useState("mean")
  const [movingAverageWindow, setMovingAverageWindow] = useState("100")
  const [updateReferenceEvery, setUpdateReferenceEvery] = useState("10")
  const [checkpointFrequency, setCheckpointFrequency] = useState("100")
  const [maxIterations, setMaxIterations] = useState("500")

  // Early Stopping Settings
  const [earlyStoppingEnabled, setEarlyStoppingEnabled] = useState(true)
  const [earlyStoppingPatience, setEarlyStoppingPatience] = useState("20")
  const [earlyStoppingThreshold, setEarlyStoppingThreshold] = useState("0.01")

  // Generation Parameters
  const [maximumLength, setMaximumLength] = useState("1500")
  const [temperature, setTemperature] = useState("1.00")
  const [topK, setTopK] = useState("50")
  const [topP, setTopP] = useState("0.95")
  const [numberOfMolecules, setNumberOfMolecules] = useState("100")

  const toggleSection = (section: string, id?: string) => {
    if (section === "molecular-properties") {
      setMolecularPropertiesOpen(!molecularPropertiesOpen)
    } else if (section === "toxicity-filters") {
      setToxicityFiltersOpen(!toxicityFiltersOpen)
    } else if (section === "common-toxicity-settings") {
      setCommonToxicitySettingsOpen(!commonToxicitySettingsOpen)
    } else if (section === "structural-diversity") {
      setStructuralDiversityOpen(!structuralDiversityOpen)
    } else if (section === "active-filter-settings") {
      setActiveFilterSettingsOpen(!activeFilterSettingsOpen)
    } else if (section === "scaffold-filter") {
      setScaffoldFilterOpen(!scaffoldFilterOpen)
    } else if (section === "molecular-property" && id) {
      setMolecularProperties(
        molecularProperties.map((prop) => (prop.id === id ? { ...prop, isOpen: !prop.isOpen } : prop)),
      )
    } else if (section === "toxicity-filter" && id) {
      setToxicityFilters(
        toxicityFilters.map((filter) => (filter.id === id ? { ...filter, isOpen: !filter.isOpen } : filter)),
      )
    } else if (section === "diversity-filter" && id) {
      setDiversityFilters(
        diversityFilters.map((filter) => (filter.id === id ? { ...filter, isOpen: !filter.isOpen } : filter)),
      )
    }
  }

  const handleNormalizationChange = (section: string, id: string, value: string) => {
    if (section === "molecular-property") {
      setMolecularProperties(
        molecularProperties.map((prop) => (prop.id === id ? { ...prop, normalization: value } : prop)),
      )
    } else if (section === "toxicity-filter") {
      setToxicityFilters(
        toxicityFilters.map((filter) => (filter.id === id ? { ...filter, normalization: value } : filter)),
      )
    } else if (section === "diversity-filter") {
      setDiversityFilters(
        diversityFilters.map((filter) => (filter.id === id ? { ...filter, normalization: value } : filter)),
      )
    }
  }

  const handleFieldChange = (section: string, id: string, field: string, value: string) => {
    // Ensure value is between 0.0 and 1.0
    const numValue = Number.parseFloat(value)
    const validValue = isNaN(numValue) ? "0.0" : Math.min(Math.max(numValue, 0), 1).toFixed(1)

    if (section === "molecular-property") {
      setMolecularProperties(
        molecularProperties.map((prop) =>
          prop.id === id
            ? {
                ...prop,
                fields: { ...prop.fields, [field]: validValue },
              }
            : prop,
        ),
      )
    } else if (section === "toxicity-filter") {
      setToxicityFilters(
        toxicityFilters.map((filter) =>
          filter.id === id
            ? {
                ...filter,
                fields: { ...filter.fields, [field]: validValue },
              }
            : filter,
        ),
      )
    } else if (section === "diversity-filter") {
      setDiversityFilters(
        diversityFilters.map((filter) =>
          filter.id === id
            ? {
                ...filter,
                fields: { ...filter.fields, [field]: validValue },
              }
            : filter,
        ),
      )
    } else if (section === "common-toxicity") {
      // Handle common toxicity settings fields
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/background.png")' }}>
      {/* Header */}
      <header className="bg-[#00B3DC] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SilicoXplore</h1>
          <div className="flex space-x-8">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">About</button>
            <button className="hover:underline">Result</button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">MolForge</h1>
          <p className="text-xl text-gray-600">
            Transforming the Design of Bigger Small Molecules with Artificial Intelligence
          </p>
          <p className="text-lg text-gray-500">Configure scoring functions and generation parameters</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="border-b border-[#00B3DC] w-full max-w-3xl flex">
            <button
              className={cn(
                "px-6 py-2 text-lg",
                activeTab === "scoring" ? "border-b-2 border-[#00B3DC] text-[#00B3DC] font-medium" : "text-gray-600",
              )}
              onClick={() => setActiveTab("scoring")}
            >
              Scoring Functions
            </button>
            <button
              className={cn(
                "px-6 py-2 text-lg",
                activeTab === "reinforcement"
                  ? "border-b-2 border-[#00B3DC] text-[#00B3DC] font-medium"
                  : "text-gray-600",
              )}
              onClick={() => setActiveTab("reinforcement")}
            >
              Reinforcement Learning
            </button>
            <button
              className={cn(
                "px-6 py-2 text-lg",
                activeTab === "generation" ? "border-b-2 border-[#00B3DC] text-[#00B3DC] font-medium" : "text-gray-600",
              )}
              onClick={() => setActiveTab("generation")}
            >
              Generation Parameters
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-[#00B3DC]/30 p-6 mb-6">
          {activeTab === "scoring" && (
            <>
              {/* Molecular Properties Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => toggleSection("molecular-properties")}
                >
                  <h2 className="text-2xl font-bold text-[#00B3DC]">Molecular Properties</h2>
                  <div className="text-[#00B3DC]">
                    {molecularPropertiesOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                {molecularPropertiesOpen && (
                  <div className="space-y-6">
                    {molecularProperties.map((property) => (
                      <div key={property.id} className="border-t border-[#00B3DC]/30 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div
                              onClick={() => toggleSection("molecular-property", property.id)}
                              className="mr-2 cursor-pointer text-[#00B3DC]"
                            >
                              {property.isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <h3 className="text-lg font-medium">{property.title}</h3>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Normalization:</span>
                            <select
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                              value={property.normalization}
                              onChange={(e) =>
                                handleNormalizationChange("molecular-property", property.id, e.target.value)
                              }
                            >
                              <option value="None">None</option>
                              <option value="MinMax">MinMax</option>
                              <option value="Standard">Standard</option>
                            </select>
                          </div>
                        </div>

                        {property.isOpen && (
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm mb-1">Weight</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={property.fields.weight}
                                onChange={(e) =>
                                  handleFieldChange("molecular-property", property.id, "weight", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Steepness</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={property.fields.steepness}
                                onChange={(e) =>
                                  handleFieldChange("molecular-property", property.id, "steepness", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Min</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={property.fields.min}
                                onChange={(e) =>
                                  handleFieldChange("molecular-property", property.id, "min", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Max</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={property.fields.max}
                                onChange={(e) =>
                                  handleFieldChange("molecular-property", property.id, "max", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toxicity Filters Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => toggleSection("toxicity-filters")}
                >
                  <h2 className="text-2xl font-bold text-[#00B3DC]">Toxicity Filters</h2>
                  <div className="text-[#00B3DC]">
                    {toxicityFiltersOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                {toxicityFiltersOpen && (
                  <div className="space-y-6">
                    {/* Common Toxicity Settings */}
                    <div className="border-t border-[#00B3DC]/30 pt-4">
                      <div
                        className="flex justify-between items-center cursor-pointer mb-2"
                        onClick={() => toggleSection("common-toxicity-settings")}
                      >
                        <h3 className="text-lg font-medium">Common Toxicity Settings</h3>
                        <div className="text-[#00B3DC]">
                          {commonToxicitySettingsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>

                      {commonToxicitySettingsOpen && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm mb-1">Threshold</label>
                            <input
                              type="number"
                              min="0"
                              max="1"
                              step="0.1"
                              className="w-full p-2 bg-white border border-gray-200 rounded"
                              defaultValue="1.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Compensation Factor</label>
                            <input
                              type="number"
                              min="0"
                              max="1"
                              step="0.1"
                              className="w-full p-2 bg-white border border-gray-200 rounded"
                              defaultValue="1.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Penalization Factor</label>
                            <input
                              type="number"
                              min="0"
                              max="1"
                              step="0.1"
                              className="w-full p-2 bg-white border border-gray-200 rounded"
                              defaultValue="1.0"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Toxicity Filter Items */}
                    {toxicityFilters.map((filter) => (
                      <div key={filter.id} className="border-t border-[#00B3DC]/30 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div
                              onClick={() => toggleSection("toxicity-filter", filter.id)}
                              className="mr-2 cursor-pointer text-[#00B3DC]"
                            >
                              {filter.isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <h3 className="text-lg font-medium">{filter.title}</h3>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Normalization:</span>
                            <select
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                              value={filter.normalization}
                              onChange={(e) => handleNormalizationChange("toxicity-filter", filter.id, e.target.value)}
                            >
                              <option value="None">None</option>
                              <option value="MinMax">MinMax</option>
                              <option value="Standard">Standard</option>
                            </select>
                          </div>
                        </div>

                        {filter.isOpen && (
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm mb-1">Weight</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={filter.fields.weight}
                                onChange={(e) =>
                                  handleFieldChange("toxicity-filter", filter.id, "weight", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Weight</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={filter.fields.weight2}
                                onChange={(e) =>
                                  handleFieldChange("toxicity-filter", filter.id, "weight2", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Weight</label>
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                className="w-full p-2 bg-white border border-gray-200 rounded"
                                value={filter.fields.weight3}
                                onChange={(e) =>
                                  handleFieldChange("toxicity-filter", filter.id, "weight3", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Structural Diversity Filters Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => toggleSection("structural-diversity")}
                >
                  <h2 className="text-2xl font-bold text-[#00B3DC]">Structural Diversity Filters</h2>
                  <div className="text-[#00B3DC]">
                    {structuralDiversityOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                {structuralDiversityOpen && (
                  <div className="space-y-6">
                    {diversityFilters.map((filter) => (
                      <div key={filter.id} className="border-t border-[#00B3DC]/30 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div
                              onClick={() => toggleSection("diversity-filter", filter.id)}
                              className="mr-2 cursor-pointer text-[#00B3DC]"
                            >
                              {filter.isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <h3 className="text-lg font-medium">{filter.title}</h3>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Normalization:</span>
                            <select
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                              value={filter.normalization}
                              onChange={(e) => handleNormalizationChange("diversity-filter", filter.id, e.target.value)}
                            >
                              <option value="None">None</option>
                              <option value="MinMax">MinMax</option>
                              <option value="Standard">Standard</option>
                            </select>
                          </div>
                        </div>

                        {filter.isOpen && (
                          <div className="grid grid-cols-4 gap-4">
                            {filter.id === "active-filter-settings" ? (
                              <>
                                <div>
                                  <label className="block text-sm mb-1">initial threshold</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["initial threshold"]}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "diversity-filter",
                                        filter.id,
                                        "initial threshold",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">min similarity</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["min similarity"]}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "min similarity", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">max similarity</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["max similarity"]}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "max similarity", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">adjustment step</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["adjustment step"]}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "diversity-filter",
                                        filter.id,
                                        "adjustment step",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">fp radius</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["fp radius"]}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "fp radius", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">fp bit size</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields["fp bit size"]}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "fp bit size", e.target.value)
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <label className="block text-sm mb-1">Weight</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields.weight}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "weight", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Weight</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields.weight2}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "weight2", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Weight</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full p-2 bg-white border border-gray-200 rounded"
                                    value={filter.fields.weight3}
                                    onChange={(e) =>
                                      handleFieldChange("diversity-filter", filter.id, "weight3", e.target.value)
                                    }
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "reinforcement" && (
            <div className="space-y-8">
              {/* Weight Parameters Section */}
              <div className="">
                {/* <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => {
                    const newState = !weightParametersOpen
                    setWeightParametersOpen(newState)
                  }}
                >
                  <h2 className="text-2xl font-bold text-[#00B3DC]">Weight Parameters</h2>
                  <div className="text-[#00B3DC]">
                    {weightParametersOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div> */}

                {/* {weightParametersOpen && (
                  <div className="space-y-6 border-t border-[#00B3DC]/30 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <NumberInput
                        label="Property Weight"
                        value={propertyWeight}
                        onChange={setPropertyWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Diversity Weight"
                        value={diversityWeight}
                        onChange={setDiversityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Toxicity Weight"
                        value={toxicityWeight}
                        onChange={setToxicityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Validity Weight"
                        value={validityWeight}
                        onChange={setValidityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Power Exponent"
                        value={powerExponent}
                        onChange={setPowerExponent}
                        min={0}
                        max={10}
                        step={0.1}
                      />

                      <NumberInput
                        label="Max History"
                        value={maxHistory}
                        onChange={setMaxHistory}
                        min={0}
                        max={10000}
                        step={100}
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-[#00B3DC]/30 pt-4">
                      <label className="text-base font-medium">Strict Validity Check</label>
                      <Switch checked={strictValidityCheck} onCheckedChange={setStrictValidityCheck} />
                    </div>

                    <div className="flex items-center space-x-8 border-t border-[#00B3DC]/30 pt-4">
                      <div className="flex items-center space-x-2">
                        <Switch checked={enableDiagnostics} onCheckedChange={setEnableDiagnostics} />
                        <label className="text-sm font-medium">Enable Diagnostics</label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch checked={normalizeWeights} onCheckedChange={setNormalizeWeights} />
                        <label className="text-sm font-medium">Normalize Weights</label>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Optimization Settings */}
              <div className="border-t border-[#00B3DC]/30 pt-4 ">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setOptimizationSettingsEnabled(!optimizationSettingsEnabled)}
                >
                  <h3 className="text-2xl font-medium text-[#00B3DC]">Optimization Settings</h3>
                  <div className="text-[#00B3DC]">
                    {optimizationSettingsEnabled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {optimizationSettingsEnabled && (
                  <div className="grid grid-cols-2 gap-6">
                    <NumberInput
                      label="Learning Rate"
                      value={learningRate}
                      onChange={setLearningRate}
                      min={0.0001}
                      max={0.1}
                      step={0.0001}
                    />

                    <NumberInput
                      label="Epsilon Clip"
                      value={epsilonClip}
                      onChange={setEpsilonClip}
                      min={0.1}
                      max={0.5}
                      step={0.01}
                    />

                    <NumberInput
                      label="Value Coefficient"
                      value={valueCoefficient}
                      onChange={setValueCoefficient}
                      min={0}
                      max={1}
                      step={0.1}
                    />

                    <NumberInput
                      label="Entropy Coefficient"
                      value={entropyCoefficient}
                      onChange={setEntropyCoefficient}
                      min={0}
                      max={0.1}
                      step={0.001}
                    />

                    <NumberInput
                      label="Batch Size"
                      value={batchSize}
                      onChange={setBatchSize}
                      min={8}
                      max={256}
                      step={8}
                    />

                    <NumberInput
                      label="Gradient Accumulation Steps"
                      value={gradientAccumulationSteps}
                      onChange={setGradientAccumulationSteps}
                      min={1}
                      max={16}
                      step={1}
                    />

                    <NumberInput
                      label="Max Gradient Norm"
                      value={maxGradientNorm}
                      onChange={setMaxGradientNorm}
                      min={0.1}
                      max={10}
                      step={0.1}
                    />
                  </div>
                )}
              </div>

              {/* Training Settings */}
              <div className="border-t border-[#00B3DC]/30 pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setTrainingSettingsEnabled(!trainingSettingsEnabled)}
                >
                  <h3 className="text-2xl font-medium text-[#00B3DC]">Training Settings</h3>
                  <div className="text-[#00B3DC]">
                    {trainingSettingsEnabled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {trainingSettingsEnabled && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <NumberInput
                        label="Buffer Size"
                        value={bufferSize}
                        onChange={setBufferSize}
                        min={1000}
                        max={100000}
                        step={1000}
                      />

                      <div>
                        <label className="block text-sm mb-1">Reward Normalization</label>
                        <select
                          className="w-full p-2 bg-white border border-gray-200 rounded"
                          value={rewardNormalization}
                          onChange={(e) => setRewardNormalization(e.target.value)}
                        >
                          <option value="none">None</option>
                          <option value="mean">Mean</option>
                          <option value="std">Standard Deviation</option>
                          <option value="minmax">Min-Max</option>
                        </select>
                      </div>

                      <NumberInput
                        label="Moving Average Window"
                        value={movingAverageWindow}
                        onChange={setMovingAverageWindow}
                        min={10}
                        max={1000}
                        step={10}
                      />

                      <NumberInput
                        label="Update Reference Every"
                        value={updateReferenceEvery}
                        onChange={setUpdateReferenceEvery}
                        min={1}
                        max={100}
                        step={1}
                      />

                      <NumberInput
                        label="Checkpoint Frequency"
                        value={checkpointFrequency}
                        onChange={setCheckpointFrequency}
                        min={10}
                        max={1000}
                        step={10}
                      />
                    </div>

                    <NumberInput
                      label="Max Iterations"
                      value={maxIterations}
                      onChange={setMaxIterations}
                      min={100}
                      max={10000}
                      step={100}
                    />
                  </div>
                )}
              </div>

              {/* Early Stopping Settings */}
              <div className="border-t border-[#00B3DC]/30 pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setEarlyStoppingEnabled(!earlyStoppingEnabled)}
                >
                  <h3 className="text-2xl font-medium text-[#00B3DC] ">Early Stopping Settings</h3>
                  <div className="text-[#00B3DC]">
                    {earlyStoppingEnabled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {earlyStoppingEnabled && (
                  <div className="grid grid-cols-2 gap-6">
                    <NumberInput
                      label="Early Stopping Patience"
                      value={earlyStoppingPatience}
                      onChange={setEarlyStoppingPatience}
                      min={1}
                      max={100}
                      step={1}
                    />

                    <NumberInput
                      label="Early Stopping Threshold"
                      value={earlyStoppingThreshold}
                      onChange={setEarlyStoppingThreshold}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "generation" && (
            <div className="space-y-6">
              {/* Sequence Parameters Section */}
             

             
              
                
                  <div className="space-y-6 border-t border-[#00B3DC]/30 pt-4">
                  <NumberInput
                      label="Maximum Length"
                      value={maximumLength}
                      onChange={setMaximumLength}
                      min={100}
                      max={5000}
                      step={100}
                    />
                    <NumberInput
                      label="Temperature"
                      value={temperature}
                      onChange={setTemperature}
                      min={0.1}
                      max={2.0}
                      step={0.01}
                    />

                    <NumberInput label="Top K" value={topK} onChange={setTopK} min={1} max={100} step={1} />

                    <NumberInput
                      label="Top P (Nucleus Sampling)"
                      value={topP}
                      onChange={setTopP}
                      min={0.1}
                      max={1.0}
                      step={0.01}
                    />
                
              </div>

              {/* Output Parameters Section */}
              <div className="mb-6">
                
                  <div className="space-y-6 border-t border-[#00B3DC]/30 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <NumberInput
                        label="Property Weight"
                        value={propertyWeight}
                        onChange={setPropertyWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Diversity Weight"
                        value={diversityWeight}
                        onChange={setDiversityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Toxicity Weight"
                        value={toxicityWeight}
                        onChange={setToxicityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Validity Weight"
                        value={validityWeight}
                        onChange={setValidityWeight}
                        min={0}
                        max={1}
                        step={0.1}
                      />

                      <NumberInput
                        label="Power Exponent"
                        value={powerExponent}
                        onChange={setPowerExponent}
                        min={0}
                        max={10}
                        step={0.1}
                      />

                      <NumberInput
                        label="Max History"
                        value={maxHistory}
                        onChange={setMaxHistory}
                        min={0}
                        max={10000}
                        step={100}
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-[#00B3DC]/30 pt-4">
                      <label className="text-base font-medium">Strict Validity Check</label>
                      <input
                      type="checkbox"
                      checked={strictValidityCheck}
                      onChange={(e) => setStrictValidityCheck(e.target.checked)}
                      className="bg-teal-500"
                      />
                    </div>

                    <div className="flex items-center space-x-8  pt-4">
                        <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={enableDiagnostics}
                          onChange={(e) => setEnableDiagnostics(e.target.checked)}
                          className="bg-[#00B3DC]/30"
                        />
                        <label className="text-sm font-medium">Enable Diagnostics</label>
                        </div>

                        <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={normalizeWeights}
                          onChange={(e) => setNormalizeWeights(e.target.checked)}
                        />
                        <label className="text-sm font-medium">Normalize Weights</label>
                        </div>
                      </div>
                    </div>
                  </div>
              

                
                  <div className="space-y-6 pt-4">
                    <NumberInput
                      label="Number of Molecules"
                      value={numberOfMolecules}
                      onChange={setNumberOfMolecules}
                      min={10}
                      max={1000}
                      step={10}
                    />
                  </div>
                
              </div>
            
          )}
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-8">
          <button className="bg-[#006F7F] hover:bg-[#005a66] text-white px-8 py-3 rounded-md flex items-center">
            <Play className="mr-2" /> Generate Molecules
          </button>
        </div>
      </main>
    </div>
  )
}
