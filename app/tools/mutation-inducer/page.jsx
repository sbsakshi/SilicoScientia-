"use client"

import { useState } from "react"
import { Clipboard, FileText, Plus, Play, Trash2, Info, ChevronDown, ChevronUp, X } from "lucide-react"

export default function MutationInducer() {
  const [loading, setLoading] = useState(false)
  const [sequence, setSequence] = useState({
    name: "Sequence_Name",
    data: "MVSKGEELFT GVVPILVELD GDVNGHKFSV SGEGEGDATY GKLTLKFICT",
  })

  const [mutations, setMutations] = useState([
    { original: "G", position: "67", mutated: "R", preview: "G67R" },
    { original: "S", position: "134", mutated: "A", preview: "S134A" },
  ])

  const [saveAsTemplate, setSaveAsTemplate] = useState(false)
  const [notifyWhenComplete, setNotifyWhenComplete] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    mutationTypes: false,
    advancedOptions: false,
  })

  const [mutationTypes, setMutationTypes] = useState([])
  const [selectedMutationType, setSelectedMutationType] = useState("")

  const aminoAcids = [
    "A",
    "R",
    "N",
    "D",
    "C",
    "E",
    "Q",
    "G",
    "H",
    "I",
    "L",
    "K",
    "M",
    "F",
    "P",
    "S",
    "T",
    "W",
    "Y",
    "V",
  ]

  const mutationTypeOptions = [
    "Conservative",
    "Non-conservative",
    "Insertion",
    "Deletion",
    "Frameshift",
    "Nonsense",
    "Missense",
  ]

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const addMutation = () => {
    setMutations([...mutations, { original: "A", position: "", mutated: "G", preview: "" }])
  }

  const removeMutation = (index) => {
    const newMutations = [...mutations]
    newMutations.splice(index, 1)
    setMutations(newMutations)
  }

  const updateMutation = (index, field, value) => {
    const newMutations = [...mutations]
    newMutations[index][field] = value

    // Update preview
    if (field === "original" || field === "position" || field === "mutated") {
      const mutation = newMutations[index]
      newMutations[index].preview = `${mutation.original}${mutation.position}${mutation.mutated}`
    }

    setMutations(newMutations)
  }

  const pasteFasta = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        // Simple FASTA parsing
        const lines = text.split("\n")
        let name = "Pasted_Sequence"
        let data = ""

        if (lines[0].startsWith(">")) {
          name = lines[0].substring(1).trim()
          data = lines.slice(1).join(" ")
        } else {
          data = lines.join(" ")
        }

        setSequence({ name, data })
        setShowSuccess(true)
        setSuccessMessage("FASTA sequence pasted successfully")
        setTimeout(() => setShowSuccess(false), 3000)
      })
      .catch((err) => {
        alert("Could not access clipboard. Please paste manually.")
      })
  }

  const loadExample = () => {
    setSequence({
      name: "Example_Protein",
      data: "MVSKGEELFT GVVPILVELD GDVNGHKFSV SGEGEGDATY GKLTLKFICT TGKLPVPWPT LVTTFSYGVQ CFSRYPDHMK QHDFFKSAMP EGYVQERTIF FKDDGNYKTR AEVKFEGDTL VNRIELKGID FKEDGNILGH KLEYNYNSHN VYIMADKQKN GIKVNFKIRH NIEDGSVQLA DHYQQNTPIG DGPVLLPDNH YLSTQSALSK DPNEKRDHMV LLEFVTAAGI TLGMDELYK",
    })
    setShowSuccess(true)
    setSuccessMessage("Example sequence loaded")
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const runMutationInduction = () => {
    if (mutations.some((m) => !m.position)) {
      alert("Please fill in all mutation positions")
      return
    }

    setLoading(true)

    // Simulate processing
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setSuccessMessage(`${mutations.length} mutations successfully applied`)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const addMutationType = () => {
    if (selectedMutationType && !mutationTypes.includes(selectedMutationType)) {
      setMutationTypes([...mutationTypes, selectedMutationType])
      setSelectedMutationType("")
    }
  }

  const removeMutationType = (type) => {
    setMutationTypes(mutationTypes.filter((t) => t !== type))
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans"
      style={{ backgroundImage: "url('/molecule-bg.png')", backgroundSize: "cover" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">MUTATION INDUCER</h1>

        {showSuccess && (
          <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded mb-4 flex justify-between items-center">
            <p>{successMessage}</p>
            <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
              <X size={18} />
            </button>
          </div>
        )}

        {/* Input Sequence Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Input Sequence</h2>

          <div className="flex gap-4 mb-4">
            <button
              onClick={pasteFasta}
              className="flex items-center gap-2 border border-teal-700 text-teal-700 px-4 py-2 rounded hover:bg-teal-50"
            >
              <Clipboard size={18} />
              Paste FASTA
            </button>

            <button
              onClick={loadExample}
              className="flex items-center gap-2 border border-teal-700 text-teal-700 px-4 py-2 rounded hover:bg-teal-50"
            >
              <FileText size={18} />
              Load Example
            </button>
          </div>

          <div className="bg-blue-50 border border-dashed border-blue-200 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-500">&gt;{sequence.name}</div>
            <div className="text-gray-700 break-all">{sequence.data}</div>
          </div>
        </div>

        {/* Mutation Types Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <button
            onClick={() => toggleSection("mutationTypes")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-xl font-semibold">Mutation Types</h2>
            {expandedSections.mutationTypes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandedSections.mutationTypes && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <label className="text-sm mr-2 text-gray-600">Select Mutation Types</label>
                <Info size={16} className="text-gray-400" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-grow">
                  <select
                    value={selectedMutationType}
                    onChange={(e) => setSelectedMutationType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none"
                  >
                    <option value="">Select a mutation type</option>
                    {mutationTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                <button
                  onClick={addMutationType}
                  className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
                  disabled={!selectedMutationType}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {mutationTypes.map((type) => (
                  <div key={type} className="flex items-center bg-teal-500 text-white px-2 py-1 rounded text-sm">
                    <span>{type}</span>
                    <button onClick={() => removeMutationType(type)} className="ml-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mutations Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Mutations</h2>
            <button
              onClick={addMutation}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              <Plus size={18} />
              Add Mutation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-normal text-gray-600">Original AA</th>
                  <th className="text-left py-2 px-4 font-normal text-gray-600">Position</th>
                  <th className="text-left py-2 px-4 font-normal text-gray-600">Mutated AA</th>
                  <th className="text-left py-2 px-4 font-normal text-gray-600">Preview</th>
                  <th className="text-left py-2 px-4 font-normal text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mutations.map((mutation, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="relative">
                        <select
                          value={mutation.original}
                          onChange={(e) => updateMutation(index, "original", e.target.value)}
                          className="border border-gray-300 rounded px-3 py-1 w-20 appearance-none pr-8"
                        >
                          {aminoAcids.map((aa) => (
                            <option key={aa} value={aa}>
                              {aa}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={mutation.position}
                        onChange={(e) => updateMutation(index, "position", e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 w-20"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <select
                          value={mutation.mutated}
                          onChange={(e) => updateMutation(index, "mutated", e.target.value)}
                          className="border border-gray-300 rounded px-3 py-1 w-20 appearance-none pr-8"
                        >
                          {aminoAcids.map((aa) => (
                            <option key={aa} value={aa}>
                              {aa}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">{mutation.preview}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => removeMutation(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advanced Options Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <button
            onClick={() => toggleSection("advancedOptions")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-xl font-semibold">Advanced Options</h2>
            {expandedSections.advancedOptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandedSections.advancedOptions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Mutation Strategy</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none">
                    <option>Sequential</option>
                    <option>Simultaneous</option>
                    <option>Random</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Output Format</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none">
                    <option>FASTA</option>
                    <option>PDB</option>
                    <option>GenBank</option>
                    <option>Plain Text</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Energy Minimization</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none">
                    <option>None</option>
                    <option>Basic</option>
                    <option>Advanced</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm mr-2 text-gray-600">Structure Prediction</label>
                  <Info size={16} className="text-gray-400" />
                </div>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-300 rounded p-2 pr-8 appearance-none">
                    <option>Disabled</option>
                    <option>Secondary Structure</option>
                    <option>Tertiary Structure</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveAsTemplate}
                onChange={() => setSaveAsTemplate(!saveAsTemplate)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Save as template</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyWhenComplete}
                onChange={() => setNotifyWhenComplete(!notifyWhenComplete)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Notify when complete</span>
            </label>
          </div>

          <button
            onClick={runMutationInduction}
            disabled={loading}
            className={`flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <Play size={18} />
            )}
            Run Mutation Induction
          </button>
        </div>
      </div>
    </div>
  )
}
