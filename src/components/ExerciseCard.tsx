import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { getExercise } from '@/data/exercises';
import { ExerciseMedia } from './ExerciseMedia';

type Props = {
  exerciseId: string;
  setsDone: number;
  onToggleSet(index: number): void;
  bonus?: boolean;
};

export function ExerciseCard({ exerciseId, setsDone, onToggleSet, bonus }: Props) {
  const ex = getExercise(exerciseId);
  if (!ex) return null;
  const done = setsDone >= ex.sets;

  return (
    <View
      className={`rounded-2xl border bg-zinc-900 p-3 ${done ? 'border-emerald-500' : 'border-zinc-900'}`}
    >
      <View className="flex-row gap-3">
        <ExerciseMedia exerciseId={ex.id} size={88} />
        <View className="flex-1">
          {bonus ? (
            <View className="mb-1 self-start rounded-full bg-orange-500/20 px-2 py-0.5">
              <Text className="text-xs font-bold text-orange-400">🔥 BONUS</Text>
            </View>
          ) : null}
          <Text className="pr-8 text-base font-semibold text-white">
            {done ? '✓ ' : ''}
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
      <View className="mt-3 flex-row gap-2">
        {Array.from({ length: ex.sets }, (_, i) => (
          <Pressable
            key={i}
            accessibilityLabel={`Set ${i + 1}`}
            onPress={() => onToggleSet(i)}
            className={`h-10 w-10 items-center justify-center rounded-full border-2 ${
              i < setsDone ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-700'
            }`}
          >
            <Text className={`font-semibold ${i < setsDone ? 'text-zinc-950' : 'text-zinc-500'}`}>
              {i + 1}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
