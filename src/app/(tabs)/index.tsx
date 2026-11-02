import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import { ABS_FINISHER, getPlan, PILATES_BY_PLAN, PLANS } from "@/data/plans";
import { toLocalDateKey } from "@/lib/dates";
import { useWorkout } from "@/store/WorkoutContext";
import type { PlanId } from "@/types";

export default function Home() {
  const { nextPlanId, workoutDates } = useWorkout();
  const [pickedId, setPickedId] = useState<PlanId>(nextPlanId);
  // Reset to the recommendation whenever it changes (e.g. after finishing a session).
  useEffect(() => setPickedId(nextPlanId), [nextPlanId]);
  const plan = getPlan(pickedId);
  const today = toLocalDateKey(new Date());

  const monthCount = useMemo(() => {
    const prefix = today.slice(0, 7);
    return [...workoutDates].filter((d) => d.startsWith(prefix)).length;
  }, [workoutDates, today]);

  const marked = useMemo(() => {
    const m: Record<string, object> = {};
    workoutDates.forEach((d) => {
      m[d] = { selected: true, selectedColor: "#10b981", selectedTextColor: "#022c22" };
    });
    return m;
  }, [workoutDates]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView contentContainerClassName="p-4 gap-4">
        <View>
          <Text className="text-3xl font-bold text-white">Workouts</Text>
          <Text className="text-zinc-400">
            {monthCount} {monthCount === 1 ? "workout" : "workouts"} this month
          </Text>
        </View>

        <View className="overflow-hidden rounded-2xl bg-zinc-900 p-2">
          <Calendar
            markedDates={marked}
            enableSwipeMonths
            theme={{
              calendarBackground: "#18181b",
              textSectionTitleColor: "#a1a1aa",
              dayTextColor: "#ffffff",
              textDisabledColor: "#52525b",
              monthTextColor: "#ffffff",
              arrowColor: "#10b981",
              todayTextColor: "#10b981",
              todayBackgroundColor: "#27272a",
            }}
          />
        </View>

        <View className="gap-3 rounded-2xl bg-zinc-900 p-4">
          <Text className="text-xs uppercase tracking-wider text-zinc-400">Next session</Text>
          <View className="flex-row gap-2">
            {PLANS.map((p) => {
              const active = p.id === pickedId;
              return (
                <Pressable
                  key={p.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setPickedId(p.id)}
                  className={`flex-1 items-center rounded-xl py-2 ${active ? "bg-emerald-500" : "bg-zinc-800"}`}
                >
                  <Text className={`font-bold ${active ? "text-zinc-950" : "text-white"}`}>{`Plan ${p.id}`}</Text>
                  {p.id === nextPlanId ? (
                    <Text className={`text-[10px] font-semibold ${active ? "text-zinc-900" : "text-emerald-400"}`}>
                      ★ TODAY
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
          <Text className="text-xl font-semibold text-white">{`Plan ${plan.id} · ${plan.name}`}</Text>
          <Text className={pickedId === nextPlanId ? "text-emerald-400" : "text-amber-400"}>
            {pickedId === nextPlanId
              ? "★ Recommended for today"
              : `Recommended today: Plan ${nextPlanId} · ${getPlan(nextPlanId).name}`}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {plan.groups.map((g) => (
              <View key={g} className="rounded-full bg-zinc-800 px-3 py-1">
                <Text className="text-sm capitalize text-emerald-400">{g}</Text>
              </View>
            ))}
          </View>
          <Text className="text-zinc-400">
            {plan.exerciseIds.length} exercises + Pilates ({PILATES_BY_PLAN[plan.id].exerciseIds.length}) + {ABS_FINISHER.name} ({ABS_FINISHER.exerciseIds.length})
          </Text>
        </View>

        <Pressable
          onPress={() => router.push({ pathname: "/session", params: { plan: pickedId } })}
          className="items-center rounded-2xl bg-emerald-500 py-5 active:bg-emerald-600"
        >
          <Text className="text-lg font-bold text-zinc-950">Start Session</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
