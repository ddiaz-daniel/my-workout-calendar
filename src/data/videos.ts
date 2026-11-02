import { getExercise } from './exercises';

// Curated YouTube video IDs (each verified via YouTube oEmbed).
export const EXERCISE_VIDEOS: Partial<Record<string, string>> = {
  'kb-goblet-squat': 'RNCx8VIOVx0', // How to do a Goblet Squat With Kettlebell correctly (Coach Sean)
  'kb-swing': 'bDCeXbMJVNs', // How To Kettlebell Swing (in 3 minutes) (Zack Henderson)
  'reverse-lunge': 'xrPteyQLGAo', // How To Reverse Lunge (PureGym)
  'glute-bridge': 'PhTDzR0TpZs', // How to Do a Glute Bridge Exercise: A Guide from Physical Therapists (Hinge Health)
  plank: 'mH5Sfb_KTGg', // How to do a Forearm Plank | The Right Way (Well+Good)
  'dead-bug': 'GbSC02oU3To', // How to Do a Dead Bug: A Guide from Physical Therapists (Hinge Health)
  'push-up': 'IODxDxX7oi4', // The Perfect Push Up | Do it right! (Calisthenicmovement)
  'pike-push-up': 'lIZ_C4VJnmc', // How to Master the Pike Pushup (Tutorial + Progressions) (Chris Calisthenics)
  'kb-overhead-press': 'X-uFqWtjpGI', // How to do a Kettlebell Overhead Press (NASM)
  'kb-floor-press': '4ULa6AJcjr8', // The Kettlebell Floor Press (Zack Henderson)
  'diamond-push-up': 'J0DnG1_S92I', // How To: Diamond Push-Up (ScottHermanFitness)
  'kb-row': 'IyQAMOV0WAc', // How to Perform the Kettlebell Row | Important Full Body Exercise (Greg Brookes)
  'kb-high-pull': 'OkLpueSAKrY', // How to Perform the Kettlebell High Pull | Full Movement Breakdown (Greg Brookes)
  superman: 'J9zXkxUAfUA', // Core Exercise: Superman (Children's Hospital Colorado)
  'kb-curl': 'So4iApZfoDI', // Kettlebell Bicep Curl - How To (Amanda Capritto)
  'floor-dip': '1mRpK_-d_H4', // Chair Tricep Dip (Aaron Wilson)
  'hollow-hold': 'hf00_b2sRdc', // How to Perfect Your Hollow Hold | Form Check (Men's Health)
  crunch: 'MKmrqcoCZ-M', // How to Do a Stomach Crunch Properly (Howcast)
  'lying-leg-raise': 'xJJu-WiROM8', // How To Perform The Lying Leg Raise Exercise (Dimitri Giankoulas)
  'kb-russian-twist': 'PkGPokybYaU', // How To Do A KETTLEBELL RUSSIAN TWIST (Live Lean TV)
  'bicycle-crunch': 'NWzlS1Lp1e8', // How to do Bicycle Crunches Properly (TylerPath)
  'mountain-climber': 'cnyTQDSE884', // How to Do Mountain Climbers | The Right Way (Well+Good)
  burpee: 'qLBImHhCXSw', // How To Do A Burpee | The Right Way (Well+Good)
  'plank-jack': '2DnV_uCmILQ', // How To Master the Plank Jack Exercise (Mobility Doc)
  'flutter-kick': 'tPmybsDX8ZY', // How To Do Flutter Kicks (The Right Way) (Benson Specialized Fitness)
  'v-up': 'zDkDAET3GUA', // V-Ups: How to do them and how not to do them (Brent Lee Hill)
  'kb-around-the-world': 'N4mMVG8S5Kg', // Kettlebell Around the World Exercise Explained (Shane Heins, Onnit)
  'pilates-clamshell': 'Iu7KgVTLGIg', // How to Do: PILATES CLAMSHELL (Leap Fitness)
  'pilates-side-kick': '-ZIE6v31yFg', // Pilates Side Kick Series (Melissa Connolly)
  'pilates-single-leg-circle': 'j7mJfReDdwQ', // Single Leg Circles on the Mat (Online Pilates Classes)
  'pilates-shoulder-bridge': 'AGqohhQQ5_E', // How to do the shoulder bridge (UMove Fitness)
  'pilates-push-up': 'LRL39wzDf-U', // Pilates Push Up w/ Roll Down (Pilates Academy International)
  'pilates-leg-pull-front': '7WYTroG7QqU', // Pilates Guide: How to do Leg Pull Front (Tuck Pilates)
  'pilates-side-bend': 'sP7_d7Kb0l8', // Pilates Side Bend (Pilates & Fitness TV)
  'pilates-swimming': 'oBnpbzmIiMw', // How to do Pilates Swimming (Kaira Studios Pilates)
  'pilates-swan': '-JHX6yPAjXI', // Spinal Extension Swan Exercise (Pilates In The Grove)
  'pilates-single-leg-kick': 'hg4QpzNNhAA', // How to do the Pilates Single Leg Kick (PILATESBODY by Kayla)
  'pilates-leg-pull-back': 'mXJwXHG3rtc', // Leg Pull on the Mat | Pilates Reverse Plank (Pilates Encyclopedia)
};

export function hasCuratedVideo(exerciseId: string): boolean {
  return !!EXERCISE_VIDEOS[exerciseId];
}

export function getVideoUrl(exerciseId: string): string {
  const videoId = EXERCISE_VIDEOS[exerciseId];
  if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
  const name = getExercise(exerciseId)?.name ?? exerciseId;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} proper form`)}`;
}
