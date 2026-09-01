import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Edges } from '@react-three/drei';
import * as THREE from 'three';
import type { Building3DState } from '../../types/seo';

interface BuildingMeshProps {
  building: Building3DState;
  isSelected: boolean;
  onSelect: (building: Building3DState) => void;
  hide3DLabels?: boolean;
}

export const BuildingMesh: React.FC<BuildingMeshProps> = ({
  building,
  isSelected,
  onSelect,
  hide3DLabels = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const [w, h, d] = building.dimensions;
  const [posX, posY, posZ] = building.position;
  const { stage, level } = building;

  // Smooth hover scale animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.06 : isSelected ? 1.1 : 1.0;
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 12, delta);
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 12, delta);
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 12, delta);
  });

  // Calculate window rows for building & tower
  const windowRows = useMemo(() => {
    const rows = Math.max(Math.floor(h / 1.1), 2);
    const list: number[] = [];
    for (let i = 0; i < rows; i++) {
      list.push(-h / 2 + 0.7 + i * 1.0);
    }
    return list;
  }, [h]);

  const houseWallColor = '#fef3c7'; // Cream Plaster
  const houseRoofColor = '#c2410c'; // Terracotta Red
  const buildingFacadeColor = '#ffedd5'; // Warm Sandstone
  const towerGlassColor = '#ea580c'; // Warm Terracotta Glass

  return (
    <group position={[posX, posY, posZ]} ref={groupRef}>
      {/* Individual Paved Sidewalk Base Lot Plate (Trottoir de la parcelle, Y = -h/2 - 0.02) */}
      <mesh position={[0, -h / 2 - 0.02, 0]} receiveShadow>
        <boxGeometry args={[w * 1.35, 0.08, d * 1.35]} />
        <meshStandardMaterial color="#fde68a" roughness={0.8} />
      </mesh>

      {/* Sidewalk Curb Border */}
      <lineSegments position={[0, -h / 2 + 0.02, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(w * 1.35, 0.08, d * 1.35)]} />
        <lineBasicMaterial color="#d97706" linewidth={2} />
      </lineSegments>

      {/* ========================================================================= */}
      {/* LEVEL 1: CHARMING FRENCH VILLAGE VILLA / COTTAGE (< 80 Clics)             */}
      {/* ========================================================================= */}
      {stage === 'house' && (
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(building);
          }}
        >
          {/* Stone Base Foundation */}
          <mesh position={[0, -h * 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[w * 1.05, h * 0.25, d * 1.05]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>

          {/* Cream Plaster Wall Body */}
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h * 0.55, d]} />
            <meshStandardMaterial color={houseWallColor} roughness={0.4} metalness={0.1} />
            <Edges scale={1.002} color={isSelected ? '#ea580c' : '#d97706'} />
          </mesh>

          {/* Terracotta Pitched Gabled Roof */}
          <mesh position={[0, h * 0.35 + 0.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[w * 0.95, h * 0.7, 4]} />
            <meshStandardMaterial color={houseRoofColor} roughness={0.3} metalness={0.2} />
          </mesh>

          {/* Roof Dormer Window (Lucarne de toit) */}
          <mesh position={[0, h * 0.35, d * 0.35]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.4} />
          </mesh>
          <mesh position={[0, h * 0.35, d * 0.48]}>
            <boxGeometry args={[0.25, 0.25, 0.04]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.9} />
          </mesh>

          {/* Brick Chimney */}
          <mesh position={[w * 0.28, h * 0.5, -d * 0.2]} castShadow>
            <boxGeometry args={[0.25, 0.8, 0.25]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.8} />
          </mesh>

          {/* Covered Front Porch & Wooden Door */}
          <mesh position={[0, -h * 0.15, d / 2 + 0.15]} castShadow>
            <boxGeometry args={[0.6, 0.08, 0.35]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.7} />
          </mesh>
          <mesh position={[0, -h * 0.2, d / 2 + 0.02]}>
            <boxGeometry args={[0.4, 0.55, 0.04]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>

          {/* Shuttered Windows */}
          <mesh position={[-w * 0.28, 0, d / 2 + 0.02]}>
            <boxGeometry args={[0.35, 0.4, 0.04]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[w * 0.28, 0, d / 2 + 0.02]}>
            <boxGeometry args={[0.35, 0.4, 0.04]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 2: HAUSSMANNIAN / BOUTIQUE RESIDENCE (80 - 400 Clics)              */}
      {/* ========================================================================= */}
      {stage === 'building' && (
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(building);
          }}
        >
          {/* Ground Floor Storefront (Boutique / Café) */}
          <mesh position={[0, -h / 2 + 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[w * 1.05, 1.0, d * 1.05]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          {/* Storefront Glowing Display */}
          <mesh position={[0, -h / 2 + 0.5, d / 2 + 0.04]}>
            <boxGeometry args={[w * 0.8, 0.65, 0.04]} />
            <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.7} />
          </mesh>

          {/* Main Sandstone Facade Body */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h - 0.9, d]} />
            <meshStandardMaterial color={buildingFacadeColor} roughness={0.3} metalness={0.2} />
            <Edges scale={1.002} color="#ea580c" />
          </mesh>

          {/* Balconies & Framed Windows */}
          {windowRows.slice(1).map((winY, idx) => (
            <group key={idx}>
              <mesh position={[0, winY, d / 2 + 0.02]}>
                <boxGeometry args={[w * 0.7, 0.45, 0.04]} />
                <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={0.6} />
              </mesh>
              <mesh position={[0, winY - 0.2, d / 2 + 0.1]}>
                <boxGeometry args={[w * 0.8, 0.2, 0.15]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
              </mesh>
            </group>
          ))}

          {/* Zinc Mansard Roof */}
          <mesh position={[0, h / 2 + 0.35, 0]} castShadow>
            <boxGeometry args={[w * 0.9, 0.6, d * 0.9]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
          </mesh>
        </group>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 3: ART-DECO & MODERN GLASS TOWER (400 - 1500 Clics)                 */}
      {/* ========================================================================= */}
      {stage === 'tower' && (
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(building);
          }}
        >
          {/* Lobby Entrance */}
          <mesh position={[0, -h / 2 + 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[w * 1.12, 1.0, d * 1.12]} />
            <meshStandardMaterial color="#78350f" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, -h / 2 + 0.45, d / 2 + 0.08]}>
            <boxGeometry args={[w * 0.65, 0.75, 0.1]} />
            <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>

          {/* Main Glass Tower Body */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h - 1.0, d]} />
            <meshStandardMaterial
              color={towerGlassColor}
              roughness={0.15}
              metalness={0.85}
              emissive={hovered || isSelected ? '#f59e0b' : '#7c2d12'}
              emissiveIntensity={isSelected ? 0.8 : 0.25}
            />
            <Edges scale={1.002} color={isSelected ? '#ffffff' : '#f59e0b'} />
          </mesh>

          {/* Floor Bands */}
          {windowRows.map((bandY, idx) => (
            <mesh key={idx} position={[0, bandY, 0]}>
              <boxGeometry args={[w * 1.04, 0.12, d * 1.04]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} />
            </mesh>
          ))}

          {/* Roof Pinnacle */}
          <mesh position={[0, h / 2 + 0.3, 0]} castShadow>
            <boxGeometry args={[w * 0.75, 0.5, d * 0.75]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, h / 2 + 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.15, 2.0, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
        </group>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 4: HIGH-TECH GOLDEN MEGATOWER SKYSCRAPER (>= 1500 Clics)            */}
      {/* ========================================================================= */}
      {stage === 'skyscraper' && (
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(building);
          }}
        >
          {/* Base Podium */}
          <mesh position={[0, -h * 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[w * 1.25, h * 0.4, d * 1.25]} />
            <meshStandardMaterial color="#c2410c" roughness={0.2} metalness={0.85} />
            <Edges scale={1.002} color="#f59e0b" />
          </mesh>

          {/* Middle Main Tower */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h * 0.4, d]} />
            <meshStandardMaterial color="#ea580c" roughness={0.15} metalness={0.9} />
            <Edges scale={1.002} color="#f59e0b" />
          </mesh>

          {/* Upper Crown Tower */}
          <mesh position={[0, h * 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[w * 0.75, h * 0.3, d * 0.75]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.95} emissive="#f59e0b" emissiveIntensity={0.6} />
            <Edges scale={1.002} color="#ffffff" />
          </mesh>

          {/* Floor window bands */}
          {windowRows.map((bandY, idx) => (
            <mesh key={idx} position={[0, bandY, 0]}>
              <boxGeometry args={[w * 1.04, 0.12, d * 1.04]} />
              <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={0.9} />
            </mesh>
          ))}

          {/* Sky Garden Terrace */}
          <mesh position={[0, h * 0.15, 0]}>
            <boxGeometry args={[w * 1.1, 0.15, d * 1.1]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>

          {/* Helipad & Beacon Spire */}
          <mesh position={[0, h / 2 + 0.2, 0]}>
            <cylinderGeometry args={[w * 0.3, w * 0.3, 0.1, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          <mesh position={[0, h / 2 + 1.5, 0]}>
            <cylinderGeometry args={[0.06, 0.18, 2.8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={2.0} />
          </mesh>

          <pointLight position={[0, h / 2 + 3.0, 0]} intensity={2.2} color="#f59e0b" distance={12} />
        </group>
      )}

      {/* Floating Hover Label */}
      {!hide3DLabels && (hovered || isSelected) && (
        <Html
          position={[0, h / 2 + (stage === 'skyscraper' ? 3.5 : stage === 'house' ? 1.1 : 1.4), 0]}
          center
          distanceFactor={18}
          zIndexRange={[10, 0]}
          className="pointer-events-none z-10 select-none"
        >
          <div className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shadow-xl border backdrop-blur-md transition-all ${
            isSelected
              ? 'bg-amber-950/90 text-amber-100 border-amber-400 shadow-amber-500/30'
              : 'bg-white/95 text-slate-900 border-amber-200/80 shadow-orange-950/10'
          }`}>
            <div className="flex items-center gap-1.5 font-bold font-heading text-sm text-slate-900 truncate max-w-[220px]">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold">
                Niv.{level} ({stage === 'house' ? 'Maison' : stage === 'building' ? 'Immeuble' : stage === 'tower' ? 'Tour' : 'Gratte-ciel'})
              </span>
              <span className="truncate">{building.pageData.title}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-600">
              <span className="text-orange-600 font-mono font-bold">{building.pageData.currentMetrics.clicks.toLocaleString()} clics</span>
              <span>•</span>
              <span className="text-emerald-700 font-mono font-bold">Pos #{building.pageData.currentMetrics.position}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
