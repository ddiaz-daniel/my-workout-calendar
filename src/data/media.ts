import type { ImageSource } from 'expo-image';

// Frames per exercise id: 1 entry = static image, 2+ = animated by cycling frames.
export const EXERCISE_MEDIA: Partial<Record<string, ImageSource[]>> = {};

export function getExerciseMedia(id: string): ImageSource[] | undefined {
  const frames = EXERCISE_MEDIA[id];
  return frames && frames.length > 0 ? frames : undefined;
}
