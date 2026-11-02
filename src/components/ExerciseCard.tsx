import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { getExercise } from '@/data/exercises';
import { ExerciseMedia } from './ExerciseMedia';

type Props = {
  exerciseId: string;
  bonus?: boolean;
  badge?: Badge;
};

type Badge = { label: string; tone: 'orange' | 'violet' };

const TONES = {
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
} as const;

export function ExerciseCard({ exerciseId, bonus, badge }: Props) {
  const ex = getExercise(exerciseId);
  if (!ex) return null;
  const b: Badge | null = badge ?? (bonus ? { label: '🔥 BONUS', tone: 'orange' } : null);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`How to: ${ex.name}`}
      onPress={() => router.push({ pathname: '/exercise/[id]', params: { id: ex.id } })}
      className="rounded-2xl bg-zinc-900 p-3 active:opacity-70"
    >
      <View className="flex-row items-center gap-3">
        <ExerciseMedia exerciseId={ex.id} size={88} />
        <View className="flex-1">
          {b ? (
            <View className={`mb-1 self-start rounded-full px-2 py-0.5 ${TONES[b.tone].bg}`}>
              <Text className={`text-xs font-bold ${TONES[b.tone].text}`}>{b.label}</Text>
            </View>
          ) : null}
          <Text className="text-base font-semibold text-white">
            {ex.name}
          </Text>
          <Text className="mt-0.5 text-sm text-zinc-300">
            {`${ex.sets} × ${ex.reps}`}
            <Text className="text-zinc-400">{`  ·  Rest ${ex.restSec}s`}</Text>
          </Text>
          <View className="mt-1.5 flex-row flex-wrap gap-1">
            {ex.groups.map((g) => (
              <View key={g} className="rounded-full bg-zinc-800 px-2 py-0.5">
                <Text className="text-xs capitalize text-zinc-400">{g}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text className="text-2xl text-zinc-500">›</Text>
      </View>
    </Pressable>
  );
}
