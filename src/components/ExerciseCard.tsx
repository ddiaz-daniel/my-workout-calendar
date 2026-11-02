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
    <View
      className={`rounded-2xl border bg-zinc-900 p-3 border-zinc-900`}
    >
      <View className="flex-row gap-3">
        <ExerciseMedia exerciseId={ex.id} size={88} />
        <View className="flex-1">
          {b ? (
            <View className={`mb-1 self-start rounded-full px-2 py-0.5 ${TONES[b.tone].bg}`}>
              <Text className={`text-xs font-bold ${TONES[b.tone].text}`}>{b.label}</Text>
            </View>
          ) : null}
          <Text className="pr-8 text-base font-semibold text-white">
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
        <Pressable
          accessibilityLabel={`How to: ${ex.name}`}
          hitSlop={8}
          onPress={() => router.push({ pathname: '/exercise/[id]', params: { id: ex.id } })}
          className="absolute right-0 top-0 h-7 w-7 items-center justify-center rounded-full bg-zinc-800"
        >
          <Text className="font-bold text-zinc-300">?</Text>
        </Pressable>
      </View>
    </View>
  );
}
