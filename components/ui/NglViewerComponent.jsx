// components/Viewer.jsx // Or your file path
'use client';

import { useEffect, useRef } from 'react';
import * as NGL from 'ngl';
// Removed PropTypes as they weren't used, add if desired

const NGLViewerComponent = ({ structureId, file, representation, colorScheme }) => {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const componentRef = useRef(null); // To keep track of the loaded structure component

  // Initialize Stage
  useEffect(() => {
    console.log("Viewer: Initializing Stage Effect");
    if (!stageRef.current && viewportRef.current) { // Ensure viewportRef is current too
      stageRef.current = new NGL.Stage(viewportRef.current);
      stageRef.current.setParameters({ backgroundColor: 'white' });
      console.log("Viewer: Stage Initialized");

      const handleResize = () => {
         if(stageRef.current) stageRef.current.handleResize();
      }
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial resize

      // Cleanup
      return () => {
        console.log("Viewer: Cleaning up Stage Effect");
        window.removeEventListener('resize', handleResize);
        if (stageRef.current) {
             try { stageRef.current.dispose(); } catch (e) {console.error("Error disposing stage:", e)}
             stageRef.current = null;
             componentRef.current = null; // Clear component ref on stage disposal
        }
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  // Load Structure ID
  useEffect(() => {
    if (structureId && stageRef.current) {
      console.log(`Viewer: Loading Structure ID: ${structureId}`);
      componentRef.current = null; // Clear previous component ref
      stageRef.current.removeAllComponents(); // Clear previous components visually
      stageRef.current.loadFile(`https://files.rcsb.org/download/${structureId}.pdb`).then((component) => {
        console.log("Viewer: PDB Loaded", component);
        componentRef.current = component; // Store the new component
        component.addRepresentation('cartoon');
        component.addRepresentation('base', { sele: 'nucleic' });
        component.addRepresentation('ball+stick', { sele: 'ligand' });
        component.autoView();
      }).catch((error) => {
        console.error("Viewer: Failed to load PDB structure:", error);
        alert(`Failed to load structure ${structureId}. Please check the ID or network.`);
      });
    } else if (!structureId && stageRef.current && componentRef.current) {
         // Optional: Clear stage if structureId is removed and a component exists
         // stageRef.current.removeAllComponents();
         // componentRef.current = null;
    }
  }, [structureId]); // Rerun only when structureId changes

  // Load File
  useEffect(() => {
    if (file && stageRef.current) {
      console.log(`Viewer: Loading File: ${file.name}`);
      componentRef.current = null; // Clear previous component ref
      stageRef.current.removeAllComponents(); // Clear previous components visually

      // NGL can often handle File objects directly, simplifying this
      const ext = file.name.split('.').pop()?.toLowerCase();
      stageRef.current.loadFile(file, { ext: ext }).then((component) => {
          console.log("Viewer: File Loaded", component);
          componentRef.current = component; // Store the new component
          component.addRepresentation('cartoon');
          component.addRepresentation('base', { sele: 'nucleic' });
          component.addRepresentation('ball+stick', { sele: 'ligand' });
          component.autoView();
      }).catch(error => {
          console.error("Viewer: Failed to load file structure:", error);
          alert(`Failed to load file ${file.name}. Check format/content.`);
          // Consider adding more specific error feedback
      });

      // Original FileReader approach (keep if direct File loading fails)
      /*
      const reader = new FileReader();
      reader.onload = (e) => {
        const ext = file.name.split('.').pop().toLowerCase();
        // Using Blob might be unnecessary if loadFile handles text directly, but let's keep original logic for now if needed
        // const blob = new Blob([e.target.result], { type: 'text/plain' });
        stageRef.current.loadFile(e.target.result, { ext: ext }).then((component) => { // Try passing text content directly
          console.log("Viewer: File Loaded (via FileReader)", component);
          componentRef.current = component;
          component.addRepresentation('cartoon');
          // ... add other reps ...
          component.autoView();
        }).catch(error => {
           console.error("Viewer: Failed to load file structure (via FileReader):", error);
           alert(`Failed to load file ${file.name}. Check format/content.`);
        });
      };
      reader.onerror = (e) => {
         console.error("Viewer: FileReader error:", e);
         alert(`Error reading file ${file.name}.`);
      };
      reader.readAsText(file); // Read as text
      */
    } else if (!file && stageRef.current && componentRef.current) {
         // Optional: Clear stage if file is removed and a component exists
         // stageRef.current.removeAllComponents();
         // componentRef.current = null;
    }
  }, [file]); // Rerun only when file changes

  // Update Representation
  useEffect(() => {
    if (componentRef.current && representation) {
      console.log(`Viewer: Setting Representation: ${representation}`);
      componentRef.current.removeAllRepresentations();
      componentRef.current.addRepresentation(representation);
      // Re-add defaults unless the main representation covers them
      if (representation !== 'base') componentRef.current.addRepresentation('base', { sele: 'nucleic' });
      if (representation !== 'ball+stick') componentRef.current.addRepresentation('ball+stick', { sele: 'ligand' });
      componentRef.current.autoView(); // Optional: re-center after representation change?
    }
  }, [representation]); // Rerun only when representation changes

  // Update Color Scheme
  useEffect(() => {
    if (componentRef.current && colorScheme) {
      console.log(`Viewer: Setting Color Scheme: ${colorScheme}`);
      componentRef.current.eachRepresentation((repr) => {
        try {
            repr.setColor(colorScheme);
        } catch (e) {
            console.warn(`Viewer: Could not apply color scheme "${colorScheme}" to representation`, repr.type, e);
        }
      });
    }
  }, [colorScheme]); // Rerun only when colorScheme changes

  // *** MODIFIED: Use h-full instead of h-[80vh] ***
  return <div ref={viewportRef} className="w-full h-full bg-gray-100 relative" />;
};

export default NGLViewerComponent;