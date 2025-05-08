'use client';

import { useEffect, useRef } from 'react';
import * as NGL from 'ngl';

const Viewer = ({ structureId, file, representation, colorScheme }) => {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const componentRef = useRef(null);

  useEffect(() => {
    if (!stageRef.current) {
      stageRef.current = new NGL.Stage(viewportRef.current);
      stageRef.current.setParameters({ backgroundColor: 'white' });

      const handleResize = () => stageRef.current.handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (stageRef.current) stageRef.current.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (structureId && stageRef.current) {
      stageRef.current.removeAllComponents();
      stageRef.current.loadFile(`https://files.rcsb.org/download/${structureId}.pdb`).then((component) => {
        componentRef.current = component;
        component.addRepresentation('cartoon');
        component.addRepresentation('base', { sele: 'nucleic' });
        component.addRepresentation('ball+stick', { sele: 'ligand' });
        component.autoView();
      }).catch((error) => {
        alert('Failed to load structure. Please check the ID.');
      });
    }
  }, [structureId]);

  useEffect(() => {
    if (file && stageRef.current) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ext = file.name.split('.').pop().toLowerCase();
        stageRef.current.loadFile(new Blob([e.target.result], { type: 'text/plain' }), { ext }).then((component) => {
          componentRef.current = component;
          component.addRepresentation('cartoon');
          component.addRepresentation('base', { sele: 'nucleic' });
          component.addRepresentation('ball+stick', { sele: 'ligand' });
          component.autoView();
        });
      };
      reader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (componentRef.current && representation) {
      componentRef.current.removeAllRepresentations();
      componentRef.current.addRepresentation(representation);
      componentRef.current.addRepresentation('base', { sele: 'nucleic' });
      componentRef.current.addRepresentation('ball+stick', { sele: 'ligand' });
      componentRef.current.autoView();
    }
  }, [representation]);

  useEffect(() => {
    if (componentRef.current && colorScheme) {
      componentRef.current.eachRepresentation((repr) => {
        repr.setColor(colorScheme);
      });
    }
  }, [colorScheme]);

  return <div ref={viewportRef} className="w-full h-[80vh] bg-white relative" />;
};

export default Viewer;