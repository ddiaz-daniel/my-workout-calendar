import { router, Stack, usePreventRemove } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ExerciseCard } from "@/components/ExerciseCard";
import { getExercise } from "@/data/exercises";
import { ABS_FINISHER, getPlan } from "@/data/plans";
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
  const [setsDone, setSetsDone] = useState<Record<string, number>>({});
  const [allowLeave, setAllowLeave] = useState(false);
  const saving = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const mainIds = plan.exerciseIds;
  const finisherIds = ABS_FINISHER.exerciseIds;
  const allEntries = [
    ...mainIds.map((id) => ({ key: `main:${id}`, id })),
    ...finisherIds.map((id) => ({ key: `finisher:${id}`, id })),
  ];
  const totalSets = allEntries.reduce((n, e) => n + (getExercise(e.id)?.sets ?? 0), 0);
  const doneSets = allEntries.reduce((n, e) => n + (setsDone[e.key] ?? 0), 0);
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

  const toggle = (key: string, i: number) =>
    setSetsDone((prev) => {
      const cur = prev[key] ?? 0;
      return { ...prev, [key]: i < cur ? i : i + 1 };
    });

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
        exercises: allEntries.map((e) => ({
          exerciseId: e.id,
          setsDone: setsDone[e.key] ?? 0,
          setsPlanned: getExercise(e.id)?.sets ?? 0,
        })),
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
      doneSets === 0
        ? "No sets are checked off. Did you really finish the workout?"
        : "Did you really finish the workout?",
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
        <Text className="text-zinc-400">{`${doneSets} / ${totalSets} sets`}</Text>

        <Text className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Main</Text>
        {mainIds.map((id) => {
          const key = `main:${id}`;
          return (
            <ExerciseCard
              key={key}
              exerciseId={id}
              setsDone={setsDone[key] ?? 0}
              onToggleSet={(i) => toggle(key, i)}
            />
          );
        })}

        <Text className="mt-3 text-lg font-bold text-orange-400">🔥 Bonus: Abs Finisher</Text>
        {finisherIds.map((id) => {
          const key = `finisher:${id}`;
          return (
            <ExerciseCard
              key={key}
              exerciseId={id}
              bonus
              setsDone={setsDone[key] ?? 0}
              onToggleSet={(i) => toggle(key, i)}
            />
          );
        })}
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
