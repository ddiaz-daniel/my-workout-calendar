import { router, Stack, usePreventRemove } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ExerciseCard } from "@/components/ExerciseCard";
import { getExercise } from "@/data/exercises";
import { ABS_FINISHER, getPlan, PILATES_BY_PLAN } from "@/data/plans";
import { useWorkout } from "@/store/WorkoutContext";

function formatElapsed(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function Session() {
  const { nextPlanId, addLog } = useWorkout();
  const insets = useSafeAreaInsets();

  // Frozen on mount so adding a log doesn't change the plan mid-session.
  const [plan] = useState(() => getPlan(nextPlanId));
  const [startedAt] = useState(() => new Date());
  const [now, setNow] = useState(() => Date.now());
  const [allowLeave, setAllowLeave] = useState(false);
  const saving = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const mainIds = plan.exerciseIds;
  const pilates = PILATES_BY_PLAN[plan.id];
  const finisherIds = ABS_FINISHER.exerciseIds;
  const allEntries = [
    ...mainIds.map((id) => ({ key: `main:${id}`, id })),
    ...pilates.exerciseIds.map((id) => ({ key: `pilates:${id}`, id })),
    ...finisherIds.map((id) => ({ key: `finisher:${id}`, id })),
  ];
  const elapsedSec = Math.max(0, Math.floor((now - startedAt.getTime()) / 1000));

  // Intercepts header close, Android back, and any other removal until allowLeave is set.
  // Discard must turn prevention off before `repeat`; re-dispatching the action while
  // prevention is active just gets blocked again.
  usePreventRemove(!allowLeave, ({ repeat }) => {
    Alert.alert("Discard session?", "Your progress will not be saved.", [
      { text: "Keep going", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: () => {
          setAllowLeave(true);
          repeat();
        },
      },
    ]);
  });

  // After a save, leave once prevention is off (discard leaves via `repeat` instead).
  useEffect(() => {
    if (allowLeave && saving.current) router.back();
  }, [allowLeave]);

  const save = async () => {
    if (saving.current) return;
    saving.current = true;
    const endedAt = new Date();
    try {
      await addLog({
        id: `${Date.now()}`,
        planId: plan.id,
        startedAt: startedAt.toISOString(),
        endedAt: endedAt.toISOString(),
        durationSec: Math.max(0, Math.round((endedAt.getTime() - startedAt.getTime()) / 1000)),
        // Finishing a session means everything planned was done.
        exercises: allEntries.map((e) => {
          const sets = getExercise(e.id)?.sets ?? 0;
          return { exerciseId: e.id, setsDone: sets, setsPlanned: sets };
        }),
      });
      setAllowLeave(true);
    } catch {
      saving.current = false;
      Alert.alert("Could not save", "Please try again.");
    }
  };

  const confirmEnd = () => {
    Alert.alert(
      "End session?",
      "Did you really finish the workout?",
      [
        { text: "Not yet", style: "cancel" },
        { text: "Yes, finished", onPress: save },
      ],
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <Stack.Screen
        options={{
          title: `Plan ${plan.id} · ${plan.name}`,
          headerLeft: () => (
            <Pressable
              accessibilityLabel="Cancel session"
              hitSlop={12}
              onPress={() => router.back()}
            >
              <Text className="text-xl text-white">✕</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Text className="font-semibold text-emerald-500" style={{ fontVariant: ["tabular-nums"] }}>
              {formatElapsed(elapsedSec)}
            </Text>
          ),
        }}
      />
      <ScrollView contentContainerClassName="p-4 gap-3" contentContainerStyle={{ paddingBottom: 120 }}>
        <Text className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Main</Text>
        {mainIds.map((id) => (
          <ExerciseCard key={`main:${id}`} exerciseId={id} />
        ))}

        <Text className="mt-3 text-lg font-bold text-violet-400">{`🧘 ${pilates.name}`}</Text>
        {pilates.exerciseIds.map((id) => (
          <ExerciseCard key={`pilates:${id}`} exerciseId={id} badge={{ label: "🧘 PILATES", tone: "violet" }} />
        ))}

        <Text className="mt-3 text-lg font-bold text-orange-400">🔥 Bonus: Abs Finisher</Text>
        {finisherIds.map((id) => (
          <ExerciseCard key={`finisher:${id}`} exerciseId={id} bonus />
        ))}
      </ScrollView>

      <View
        className="absolute inset-x-0 bottom-0 border-t border-zinc-800 bg-zinc-950 px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={confirmEnd}
          className="items-center rounded-2xl bg-emerald-500 py-4 active:opacity-80"
        >
          <Text className="text-base font-bold text-zinc-950">End Session</Text>
        </Pressable>
      </View>
    </View>
  );
}
