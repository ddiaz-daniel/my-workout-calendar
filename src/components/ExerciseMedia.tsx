import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { getExercise } from '@/data/exercises';
import { getExerciseMedia } from '@/data/media';

const FRAME_MS = 700;

export function ExerciseMedia({ exerciseId, size }: { exerciseId: string; size: number }) {
  const frames = getExerciseMedia(exerciseId);
  const count = frames?.length ?? 0;
  const [frame, setFrame] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFrame(0);
    setFailed(false);
    if (count < 2) return;
    const t = setInterval(() => setFrame((f) => (f + 1) % count), FRAME_MS);
    return () => clearInterval(t);
  }, [exerciseId, count]);

  if (frames && !failed) {
    return (
      <Image
        source={frames[frame % count]}
        style={{ width: size, height: size, borderRadius: 16 }}
        contentFit="cover"
        cachePolicy="memory-disk"
        onError={() => setFailed(true)}
      />
    );
  }

  const ex = getExercise(exerciseId);
  const emoji = ex?.equipment === 'kettlebell' ? '🏋️' : ex?.equipment === 'mat' ? '🧘' : '🤸';
  return (
    <View
      className="items-center justify-center rounded-2xl bg-zinc-800"
      style={{ width: size, height: size }}
    >
      <Text style={{ fontSize: size * 0.4 }}>{emoji}</Text>
      {ex?.groups[0] ? (
        <Text className="mt-1 text-xs capitalize text-zinc-400">{ex.groups[0]}</Text>
      ) : null}
    </View>
  );
}
