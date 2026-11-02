import type { ImageSource } from 'expo-image';

// Frames per exercise id: 1 entry = static image, 2+ = animated by cycling frames.
// Demo images: free-exercise-db (https://github.com/yuhonas/free-exercise-db), Unlicense / public domain.
// Some images are from Wikimedia Commons under CC BY / CC BY-SA; see assets/exercises/CREDITS.md.
export const EXERCISE_MEDIA: Partial<Record<string, ImageSource[]>> = {
  'kb-goblet-squat': [require('../../assets/exercises/kb-goblet-squat-0.jpg'), require('../../assets/exercises/kb-goblet-squat-1.jpg')],
  'kb-swing': [require('../../assets/exercises/kb-swing-0.jpg'), require('../../assets/exercises/kb-swing-1.jpg')],
  'reverse-lunge': [require('../../assets/exercises/reverse-lunge-0.jpg'), require('../../assets/exercises/reverse-lunge-1.jpg')],
  'glute-bridge': [require('../../assets/exercises/glute-bridge-0.jpg'), require('../../assets/exercises/glute-bridge-1.jpg')],
  'plank': [require('../../assets/exercises/plank-0.jpg'), require('../../assets/exercises/plank-1.jpg')],
  'dead-bug': [require('../../assets/exercises/dead-bug-0.jpg'), require('../../assets/exercises/dead-bug-1.jpg')],
  'push-up': [require('../../assets/exercises/push-up-0.jpg'), require('../../assets/exercises/push-up-1.jpg')],
  'kb-overhead-press': [require('../../assets/exercises/kb-overhead-press-0.jpg'), require('../../assets/exercises/kb-overhead-press-1.jpg')],
  'kb-floor-press': [require('../../assets/exercises/kb-floor-press-0.jpg'), require('../../assets/exercises/kb-floor-press-1.jpg')],
  'diamond-push-up': [require('../../assets/exercises/diamond-push-up-0.jpg'), require('../../assets/exercises/diamond-push-up-1.jpg')],
  'kb-row': [require('../../assets/exercises/kb-row-0.jpg'), require('../../assets/exercises/kb-row-1.jpg')],
  'kb-high-pull': [require('../../assets/exercises/kb-high-pull-0.jpg'), require('../../assets/exercises/kb-high-pull-1.jpg')],
  'superman': [require('../../assets/exercises/superman-0.jpg'), require('../../assets/exercises/superman-1.jpg')],
  'floor-dip': [require('../../assets/exercises/floor-dip-0.jpg'), require('../../assets/exercises/floor-dip-1.jpg')],
  'crunch': [require('../../assets/exercises/crunch-0.jpg'), require('../../assets/exercises/crunch-1.jpg')],
  'lying-leg-raise': [require('../../assets/exercises/lying-leg-raise-0.jpg'), require('../../assets/exercises/lying-leg-raise-1.jpg')],
  'kb-russian-twist': [require('../../assets/exercises/kb-russian-twist-0.jpg'), require('../../assets/exercises/kb-russian-twist-1.jpg')],
  'mountain-climber': [require('../../assets/exercises/mountain-climber-0.jpg'), require('../../assets/exercises/mountain-climber-1.jpg')],
  'flutter-kick': [require('../../assets/exercises/flutter-kick-0.jpg'), require('../../assets/exercises/flutter-kick-1.jpg')],
  'v-up': [require('../../assets/exercises/v-up-0.jpg'), require('../../assets/exercises/v-up-1.jpg')],
  'kb-curl': [require('../../assets/exercises/kb-curl-0.jpg')],
  'burpee': [require('../../assets/exercises/burpee-0.jpg'), require('../../assets/exercises/burpee-1.jpg')],
  'bicycle-crunch': [require('../../assets/exercises/bicycle-crunch-0.jpg')],
};

export function getExerciseMedia(id: string): ImageSource[] | undefined {
  const frames = EXERCISE_MEDIA[id];
  return frames && frames.length > 0 ? frames : undefined;
}
