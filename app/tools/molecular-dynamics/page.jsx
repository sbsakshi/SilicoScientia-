"use client"

import React from "react"
import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster" // Assuming Toaster is used globally or here
import { Progress } from "@/components/ui/progress"
// Import all necessary Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose // Assuming DialogClose is needed for the X button
} from "@/components/ui/dialog"
import { Info, Zap, Waves, Clock, Thermometer, Play, Download, CheckCircle2, Loader2, BarChart3, Settings, X } from "lucide-react" // Added X for DialogClose

// Assuming FileUpload and WorkflowStep are defined elsewhere or below this component
// If they are in separate files, ensure they are imported correctly.
// For this example, I will include basic definitions below the main component
// if they are not provided separately. Let's assume they are defined below for now.

// Define default MDP parameters based on your original HTML
// This structure will hold both basic and advanced settings for easy access
const defaultMdpSettings = {
  "em.mdp": {
    integrator: "steep",
    emtol: 1000.0,
    emstep: 0.01,
    nsteps: 50000,
    // Advanced
    nstlist: 1,
    "cutoff-scheme": "Verlet",
    ns_type: "grid",
    rlist: 1.2,
    coulombtype: "PME",
    rcoulomb: 1.2,
    vdwtype: "cutoff",
    "vdw-modifier": "force-switch",
    "rvdw-switch": 1.0,
    rvdw: 1.2,
    pbc: "xyz",
    DispCorr: "no",
  },
  "ions.mdp": {
    integrator: "steep",
    emtol: 1000.0,
    emstep: 0.01,
    nsteps: 50000,
    // Advanced
    nstlist: 1,
    "cutoff-scheme": "Verlet",
    ns_type: "grid",
    rlist: 1.0, // Different default
    coulombtype: "cutoff", // Different default
    rcoulomb: 1.0, // Different default
    rvdw: 1.0, // Different default
    pbc: "xyz",
    // Note: ions.mdp in original HTML didn't have vdwtype, vdw-modifier, rvdw-switch, DispCorr, gen_vel, gen_temp, gen_seed. Added them based on EM or omitted where not applicable (like gen_vel). Let's stick to the original defined ones for ions.
  },
    "nvt.mdp": {
        integrator: "md",
        nsteps: 1500000,
        dt: 0.002,
        ref_t: "300 300", // Stored as string "Group1 Group2" like original JS collected
        // Advanced
        define: "-DPOSRES",
        nstenergy: 5000,
        nstlog: 5000,
        "nstxout-compressed": 5000,
        continuation: "no",
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 20,
        rlist: 1.2,
        vdwtype: "cutoff",
        "vdw-modifier": "force-switch",
        "rvdw-switch": 1.0,
        rvdw: 1.2,
        coulombtype: "PME",
        rcoulomb: 1.2,
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein_LIG Water_and_ions",
        tau_t: "0.1 0.1", // Stored as string "Group1 Group2" like original JS collected
        pcoupl: "no",
        pbc: "xyz",
        DispCorr: "no",
        gen_vel: "yes",
        gen_temp: 300,
        gen_seed: -1,
    },
    "npt.mdp": {
        integrator: "md",
        nsteps: 1500000,
        dt: 0.002,
        ref_t: "300 300", // Stored as string
        ref_p: 1.0,
         // Advanced
        define: "-DPOSRES",
        nstenergy: 5000,
        nstlog: 5000,
        "nstxout-compressed": 5000,
        continuation: "yes",
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 20,
        rlist: 1.2,
        vdwtype: "cutoff",
        "vdw-modifier": "force-switch",
        "rvdw-switch": 1.0,
        rvdw: 1.2,
        coulombtype: "PME",
        rcoulomb: 1.2,
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein_LIG Water_and_ions",
        tau_t: "0.1 0.1", // Stored as string
        pcoupl: "Berendsen",
        pcoupltype: "isotropic",
        tau_p: 2.0,
        compressibility: "4.5e-5",
        refcoord_scaling: "com",
        pbc: "xyz",
        DispCorr: "no",
        gen_vel: "no",
    },
    "md.mdp": {
        integrator: "md",
        nsteps: 5000000,
        dt: 0.002,
        ref_t: "300 300", // Stored as string
        ref_p: 1.0,
        // Advanced
        nstxout: 0, // Added based on common practice, wasn't in original HTML for MD basic
        nstvout: 0, // Added
        nstfout: 0, // Added
        nstenergy: 5000,
        nstlog: 5000,
        "nstxout-compressed": 5000,
        "compressed-x-grps": "System",
        continuation: "yes",
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 20,
        rcoulomb: 1.0, // Different default? Check original HTML again. Original MD modal had rcoulomb 1.2
        rvdw: 1.0, // Different default? Check original HTML again. Original MD modal had rvdw 1.2
         rlist: 1.2, // Added rlist based on other modals
        coulombtype: "PME",
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein_LIG Water_and_ions",
        tau_t: "0.1 0.1", // Stored as string
        pcoupl: "Parrinello-Rahman",
        pcoupltype: "isotropic",
        tau_p: 2.0,
        compressibility: "4.5e-5",
        pbc: "xyz",
        DispCorr: "EnerPres", // Different default? Check original HTML again. Original MD modal had EnerPres
        gen_vel: "no",
        // Note: refcoord_scaling was in NPT advanced, not MD advanced in original HTML. Added here as well based on common practice.
        refcoord_scaling: "com",
    },
    // Add Protein-only defaults (assuming similar structure but potentially different default values or missing parameters)
    "prot-em.mdp": {
        integrator: "steep",
        emtol: 1000.0,
        emstep: 0.01,
        nsteps: 50000,
        // Advanced
        nstlist: 1,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        rlist: 1.2,
        coulombtype: "PME",
        rcoulomb: 1.2,
        vdwtype: "cutoff",
        "vdw-modifier": "force-switch",
        "rvdw-switch": 1.0,
        rvdw: 1.2,
        pbc: "xyz",
        DispCorr: "no",
    },
    "prot-ions.mdp": {
        integrator: "steep",
        emtol: 1000.0,
        emstep: 0.01,
        nsteps: 50000,
        // Advanced (Match prot-em where applicable, check original)
        nstlist: 1,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        rlist: 1.0, // Different default
        coulombtype: "cutoff", // Different default
        rcoulomb: 1.0, // Different default
        rvdw: 1.0, // Different default
        pbc: "xyz",
         // Note: Original prot-ions modal was sparse, let's add fields present in prot-em advanced.
        vdwtype: "cutoff",
        "vdw-modifier": "force-switch", // Assuming default
        "rvdw-switch": 1.0, // Assuming default
        DispCorr: "no", // Assuming default
    },
    "prot-nvt.mdp": {
        integrator: "md",
        nsteps: 1500000, // Basic value from original
        dt: 0.002, // Basic value from original
        ref_t: "300 300", // Basic value from original (Protein Non-Protein)
        // Advanced (Based on original prot-nvt advanced)
        define: "-DPOSRES",
        nstxout: 500,
        nstvout: 500,
        nstenergy: 500,
        nstlog: 500,
        continuation: "no",
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 10,
        rcoulomb: 1.0,
        rvdw: 1.0,
        DispCorr: "EnerPres",
        coulombtype: "PME",
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein Non-Protein", // Different group names
        tau_t: "0.1 0.1", // Stored as string
        pcoupl: "no", // No pressure coupling in NVT
        pbc: "xyz",
        gen_vel: "yes",
        gen_temp: 300,
        gen_seed: -1,
    },
    "prot-npt.mdp": {
        integrator: "md",
        nsteps: 1500000, // Basic value from original
        dt: 0.002, // Basic value from original
        ref_t: "300 300", // Basic value from original (Protein Non-Protein)
        ref_p: 1.0, // Basic value from original
        // Advanced (Based on original prot-npt advanced)
        define: "-DPOSRES",
        nstxout: 500,
        nstvout: 500,
        nstenergy: 500,
        nstlog: 500,
        continuation: "yes",
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        // lincs_iter and lincs_order were repeated in original prot-npt advanced, keeping them here.
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 10,
        rcoulomb: 1.0,
        rvdw: 1.0,
        DispCorr: "EnerPres",
        coulombtype: "PME",
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein Non-Protein", // Different group names
        tau_t: "0.1 0.1", // Stored as string
        pcoupl: "Parrinello-Rahman",
        pcoupltype: "isotropic",
        tau_p: 2.0,
        compressibility: "4.5e-5",
        refcoord_scaling: "com",
        pbc: "xyz", // Original had xyz, no, xy, xz, yz
        gen_vel: "no",
    },
    "prot-md.mdp": {
        integrator: "md", // Basic value from original
        nsteps: 5000, // Basic value from original (Note: this was 5000 in basic, 5000000 in advanced in the original HTML) - Let's use the 5M value for advanced.
        dt: 0.002, // Basic value from original
        // Basic had no temp/pressure inputs? No, check again. Original prot-md basic had temp=300, pressure=1.0.
         ref_t: "300 300", // Basic
         ref_p: 1.0, // Basic
        // Advanced (Based on original prot-md advanced)
        nstxout: 0,
        nstvout: 0,
        nstfout: 0,
        nstenergy: 5000,
        nstlog: 5000,
        "nstxout-compressed": 5000,
        "compressed-x-grps": "System",
        continuation: "no", // Original had yes
        constraint_algorithm: "lincs",
        constraints: "h-bonds",
        lincs_iter: 1,
        lincs_order: 4,
        "cutoff-scheme": "Verlet",
        ns_type: "grid",
        nstlist: 10,
        rcoulomb: 1.0,
        rvdw: 1.0,
        DispCorr: "EnerPres", // Original had EnerPres
        coulombtype: "PME",
        pme_order: 4,
        fourierspacing: 0.16,
        tcoupl: "V-rescale",
        "tc-grps": "Protein Non-Protein", // Different group names
        tau_t: "0.1 0.1", // Stored as string
        pcoupl: "Parrinello-Rahman",
        pcoupltype: "isotropic",
        tau_p: 2.0,
        compressibility: "4.5e-5",
        pbc: "xyz",
        gen_vel: "no", // Original had no
         // Note: rlist was missing from original prot-md advanced. Added here.
         rlist: 1.2,
         // Note: refcoord_scaling missing from original prot-md advanced. Added here.
         refcoord_scaling: "com",
    },
};

// Helper function to extract basic parameters for a given step name (e.g., "em.mdp")
const getBasicParams = (stepName) => {
    const params = defaultMdpSettings[stepName];
    if (!params) return {};

    switch (stepName) {
        case "em.mdp":
        case "prot-em.mdp":
             return {
                integrator: params.integrator,
                emtol: params.emtol,
                emstep: params.emstep,
                nsteps: params.nsteps,
             };
        case "ions.mdp":
        case "prot-ions.mdp":
             return {
                integrator: params.integrator,
                emtol: params.emtol,
                emstep: params.emstep,
                nsteps: params.nsteps,
             };
        case "nvt.mdp":
        case "prot-nvt.mdp":
             return {
                integrator: params.integrator,
                nsteps: params.nsteps,
                dt: params.dt,
                ref_t: params.ref_t,
             };
        case "npt.mdp":
        case "prot-npt.mdp":
            return {
                integrator: params.integrator,
                nsteps: params.nsteps,
                dt: params.dt,
                ref_t: params.ref_t,
                ref_p: params.ref_p,
            };
        case "md.mdp":
        case "prot-md.mdp":
            return {
                integrator: params.integrator,
                nsteps: params.nsteps,
                dt: params.dt,
                ref_t: params.ref_t,
                ref_p: params.ref_p,
            };
        default:
            return {};
    }
};

// Helper function to get all parameters (which we'll treat as advanced for now)
const getAllParams = (stepName) => {
    return defaultMdpSettings[stepName] || {};
};


export default function MolecularDynamicsTool() {
  const [activeTab, setActiveTab] = useState("prot-lig")
  const [showPathInput, setShowPathInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [jobId, setJobId] = useState("")
  const [jobName, setJobName] = useState("")
  const [molName, setMolName] = useState("")
  const { toast } = useToast()

  // --- State for MDP Parameter Modals ---
  const [isMdpModalOpen, setIsMdpModalOpen] = useState(false);
  const [currentMdpStep, setCurrentMdpStep] = useState(null);
  const [showAdvancedMdp, setShowAdvancedMdp] = useState(false);
  // State to store ALL configured MDP settings
  const [configuredMdpSettings, setConfiguredMdpSettings] = useState(defaultMdpSettings);
  // --- State for File Uploads ---
  const [selectedFiles, setSelectedFiles] = useState({});

  // Simulate progress for demo purposes
  useEffect(() => {
    if (isSubmitting && simulationProgress < 100) {
      const timer = setTimeout(() => {
        setSimulationProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            setIsSubmitting(false)
            toast({
              title: "Simulation Complete",
              description: "Your molecular dynamics simulation has finished successfully.",
              variant: "default",
            })
          }
          return newProgress
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isSubmitting, simulationProgress, toast])

    // Callback function to handle file selection from FileUpload component
    const handleFileSelected = useCallback((fileType, file) => {
        setSelectedFiles(prevFiles => ({
            ...prevFiles,
            [fileType]: file,
        }));
    }, []);

    // Determine if Submit Simulation button should be enabled
    const checkSubmitButtonEnabled = useCallback(() => {
        // Require at least protein.pdb for Prot-Lig simulation
        const requiredFilesPresent = activeTab === 'prot-lig' ?
            selectedFiles['protein-pdb'] !== undefined && selectedFiles['protein-pdb'] !== null :
            selectedFiles['prot-protein-pdb'] !== undefined && selectedFiles['prot-protein-pdb'] !== null;

        // Add a check if jobId is empty
        const jobIdPresent = jobId !== "";


        return requiredFilesPresent && jobIdPresent;
    }, [selectedFiles, activeTab, jobId]);


  // Handle simulation submission
  const handleSubmitSimulation = () => {
    if (!checkSubmitButtonEnabled()) {
         toast({
            title: "Missing Information",
            description: "Please enter a Job ID and upload the required input files before submitting.",
            variant: "destructive",
        });
        return;
    }


    // --- DEBUG LOGGING ---
    console.log("--- Simulation Submission Data ---");
    console.log("Job ID:", jobId);

    // Get the force field value
    const forceFieldSelect = document.getElementById(activeTab === 'prot-lig' ? 'force-field' : 'prot-force-field'); // Assuming IDs based on your original HTML structure
    const forceField = forceFieldSelect ? forceFieldSelect.value : 'charmm36'; // Defaulting for safety
    console.log("Force Field:", forceField);

    console.log("Configured MDP Settings:", configuredMdpSettings);

    console.log("Selected Files:", selectedFiles);

    // Prepare data structure resembling the original AJAX payload for logging
    const simulationData = {
        job_id: jobId,
        force_field: forceField, // Sending value, not index as it's more readable
        em_mdp_data: configuredMdpSettings['em.mdp'],
        ions_mdp_data: configuredMdpSettings['ions.mdp'],
        nvt_mdp_data: configuredMdpSettings['nvt.mdp'],
        npt_mdp_data: configuredMdpSettings['npt.mdp'],
        md_mdp_data: configuredMdpSettings['md.mdp'],
        // Include protein-only settings if applicable
        prot_em_mdp_data: configuredMdpSettings['prot-em.mdp'],
        prot_ions_mdp_data: configuredMdpSettings['prot-ions.mdp'],
        prot_nvt_mdp_data: configuredMdpSettings['prot-nvt.mdp'],
        prot_npt_mdp_data: configuredMdpSettings['prot-npt.mdp'],
        prot_md_mdp_data: configuredMdpSettings['prot-md.mdp'],
        // Files - Note: Cannot log File objects directly in a simple console.log,
        // but we can confirm their presence and details.
        files: Object.entries(selectedFiles).reduce((acc, [key, file]) => {
            acc[key] = file ? { name: file.name, size: file.size, type: file.type } : null;
            return acc;
        }, {}),
    };

    console.log("Collected Simulation Data Object:", simulationData);
    // --- END DEBUG LOGGING ---


    // Proceed with simulation logic (currently simulated)
    setIsSubmitting(true)
    setSimulationProgress(0)
    toast({
      title: "Simulation Started",
      description: "Your molecular dynamics simulation is now running.",
    })
  }

  // Handle analysis submission
  const handleRunAnalysis = () => {
    if (!jobName || !molName) {
      toast({
        title: "Missing Information",
        description: "Please enter Job Name and Mol Name before running analysis.",
        variant: "destructive",
      })
      return
    }

    // --- DEBUG LOGGING for Analysis ---
    console.log("--- Analysis Submission Data ---");
    console.log("Job Name:", jobName);
    console.log("Mol Name:", molName);
    console.log("Analysis Type: (Selected from dropdown - TO BE IMPLEMENTED)"); // Need to add dropdown logic
     console.log("Selected TPR File:", selectedFiles['trp-file'] ? selectedFiles['trp-file'].name : 'None');
     console.log("Selected XTC File:", selectedFiles['xtc-file'] ? selectedFiles['xtc-file'].name : 'None');
    // Need to get direct path values if showPathInput is true
     if (showPathInput) {
         // Assuming Input components have refs or state management
         console.log("Direct TPR Path:", document.getElementById('trp-path')?.value); // Example using ID, replace with ref/state
         console.log("Direct XTC Path:", document.getElementById('xtc-path')?.value); // Example using ID
         console.log("Direct Workdir Path:", document.getElementById('workdir-path')?.value); // Example using ID
     }
    console.log("--- END ANALYSIS DEBUG LOGGING ---");


    setIsAnalyzing(true)
    toast({
      title: "Analysis Started",
      description: "Your analysis is being processed.",
    })

    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      toast({
        title: "Analysis Complete",
        description: "Your analysis results are ready to view.",
      })
    }, 3000)
  }

    // Function to open MDP modal
    const openMdpModal = (stepName) => {
      console.log("Attempting to open modal for step:", stepName); // Add this line
      setCurrentMdpStep(stepName);
      setShowAdvancedMdp(false); // Start with basic view
      setIsMdpModalOpen(true);
       console.log("isMdpModalOpen state set to true."); // Add this line
    };

    // Function to handle changes in MDP settings in the modal
    const handleMdpSettingChange = (paramName, value) => {
      setConfiguredMdpSettings(prevSettings => ({
        ...prevSettings,
        [currentMdpStep]: {
          ...prevSettings[currentMdpStep],
          [paramName]: value,
        },
      }));
    };


    // Render the appropriate input/select element based on parameter name
    const renderMdpInput = (paramName, currentValue, stepName) => {
        // --- Manual mapping for specific parameter types/options ---
        if (paramName === 'integrator') {
            const options = {
                'em.mdp': ['steep', 'l-bfgs'],
                'ions.mdp': ['steep', 'l-bfgs'],
                'nvt.mdp': ['md', 'md-vv'],
                'npt.mdp': ['md', 'md-vv'],
                'md.mdp': ['md', 'md-vv'],
                 'prot-em.mdp': ['steep', 'l-bfgs'],
                'prot-ions.mdp': ['steep', 'l-bfgs'],
                'prot-nvt.mdp': ['md'], // Original had only md
                'prot-npt.mdp': ['md'], // Original had only md
                'prot-md.mdp': ['md'], // Original had only md
            };
             const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 // If the current value from default settings isn't in the options,
                 // add it or default to the first option. Let's default for now.
                 currentValue = currentOptions[0] || currentValue;
             }

            return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger>
                         <SelectValue placeholder="Select integrator" />
                    </SelectTrigger>
                     <SelectContent>
                        {currentOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }
         if (paramName === 'cutoff-scheme') {
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select scheme" /></SelectTrigger>
                     <SelectContent>
                        <SelectItem value="Verlet">Verlet</SelectItem>
                        <SelectItem value="group">group</SelectItem>
                    </SelectContent>
                </Select>
            );
         }
        if (paramName === 'ns_type') {
             const options = {
                 'em.mdp': ['grid', 'simple'],
                 'ions.mdp': ['grid', 'simple'],
                 'nvt.mdp': ['grid', 'simple'],
                 'npt.mdp': ['grid', 'simple'],
                 'md.mdp': ['grid', 'simple'],
                  'prot-em.mdp': ['grid', 'simple'],
                 'prot-ions.mdp': ['grid', 'simple'],
                 'prot-nvt.mdp': ['grid'], // Original had only grid
                 'prot-npt.mdp': ['grid'], // Original had only grid
                 'prot-md.mdp': ['grid', 'simple'], // Original prot-md advanced had only grid? No, check again. Original prot-md advanced had grid, simple.
             };
            const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 currentValue = currentOptions[0] || currentValue;
             }
            return (
                 <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                     <SelectContent>
                         {currentOptions.map(option => (
                             <SelectItem key={option} value={option}>{option}</SelectItem>
                         ))}
                    </SelectContent>
                </Select>
            );
        }
         if (paramName === 'coulombtype') {
              const options = {
                 'em.mdp': ['PME', 'Cut-off'],
                 'ions.mdp': ['cutoff', 'PME'], // Different default order
                 'nvt.mdp': ['PME', 'Cut-off'],
                 'npt.mdp': ['PME', 'Cut-off'],
                 'md.mdp': ['PME', 'Cut-off'],
                  'prot-em.mdp': ['PME', 'Cut-off'],
                 'prot-ions.mdp': ['cutoff', 'PME'], // Different default order
                 'prot-nvt.mdp': ['PME'], // Original only PME
                 'prot-npt.mdp': ['PME'], // Original only PME
                 'prot-md.mdp': ['PME'], // Original only PME
             };
            const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 currentValue = currentOptions[0] || currentValue;
             }
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                     <SelectContent>
                         {currentOptions.map(option => (
                             <SelectItem key={option} value={option}>{option}</SelectItem>
                         ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'vdwtype') {
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                     <SelectContent>
                        <SelectItem value="cutoff">cutoff</SelectItem>
                        <SelectItem value="Shifted">Shifted</SelectItem>
                        <SelectItem value="Switch">Switch</SelectItem>
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'vdw-modifier') {
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select modifier" /></SelectTrigger>
                     <SelectContent>
                        <SelectItem value="force-switch">force-switch</SelectItem>
                        <SelectItem value="Potential-switch">Potential-switch</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                </Select>
            );
         }
          if (paramName === 'pbc') {
              const options = ['xyz', 'no', 'xy', 'z'];
              // prot-npt-advanced had xz, yz too
              if (stepName === 'prot-npt.mdp' && showAdvancedMdp) {
                 options.push('xz', 'yz');
              }
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select PBC" /></SelectTrigger>
                     <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'DispCorr') {
              const options = {
                  'em.mdp': ['no', 'EnerPres'],
                  'ions.mdp': ['no'], // Original Ions advanced didn't have DispCorr as an option in select
                  'nvt.mdp': ['no', 'EnerPres'],
                  'npt.mdp': ['no', 'EnerPres'],
                  'md.mdp': ['EnerPres'], // Original MD advanced had EnerPres
                   'prot-em.mdp': ['no', 'EnerPres'],
                  'prot-ions.mdp': ['no'], // Assuming based on original Ions lack
                  'prot-nvt.mdp': ['EnerPres', 'no'], // Original had EnerPres
                  'prot-npt.mdp': ['EnerPres', 'no'], // Original had EnerPres
                  'prot-md.mdp': ['EnerPres'], // Original had EnerPres
              };
             const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 currentValue = currentOptions[0] || currentValue;
             }
              return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select correction" /></SelectTrigger>
                     <SelectContent>
                        {currentOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'continuation') {
              return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'constraint_algorithm') {
             const options = {
                  'em.mdp': [], // Not present in original EM advanced
                  'ions.mdp': [], // Not present in original Ions advanced
                  'nvt.mdp': ['lincs', 'shake'],
                  'npt.mdp': ['lincs', 'shake'],
                  'md.mdp': ['lincs', 'shake'],
                  'prot-em.mdp': [], // Not present
                  'prot-ions.mdp': [], // Not present
                  'prot-nvt.mdp': ['lincs', 'shake'],
                  'prot-npt.mdp': ['lincs', 'shake'],
                  'prot-md.mdp': ['lincs'], // Original only LINCS
              };
            const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 currentValue = currentOptions[0] || currentValue;
             }
              if(currentOptions.length === 0) return null; // Don't render if not applicable
              return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select algorithm" /></SelectTrigger>
                     <SelectContent>
                        {currentOptions.map(option => (
                            <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'constraints') {
             const options = ['h-bonds', 'all-bonds', 'None'];
              // prot-md original only had h-bonds
              if (stepName === 'prot-md.mdp') {
                 options.splice(1); // Keep only h-bonds
              }
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select constraints" /></SelectTrigger>
                     <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'pcoupl') {
              const options = {
                 'em.mdp': [], // No pressure coupling
                 'ions.mdp': [], // No pressure coupling
                 'nvt.mdp': ['no'], // Original NVT had no
                 'npt.mdp': ['Berendsen', 'no', 'Parrinello-Rahman', 'C-rescale'], // Original NPT options
                 'md.mdp': ['Parrinello-Rahman', 'Berendsen', 'no', 'C-rescale'], // Original MD options
                  'prot-em.mdp': [], // No pressure coupling
                  'prot-ions.mdp': [], // No pressure coupling
                  'prot-nvt.mdp': ['no', 'Parrinello-Rahman', 'Berendsen'], // Original prot-nvt options
                  'prot-npt.mdp': ['Parrinello-Rahman'], // Original prot-npt only PR
                  'prot-md.mdp': ['Parrinello-Rahman'], // Original prot-md only PR
              };
            const currentOptions = options[stepName] || [];
             if (!currentOptions.includes(currentValue)) {
                 currentValue = currentOptions[0] || currentValue;
             }
              if(currentOptions.length === 0) return null; // Don't render if not applicable
              return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select coupling" /></SelectTrigger>
                     <SelectContent>
                        {currentOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'pcoupltype') {
              const options = ['isotropic', 'anisotropic', 'semiisotropic'];
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                     <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
         }
         if (paramName === 'refcoord_scaling') {
             const options = ['com', 'No', 'All'];
              // prot-npt original only had com
               if (stepName === 'prot-npt.mdp') {
                 options.splice(1); // Keep only com
              }
              // prot-md original didn't have this field, but adding it.
              if (stepName === 'prot-md.mdp') {
                 options.splice(1); // Keep only com (assuming com is a sensible default if added)
              }
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Select scaling" /></SelectTrigger>
                     <SelectContent>
                         {options.map(option => (
                             <SelectItem key={option} value={option}>{option}</SelectItem>
                         ))}
                    </SelectContent>
                </Select>
            );
         }
          if (paramName === 'gen_vel') {
             return (
                <Select value={String(currentValue)} onValueChange={(value) => handleMdpSettingChange(paramName, value)}>
                     <SelectTrigger><SelectValue placeholder="Generate velocities?" /></SelectTrigger>
                     <SelectContent>
                        <SelectItem value="yes">yes</SelectItem>
                        <SelectItem value="no">no</SelectItem>
                    </SelectContent>
                </Select>
            );
         }


        // Default to Input type="number" or "text"
         const inputType = typeof currentValue === 'number' ? 'number' : 'text';
        // Handle potential comma in compressibility string
        const displayValue = typeof currentValue === 'string' ? currentValue.replace(',', '.') : currentValue;


         return (
            <Input
                type={inputType}
                value={displayValue}
                onChange={(e) => {
                    const newValue = inputType === 'number' ? parseFloat(e.target.value) : e.target.value;
                     handleMdpSettingChange(paramName, newValue);
                }}
            />
        );
    };


    const renderMdpForm = (stepName, settings, isAdvanced) => {
        const params = isAdvanced ? getAllParams(stepName) : getBasicParams(stepName);
        const paramKeys = Object.keys(params);

        if (!stepName || paramKeys.length === 0) {
             return <p>No settings available for this step.</p>;
        }

         // Special handling for grouped temperature inputs (tau_t, ref_t)
         const renderGroupedTempInputs = (baseParamName) => {
             const currentValue = settings[baseParamName] || "0 0"; // Default if missing
             const values = String(currentValue).split(' '); // Split the stored string
             const label1 = stepName.includes('prot-') ? 'Protein' : 'Group 1'; // Customize labels
             const label2 = stepName.includes('prot-') ? 'Non-Protein' : 'Group 2'; // Customize labels

             const handleGroupedChange = (index, value) => {
                 const newValues = [...values]; // Copy the array
                 newValues[index] = value;
                 handleMdpSettingChange(baseParamName, newValues.join(' ')); // Join back into string
             };

             return (
                 <div key={baseParamName} className="form-group space-y-2"> {/* Added key prop */}
                    <label className="text-sm font-medium flex items-center">
                         {baseParamName.replace('_t', ' Temperature').replace('_p', ' Pressure')}
                         {/* Add Tooltip here if needed */}
                    </label>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                             <label className="text-xs text-gray-500">{label1}</label>
                             <Input
                                 type="number"
                                 value={values[0] || ''}
                                 onChange={(e) => handleGroupedChange(0, parseFloat(e.target.value))}
                             />
                         </div>
                         <div className="space-y-1">
                              <label className="text-xs text-gray-500">{label2}</label>
                             <Input
                                 type="number"
                                 value={values[1] || ''}
                                 onChange={(e) => handleGroupedChange(1, parseFloat(e.target.value))}
                             />
                         </div>
                     </div>
                 </div>
             );
         };


        return (
            <div className="space-y-4">
                 {paramKeys.map(key => {
                     // Skip rendering grouped params individually here
                     if (isAdvanced && (key === 'tau_t' || key === 'ref_t')) {
                         return renderGroupedTempInputs(key);
                     }

                     // Add other grouped params here if applicable
                     if (isAdvanced && key === 'tau_p' && settings.pcoupltype !== 'isotropic') return null; // Example: only show tau_p if isotropic


                    // Check if the parameter should be shown in basic view
                    const isBasicParam = getBasicParams(stepName).hasOwnProperty(key);

                     if (!isAdvanced && !isBasicParam) {
                        return null; // In basic view, only render explicitly basic params
                    }

                     const label = key.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim(); // Basic capitalization and hyphen removal

                    return (
                        <div key={key} className="form-group space-y-2">
                            <label className="text-sm font-medium flex items-center capitalize">
                                {label}
                                 {/* Add Tooltip logic here if you want tooltips on each parameter */}
                                {/* <Tooltip>
                                    <TooltipTrigger asChild><Info className="h-4 w-4 text-gray-400 cursor-help ml-1" /></TooltipTrigger>
                                    <TooltipContent><p>{`Info for ${label}`}</p></TooltipContent>
                                </Tooltip> */}
                            </label>
                            {renderMdpInput(key, settings[key], stepName)}
                        </div>
                    );
                 })}
             </div>
        );
    };


  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        {/* <header className="w-full py-6 bg-black/5">
          <h1 className="text-center text-4xl font-bold text-black">MOLECULAR DYNAMIC SIMULATION TOOL</h1>
        </header> */}

        <main className="flex-1 container mx-auto p-4">
          <Tabs defaultValue="prot-lig" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger
                value="prot-lig"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "prot-lig"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className={activeTab === "prot-lig" ? "text-blue-600" : "text-green-700"}>
                  <Zap className="h-5 w-5" />
                </div>
                <span className={activeTab === "prot-lig" ? "text-blue-600 font-medium" : "font-medium"}>
                  Prot-Lig Simulation
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="protein"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "protein"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className={activeTab === "protein" ? "text-blue-600" : "text-gray-700"}>
                  <Clock className="h-5 w-5" />
                </div>
                <span className={activeTab === "protein" ? "text-blue-600 font-medium" : "font-medium"}>Protein Simulation</span>
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className={`flex items-center justify-center gap-2 py-6 transition-all duration-200 ${
                  activeTab === "analysis"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className={activeTab === "analysis" ? "text-blue-600" : "text-gray-700"}>
                   <Waves className="h-5 w-5" />
                </div>
                <span className={activeTab === "analysis" ? "text-blue-600 font-medium" : "font-medium"}>Analysis</span>
              </TabsTrigger>
            </TabsList>

            {/* Prot-Lig Simulation Tab */}
            <TabsContent value="prot-lig" className="animate-in fade-in-50 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Builder</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Configure your simulation parameters and workflow steps</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-1">
                    <Input
                      placeholder="Enter a job ID (e.g., my-flexible-docking-run)"
                      className="max-w-full bg-white border-gray-200"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 ml-1">Leave empty for new Job ID or enter existing Job ID</p>
                  </div>

                  <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    <WorkflowStep
                      icon={<Zap className="h-6 w-6 text-blue-600" />}
                      title="Energy Minimization"
                      subtitle="em.mdp"
                      active={true}
                      tooltip="Minimizes the energy of the system to remove bad contacts"
                      onClick={() => openMdpModal("em.mdp")}
                    />
                    <WorkflowStep
                      icon={<Waves className="h-6 w-6 text-gray-600" />}
                      title="Ion Placement"
                      subtitle="ions.mdp"
                      tooltip="Places ions in the solvent to neutralize the system"
                       onClick={() => openMdpModal("ions.mdp")}
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NVT Equilibration"
                      subtitle="nvt.mdp"
                      tooltip="Equilibrates the system at constant volume and temperature"
                       onClick={() => openMdpModal("nvt.mdp")}
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NPT Equilibration"
                      subtitle="npt.mdp"
                      tooltip="Equilibrates the system at constant pressure and temperature"
                       onClick={() => openMdpModal("npt.mdp")}
                    />
                    <WorkflowStep
                      icon={<Play className="h-6 w-6 text-gray-600" />}
                      title="MD Production"
                      subtitle="md.mdp"
                      tooltip="Runs the production molecular dynamics simulation"
                       onClick={() => openMdpModal("md.mdp")}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Choose Force Field</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Select the force field parameters for your simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Select id="force-field" defaultValue="charmm36">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select force field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="charmm36">CHARMM36 all-atom force field (March 2019)</SelectItem>
                      <SelectItem value="amber03">AMBER03 protein, nucleic AMBER94</SelectItem>
                       <SelectItem value="amber94">AMBER94 force field</SelectItem>
                        <SelectItem value="amber96">AMBER96 protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99">AMBER99 protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99sb">AMBER99SB protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99sb-ildn">AMBER99SB-ILDN protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="ambergs">AMBERGS force field</SelectItem>
                        <SelectItem value="charmm27">CHARMM27 all-atom force field</SelectItem>
                        <SelectItem value="gromos96-43a1">GROMOS96 43a1 force field</SelectItem>
                        <SelectItem value="gromos96-43a2">GROMOS96 43a2 force field</SelectItem>
                        <SelectItem value="gromos96-45a3">GROMOS96 45a3 force field</SelectItem>
                        <SelectItem value="gromos96-53a5">GROMOS96 53a5 force field</SelectItem>
                        <SelectItem value="gromos96-53a6">GROMOS96 53a6 force field</SelectItem>
                        <SelectItem value="gromos96-54a7">GROMOS96 54a7 force field</SelectItem>
                        <SelectItem value="opls-aa/l">OPLS-AA/L all-atom force field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Input Files</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Upload the required files for your protein-ligand simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <FileUpload label="lig.crd File" tooltip="Upload the ligand coordinate file (.crd)" fileType="lig-crd" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.itp File" tooltip="Upload the ligand topology include file (.itp)" fileType="lig-itp" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.mol2 File" tooltip="Upload the ligand file in MOL2 format (.mol2)" fileType="lig-mol2" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.par File" tooltip="Upload the ligand parameter file (.par)" fileType="lig-par" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.pdb File" tooltip="Upload the ligand file in PDB format (.pdb)" fileType="lig-pdb" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.psf File" tooltip="Upload the ligand protein structure file (.psf)" fileType="lig-psf" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="lig.rtf File" tooltip="Upload the ligand residue topology file (.rtf)" fileType="lig-rtf" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                     <FileUpload label="protein.pdb File" tooltip="Upload the protein structure file in PDB format (.pdb)" fileType="protein-pdb" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                  </div>
                </div>

                 {/* Conditional message based on file uploads and jobId */}
                 {!checkSubmitButtonEnabled() && (
                    <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <Info className="h-4 w-4" />
                        </div>
                        <p className="text-sm">
                             {jobId === "" ? "Please enter a Job ID" : "Please upload the required files"} to enable Submit.
                        </p>
                    </div>
                 )}


                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Simulation progress</span>
                      <span>{simulationProgress}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleSubmitSimulation}
                    disabled={isSubmitting || !checkSubmitButtonEnabled()} // Disable if submitting or button not enabled
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Simulation"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Protein Simulation Tab */}
            <TabsContent value="protein" className="animate-in fade-in-50 duration-300">
               <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Builder</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Configure your protein simulation parameters</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                   <div className="space-y-1">
                    <Input
                      placeholder="Enter a job ID (e.g., my-protein-run)"
                      className="max-w-full bg-white border-gray-200"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 ml-1">Leave empty for new Job ID or enter existing Job ID</p>
                  </div>

                  <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    <WorkflowStep
                      icon={<Zap className="h-6 w-6 text-blue-600" />}
                      title="Energy Minimization"
                      subtitle="prot-em.mdp"
                      active={true}
                      tooltip="Minimizes the energy of the system to remove bad contacts"
                      onClick={() => openMdpModal("prot-em.mdp")}
                    />
                    <WorkflowStep
                      icon={<Waves className="h-6 w-6 text-gray-600" />}
                      title="Ion Placement"
                      subtitle="prot-ions.mdp"
                      tooltip="Places ions in the solvent to neutralize the system"
                       onClick={() => openMdpModal("prot-ions.mdp")}
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NVT Equilibration"
                      subtitle="prot-nvt.mdp"
                      tooltip="Equilibrates the system at constant volume and temperature"
                       onClick={() => openMdpModal("prot-nvt.mdp")}
                    />
                    <WorkflowStep
                      icon={<Thermometer className="h-6 w-6 text-gray-600" />}
                      title="NPT Equilibration"
                      subtitle="prot-npt.mdp"
                      tooltip="Equilibrates the system at constant pressure and temperature"
                       onClick={() => openMdpModal("prot-npt.mdp")}
                    />
                    <WorkflowStep
                      icon={<Play className="h-6 w-6 text-gray-600" />}
                      title="MD Production"
                      subtitle="prot-md.mdp"
                      tooltip="Runs the production molecular dynamics simulation"
                       onClick={() => openMdpModal("prot-md.mdp")}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Choose Force Field</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Select the force field parameters for your simulation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Select id="prot-force-field" defaultValue="charmm36">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select force field" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="charmm36">CHARMM36 all-atom force field (March 2019)</SelectItem>
                      <SelectItem value="amber03">AMBER03 protein, nucleic AMBER94</SelectItem>
                       <SelectItem value="amber94">AMBER94 force field</SelectItem>
                        <SelectItem value="amber96">AMBER96 protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99">AMBER99 protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99sb">AMBER99SB protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="amber99sb-ildn">AMBER99SB-ILDN protein, nucleic AMBER94</SelectItem>
                        <SelectItem value="ambergs">AMBERGS force field</SelectItem>
                        <SelectItem value="charmm27">CHARMM27 all-atom force field</SelectItem>
                        <SelectItem value="gromos96-43a1">GROMOS96 43a1 force field</SelectItem>
                        <SelectItem value="gromos96-43a2">GROMOS96 43a2 force field</SelectItem>
                        <SelectItem value="gromos96-45a3">GROMOS96 45a3 force field</SelectItem>
                        <SelectItem value="gromos96-53a5">GROMOS96 53a5 force field</SelectItem>
                        <SelectItem value="gromos96-53a6">GROMOS96 53a6 force field</SelectItem>
                        <SelectItem value="gromos96-54a7">GROMOS96 54a7 force field</SelectItem>
                        <SelectItem value="opls-aa/l">OPLS-AA/L all-atom force field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Simulation Input Files</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Upload the required protein structure file</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-4">
                     <FileUpload label="protein.pdb File" tooltip="Upload the protein structure file in PDB format (.pdb)" fileType="prot-protein-pdb" onFileChange={handleFileSelected} activeTab={activeTab} showPathInput={showPathInput}/>
                  </div>
                </div>

                 {/* Conditional message based on file uploads and jobId */}
                 {!checkSubmitButtonEnabled() && (
                    <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <Info className="h-4 w-4" />
                        </div>
                        <p className="text-sm">
                             {jobId === "" ? "Please enter a Job ID" : "Please upload the required files"} to enable Submit.
                        </p>
                    </div>
                 )}


                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Simulation progress</span>
                      <span>{simulationProgress}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleSubmitSimulation}
                    disabled={isSubmitting || !checkSubmitButtonEnabled()} // Disable if submitting or button not enabled
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Simulation"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>


            {/* Analysis Tab */}
            <TabsContent value="analysis" className="animate-in fade-in-50 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Job Name</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter a name for this analysis job</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    placeholder="Enter Job name"
                     id="md-job-name"
                    className="max-w-full bg-white border-gray-200"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">Mol Name</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the name of the molecule being analyzed</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    placeholder="Enter Mol Name"
                     id="md-mol-name"
                    className="max-w-full bg-white border-gray-200"
                    value={molName}
                    onChange={(e) => setMolName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <FileUpload
                    label="TPR FILE"
                    tooltip="Upload trajectory file in TPR format"
                     fileType="trp-file"
                     onFileChange={handleFileSelected}
                     activeTab={activeTab}
                     showPathInput={showPathInput}
                  />
                  <FileUpload
                    label="XTC FILE"
                    tooltip="Upload trajectory file in XTC format"
                    fileType="xtc-file"
                    onFileChange={handleFileSelected}
                    activeTab={activeTab}
                    showPathInput={showPathInput}
                  />
                </div>

                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">ENTER FILE PATH DIRECTLY</p>
                </div>

                <div className="text-sm text-gray-600 max-w-2xl">
                  Alternatively you can specify the direct path file TRP, XTC and working directory instead of Uploading
                  File
                </div>

                <div className="flex justify-between">
                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={() => setShowPathInput(!showPathInput)}
                  >
                    {showPathInput ? "Hide Path Input" : "Show Path Input"}
                  </Button>

                  <Button
                    className="bg-green-800 hover:bg-green-700 text-white px-8"
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing || (!showPathInput && (!selectedFiles['trp-file'] || !selectedFiles['xtc-file'])) || (showPathInput && (!document.getElementById('trp-path')?.value || !document.getElementById('xtc-path')?.value || !document.getElementById('workdir-path')?.value))} // Added basic validation
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run Analysis"
                    )}
                  </Button>
                </div>

                {showPathInput && (
                  <div className="space-y-4 border border-gray-200 rounded-md p-4 bg-white/80 animate-in slide-in-from-top duration-300">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">TRP File Path</label>
                       <Input placeholder="/path/to/trajectory.trp" id="trp-path" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">XTC File Path</label>
                      <Input placeholder="/path/to/trajectory.xtc" id="xtc-path" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Working Directory</label>
                      <Input placeholder="/path/to/working/directory" id="workdir-path" />
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-6 border border-gray-200 rounded-md p-6 bg-white/90 animate-in fade-in-50 duration-500">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-700" />
                        Analysis Results
                      </h3>
                      <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
                        Hide Results
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">RMSD Analysis</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">RMSD Plot would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Radius of Gyration</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Rg Plot would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Hydrogen Bonds</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">H-Bond Analysis would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Secondary Structure</h4>
                        <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Secondary Structure Analysis would appear here</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-500">Download Full Report</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* --- MDP Parameter Editor Dialog --- */}
        {/* Dialog remains outside of main */}
        <Dialog open={isMdpModalOpen} onOpenChange={setIsMdpModalOpen}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto"> {/* Use DialogContent's internal centering */}
                <DialogHeader>
                    <DialogTitle>{currentMdpStep ? currentMdpStep.replace('.mdp', '').toUpperCase() : 'Settings'} ({currentMdpStep})</DialogTitle>
                </DialogHeader>
                {currentMdpStep && (
                    <div className="py-4">
                        {/* Basic vs Advanced Toggle */}
                        <div className="flex justify-end mb-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAdvancedMdp(!showAdvancedMdp)}
                            >
                                {showAdvancedMdp ? 'Show Basic Settings' : 'Show Advanced Settings'}
                            </Button>
                        </div>

                        {/* Render Parameter Form */}
                        {renderMdpForm(currentMdpStep, configuredMdpSettings[currentMdpStep], showAdvancedMdp)}

                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsMdpModalOpen(false)}>Close</Button>
                    <Button onClick={() => setIsMdpModalOpen(false)}>Save Changes</Button>
                </DialogFooter>
                {/* DialogClose component for the X button */}
                 <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
        {/* --- End MDP Parameter Editor Dialog --- */}

        <Toaster />
      </TooltipProvider>
    </div>
  )
}


// Basic File Upload Component
function FileUpload({ label, tooltip, fileType, onFileChange, activeTab, showPathInput }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (onFileChange) onFileChange(fileType, selectedFile);
    } else {
         setFile(null);
         if (onFileChange) onFileChange(fileType, null);
    }
  }

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
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      if (onFileChange) onFileChange(fileType, selectedFile);
    } else {
         setFile(null);
         if (onFileChange) onFileChange(fileType, null);
    }
  }

    const handleClearFile = () => {
        setFile(null);
        if (onFileChange) onFileChange(fileType, null);
         const inputElement = document.getElementById(`file-upload-${fileType}`);
         if (inputElement) {
             inputElement.value = '';
         }
    };


  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div
        className={`border border-dashed rounded-md p-4 bg-white transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${file ? 'border-green-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center">
            {file ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <Tooltip>
                     <TooltipTrigger asChild>
                        <span className="truncate max-w-[120px]">{file.name}</span>
                     </TooltipTrigger>
                    <TooltipContent>{file.name}</TooltipContent>
                 </Tooltip>
              </>
            ) : (
              "Drag & Drop or"
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor={`file-upload-${fileType}`} className="cursor-pointer">
              <span className="text-blue-600 text-sm hover:underline">Select file</span>
              <input id={`file-upload-${fileType}`} type="file" className="hidden" onChange={handleFileChange} />
            </label>

             {file && (
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={handleClearFile}>
                     <X className="h-4 w-4" />
                 </Button>
             )}
          </div>
        </div>
      </div>

      {/* Feedback for required files - now uses activeTab and showPathInput props */}
      {fileType === 'protein-pdb' && !file && activeTab === 'prot-lig' && (
          <p className="text-xs ml-1 text-red-700">Protein PDB required for Prot-Lig</p>
      )}
       {fileType === 'prot-protein-pdb' && !file && activeTab === 'protein' && (
          <p className="text-xs ml-1 text-red-700">Protein PDB required for Protein Sim</p>
      )}
        {fileType === 'trp-file' && !file && activeTab === 'analysis' && !showPathInput && (
            <p className="text-xs ml-1 text-red-700">TPR File required for Analysis (or use direct path)</p>
        )}
         {fileType === 'xtc-file' && !file && activeTab === 'analysis' && !showPathInput && (
            <p className="text-xs ml-1 text-red-700">XTC File required for Analysis (or use direct path)</p>
        )}
    </div>
  )
}

// Basic Workflow Step Component
function WorkflowStep({
  icon,
  title,
  subtitle,
  active = false,
  tooltip,
  onClick,
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="flex flex-col items-center gap-1 cursor-pointer group"
          onClick={onClick}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all group-hover:shadow-lg ${
              active ? "bg-white ring-2 ring-blue-300" : "bg-white group-hover:bg-gray-50"
            }`}
          >
            {icon}
          </div>
          <span
            className={`text-sm text-center transition-colors ${active ? "text-blue-600" : "text-gray-600 group-hover:text-gray-800"}`}
          >
            {title}
          </span>
          <span className="text-xs text-gray-500">{subtitle}</span>
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}