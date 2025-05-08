"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Save, Download, Upload, FileText, Check, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed Viewer import
import * as NGL from 'ngl'; // *** ADDED NGL IMPORT ***

// Minimal Checkbox component if not using ShadCN's Checkbox or want a simple one
const Checkbox = ({ id, checked, onCheckedChange, ...props }) => (
    <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-[#006F7F] focus:ring-[#006F7F]/50 cursor-pointer"
        {...props}
    />
);




export default function LigandLock() {
  // Existing state variables
  const [activeTab, setActiveTab] = useState("protine");
  const [pdbId, setPdbId] = useState("");
  const [jobId, setJobId] = useState("");
  const [propertiesDialogOpen, setPropertiesDialogOpen] = useState(false);
  const [partialCharge, setPartialCharge] = useState("None");
  const [pH, setPH] = useState("7.2");
  const [gen3D, setGen3D] = useState(false);
  const [hydrogen, setHydrogen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLigandPrepared, setIsLigandPrepared] = useState(false);
  const [thresholdEnergy, setThresholdEnergy] = useState("");
  const [sortingMethod, setSortingMethod] = useState("Binding Energy"); // Default sorting
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [showPreparedResults, setShowPreparedResults] = useState(false);
  const [propertiesModalOpen, setPropertiesModalOpen] = useState(false);
  const [selectedFileProperties, setSelectedFileProperties] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

 // Function to fetch properties
 const fetchProperties = async (fileName) => {
  try {
      const response = await fetch('http://localhost:5000/process_protein', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: fileName }),
      });
      const properties = await response.json();
      setSelectedFileProperties(properties);
      setSelectedFileName(fileName);
      setPropertiesModalOpen(true);
  } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Failed to fetch properties. Please try again.');
  }
};

// Function to save properties
const saveProperties = () => {
  console.log('Saving properties:', selectedFileProperties);
  // Logic to save properties can be added here
};

// Function to prepare protein
const prepareProtein = async () => {
  try {
      const response = await fetch('http://localhost:5000/delete_properties', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: selectedFileName }),
      });
      const result = await response.json();
      console.log('Delete properties response:', result);
      // Handle the response as needed
  } catch (error) {
      console.error('Error deleting properties:', error);
      alert('Failed to delete properties. Please try again.');
  }
  setPropertiesModalOpen(false);
};

// In your JSX, add the button to open properties
const handlePropertiesClick = (fileName) => {
  fetchProperties(fileName);
};



  // *** State for the Viewer Modal ***
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerData, setViewerData] = useState({ structureId: null, file: null, name: null });
  // *** State for viewer options ***
  const [viewerRepresentation, setViewerRepresentation] = useState('cartoon');
  const [viewerColorScheme, setViewerColorScheme] = useState('chainid');

  // File upload refs
  const proteinFileRef = useRef(null);
  const textFileRef = useRef(null);
  const ligandFileRef = useRef(null);

  // *** Refs for the integrated NGL viewer ***
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const componentRef = useRef(null);

  // Files state
  const [protineFiles, setProtineFiles] = useState([]);
  const [ligandFiles, setLigandFiles] = useState([]);
  const [dockingFiles, setDockingFiles] = useState([]);
  const [resultsFiles, setResultsFiles] = useState([]); // Include energy for results table

  // Add this function with the other event handlers (around line 320-340)
// In the handleNewJob function
const handleNewJob = async () => {
  try {
    const response = await fetch('http://localhost:5000/new_job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include auth cookies
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create new job: ${response.status}`);
    }
    
    const data = await response.json();
    alert("Job id created: " + data.unique_id)
    // Ensure job_id is a string
    setJobId(data.unique_id || ""); // Default to empty string if job_id is undefined
    
    // Reset relevant state for a new job
    setProtineFiles([]);
    setLigandFiles([]);
    setDockingFiles([]);
    setResultsFiles([]);
    setShowResults(false);
    setShowPreparedResults(false);
    
  } catch (error) {
    console.error("Error creating new job:", error);
    alert("Failed to create new job. Please try again.");
  }
};



  // Check if files are uploaded in all tabs (simplified check)
  useEffect(() => {
    if (protineFiles.length > 0 && ligandFiles.length > 0 && dockingFiles.length > 0) {
      setAllFilesUploaded(true);
    } else {
      setAllFilesUploaded(false);
    }
  }, [protineFiles, ligandFiles, dockingFiles]);


  // *** NGL Stage Initialization and Cleanup Effect ***
  useEffect(() => {
    // Initialize stage only when viewer is open and stage doesn't exist
    if (isViewerOpen && viewportRef.current && !stageRef.current) {
      console.log("Initializing NGL Stage");
      stageRef.current = new NGL.Stage(viewportRef.current);
      stageRef.current.setParameters({ backgroundColor: 'white' });

      const handleResize = () => stageRef.current?.handleResize();
      window.addEventListener('resize', handleResize);

      // Store resize handler for removal
      viewportRef.current.__ngl_resize_handler = handleResize;
    }

    return () => {
      if (stageRef.current) {
          if (!isViewerOpen) {
             console.log("Disposing NGL Stage because viewer closed or component unmounting");
             const handleResize = viewportRef.current?.__ngl_resize_handler;
             if (handleResize) {
                window.removeEventListener('resize', handleResize);
             }
             stageRef.current.dispose();
             stageRef.current = null;
             componentRef.current = null;
             if (viewportRef.current) {
                delete viewportRef.current.__ngl_resize_handler; // Clean up stored handler
             }
          }
      }
    };
    // Ensure cleanup runs if isViewerOpen becomes false
  }, [isViewerOpen]);

  // *** NGL Structure Loading Effect ***
  useEffect(() => {
    // Only load if viewer is open and stage exists
    if (!isViewerOpen || !stageRef.current) {
      return;
    }

    const stage = stageRef.current;
    stage.removeAllComponents(); // Clear previous structures
    componentRef.current = null;

    const { structureId, file } = viewerData;

    const loadComponent = (component) => {
      componentRef.current = component;
      // Apply default/current representation and color
      component.addRepresentation(viewerRepresentation || 'cartoon', { color: viewerColorScheme || 'chainid' });
      component.addRepresentation('base', { sele: 'nucleic' }); // Always show nucleic bases if present
      component.addRepresentation('ball+stick', { sele: 'ligand' }); // Always show ligands if present
      component.autoView();
    };

    if (structureId) {
      console.log(`NGL: Loading PDB ID: ${structureId}`);
      stage.loadFile(`https://files.rcsb.org/download/${structureId}.pdb`, { defaultRepresentation: false })
        .then(loadComponent)
        .catch((error) => {
          console.error("NGL Load Error (PDB ID):", error);
          alert(`Failed to load structure ${structureId}. Please check the ID or network connection.`);
          closeViewer(); // Close viewer on error
        });
    } else if (file) {
      console.log(`NGL: Loading File: ${file.name}`);
      const reader = new FileReader();
      reader.onload = (e) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || ''; // Safer extension extraction
        const fileBlob = new Blob([e.target.result]);
        stage.loadFile(fileBlob, { ext: ext, defaultRepresentation: false })
          .then(loadComponent)
          .catch((error) => {
            console.error("NGL Load Error (File):", error);
            alert(`Failed to load file: ${file.name}. It might be an unsupported format or corrupted. Check console.`);
            closeViewer(); // Close viewer on error
          });
      };
      reader.onerror = (e) => {
        console.error("FileReader Error:", e);
        alert(`Failed to read file: ${file.name}.`);
        closeViewer(); // Close viewer on error
      };
       // Read as ArrayBuffer is generally safer for ngl.loadFile with blobs
       reader.readAsArrayBuffer(file);
    } else {
      console.log("NGL: No structure ID or file provided.");
    }

  // Rerun when data, open state, or view options change
  }, [viewerData, isViewerOpen, viewerRepresentation, viewerColorScheme]);


  const toggleFileSelection = (id, fileType) => {
    const updateFiles = (files) => files.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file));

    if (fileType === "protine") {
      setProtineFiles(updateFiles);
    } else if (fileType === "ligand") {
      setLigandFiles(updateFiles);
    } else if (fileType === "docking") {
      setDockingFiles(updateFiles);
    }
  };

  // --- File Upload Handlers ---
  const handleProteinFileUpload = () => proteinFileRef.current?.click();
  const handleTextFileUpload = () => textFileRef.current?.click();
  const handleLigandFileUpload = () => ligandFileRef.current?.click();

  // --- Modified handleFileChange to store the File object ---
  const handleFileChange = (e, fileType) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = {
        id: Date.now(), // Use timestamp or uuid for better uniqueness
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}KB`,
        status: "Uploaded",
        selected: true,
        fileObject: file, // Store the actual File object
      };

      if (fileType === "protein") {
        setProtineFiles((prev) => [...prev, newFile]);
      } else if (fileType === "ligand") {
        setLigandFiles((prev) => [...prev, newFile]);
      } else if (fileType === "text") {
        const newDockingFile = { ...newFile, name: file.name.includes('config') ? 'Config_file.txt' : file.name }; // Basic naming
        setDockingFiles((prev) => [...prev, newDockingFile]);
      }
      e.target.value = null; // Reset input
    }
  };

  // --- Viewer Control Functions ---
  const openViewer = (data) => {
    console.log("Opening viewer with data:", data);
    setViewerData(data);
    setViewerRepresentation('cartoon'); // Reset to default view on open
    setViewerColorScheme('chainid');   // Reset to default view on open
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    // Don't clear viewerData immediately, let the effect handle stage cleanup
    // setViewerData({ structureId: null, file: null, name: null });
  };


  // --- Event Handlers (Simulated Backend Calls) ---
  const handlePrepareLigand = () => {
    console.log("Preparing ligands (simulated)...", { gen3D, hydrogen, pH, partialCharge });
    // Simulate preparing ligand
    setTimeout(() => {
      setIsLigandPrepared(true);
      setShowResults(true); // Show results section in Ligand tab

      const preparedLigands = ligandFiles
        .filter(f => f.selected)
        .map((f, i) => ({
          id: `prep_${f.id}`, // Unique ID
          name: `Prepared_${f.name.split('.')[0]}.pdbqt`,
          size: `${(f.fileObject.size * 1.1 / 1024).toFixed(2)}KB`, // Example size change
          status: 'Prepared',
          // Ideally, backend returns prepared file data or a way to fetch it
          fileObject: null // Placeholder
        }));

        // Add prepared ligands to a separate state or combine if needed
        // For simplicity, adding to resultsFiles but filtering later if needed
        // It might be better to have a dedicated preparedLigands state
      setResultsFiles(prev => [...prev, ...preparedLigands]);
      console.log("Ligand preparation complete (simulated).");

    }, 1500);
  };

  const handlePrepareProperties = () => {
    console.log("Preparing protein properties (simulated)...");
    const selectedProtein = protineFiles.find(f => f.selected);
     if (!selectedProtein) return;
    // Simulate preparing properties
    setTimeout(() => {
      console.log(`Properties prepared for ${selectedProtein.name} (simulated)`);
      // Update protein status maybe?
       setProtineFiles(prev => prev.map(f => f.id === selectedProtein.id ? {...f, status: 'Prepared'} : f));
      // Optionally move to next logical tab or show message
    }, 1000);
  };

  const handleRunDocking = () => {
      console.log("Running docking (simulated)...");
      const protein = protineFiles.find(f => f.selected);
      const ligands = ligandFiles.filter(f => f.selected); // Or use prepared ligands from results state
      const config = dockingFiles.find(f => f.selected);

      if (!protein || ligands.length === 0 || !config) {
          alert("Missing inputs for docking: Select one protein, at least one ligand, and one config file.");
          return;
      }

       // Simulate results appearing after some time
       setTimeout(() => {
           // Add some dummy docking results with energy
           const dockedResults = ligands.map((lig, index) => ({
                id: `dock_${lig.id}_${index + 1}`, // Unique ID
                name: `Complex_${protein.name.split('.')[0]}_${lig.name.split('.')[0]}_${index+1}.pdbqt`,
                size: `${(Math.random() * 100 + 500).toFixed(2)}KB`,
                status: "Completed",
                energy: -(Math.random() * 5 + 5).toFixed(2), // Example energy kcal/mol
                fileObject: null // Ideally backend result file object or data
           }));

           // Sort results by energy (lowest first)
           dockedResults.sort((a, b) => a.energy - b.energy);

           setResultsFiles(dockedResults); // Replace results with new docking results
           setActiveTab("result");
           setShowPreparedResults(true); // Show results in the Result tab content area
           console.log("Docking complete (simulated).");
       }, 2500);
  };

  const handleAnalyze = () => {
    console.log("Running Post-Docking Analysis (simulated)...", { thresholdEnergy, sortingMethod });
    // Simulate analysis
    setTimeout(() => {
      // Filter results based on threshold (if provided)
      let analyzedResults = resultsFiles.filter(f => f.energy); // Only consider files with energy
      if (thresholdEnergy && !isNaN(parseFloat(thresholdEnergy))) {
          analyzedResults = analyzedResults.filter(f => f.energy <= parseFloat(thresholdEnergy));
      }

      // Sort based on selected method
      if (sortingMethod === 'Binding Energy') {
          analyzedResults.sort((a, b) => a.energy - b.energy);
      } else if (sortingMethod === 'Ligand Efficiency') {
          // Placeholder for Ligand Efficiency calculation/sorting
          // analyzedResults.sort((a, b) => calculateLE(a) - calculateLE(b));
          console.warn("Ligand Efficiency sorting not implemented yet.");
      }

      // Update the results state or display analysis elsewhere
      // For now, just log it. You might want a separate state for analyzed results.
      console.log("Analysis complete (simulated). Filtered/Sorted Results:", analyzedResults);
      setResultsFiles(analyzedResults); // Update results tab with sorted/filtered data
      setActiveTab("result"); // Stay on result tab to show updated table, or switch to PDA tab
      // setShowPreparedResults(true); // Ensure results content is visible

    }, 1500);
  };

   const handleLoadPdb = () => {
    if (pdbId && pdbId.trim().length === 4) { // Basic validation
        const existing = protineFiles.find(f => f.id === pdbId.toUpperCase());
        if (existing) {
            alert(`${pdbId.toUpperCase()} is already loaded.`);
            return;
        }
        const pdbFile = {
            id: pdbId.toUpperCase(),
            name: `${pdbId.toUpperCase()}.pdb`,
            size: 'Fetching...',
            status: 'Fetching',
            selected: true, // Select automatically
            fileObject: null,
            isPdbId: true,
        };
        // Add to protein files list and deselect others
        setProtineFiles(prev => [...prev.map(f => ({...f, selected: false})), pdbFile]);
        setPdbId(''); // Clear input after loading
        // Optionally open viewer automatically
        // openViewer({ structureId: pdbFile.id, file: null, name: pdbFile.name });
    } else {
        alert("Please enter a valid 4-character PDB ID.");
    }
};

 const handleDeleteSelected = (fileType) => {
    const filterSelected = (files) => files.filter(f => !f.selected);
    if (fileType === 'protein') {
        setProtineFiles(filterSelected);
    } else if (fileType === 'ligand') {
        setLigandFiles(filterSelected);
    } else if (fileType === 'docking') {
        setDockingFiles(filterSelected);
    }
    // Consider if deleting results is needed
    // else if (fileType === 'result') {
    //     setResultsFiles(filterSelected); // Requires resultsFiles to have 'selected' property
    // }
 };


  // --- JSX ---
  return (
    <div
      className="flex h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      {/* Left sidebar */}
      <div className="w-72 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col"> {/* Increased width */}
        {/* --- PROTEIN TAB SIDEBAR --- */}
        {activeTab === "protine" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Protein Setup</h2>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
              {/* Upload Protein File Button */}
              <div>
                <input
                  type="file"
                  ref={proteinFileRef}
                  accept=".pdb, .cif, .mmcif, .pqr" // Specify acceptable formats
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "protein")}
                />
                <button
                  onClick={handleProteinFileUpload}
                  className="flex items-center text-[#006F7F] font-medium hover:text-[#005a66] w-full text-left p-1"
                >
                  <Upload className="mr-2 h-4 w-4 text-[#006F7F]" />
                  Upload Protein File (.pdb, .cif)
                </button>
              </div>

               {/* PDB Loader */}
              <div className="space-y-2">
                <label htmlFor="pdbInput" className="font-medium text-xs text-gray-500 block mb-1">Fetch from PDB</label>
                <div className="flex space-x-1">
                    <Input
                    id="pdbInput"
                    placeholder="Enter 4-char ID"
                    value={pdbId}
                    onChange={(e) => setPdbId(e.target.value.toUpperCase())}
                    maxLength={4}
                    className="bg-white h-8 text-xs flex-grow"
                    />
                    <Button onClick={handleLoadPdb} size="sm" className="h-8 text-xs px-2 bg-[#006F7F] hover:bg-[#005a66]">Load</Button>
                </div>
              </div>

              {/* Selected Files */}
               <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-xs text-gray-600">Protein Files</h3>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto border rounded p-1 bg-gray-50/50">
                 {protineFiles.length === 0 && <p className="text-xs text-gray-400 text-center p-2">No protein files loaded.</p>}
                  {protineFiles.map((file) => (
                    <div
                      key={file.id}
                      className={cn(
                        "flex items-center justify-between p-1.5 rounded file-row text-xs hover:bg-gray-100",
                        file.selected ? "bg-[#006F7F]/10" : "",
                      )}
                    >
                      <div className="flex items-center flex-grow overflow-hidden mr-2">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-sm border border-[#006F7F] flex items-center justify-center cursor-pointer file-radio mr-1.5 flex-shrink-0",
                            file.selected ? "selected bg-[#006F7F]" : "",
                          )}
                          onClick={() => toggleFileSelection(file.id, "protine")}
                        >
                          {file.selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="ml-1 truncate" title={file.name}>{file.name}</span>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                         <span className={`text-[10px] px-1.5 py-0.5 rounded-full mr-1 ${file.status === 'Uploaded' || file.status === 'Fetching' ? 'bg-blue-100 text-blue-800' : file.status === 'Prepared' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {file.status}
                         </span>
                         {/* View Button */}
                         {(file.fileObject || file.isPdbId) && (
                           <Button
                             variant="ghost"
                             size="sm"
                             className="h-5 w-5 p-0 text-gray-500 hover:text-[#006F7F]"
                             title="View Structure"
                             onClick={() => openViewer({
                               structureId: file.isPdbId ? file.id : null,
                               file: file.fileObject,
                               name: file.name
                             })}
                           >
                             <Eye className="h-3.5 w-3.5" />
                           </Button>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-rose-500 text-rose-500 hover:bg-rose-50 text-xs"
                  onClick={() => handleDeleteSelected('protein')}
                  disabled={!protineFiles.some(f => f.selected)}
                >
                  Delete Selected
                </Button>
        
      {/* Your existing JSX code for the component */}
      <button onClick={() => handlePropertiesClick("exampleFileName")}>Properties</button>

      {/* Modal JSX */}
      {propertiesModalOpen && (
          <div className="modal">
              <div className="modal-content">
                  <h2>File Properties</h2>
                  {selectedFileProperties && (
                      <div>
                          {Object.entries(selectedFileProperties).map(([key, value]) => (
                              <div key={key}>
                                  <label>
                                      <input type="checkbox" checked={value.checked} onChange={() => {/* handle checkbox change */}} />
                                      {key}: {value.details}
                                  </label>
                              </div>
                          ))}
                      </div>
                  )}
                  <button onClick={saveProperties}>Save Properties</button>
                  <button onClick={prepareProtein}>Prepare Protein</button>
                  <button onClick={() => setPropertiesModalOpen(false)}>Close</button>
              </div>
          </div>
      )}
  

              </div>

            </div>
            <div className="p-4 border-t border-gray-200 mt-auto">
               <Button
                className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white text-sm"
                 onClick={handlePrepareProperties}
                 disabled={!protineFiles.some(f => f.selected)}
              >
                Prepare Protein Properties
              </Button>
            </div>
          </>
        )}

         {/* --- LIGAND TAB SIDEBAR --- */}
        {activeTab === "ligand" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Ligand Setup</h2>
            </div>

             <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
               {/* Upload Ligand File Button */}
              <div>
                <input
                  type="file"
                  ref={ligandFileRef}
                  accept=".pdb, .sdf, .mol2, .smi" // Specify acceptable formats
                  className="hidden"
                   multiple // Allow multiple file selection if backend supports it
                  onChange={(e) => handleFileChange(e, "ligand")} // Modify handleFileChange if multiple
                />
                <button
                  onClick={handleLigandFileUpload}
                  className="flex items-center text-[#006F7F] font-medium hover:text-[#005a66] w-full text-left p-1"
                >
                  <Upload className="mr-2 h-4 w-4 text-[#006F7F]" />
                  Upload Ligand File(s)
                </button>
              </div>

               {/* File Properties */}
              <div className="space-y-2 pt-2 border-t mt-2">
                <h3 className="font-medium text-xs text-gray-600 mb-1">Preparation Options</h3>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="gen3d" checked={gen3D} onCheckedChange={setGen3D} />
                  <label htmlFor="gen3d" className="text-xs cursor-pointer">Generate 3D Coords (if needed)</label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="hydrogens" checked={hydrogen} onCheckedChange={setHydrogen} />
                    <label htmlFor="hydrogens" className="text-xs cursor-pointer">Add Hydrogens</label>
                </div>
                {/* pH Input */}
                <div className="space-y-1">
                    <label htmlFor="phInput" className="text-xs font-medium text-gray-600 block">pH (for protonation)</label>
                    <Input id="phInput" type="number" step="0.1" value={pH} onChange={(e) => setPH(e.target.value)} className="bg-white h-7 text-xs w-20" />
                </div>
                 {/* Partial Charge */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 block">Assign Partial Charges</label>
                    <Select value={partialCharge} onValueChange={setPartialCharge}>
                    <SelectTrigger className="bg-white h-7 text-xs">
                        <SelectValue placeholder="Select charge" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="None" className="text-xs">None</SelectItem>
                        <SelectItem value="Gasteiger" className="text-xs">Gasteiger</SelectItem>
                        <SelectItem value="MMFF94" className="text-xs">MMFF94 (if applicable)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              </div>

              {/* Selected Ligand Files */}
               <div className="space-y-2 pt-2 border-t mt-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-xs text-gray-600">Ligand Files</h3>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto border rounded p-1 bg-gray-50/50">
                  {ligandFiles.length === 0 && <p className="text-xs text-gray-400 text-center p-2">No ligand files loaded.</p>}
                  {ligandFiles.map((file) => (
                     <div
                      key={file.id}
                      className={cn(
                        "flex items-center justify-between p-1.5 rounded file-row text-xs hover:bg-gray-100",
                        file.selected ? "bg-[#006F7F]/10" : "",
                      )}
                    >
                      <div className="flex items-center flex-grow overflow-hidden mr-2">
                         <div
                          className={cn(
                            "w-4 h-4 rounded-sm border border-[#006F7F] flex items-center justify-center cursor-pointer file-radio mr-1.5 flex-shrink-0",
                            file.selected ? "selected bg-[#006F7F]" : "",
                          )}
                          onClick={() => toggleFileSelection(file.id, "ligand")}
                        >
                          {file.selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="ml-1 truncate" title={file.name}>{file.name}</span>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full mr-1 bg-blue-100 text-blue-800`}>
                            {file.status}
                         </span>
                         {/* View Button */}
                         {file.fileObject && (
                           <Button
                             variant="ghost"
                             size="sm"
                             className="h-5 w-5 p-0 text-gray-500 hover:text-[#006F7F]"
                             title="View Structure"
                             onClick={() => openViewer({
                               structureId: null,
                               file: file.fileObject,
                               name: file.name
                             })}
                           >
                             <Eye className="h-3.5 w-3.5" />
                           </Button>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

               {/* Delete Button */}
                <div className="pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-rose-500 text-rose-500 hover:bg-rose-50 text-xs"
                         onClick={() => handleDeleteSelected('ligand')}
                         disabled={!ligandFiles.some(f => f.selected)}
                    >
                    Delete Selected
                    </Button>
                </div>

            </div>
            <div className="p-4 border-t border-gray-200 mt-auto">
                {/* Prepare Ligand Button */}
                <Button
                    className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white text-sm"
                    onClick={handlePrepareLigand}
                    disabled={!ligandFiles.some(f => f.selected)}
                >
                    Prepare Ligand(s)
                </Button>
            </div>
          </>
        )}

        {/* --- DOCKING TAB SIDEBAR --- */}
        {activeTab === "docking" && (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Docking Setup</h2>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
               {/* Configuration Section */}
               <div className="space-y-2 pt-2">
                   <h3 className="font-medium text-xs text-gray-600 mb-1">Configuration</h3>
                   {/* Upload Config File */}
                   <div>
                       <input type="file" ref={textFileRef} className="hidden" accept=".txt, .conf" onChange={(e) => handleFileChange(e, "text")} />
                       <button onClick={handleTextFileUpload} className="flex items-center text-gray-600 font-medium hover:text-gray-800 w-full text-left p-1">
                           <Upload className="mr-2 h-4 w-4 text-gray-600" /> Upload Config File (.txt)
                       </button>
                   </div>

                    {/* Display Config Files */}
                    <div className="space-y-1 max-h-24 overflow-y-auto border rounded p-1 bg-gray-50/50 mt-2">
                        {dockingFiles.length === 0 && <p className="text-xs text-gray-400 text-center p-2">No config file loaded.</p>}
                        {dockingFiles.map((file) => (
                            <div key={file.id} className={cn("flex items-center justify-between p-1 rounded text-xs hover:bg-gray-100", file.selected ? "bg-[#006F7F]/10" : "")}>
                                <div className="flex items-center flex-grow overflow-hidden mr-2">
                                    {/* Config Selection */}
                                    <div className={cn("w-4 h-4 rounded-sm border border-[#006F7F] flex items-center justify-center cursor-pointer file-radio mr-1.5 flex-shrink-0", file.selected ? "selected bg-[#006F7F]" : "")} onClick={() => toggleFileSelection(file.id, "docking")}>
                                        {file.selected && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className="ml-1 truncate" title={file.name}>{file.name}</span>
                                </div>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full mr-1 bg-blue-100 text-blue-800`}>
                                    {file.status}
                                </span>
                                {/* Add delete button for config? */}
                                <Button
                                    variant="ghost"
                                    size="xs"
                                    className="h-5 w-5 p-0 text-rose-500 hover:text-rose-700 ml-1"
                                    title="Delete Config"
                                    onClick={() => setDockingFiles(prev => prev.filter(df => df.id !== file.id))}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    {/* Define Docking Box Button (placeholder) */}
                    <Button variant="outline" size="sm" className="w-full border-gray-400 text-gray-600 hover:bg-gray-100 text-xs mt-1">
                        Define Docking Box / Edit Config
                    </Button>
               </div>

               {/* Selected Inputs Summary */}
               <div className="space-y-2 pt-2 border-t mt-2">
                   <h3 className="font-medium text-xs text-gray-600 mb-1">Selected Inputs</h3>
                   <div className="text-xs text-gray-500">Protein: {protineFiles.find(f => f.selected)?.name || <span className="text-orange-500">None Selected</span>}</div>
                   <div className="text-xs text-gray-500">Ligands: {ligandFiles.filter(f => f.selected).length || <span className="text-orange-500">None Selected</span>}</div>
                   <div className="text-xs text-gray-500">Config: {dockingFiles.find(f => f.selected)?.name || <span className="text-orange-500">None Selected</span>}</div>
               </div>

            </div>
             <div className="p-4 border-t border-gray-200 mt-auto">
                <Button
                    className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white text-sm"
                    onClick={handleRunDocking}
                    disabled={!protineFiles.some(f => f.selected) || !ligandFiles.some(f => f.selected) || !dockingFiles.some(f => f.selected)}
                >
                    Run Docking
                </Button>
             </div>
          </>
        )}

        {/* --- RESULT TAB SIDEBAR --- */}
        {activeTab === "result" && (
           <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Docking Results</h2>
            </div>
             <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
                 {/* Results Files List */}
                 <div className="space-y-2 pt-2">
                    <h3 className="font-medium text-xs text-gray-600 mb-1">Result Files</h3>
                    <div className="space-y-1 max-h-96 overflow-y-auto border rounded p-1 bg-gray-50/50">
                        {resultsFiles.filter(f => f.energy).length === 0 && <p className="text-xs text-gray-400 text-center p-2">No docking results available.</p>}
                        {/* Show only actual docking results (with energy) */}
                        {resultsFiles.filter(f => f.energy).map((file, index) => (
                            <div key={file.id || index} className="flex items-center justify-between p-1.5 rounded file-row text-xs hover:bg-gray-100">
                                <div className="flex items-center flex-grow overflow-hidden mr-2">
                                    <span className="w-5 text-center text-gray-500 mr-1">{index + 1}.</span> {/* Rank */}
                                    <span className="ml-1 truncate font-medium" title={file.name}>{file.name}</span>
                                </div>
                                <div className="flex items-center flex-shrink-0">
                                    <span className="text-[10px] mr-2 font-mono">{file.energy}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full mr-1 ${file.status === 'Completed' || file.status === 'Updated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {file.status}
                                    </span>
                                    {/* View Button for Results */}
                                    {file.fileObject && ( // Enable if backend provides file object for results
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 text-gray-500 hover:text-[#006F7F]"
                                            title="View Docked Pose"
                                            onClick={() => openViewer({
                                                structureId: null,
                                                file: file.fileObject,
                                                name: file.name
                                            })}
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
                  {/* Action buttons for results */}
                  <div className="flex space-x-2 pt-2 border-t mt-2">
                     <Button variant="outline" size="sm" className="flex-1 border-gray-400 text-gray-600 hover:bg-gray-100 text-xs" disabled={resultsFiles.length === 0}>
                        Download Selected {/* Needs selection logic for results */}
                    </Button>
                     <Button variant="outline" size="sm" className="flex-1 border-[#006F7F] text-[#006F7F] hover:bg-[#e6f7fc] text-xs" onClick={() => setActiveTab('pda')} disabled={resultsFiles.length === 0}>
                        Analyze (PDA)
                    </Button>
                  </div>
             </div>
           </>
        )}

         {/* --- PDA TAB SIDEBAR --- */}
         {activeTab === "pda" && (
            <>
                <div className="p-4 border-b border-gray-200">
                    <h2 className="font-medium text-gray-700">Post-Docking Analysis</h2>
                </div>
                 <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
                    <div className="space-y-3">
                        <h3 className="font-medium text-xs text-gray-600 mb-1">Analysis Options</h3>
                        <div className="space-y-1">
                            <label htmlFor="thresholdEnergy" className="text-xs font-medium text-gray-600 block">Threshold Binding Energy (kcal/mol)</label>
                            <Input
                                id="thresholdEnergy"
                                type="number"
                                step="0.1"
                                placeholder="e.g., -7.0 (optional)"
                                value={thresholdEnergy}
                                onChange={(e) => setThresholdEnergy(e.target.value)}
                                className="bg-white h-7 text-xs w-full"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 block">Sort Results By</label>
                            <Select value={sortingMethod} onValueChange={setSortingMethod}>
                                <SelectTrigger className="bg-white h-7 text-xs">
                                    <SelectValue placeholder="Select sorting method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Binding Energy" className="text-xs">Binding Energy (Lowest First)</SelectItem>
                                    <SelectItem value="Ligand Efficiency" className="text-xs">Ligand Efficiency (Not Impl.)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-gray-500">Analyzing {resultsFiles.filter(f => f.energy).length} docking result(s)...</p>
                    </div>
                 </div>
                 <div className="p-4 border-t border-gray-200 mt-auto">
                    <Button
                        className="w-full bg-[#006F7F] hover:bg-[#005a66] text-white text-sm"
                        onClick={handleAnalyze}
                        disabled={resultsFiles.filter(f => f.energy).length === 0}
                    >
                        Run Analysis
                    </Button>
                </div>
            </>
         )}
      </div> {/* End Left Sidebar */}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
              <div>{/* Left header placeholder */}</div>
              <h1 className="text-xl font-semibold text-center text-gray-800">LIGAND LOCK</h1>
              {/* Job ID Section */}
              <div className="flex items-center space-x-2">
              <Input
  placeholder="Job ID"
  value={jobId || ""} // Ensure value is always a string
  onChange={(e) => setJobId(e.target.value)}
  className="w-32 bg-white h-8 text-xs"
/>
                  <Button variant="outline" size="sm" className="border-[#006F7F] text-[#006F7F] h-8 text-xs">
                    Load Job
                  </Button>
                  
<Button size="sm" className="bg-[#006F7F] hover:bg-[#005a66] text-white h-8 text-xs" onClick={handleNewJob}>
  New Job
</Button>
             </div>
          </div>
        </header>

        {/* Main content area with tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            {/* Tabs List */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4">
              <TabsList className="h-10 bg-transparent border-b-0 p-0">
                {["protine", "ligand", "docking", "result", "pda"].map((tabValue) => (
                  <TabsTrigger
                    key={tabValue}
                    value={tabValue}
                    className="h-10 px-4 text-sm data-[state=active]:border-b-2 data-[state=active]:border-[#006F7F] data-[state=active]:text-[#006F7F] data-[state=active]:shadow-none rounded-none text-gray-600"
                  >
                    {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

             {/* Tab Content Panes */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/30">
                {/* --- PROTEIN TAB CONTENT --- */}
                <TabsContent value="protine" className="mt-0 h-full">
                     {!protineFiles.some(f => f.selected || f.isPdbId) && (
                        <div className="h-full flex items-center justify-center text-center text-gray-500">
                           <div>
                             <img src="/protein_placeholder.svg" alt="Protein Icon" className="mx-auto mb-4 h-24 w-24 opacity-50" />
                             <p>Upload a protein file or fetch by PDB ID using the left panel.</p>
                             <p className="text-sm mt-1">Select a file to view its properties or visualize it.</p>
                           </div>
                        </div>
                     )}
                     {protineFiles.find(f => f.selected || f.isPdbId) && (
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <h2 className="text-lg font-medium text-[#006F7F] mb-3">Selected Protein: {protineFiles.find(f => f.selected || f.isPdbId)?.name}</h2>
                              <p className="text-sm text-gray-600">Status: {protineFiles.find(f => f.selected || f.isPdbId)?.status}. Ready for preparation or viewing.</p>
                              <Button
                                  size="sm"
                                  className="mt-4 bg-[#006F7F] hover:bg-[#005a66]"
                                  onClick={() => {
                                     const selectedFile = protineFiles.find(f => f.selected || f.isPdbId);
                                     if (selectedFile) {
                                        openViewer({
                                            structureId: selectedFile.isPdbId ? selectedFile.id : null,
                                            file: selectedFile.fileObject,
                                            name: selectedFile.name
                                        });
                                     }
                                  }}
                               >
                                <Eye className="mr-2 h-4 w-4"/> View Structure
                               </Button>
                          </div>
                     )}
                </TabsContent>

                {/* --- LIGAND TAB CONTENT --- */}
                <TabsContent value="ligand" className="mt-0 h-full">
                    {!showResults && ligandFiles.length === 0 && (
                         <div className="h-full flex items-center justify-center text-center text-gray-500">
                           <div>
                             <img src="/ligand_placeholder.svg" alt="Ligand Icon" className="mx-auto mb-4 h-24 w-24 opacity-50" />
                             <p>Upload one or more ligand files using the left panel.</p>
                             <p className="text-sm mt-1">Select files and click "Prepare Ligand(s)".</p>
                           </div>
                        </div>
                    )}
                     {ligandFiles.length > 0 && (
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-lg font-medium text-[#006F7F] mb-3">Ligand Status</h2>
                            {isLigandPrepared ? (
                                <p className="text-sm text-green-600">Ligand(s) prepared successfully! Check Results tab or run docking.</p>
                            ) : (
                                <p className="text-sm text-gray-600">{ligandFiles.filter(f => f.selected).length} ligand(s) selected. Ready for preparation.</p>
                            )}
                           
                             {ligandFiles.find(f => f.selected && f.fileObject) && (
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => {
                                        const selectedLigand = ligandFiles.find(f => f.selected && f.fileObject);
                                        if(selectedLigand) {
                                            openViewer({ structureId: null, file: selectedLigand.fileObject, name: selectedLigand.name });
                                        }
                                    }}
                                 >
                                     <Eye className="mr-2 h-4 w-4"/> View Selected Original Ligand
                                 </Button>
                             )}
                         </div>
                     )}
                </TabsContent>

                 {/* --- DOCKING TAB CONTENT --- */}
                <TabsContent value="docking" className="mt-0 h-full">
                    <div className="h-full flex items-center justify-center text-center text-gray-500">
                       <div>
                         <img src="/docking_placeholder.svg" alt="Docking Icon" className="mx-auto mb-4 h-24 w-24 opacity-50" />
                         <p>Configure docking parameters and select inputs in the left panel.</p>
                         <p className="text-sm mt-1">Click "Run Docking" when ready.</p>
                       </div>
                    </div>
                </TabsContent>

                 {/* --- RESULT TAB CONTENT --- */}
                <TabsContent value="result" className="mt-0 h-full">
                     {!showPreparedResults && resultsFiles.filter(f => f.energy).length === 0 ? (
                         <div className="h-full flex items-center justify-center text-center text-gray-500">
                           <div>
                             <img src="/results_placeholder.svg" alt="Results Icon" className="mx-auto mb-4 h-24 w-24 opacity-50" />
                             <p>Docking results will appear here after running the job.</p>
                           </div>
                        </div>
                     ) : (
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
                            <h2 className="text-lg font-medium text-[#006F7F] mb-3">Docking Results Summary</h2>
                             <div className="flex-1 overflow-x-auto">
                                <table className="w-full text-sm text-left table-auto">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-2 w-12">Rank</th>
                                            <th scope="col" className="px-4 py-2">File Name</th>
                                            <th scope="col" className="px-4 py-2 w-40">Binding Energy (kcal/mol)</th>
                                            <th scope="col" className="px-4 py-2 w-16">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* Display only docking results */}
                                    {resultsFiles.filter(f => f.energy).map((file, index) => (
                                        <tr key={file.id || index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{file.name}</td>
                                            <td className="px-4 py-2 font-mono">{file.energy}</td>
                                            <td className="px-4 py-2 text-center">
                                                 {file.fileObject && ( // Enable viewing if fileObject provided
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0 text-gray-500 hover:text-[#006F7F]"
                                                        title="View Docked Pose"
                                                        onClick={() => openViewer({ structureId: null, file: file.fileObject, name: file.name })}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                 )}
                                                 {!file.fileObject && <span className="text-gray-400 text-xs">-</span>} {/* Placeholder if no view */}
                                            </td>
                                        </tr>
                                    ))}
                                    {resultsFiles.filter(f => f.energy).length === 0 && (
                                        <tr><td colSpan={4} className="text-center py-4 text-gray-500">No docking results generated yet.</td></tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                         </div>
                     )}
                </TabsContent>

                {/* --- PDA TAB CONTENT --- */}
                <TabsContent value="pda" className="mt-0 h-full">
                     <div className="h-full flex items-center justify-center text-center text-gray-500">
                       <div>
                         <img src="/analysis_placeholder.svg" alt="Analysis Icon" className="mx-auto mb-4 h-24 w-24 opacity-50" />
                         <p>Post-Docking Analysis results will be displayed here.</p>
                         <p className="text-sm mt-1">Configure options and click "Run Analysis" in the left panel.</p>
                       </div>
                    </div>
                </TabsContent>
            </div> {/* End Tab Content Panes */}
          </Tabs>
        </div>

      </div> {/* End Main content */}

      {/* Properties Dialog */}
      {propertiesDialogOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setPropertiesDialogOpen(false)}></div>
           <div className="relative z-10 bg-white rounded-lg shadow-lg w-[500px] max-w-md p-6">
             <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setPropertiesDialogOpen(false)}> <X className="h-5 w-5" /> </button>
              <h2 className="text-lg font-medium text-[#006F7F] mb-4">File Properties (Example)</h2>
              <p className="text-sm text-gray-600">Details about the selected file(s) could be shown or edited here.</p>
              {/* Content for properties... */}
           </div>
         </div>
       )}

      {/* *** NGL Viewer Modal *** */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"> {/* High z-index */}
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeViewer}
          ></div>

          {/* Modal Content */}
          <div className="relative z-[101] bg-white rounded-lg shadow-xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                 <h3 className="text-base font-medium text-gray-800 truncate" title={viewerData.name || viewerData.structureId}>
                     Viewing: {viewerData.name || viewerData.structureId || 'Structure'}
                 </h3>
              <button
                className="text-gray-400 hover:text-gray-700"
                onClick={closeViewer}
                title="Close Viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Viewer Area */}
            <div className="flex-1 relative bg-gray-100"> {/* NGL Container */}
              {/* *** div for NGL viewport *** */}
              <div ref={viewportRef} className="w-full h-full absolute top-0 left-0" />
            </div>
            {/* Footer with Viewer Controls */}
            <div className="p-2 border-t bg-gray-50 flex items-center justify-center space-x-2">
                 <label className="text-xs mr-1">Rep:</label>
                 <Select value={viewerRepresentation} onValueChange={setViewerRepresentation} >
                    <SelectTrigger className="h-6 text-xs w-28 bg-white">
                        <SelectValue placeholder="Representation"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cartoon" className="text-xs">Cartoon</SelectItem>
                        <SelectItem value="ball+stick" className="text-xs">Ball+Stick</SelectItem>
                        <SelectItem value="licorice" className="text-xs">Licorice</SelectItem>
                        <SelectItem value="surface" className="text-xs">Surface</SelectItem>
                        <SelectItem value="spacefill" className="text-xs">Spacefill</SelectItem>
                        <SelectItem value="line" className="text-xs">Line</SelectItem>
                    </SelectContent>
                 </Select>
                 <label className="text-xs ml-2 mr-1">Color:</label>
                 <Select value={viewerColorScheme} onValueChange={setViewerColorScheme}>
                     <SelectTrigger className="h-6 text-xs w-28 bg-white">
                        <SelectValue placeholder="Color Scheme"/>
                    </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="chainid" className="text-xs">Chain ID</SelectItem>
                        <SelectItem value="element" className="text-xs">Element</SelectItem>
                        <SelectItem value="residueindex" className="text-xs">Residue Index</SelectItem>
                        <SelectItem value="sstruc" className="text-xs">Secondary Struct</SelectItem>
                        <SelectItem value="uniform" className="text-xs">Uniform (Gray)</SelectItem>
                    </SelectContent>
                 </Select>
                 <Button size="xs" variant="outline" onClick={() => componentRef.current?.autoView()}>Reset View</Button>
                 {/* Add other controls like save image, etc. if needed */}
                 {/* <Button size="xs" variant="outline" onClick={() => stageRef.current?.makeImage({ factor: 4, antialias: true, trim: true }).then(blob => NGL.download(blob, 'snapshot.png'))}>Save Image</Button> */}
            </div>
          </div>
        </div>
      )}

    </div> 
    
    // End main container
  );
}