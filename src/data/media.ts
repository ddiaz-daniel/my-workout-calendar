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
  'crunch': [require('../../assets/exercises/crunch-0.jpg'), require('../../assets/exercises/crunch-1.jpg')],
  'mountain-climber': [require('../../assets/exercises/mountain-climber-0.jpg'), require('../../assets/exercises/mountain-climber-1.jpg')],
  'v-up': [require('../../assets/exercises/v-up-0.jpg'), require('../../assets/exercises/v-up-1.jpg')],
  'kb-curl': [require('../../assets/exercises/kb-curl-0.jpg')],
  'burpee': [require('../../assets/exercises/burpee-0.jpg'), require('../../assets/exercises/burpee-1.jpg')],

  // Remote (hotlinked) images: need internet on first view (cached afterwards); personal use only.
  // free-exercise-db = Unlicense; wger.de = CC-BY-SA (see wger.de for per-image authors).
  'pike-push-up': [{ uri: 'https://wger.de/media/exercise-images/454/447f3c17-405f-46e0-b138-65c2a8caaab0.png' }],
  'hollow-hold': [{ uri: 'https://wger.de/media/exercise-images/297/b10d3341-baa8-49ab-b462-5b3529389aac.png' }],
  'lying-leg-raise': [{ uri: 'https://wger.de/media/exercise-images/125/Leg-raises-1.png' }, { uri: 'https://wger.de/media/exercise-images/125/Leg-raises-2.png' }],
  'kb-russian-twist': [{ uri: 'https://wger.de/media/exercise-images/1193/70ca5d80-3847-4a8c-8882-c6e9e485e29e.png' }],
  'flutter-kick': [{ uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Scissor_Kick/0.jpg' }, { uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Scissor_Kick/1.jpg' }],
  'pilates-shoulder-bridge': [{ uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pelvic_Tilt_Into_Bridge/0.jpg' }, { uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pelvic_Tilt_Into_Bridge/1.jpg' }],
  'pilates-side-bend': [{ uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/0.jpg' }, { uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/1.jpg' }],
  // Remote images from fitness sites (fitbod.me, planfit.ai, garagegymreviews.com); personal use only.
  'bicycle-crunch': [{ uri: 'https://app-media.fitbod.me/v2/47/images/landscape/0_960x540.jpg' }, { uri: 'https://app-media.fitbod.me/v2/47/images/landscape/1_960x540.jpg' }],
  'plank-jack': [{ uri: 'https://app-media.fitbod.me/v2/456/images/landscape/0_960x540.jpg' }, { uri: 'https://app-media.fitbod.me/v2/456/images/landscape/1_960x540.jpg' }],
  'floor-dip': [{ uri: 'https://d2m0n84d5tgmh1.cloudfront.net/training-image/6023_thumbnail.png' }],
  'kb-around-the-world': [{ uri: 'https://i.garagegymreviews.com/334/349/376/7/kettlebell-around-the-world-cover.webp' }],
  'pilates-clamshell': [{ uri: 'https://d2m0n84d5tgmh1.cloudfront.net/training-image/4126_thumbnail.png' }],
  'pilates-single-leg-circle': [{ uri: 'https://d2m0n84d5tgmh1.cloudfront.net/training-image/5104_thumbnail.png' }],
  'pilates-swan': [{ uri: 'https://d2m0n84d5tgmh1.cloudfront.net/training-image/10054_thumbnail.png' }],
  'pilates-swimming': [{ uri: 'https://app-media.fitbod.me/v2/2013/images/landscape/0_960x540.jpg' }, { uri: 'https://app-media.fitbod.me/v2/2013/images/landscape/1_960x540.jpg' }],
  'pilates-leg-pull-back': [{ uri: 'https://app-media.fitbod.me/v2/754/images/landscape/0_960x540.jpg' }, { uri: 'https://app-media.fitbod.me/v2/754/images/landscape/1_960x540.jpg' }],
  'pilates-push-up': [{ uri: 'https://app-media.fitbod.me/v2/522/images/landscape/0_960x540.jpg' }, { uri: 'https://app-media.fitbod.me/v2/522/images/landscape/1_960x540.jpg' }],
};

export function getExerciseMedia(id: string): ImageSource[] | undefined {
  const frames = EXERCISE_MEDIA[id];
  return frames && frames.length > 0 ? frames : undefined;
}
