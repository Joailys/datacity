import React from 'react';

interface AutumnTreeProps {
  position: [number, number, number];
  scale?: number;
  type?: 'orange' | 'red' | 'gold';
}

export const AutumnTree: React.FC<AutumnTreeProps> = ({ position, scale = 1.0, type = 'orange' }) => {
  const foliageColor =
    type === 'red' ? '#dc2626' : type === 'gold' ? '#eab308' : '#ea580c';

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 1.5, 6]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} />
      </mesh>

      {/* Foliage - Layer 1 */}
      <mesh position={[0, 1.8, 0]}>
        <dodecahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color={foliageColor} roughness={0.6} />
      </mesh>

      {/* Foliage - Layer 2 (Top) */}
      <mesh position={[0, 2.4, 0]}>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={foliageColor} roughness={0.5} />
      </mesh>
    </group>
  );
};
