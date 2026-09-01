import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { DistrictGroup } from '../../types/seo';
import { AutumnTree } from './AutumnTree';

interface DistrictGridProps {
  district: DistrictGroup;
  hide3DLabels?: boolean;
}

export const DistrictGrid: React.FC<DistrictGridProps> = ({ district, hide3DLabels = false }) => {
  const [centerX, centerZ] = district.gridOffset;
  const count = district.pages.length;
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  // Exact tight dimensions based on building grid
  const width = Math.max(cols * 5.0 + 3.5, 9.0);
  const depth = Math.max(rows * 5.0 + 3.5, 9.0);

  // Perimeter trees
  const trees = useMemo(() => {
    const list: { pos: [number, number, number]; type: 'orange' | 'red' | 'gold'; scale: number }[] = [];

    // Place trees at the 4 corners of the district block
    const hw = width / 2 - 0.8;
    const hd = depth / 2 - 0.8;
    list.push({ pos: [-hw, 0.02, -hd], type: 'red', scale: 0.85 });
    list.push({ pos: [hw, 0.02, -hd], type: 'orange', scale: 0.9 });
    list.push({ pos: [-hw, 0.02, hd], type: 'gold', scale: 0.8 });
    list.push({ pos: [hw, 0.02, hd], type: 'orange', scale: 0.85 });

    // Additional side trees if block is large
    if (width > 11) {
      list.push({ pos: [0, 0.02, -hd], type: 'orange', scale: 0.8 });
      list.push({ pos: [0, 0.02, hd], type: 'red', scale: 0.85 });
    }

    return list;
  }, [width, depth]);

  return (
    <group position={[centerX, 0, centerZ]}>
      {/* Ground Paved Plate for District (Y = 0.02, strictly above Y=0 to avoid Z-fighting) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color="#ffedd5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* District Boundary Curb / Frame (Y = 0.025) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[width / 2 - 0.15, width / 2, 4]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      {/* District Boundary Neon Line (Y = 0.03) */}
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, depth)]} />
        <lineBasicMaterial color="#ea580c" linewidth={2} />
      </lineSegments>

      {/* Perimeter Autumn Trees */}
      {trees.map((t, idx) => (
        <AutumnTree key={idx} position={t.pos} scale={t.scale} type={t.type} />
      ))}

      {/* District Badge Title */}
      {!hide3DLabels && (
        <Html
          position={[-width / 2 + 0.5, 0.6, -depth / 2]}
          center={false}
          zIndexRange={[5, 0]}
          className="pointer-events-none select-none z-0"
        >
          <div className="px-3 py-1.5 rounded-xl bg-white/95 border border-amber-300 text-xs font-bold font-heading uppercase tracking-wider text-slate-800 shadow-md flex items-center gap-2 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm" />
            {district.name}
            <span className="text-[10px] text-amber-800 font-mono font-bold">({district.pages.length})</span>
          </div>
        </Html>
      )}
    </group>
  );
};
