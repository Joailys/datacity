import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import type { Building3DState, DistrictGroup } from '../../types/seo';
import { BuildingMesh } from './BuildingMesh';
import { DistrictGrid } from './DistrictGrid';
import { CameraController } from './CameraController';

interface CityCanvasProps {
  buildings: Building3DState[];
  districts: DistrictGroup[];
  selectedBuilding: Building3DState | null;
  onSelectBuilding: (building: Building3DState | null) => void;
  cameraPreset: 'iso' | 'top' | 'drone';
  hide3DLabels?: boolean;
}

function WebGLFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-slate-800 p-6 text-center">
      <div className="text-4xl mb-4">🍂</div>
      <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Rendu 3D Non Supporté</h3>
      <p className="text-sm max-w-md text-slate-600">
        Votre navigateur ne prend pas en charge WebGL. Activez l'accélération matérielle pour explorer votre ville automnale 3D.
      </p>
    </div>
  );
}

export const CityCanvas: React.FC<CityCanvasProps> = ({
  buildings,
  districts,
  selectedBuilding,
  onSelectBuilding,
  cameraPreset,
  hide3DLabels = false,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200 overflow-hidden select-none">
      <Canvas
        shadows
        camera={{ position: [35, 35, 55], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            onSelectBuilding(null);
          }
        }}
      >
        {/* Bright Warm Autumn Golden Sky & Fog */}
        <color attach="background" args={['#fff7ed']} />
        <fogExp2 attach="fog" args={['#ffedd5', 0.004]} />

        {/* Golden Hour Sunlight & Warm Ambient */}
        <ambientLight intensity={0.9} color="#fff7ed" />
        <directionalLight
          position={[60, 80, 50]}
          intensity={1.9}
          color="#fbbf24"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={200}
          shadow-camera-left={-60}
          shadow-camera-right={60}
          shadow-camera-top={60}
          shadow-camera-bottom={-60}
        />
        <pointLight position={[-20, 30, -20]} intensity={0.8} color="#ea580c" />
        <pointLight position={[50, 20, 50]} intensity={0.8} color="#f59e0b" />

        {/* Global Ground Base Terrain (Y = 0.0) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[30, 0, 30]} receiveShadow>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#ffedd5" roughness={0.9} />
        </mesh>

        {/* Autumn Landscape Ground Grid (Y = 0.001) */}
        <gridHelper args={[240, 60, '#ea580c', '#fed7aa']} position={[30, 0.001, 30]} />

        {/* Soft Contact Shadows Grounding All Buildings (Y = 0.015) */}
        <ContactShadows
          position={[30, 0.015, 30]}
          opacity={0.6}
          scale={150}
          blur={2.5}
          far={10}
          color="#7c2d12"
        />

        <Suspense fallback={null}>
          {districts.map((district) => (
            <DistrictGrid key={district.id} district={district} hide3DLabels={hide3DLabels} />
          ))}

          {buildings.map((b) => (
            <BuildingMesh
              key={b.id}
              building={b}
              isSelected={selectedBuilding?.id === b.id}
              onSelect={onSelectBuilding}
              hide3DLabels={hide3DLabels}
            />
          ))}

          <CameraController
            cameraPreset={cameraPreset}
            selectedPosition={selectedBuilding ? selectedBuilding.position : null}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
