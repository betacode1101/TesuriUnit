import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import BalconyModel from './BalconyModel';

const Scene = ({ dl, dr, height, type }) => {
  const controlsRef = useRef();

  useEffect(() => {
    const handleReset = () => {
      controlsRef.current?.reset();
    };
    window.addEventListener('reset-camera', handleReset);
    return () => window.removeEventListener('reset-camera', handleReset);
  }, []);

  return (
    <Canvas camera={{ position: [-70, 75, 70], fov: 32 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment for shiny reflections */}
      <Environment preset="city" />

      {/* The parametric 3D model */}
      <BalconyModel dl={dl} dr={dr} height={height} type={type} />

      {/* Ground plane with subtle grid */}
      <Grid 
        position={[0, -28.5, 0]} 
        infiniteGrid 
        fadeDistance={100} 
        cellColor="#3b82f6" 
        sectionColor="#1e293b" 
        cellThickness={0.5}
      />
      
      {/* Soft shadow on the ground */}
      <ContactShadows position={[0, -28.4, 0]} opacity={0.6} scale={150} blur={2} far={30} />

      {/* User interaction controls */}
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2 + 0.1} 
        panSpeed={1.5}
        rotateSpeed={1}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.PAN
        }}
      />
    </Canvas>
  );
};

export default Scene;
