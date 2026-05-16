import { motion } from 'motion/react';
import { Leaf, Sun, Wind, CloudSnow, Sparkles, Trash2, Scissors } from 'lucide-react';
import { Season, PlantType } from '../../types';

interface ControlsProps {
  currentSeason: Season;
  setSeason: (season: Season) => void;
  selectedPlant: PlantType;
  setSelectedPlant: (type: PlantType) => void;
  onClear: () => void;
  onAIDesign: () => void;
  isDesigning: boolean;
}

const seasons: { id: Season; icon: any; color: string }[] = [
  { id: 'Spring', icon: Leaf, color: 'text-green-500' },
  { id: 'Summer', icon: Sun, color: 'text-yellow-500' },
  { id: 'Autumn', icon: Wind, color: 'text-orange-500' },
  { id: 'Winter', icon: CloudSnow, color: 'text-blue-400' },
];

const plantTypes: { type: PlantType; emoji: string; colorClass: string }[] = [
  { type: 'Rose', emoji: '🌹', colorClass: 'hover:bg-pink-50 text-pink-600' },
  { type: 'Tulip', emoji: '🌷', colorClass: 'hover:bg-yellow-50 text-yellow-600' },
  { type: 'Sunflower', emoji: '🌻', colorClass: 'hover:bg-orange-50 text-orange-600' },
  { type: 'Lavender', emoji: '🌿', colorClass: 'hover:bg-purple-50 text-purple-600' },
  { type: 'Lily', emoji: '💮', colorClass: 'hover:bg-gray-50 text-slate-600' },
];

export function UIOverlay({ 
  currentSeason, 
  setSeason, 
  selectedPlant, 
  setSelectedPlant, 
  onClear, 
  onAIDesign,
  isDesigning 
}: ControlsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white/90 backdrop-blur-md z-20 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-200/50">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            SunBloom<span className="text-green-500 text-sm align-top ml-1">PRO</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 ml-10 text-sm font-semibold text-slate-500">
          <a href="#" className="text-green-600 border-b-2 border-green-600 py-5">Editor</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Assets</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Simulation</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Community</a>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={onClear}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            Reset Garden
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-full shadow-md hover:bg-slate-800 transition-all active:scale-95">
            Render Cinematic
          </button>
        </div>
      </header>

      {/* Main UI Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <aside className="w-72 flex flex-col p-4 gap-4 z-10 pointer-events-auto">
          {/* Garden Tools */}
          <div className="ui-panel rounded-2xl p-4 flex flex-col shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">Garden Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              {plantTypes.map(({ type, emoji, colorClass }) => (
                <button
                  key={type}
                  onClick={() => setSelectedPlant(type)}
                  className={`p-3 bg-white border rounded-xl flex flex-col items-center gap-1 transition-all ${
                    selectedPlant === type 
                      ? 'border-green-500 bg-green-50/50 shadow-sm' 
                      : 'border-slate-100 ' + colorClass
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg`}>
                    {emoji}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{type}</span>
                </button>
              ))}
              <button className="p-3 bg-white border border-slate-100 rounded-xl flex flex-col items-center gap-1 hover:bg-red-50 text-red-600">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                  <Scissors size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Prune</span>
              </button>
            </div>
          </div>

          {/* AI Designer Panel */}
          <div className="ui-panel rounded-2xl p-4 flex-1 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">AI Designer</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDesigning ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-indigo-100 text-indigo-600'}`}>
                {isDesigning ? 'PROCESSING' : 'READY'}
              </span>
            </div>
            
            <div className="bg-white/50 border border-indigo-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {isDesigning 
                  ? "\"I'm analyzing the landscape and soil composition to create the perfect cinematic arrangement...\""
                  : "\"Choose a theme or let me suggest a Lavender border for optimal color harmony...\""
                }
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button 
                onClick={onAIDesign}
                disabled={isDesigning}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles size={16} />
                {isDesigning ? 'GENERATING...' : 'GENERATE DESIGN'}
              </button>
            </div>
          </div>
        </aside>

        {/* Right Sidebar - Stats (Visual Only as per theme) */}
        <aside className="w-72 p-4 z-10 pointer-events-auto ml-auto">
          <div className="ui-panel rounded-3xl h-full p-6 shadow-xl flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Current Garden</h2>
            <p className="text-xs text-slate-500 mb-6">Last updated: Today</p>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/50 rounded-2xl border border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold">Flower Density</span>
                  <span className="text-xs text-green-600 font-mono">72%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/50 rounded-2xl border border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold">Soil Moisture</span>
                  <span className="text-xs text-blue-600 font-mono">45%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 mb-auto text-center p-6 bg-green-50/50 border border-dashed border-green-200 rounded-3xl">
              <div className="text-3xl mb-2">🌤️</div>
              <p className="text-sm font-bold text-green-800">Partly Sunny</p>
              <p className="text-[10px] text-green-600 uppercase font-bold tracking-tighter">Growth Rate: 1.2x</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-bold uppercase tracking-wider">Snap Photo</button>
              <button className="py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-wider">VR Mode</button>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer - Season Selection */}
      <footer className="h-24 bg-white border-t border-gray-200 px-8 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Simulation Season</span>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {seasons.map(({ id, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setSeason(id)}
                className={`px-6 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  currentSeason === id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon size={14} className={currentSeason === id ? color : ''} />
                {id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Simulation Speed</span>
            <input 
              type="range" 
              className="w-64 accent-green-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              defaultValue="50"
            />
          </div>
          
          <div className="flex gap-4 border-l border-slate-100 pl-10 items-center">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">Cinematic View</p>
              <p className="text-[10px] text-slate-500 font-medium">Persp: 35mm f/2.8</p>
            </div>
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden">
              <div className="w-6 h-6 border-2 border-red-500 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
