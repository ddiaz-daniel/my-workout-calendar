import type { Plan, PlanId } from '@/types';

export const PLANS: Plan[] = [
  {
    id: 'A',
    name: 'Legs + Core',
    groups: ['legs', 'glutes', 'core'],
    exerciseIds: ['kb-goblet-squat', 'kb-swing', 'reverse-lunge', 'glute-bridge', 'plank', 'dead-bug'],
  },
  {
    id: 'B',
    name: 'Push + Shoulders',
    groups: ['chest', 'shoulders', 'arms'],
    exerciseIds: ['push-up', 'pike-push-up', 'kb-overhead-press', 'kb-floor-press', 'diamond-push-up'],
  },
  {
    id: 'C',
    name: 'Back + Arms',
    groups: ['back', 'arms', 'core'],
    exerciseIds: ['kb-row', 'kb-high-pull', 'superman', 'kb-curl', 'floor-dip', 'hollow-hold'],
  },
];

export const ABS_FINISHER = {
  name: 'Abs Finisher',
  exerciseIds: [
    'burpee',
    'crunch',
    'mountain-climber',
    'bicycle-crunch',
    'plank-jack',
    'kb-russian-twist',
    'flutter-kick',
    'v-up',
  ],
};

export function getPlan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) as Plan;
}

const ORDER: PlanId[] = ['A', 'B', 'C'];

export function nextPlanId(lastPlanId: PlanId | undefined): PlanId {
  if (!lastPlanId) return 'A';
  return ORDER[(ORDER.indexOf(lastPlanId) + 1) % ORDER.length];
}
