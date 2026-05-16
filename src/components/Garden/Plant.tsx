import { useRef } from 'react';
import { PlantType } from '../../types';
import { PLANT_COLORS } from '../../constants';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlantProps {
  type: PlantType;
  position: [number, number, number];
  scale: number;
}

export function Plant({ type, position, scale }: PlantProps) {
  const meshRef = useRef<THREE.Group>(null);
  const color = PLANT_COLORS[type] || '#ffffff';

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle sway
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time + position[0]) * 0.05;
      meshRef.current.rotation.z = Math.cos(time + position[2]) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.5]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>

      {/* Flower Head */}
      <group position={[0, 0.5, 0]}>
        {type === 'Sunflower' && (
          <>
            <mesh>
              <circleGeometry args={[0.2, 32]} />
              <meshStandardMaterial color="#ffd700" />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <circleGeometry args={[0.1, 32]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
          </>
        )}
        {(type === 'Rose' || type === 'Tulip' || type === 'Lily') && (
          <mesh>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )}
        {type === 'Lavender' && (
          <group>
            {[0, 0.1, 0.2, 0.3].map((y) => (
              <mesh key={y} position={[0, y, 0]}>
                <sphereGeometry args={[0.05, 4, 4]} />
                <meshStandardMaterial color={color} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </group>
  );
}
