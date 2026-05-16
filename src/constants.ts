import { Season } from './types';

export const SEASON_CONFIG: Record<Season, {
  skyColor: string;
  groundColor: string;
  lightIntensity: number;
  bloomIntensity: number;
}> = {
  Spring: {
    skyColor: '#a0e7ff',
    groundColor: '#7cfc00',
    lightIntensity: 1.2,
    bloomIntensity: 1.5,
  },
  Summer: {
    skyColor: '#87ceeb',
    groundColor: '#4caf50',
    lightIntensity: 1.5,
    bloomIntensity: 2.0,
  },
  Autumn: {
    skyColor: '#ffcc99',
    groundColor: '#8b4513',
    lightIntensity: 1.0,
    bloomIntensity: 1.2,
  },
  Winter: {
    skyColor: '#e0f7fa',
    groundColor: '#ffffff',
    lightIntensity: 0.8,
    bloomIntensity: 0.5,
  },
};

export const PLANT_COLORS: Record<string, string> = {
  Rose: '#ff007f',
  Tulip: '#ffdb58',
  Sunflower: '#ffd700',
  Lavender: '#e6e6fa',
  Lily: '#ffffff',
};
