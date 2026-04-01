import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text3D, Center } from '@react-three/drei';

// A simple generic component for an aluminum profile part
const AluminumBeam = ({ position, args, color = '#64748b' }) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={args} />
    <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
  </mesh>
);

const BalconyModel = ({ dl, dr, height = 1100, type = 'balusters' }) => {
  // Constants
  const HEIGHT = height; // Dynamic height
  const THICKNESS = 40; // Common profile thickness 40mm
  const HANDRAIL_THICKNESS = 60; // Top handrail slightly thicker
  const BALUSTER_THICKNESS = 20; // Vertical thin balusters

  const gap = 120; // Gap between balusters
  const groundOffset = 50; // Bottom rail offset from floor

  // Convert to Threejs scale. For visual clarity, let's divide all sizes by 10 so it's not a huge bounding box.
  const scale = 0.05;

  const scaledDl = dl * scale;
  const scaledDr = dr * scale;
  const h = HEIGHT * scale;
  const t = THICKNESS * scale;
  const topT = HANDRAIL_THICKNESS * scale;
  const bT = BALUSTER_THICKNESS * scale;
  const gOffset = groundOffset * scale;

  // The L shape will have its corner at X=0, Z=0.
  // DL extends along the negative Z axis (Left, when looking from outside).
  // DR extends along the positive X axis (Right, when looking from outside).

  // Balusters calculation
  const balustersL = useMemo(() => {
    const list = [];
    let curZ = -t;
    while (curZ > -scaledDl + t) {
      list.push(curZ);
      curZ -= gap * scale;
    }
    return list;
  }, [scaledDl, scale]);

  const balustersR = useMemo(() => {
    const list = [];
    let curX = t;
    while (curX < scaledDr - t) {
      list.push(curX);
      curX += gap * scale;
    }
    return list;
  }, [scaledDr, scale]);

  const getColor = (val) => {
    if (val > 350) return '#ef4444'; // Red
    if (val < 150) return '#a855f7'; // Purple
    return '#1e293b'; // Dark Black
  };

  return (
    <group position={[0, -h/2, 0]}>
      {/* Corner Post */}
      <AluminumBeam position={[0, h / 2, 0]} args={[topT, h, topT]} color="#475569" />

      {/* --- DL (Left Arm along negative Z) --- */}
      {/* Top handrail L */}
      <AluminumBeam position={[0, h, -scaledDl / 2]} args={[topT, topT/2, scaledDl]} color="#475569" />
      {/* Bottom rail L */}
      <AluminumBeam position={[0, gOffset + t/2, -scaledDl / 2]} args={[t, t, scaledDl]} color="#64748b" />
      
      {/* Vertical balusters L or Glass */}
      {type === 'glass' ? (
        <mesh position={[0, (h + gOffset) / 2, -scaledDl / 2]} castShadow receiveShadow>
          <boxGeometry args={[bT / 2, h - gOffset - topT/2, scaledDl - t]} />
          <meshPhysicalMaterial color="#94a3b8" transmission={0.9} opacity={1} transparent roughness={0.05} ior={1.5} thickness={0.5} />
        </mesh>
      ) : (
        balustersL.map((zPos, idx) => (
          <AluminumBeam 
            key={`BL-${idx}`} 
            position={[0, (h + gOffset) / 2, zPos]} 
            args={[bT, h - gOffset - topT/2, bT]} 
            color="#94a3b8" 
          />
        ))
      )}
      
      {/* End Post L */}
      <AluminumBeam position={[0, h / 2, -scaledDl]} args={[t, h, t]} color="#475569" />

      {/* --- DR (Right Arm along positive X) --- */}
      {/* Top handrail R */}
      <AluminumBeam position={[scaledDr / 2, h, 0]} args={[scaledDr, topT/2, topT]} color="#475569" />
      {/* Bottom rail R */}
      <AluminumBeam position={[scaledDr / 2, gOffset + t/2, 0]} args={[scaledDr, t, t]} color="#64748b" />
      
      {/* Vertical balusters R or Glass */}
      {type === 'glass' ? (
        <mesh position={[scaledDr / 2, (h + gOffset) / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[scaledDr - t, h - gOffset - topT/2, bT / 2]} />
          <meshPhysicalMaterial color="#94a3b8" transmission={0.9} opacity={1} transparent roughness={0.05} ior={1.5} thickness={0.5} />
        </mesh>
      ) : (
        balustersR.map((xPos, idx) => (
          <AluminumBeam 
            key={`BR-${idx}`} 
            position={[xPos, (h + gOffset) / 2, 0]} 
            args={[bT, h - gOffset - topT/2, bT]} 
            color="#94a3b8" 
          />
        ))
      )}
      
      {/* End Post R */}
      <AluminumBeam position={[scaledDr, h / 2, 0]} args={[t, h, t]} color="#475569" />

      {/* --- Dimensional Helpers (Labels) --- */}
      <group position={[0, 0.5, 0]}>
        {/* DL Label */}
        <Center position={[-4, 0, -scaledDl / 2 - 3]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
          <Text3D
            font="https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
          >
            {`DL = ${dl} mm`}
            <meshStandardMaterial color={getColor(dl)} metalness={0.2} roughness={0.5} />
          </Text3D>
        </Center>
        {/* DR Label */}
        <Center position={[scaledDr / 2 + 3, 0, 4]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text3D
            font="https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
          >
            {`DR = ${dr} mm`}
            <meshStandardMaterial color={getColor(dr)} metalness={0.2} roughness={0.5} />
          </Text3D>
        </Center>
      </group>
    </group>
  );
};

export default BalconyModel;
