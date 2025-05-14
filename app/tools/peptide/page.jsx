"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Info, X, Minus, Plus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function PeptideGenerator() {
  const [activeTab, setActiveTab] = useState("property")
  const [showSuccess, setShowSuccess] = useState(true)
 const [expandedSections, setExpandedSections] = useState({
    sizeProperties: false,
    hydrophobicityProperties: false,
    flexibilityProperties: false,
    chargeProperties: false,
    bondingProperties: false,
    reactivityProperties: false,
    secondaryProperties: false,
    stabilityProperties: false,
    interactionsProperties: false,
  })

  const [selectedProperties, setSelectedProperties] = useState({
    size: [],
    hydrophobicity: [],
    flexibility: [],
    charge: ["pI"],
    bonding: [],
    reactivity: [],
    secondary: ["Sheet_Propensity", "Turn_Propensity"],
    stability: ["Instability_Index"],
    interactions: ["Contact_Potential"],
  })

  const [sliderValues, setSliderValues] = useState({
    sequenceLength: 10,
    referenceInfluence: 0.5,
    numSequences: 3,
    temperature: 0.8,
    pITarget: 0.5,
    sheetTarget: 0.5,
    turnTarget: 0.5,
    instabilityTarget: 0.5,
    contactTarget: 0.5,
  })

    const propertyOptions = {
    size: ["Molecular_Weight", "Volume", "Surface_Area"],
    hydrophobicity: ["Hydropathy_Index", "Hydrophobic_Moment", "Amphipathicity"],
    flexibility: ["B-factor", "Flexibility_Index", "Rigidity"],
    charge: ["pI", "Net_Charge", "Charge_Distribution"],
    bonding: ["Disulfide_Bonds", "Hydrogen_Bonds", "Salt_Bridges"],
    reactivity: ["Reactivity_Index", "Oxidation_Sensitivity", "Reduction_Potential"],
    secondary: ["Alpha_Helix_Propensity", "Sheet_Propensity", "Turn_Propensity"],
    stability: ["Instability_Index", "Aliphatic_Index", "GRAVY"],
    interactions: ["Contact_Potential", "Binding_Affinity", "Interface_Propensity"],
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const addProperty = (category, property) => {
    if (!selectedProperties[category].includes(property)) {
      setSelectedProperties({
        ...selectedProperties,
        [category]: [...selectedProperties[category], property],
      })
      setSliderValues(prev => ({
        ...prev,
        [property]: 0.5,
      }))
    }
  }

  // Remove property and its slider value
  const removeProperty = (category, property) => {
    setSelectedProperties({
      ...selectedProperties,
      [category]: selectedProperties[category].filter((p) => p !== property),
    })
    setSliderValues(prev => {
      const updated = { ...prev }
      delete updated[property]
      return updated
    })
  }

  const handleSliderChange = (name, value) => {
    setSliderValues({
      ...sliderValues,
      [name]: value,
    })
  }

  
  const generateSequences = (type) => {
    setLoading(true)
    
    // Simulate processing
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const renderDynamicSliders = (category) => (
    selectedProperties[category].map(property => (
      <div key={property} className="w-full mb-2">
        <div className="flex items-center justify-between mt-2">
          <label className="text-sm text-gray-600">{property} Target Value</label>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sliderValues[property] ?? 0.5}
            onChange={e => handleSliderChange(property, Number.parseFloat(e.target.value))}
            className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
            style={{
              background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${(sliderValues[property] ?? 0.5) * 100}%, #d1d5db ${(sliderValues[property] ?? 0.5) * 100}%, #d1d5db 100%)`,
            }}
          />
          <span className="ml-2 text-xs text-gray-700">{(sliderValues[property] ?? 0.5).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-600">
          <span>0.00</span>
          <span>1.00</span>
        </div>
      </div>
    ))
  )

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
      style={{ backgroundImage: "url('/light-molecule-bg.png')", backgroundSize: "cover" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Advanced Peptide Generator</h1>

     
        <Tabs defaultValue="property" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-white rounded-t-lg shadow-sm mb-0 p-0">
            <TabsTrigger
              value="property"
              className={`px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 text-gray-600 rounded-none`}
            >
              Property-Based Generation
            </TabsTrigger>
            <TabsTrigger
              value="motif"
              className={`px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 text-gray-600 rounded-none`}
            >
              Motif-Based Generation
            </TabsTrigger>
            <TabsTrigger
              value="target"
              className={`px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 text-gray-600 rounded-none`}
            >
              Target-Based Generation
            </TabsTrigger>
            <TabsTrigger
              value="3d"
              className={`px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 text-gray-600 rounded-none`}
            >
              3D Structure Visualization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="mt-0 bg-white rounded-b-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Property-Based Generation</h2>

            
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Physical Properties Column */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Physical</h3>

                {/* Size Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("sizeProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Size Properties</span>
                    {expandedSections.sizeProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {expandedSections.sizeProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Size Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("size", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.size.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.size.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("size", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for size */}
                      {renderDynamicSliders("size")}
                    </div>
                  )}
                </div>

                {/* Hydrophobicity Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("hydrophobicityProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Hydrophobicity Properties</span>
                    {expandedSections.hydrophobicityProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.hydrophobicityProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Hydrophobicity Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("hydrophobicity", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.hydrophobicity.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.hydrophobicity.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("hydrophobicity", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for hydrophobicity */}
                      {renderDynamicSliders("hydrophobicity")}
                    </div>
                  )}
                </div>

                {/* Flexibility Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("flexibilityProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Flexibility Properties</span>
                    {expandedSections.flexibilityProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.flexibilityProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Flexibility Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("flexibility", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.flexibility.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.flexibility.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("flexibility", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for flexibility */}
                      {renderDynamicSliders("flexibility")}
                    </div>
                  )}
                </div>
              </div>

              {/* Chemical Properties Column */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Chemical</h3>

                {/* Charge Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("chargeProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Charge Properties</span>
                    {expandedSections.chargeProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.chargeProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Charge Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("charge", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.charge.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.charge.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("charge", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for charge */}
                      {renderDynamicSliders("charge")}
                    </div>
                  )}
                </div>

                {/* Bonding Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("bondingProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Bonding Properties</span>
                    {expandedSections.bondingProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.bondingProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Bonding Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("bonding", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.bonding.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.bonding.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("bonding", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for bonding */}
                      {renderDynamicSliders("bonding")}
                    </div>
                  )}
                </div>

                {/* Reactivity Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("reactivityProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Reactivity Properties</span>
                    {expandedSections.reactivityProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.reactivityProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Reactivity Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("reactivity", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.reactivity.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.reactivity.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("reactivity", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for reactivity */}
                      {renderDynamicSliders("reactivity")}
                    </div>
                  )}
                </div>
              </div>

              {/* Structural Properties Column */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Structural</h3>

                {/* Secondary Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("secondaryProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Secondary Properties</span>
                    {expandedSections.secondaryProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.secondaryProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Secondary Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("secondary", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.secondary.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.secondary.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("secondary", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for secondary */}
                      {renderDynamicSliders("secondary")}
                    </div>
                  )}
                </div>

                {/* Stability Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("stabilityProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Stability Properties</span>
                    {expandedSections.stabilityProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.stabilityProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Stability Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("stability", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.stability.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.stability.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("stability", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for stability */}
                      {renderDynamicSliders("stability")}
                    </div>
                  )}
                </div>

                {/* Interactions Properties */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("interactionsProperties")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded text-left"
                  >
                    <span className="text-gray-700">Interactions Properties</span>
                    {expandedSections.interactionsProperties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSections.interactionsProperties && (
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <label className="text-sm text-gray-600">Select Interactions Properties</label>
                        <Info size={16} className="ml-2 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-grow">
                          <select
                            className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                            onChange={(e) => e.target.value && addProperty("interactions", e.target.value)}
                            value=""
                          >
                            <option value="">Choose an option</option>
                            {propertyOptions.interactions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperties.interactions.map(property => (
                          <div key={property} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            <span>{property}</span>
                            <button onClick={() => removeProperty("interactions", property)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Dynamic sliders for interactions */}
                      {renderDynamicSliders("interactions")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex items-center mb-2">
                <label className="text-sm mr-2 text-gray-600">Reference Sequence (Optional)</label>
                <Info size={16} className="text-gray-400" />
              </div>
              <textarea
                className="w-full bg-white border border-gray-300 rounded p-3 mb-4"
                rows={3}
                placeholder="Enter reference sequence..."
              />

              <div className="flex items-center mb-2">
                <label className="text-sm mr-2 text-gray-600">Reference Sequence Influence</label>
                <Info size={16} className="text-gray-400" />
              </div>
              <div className="mb-6">
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={sliderValues.referenceInfluence}
                    onChange={(e) => handleSliderChange("referenceInfluence", Number.parseFloat(e.target.value))}
                    className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                    style={{
                      background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${sliderValues.referenceInfluence * 100}%, #d1d5db ${sliderValues.referenceInfluence * 100}%, #d1d5db 100%)`,
                    }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                    style={{ left: `calc(${sliderValues.referenceInfluence * 100}% - 8px)`, top: "50%" }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-600">
                  <span>0.00</span>
                  <span>1.00</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <label className="text-sm mr-2 text-gray-600">Sequence Length</label>
                    <Info size={16} className="text-gray-400" />
                  </div>
                  <div className="mb-4">
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="1"
                        value={sliderValues.sequenceLength}
                        onChange={(e) => handleSliderChange("sequenceLength", Number.parseInt(e.target.value))}
                        className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                        style={{
                          background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((sliderValues.sequenceLength - 5) / 45) * 100}%, #d1d5db ${((sliderValues.sequenceLength - 5) / 45) * 100}%, #d1d5db 100%)`,
                        }}
                      />
                      <div
                        className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                        style={{ left: `calc(${((sliderValues.sequenceLength - 5) / 45) * 100}% - 8px)`, top: "50%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-600">
                      <span>5</span>
                      <span className="text-center">{sliderValues.sequenceLength}</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label className="text-sm mr-2 text-gray-600">Number of Sequences</label>
                    <Info size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-white hover:bg-gray-100 p-2 rounded-l border border-gray-300"
                      onClick={() => handleSliderChange("numSequences", Math.max(1, sliderValues.numSequences - 1))}
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={sliderValues.numSequences}
                      onChange={(e) => handleSliderChange("numSequences", Number.parseInt(e.target.value))}
                      className="w-12 text-center bg-white border-t border-b border-gray-300 py-2"
                    />
                    <button
                      className="bg-white hover:bg-gray-100 p-2 rounded-r border border-gray-300"
                      onClick={() => handleSliderChange("numSequences", Math.min(10, sliderValues.numSequences + 1))}
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Temperature</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="mb-6">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.01"
                      value={sliderValues.temperature}
                      onChange={(e) => handleSliderChange("temperature", Number.parseFloat(e.target.value))}
                      className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                      style={{
                        background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db 100%)`,
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                      style={{ left: `calc(${((sliderValues.temperature - 0.1) / 1.9) * 100}% - 8px)`, top: "50%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-600">
                    <span>0.10</span>
                    <span className="text-center">{sliderValues.temperature.toFixed(2)}</span>
                    <span>2.00</span>
                  </div>
                </div>
              </div>

              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
                Generate Property-Based Sequences
              </button>
            </div>
          </TabsContent>

          <TabsContent value="motif" className="mt-0 bg-white rounded-b-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Motif-Based Generation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Enter Motif (e.g., 'RGD')</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 rounded p-3 mb-4"
                  placeholder="Enter motif..."
                />

                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Complete Reference Sequence (Optional)</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <textarea
                  className="w-full bg-white border border-gray-300 rounded p-3 mb-4"
                  rows={3}
                  placeholder="Enter reference sequence..."
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Desired Sequence Length</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="mb-6">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={sliderValues.sequenceLength}
                      onChange={(e) => handleSliderChange("sequenceLength", Number.parseInt(e.target.value))}
                      className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                      style={{
                        background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((sliderValues.sequenceLength - 5) / 45) * 100}%, #d1d5db ${((sliderValues.sequenceLength - 5) / 45) * 100}%, #d1d5db 100%)`,
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                      style={{ left: `calc(${((sliderValues.sequenceLength - 5) / 45) * 100}% - 8px)`, top: "50%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-600">
                    <span>5</span>
                    <span className="text-center">{sliderValues.sequenceLength}</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Number of Sequences</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center mb-6">
                  <button
                    className="bg-white hover:bg-gray-100 p-2 rounded-l border border-gray-300"
                    onClick={() => handleSliderChange("numSequences", Math.max(1, sliderValues.numSequences - 1))}
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sliderValues.numSequences}
                    onChange={(e) => handleSliderChange("numSequences", Number.parseInt(e.target.value))}
                    className="w-12 text-center bg-white border-t border-b border-gray-300 py-2"
                  />
                  <button
                    className="bg-white hover:bg-gray-100 p-2 rounded-r border border-gray-300"
                    onClick={() => handleSliderChange("numSequences", Math.min(10, sliderValues.numSequences + 1))}
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Temperature</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="mb-6">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.01"
                      value={sliderValues.temperature}
                      onChange={(e) => handleSliderChange("temperature", Number.parseFloat(e.target.value))}
                      className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                      style={{
                        background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db 100%)`,
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                      style={{ left: `calc(${((sliderValues.temperature - 0.1) / 1.9) * 100}% - 8px)`, top: "50%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-600">
                    <span>0.10</span>
                    <span className="text-center">{sliderValues.temperature.toFixed(2)}</span>
                    <span>2.00</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <input type="checkbox" id="specifyPosition" className="mr-2" />
                  <label htmlFor="specifyPosition" className="text-sm text-gray-600">
                    Specify Motif Position
                  </label>
                  <Info size={16} className="ml-2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
                Generate Motif-Based Sequences
              </button>
            </div>
          </TabsContent>

          <TabsContent value="target" className="mt-0 bg-white rounded-b-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Target-Based Complementary Generation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Target Sequence</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <textarea
                  className="w-full bg-white border border-gray-300 rounded p-3 mb-4"
                  rows={3}
                  placeholder="Enter target sequence..."
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Generation Settings</h3>

                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Number of sequences</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center mb-6">
                  <button
                    className="bg-white hover:bg-gray-100 p-2 rounded-l border border-gray-300"
                    onClick={() => handleSliderChange("numSequences", Math.max(1, sliderValues.numSequences - 1))}
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sliderValues.numSequences}
                    onChange={(e) => handleSliderChange("numSequences", Number.parseInt(e.target.value))}
                    className="w-12 text-center bg-white border-t border-b border-gray-300 py-2"
                  />
                  <button
                    className="bg-white hover:bg-gray-100 p-2 rounded-r border border-gray-300"
                    onClick={() => handleSliderChange("numSequences", Math.min(10, sliderValues.numSequences + 1))}
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Temperature</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="mb-6">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.01"
                      value={sliderValues.temperature}
                      onChange={(e) => handleSliderChange("temperature", Number.parseFloat(e.target.value))}
                      className="w-full appearance-none bg-gray-300 h-1 rounded outline-none"
                      style={{
                        background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db ${((sliderValues.temperature - 0.1) / 1.9) * 100}%, #d1d5db 100%)`,
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-teal-500 rounded-full -mt-1.5"
                      style={{ left: `calc(${((sliderValues.temperature - 0.1) / 1.9) * 100}% - 8px)`, top: "50%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-600">
                    <span>0.10</span>
                    <span className="text-center">{sliderValues.temperature.toFixed(2)}</span>
                    <span>2.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
                Generate Complementary Sequences
              </button>
            </div>
          </TabsContent>

          <TabsContent value="3d" className="mt-0 bg-white rounded-b-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">3D Structure Visualization</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Input Method</h3>

                <div className="mb-4">
                  <p className="text-sm mb-2 text-gray-600">Choose input method</p>
                  <div className="flex items-center mb-2">
                    <input type="radio" id="enterSequence" name="inputMethod" className="mr-2" checked />
                    <label htmlFor="enterSequence" className="text-sm text-gray-600">
                      Enter Sequence
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="selectGenerated" name="inputMethod" className="mr-2" />
                    <label htmlFor="selectGenerated" className="text-sm text-gray-600">
                      Select Generated Sequence
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Enter peptide sequence</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <textarea
                  className="w-full bg-white border border-gray-300 rounded p-3 mb-4"
                  rows={3}
                  placeholder="Enter peptide sequence..."
                />
              </div>
            </div>

            <div className="mt-6">
              <div
                className="bg-gray-50 border border-gray-200 rounded p-6 flex items-center justify-center"
                style={{ height: "400px" }}
              >
                <p className="text-gray-500">3D structure visualization will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
