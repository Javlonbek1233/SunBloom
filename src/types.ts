export type PlantType = 'Rose' | 'Tulip' | 'Sunflower' | 'Lavender' | 'Lily';

export interface PlantData {
  id: string;
  type: PlantType;
  position: [number, number, number];
  scale: number;
}

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
