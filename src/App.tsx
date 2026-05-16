/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GardenScene } from './components/Garden/Scene';
import { UIOverlay } from './components/UI/Controls';
import { Season, PlantType, PlantData } from './types';
import confetti from 'canvas-confetti';

export default function App() {
  const [season, setSeason] = useState<Season>('Spring');
  const [selectedPlant, setSelectedPlant] = useState<PlantType>('Rose');
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [isDesigning, setIsDesigning] = useState(false);

  const handlePlacePlant = useCallback((position: [number, number, number]) => {
    const newPlant: PlantData = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedPlant,
      position,
      scale: 0.5 + Math.random() * 1.0,
    };
    setPlants((prev) => [...prev, newPlant]);
  }, [selectedPlant]);

  const handleAIDesign = async () => {
    setIsDesigning(true);
    try {
      const response = await fetch('/api/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: "Create a beautiful, balanced garden with a focus on color harmony.",
          currentPlants: plants 
        }),
      });
      
      const newPlacements = await response.json();
      
      const aiPlants: PlantData[] = newPlacements.map((p: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        type: p.type,
        position: [p.x, 0, p.z],
        scale: p.scale,
      }));

      setPlants((prev) => [...prev, ...aiPlants]);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("AI Designer error:", error);
    } finally {
      setIsDesigning(false);
    }
  };

  const clearGarden = () => {
    setPlants([]);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden font-sans uppercase tracking-tight bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#dcfce7_0%,_#bbf7d0_100%)] opacity-30" />
      
      <GardenScene 
        season={season} 
        plants={plants} 
        onPlacePlant={handlePlacePlant} 
      />
      
      <UIOverlay 
        currentSeason={season}
        setSeason={setSeason}
        selectedPlant={selectedPlant}
        setSelectedPlant={setSelectedPlant}
        onClear={clearGarden}
        onAIDesign={handleAIDesign}
        isDesigning={isDesigning}
      />

      {/* Atmospheric Overlays */}
      <AnimatePresence>
        {season === 'Winter' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none bg-blue-400 mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </main>
  );
}

