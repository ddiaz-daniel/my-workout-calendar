import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ExerciseMedia } from '@/components/ExerciseMedia';
import { getExercise } from '@/data/exercises';

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ex = id ? getExercise(id) : undefined;

  if (!ex) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950 p-6">
        <Text className="text-zinc-400">Exercise not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-zinc-950" contentContainerClassName="gap-4 p-4 pb-10">
      <View className="items-center">
        <ExerciseMedia exerciseId={ex.id} size={280} />
      </View>
      <Text className="text-2xl font-bold text-white">{ex.name}</Text>
      <Text className="text-zinc-400">{ex.summary}</Text>

      <View className="gap-1 rounded-2xl bg-zinc-900 p-4">
        <Text className="text-white">{`${ex.sets} × ${ex.reps}  ·  Rest ${ex.restSec}s`}</Text>
        <Text className="capitalize text-zinc-400">{`Equipment: ${ex.equipment}`}</Text>
        <View className="mt-2 flex-row flex-wrap gap-1">
          {ex.groups.map((g) => (
            <View key={g} className="rounded-full bg-zinc-800 px-2.5 py-1">
              <Text className="text-xs capitalize text-zinc-300">{g}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-3 rounded-2xl bg-zinc-900 p-4">
        <Text className="text-lg font-semibold text-white">Steps</Text>
        {ex.steps.map((s, i) => (
          <View key={i} className="flex-row gap-3">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
              <Text className="text-xs font-bold text-zinc-950">{i + 1}</Text>
            </View>
            <Text className="flex-1 text-zinc-300">{s}</Text>
          </View>
        ))}
      </View>

      <View className="gap-2 rounded-2xl bg-zinc-900 p-4">
        <Text className="text-lg font-semibold text-white">Tips</Text>
        {ex.tips.map((t, i) => (
          <View key={i} className="flex-row gap-2">
            <Text className="text-emerald-500">•</Text>
            <Text className="flex-1 text-zinc-300">{t}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
