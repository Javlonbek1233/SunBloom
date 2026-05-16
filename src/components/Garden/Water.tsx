import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Water({ position = [0, -0.1, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 10]} />
      <meshStandardMaterial 
        color="#00bcd4" 
        transparent 
        opacity={0.6} 
        roughness={0} 
        metalness={0.8}
      />
    </mesh>
  );
}
