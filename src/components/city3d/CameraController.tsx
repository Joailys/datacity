import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  cameraPreset: 'iso' | 'top' | 'drone';
  selectedPosition?: [number, number, number] | null;
}

export const CameraController: React.FC<CameraControllerProps> = ({ cameraPreset, selectedPosition }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (cameraPreset === 'top') {
      camera.position.set(20, 60, 20);
      controlsRef.current.target.set(20, 0, 20);
    } else if (cameraPreset === 'drone') {
      camera.position.set(-15, 12, -15);
      controlsRef.current.target.set(15, 5, 15);
    } else {
      // Default Isometric
      camera.position.set(35, 35, 55);
      controlsRef.current.target.set(15, 0, 15);
    }
    controlsRef.current.update();
  }, [cameraPreset, camera]);

  useFrame((_, delta) => {
    if (selectedPosition && controlsRef.current) {
      const [tx, ty, tz] = selectedPosition;
      controlsRef.current.target.x = THREE.MathUtils.damp(controlsRef.current.target.x, tx, 5, delta);
      controlsRef.current.target.y = THREE.MathUtils.damp(controlsRef.current.target.y, ty, 5, delta);
      controlsRef.current.target.z = THREE.MathUtils.damp(controlsRef.current.target.z, tz, 5, delta);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground level
      minDistance={5}
      maxDistance={120}
    />
  );
};
