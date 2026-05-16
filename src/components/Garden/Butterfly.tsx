import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Butterfly({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state) => {
    if (!meshRef.current || !leftWingRef.current || !rightWingRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Flying movement (circular / random)
    meshRef.current.position.y = position[1] + Math.sin(time + phase) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + phase) * 2;
    meshRef.current.position.z = position[2] + Math.sin(time * 0.5 + phase) * 2;
    
    // Rotation towards movement
    meshRef.current.rotation.y = time * 0.5 + phase;
    
    // Flapping wings
    const flap = Math.sin(time * 15) * 0.8;
    leftWingRef.current.rotation.z = -flap;
    rightWingRef.current.rotation.z = flap;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh ref={leftWingRef} position={[-0.1, 0, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color="#ffcc00" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      <mesh ref={rightWingRef} position={[0.1, 0, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color="#ffcc00" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
