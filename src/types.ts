export type MuscleGroup = 'legs' | 'glutes' | 'chest' | 'back' | 'shoulders' | 'arms' | 'core' | 'full';

export type Exercise = {
  id: string;
  name: string;
  groups: MuscleGroup[];
  equipment: 'kettlebell' | 'bodyweight' | 'mat';
  sets: number;
  reps: string; // "10", "12 each side", "30s"
  restSec: number;
  summary: string;
  steps: string[];
  tips: string[];
};

export type PlanId = 'A' | 'B' | 'C';

export type Plan = { id: PlanId; name: string; groups: MuscleGroup[]; exerciseIds: string[] };

export type SessionLog = {
  id: string;
  planId: PlanId;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  exercises: { exerciseId: string; setsDone: number; setsPlanned: number }[];
};
