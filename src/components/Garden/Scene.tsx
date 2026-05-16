import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, ContactShadows, Float } from '@react-three/drei';
import { Season, PlantData } from '../../types';
import { SEASON_CONFIG } from '../../constants';
import { Plant } from './Plant';
import { Butterfly } from './Butterfly';
import { Water } from './Water';

interface SceneProps {
  season: Season;
  plants: PlantData[];
  onPlacePlant: (position: [number, number, number]) => void;
}

export function GardenScene({ season, plants, onPlacePlant }: SceneProps) {
  const config = SEASON_CONFIG[season];

  return (
    <div className="w-full h-full bg-[#111]">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Sky 
            turbidity={season === 'Winter' ? 0.1 : 2} 
            rayleigh={season === 'Autumn' ? 4 : 2} 
            mieCoefficient={0.005} 
            mieDirectionalG={0.8} 
            sunPosition={[100, 20, 100]} 
          />
          <Environment preset="park" />
          
          <ambientLight intensity={config.lightIntensity * 0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={config.lightIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Ground */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            receiveShadow 
            onClick={(e) => {
              e.stopPropagation();
              onPlacePlant([e.point.x, 0, e.point.z]);
            }}
          >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color={config.groundColor} roughness={1} />
          </mesh>

          {/* Garden Fence/Edge */}
          <mesh position={[0, 0.1, -10.1]} rotation={[0, 0, 0]}>
            <boxGeometry args={[21, 0.5, 0.2]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
          <mesh position={[0, 0.1, 10.1]} rotation={[0, 0, 0]}>
            <boxGeometry args={[21, 0.5, 0.2]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
          <mesh position={[-10.1, 0.1, 0]} rotation={[0, Math.PI/2, 0]}>
            <boxGeometry args={[21, 0.5, 0.2]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
          <mesh position={[10.1, 0.1, 0]} rotation={[0, Math.PI/2, 0]}>
            <boxGeometry args={[21, 0.5, 0.2]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>

          {/* Water Area */}
          <group position={[0, 0.01, 7]}>
            <Water />
          </group>

          {/* Plants */}
          {plants.map((plant) => (
            <Plant key={plant.id} {...plant} />
          ))}

          {/* Butterflies */}
          {season !== 'Winter' && (
            <>
              <Butterfly position={[2, 2, 2]} />
              <Butterfly position={[-3, 1.5, -4]} />
              <Butterfly position={[5, 2.5, 0]} />
            </>
          )}

          <ContactShadows 
            position={[0, 0.02, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.4} 
            far={4.5} 
          />
          
          <OrbitControls 
            makeDefault 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 2.2} 
            autoRotate={season === 'Winter' ? false : true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
