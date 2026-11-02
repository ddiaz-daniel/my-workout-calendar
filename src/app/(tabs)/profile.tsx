import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatTile } from "@/components/StatTile";
import { getPlan } from "@/data/plans";
import {
  avgDurationSec,
  currentStreakDays,
  formatDuration,
  longestStreakDays,
  muscleGroupSets,
  perPlanCounts,
  thisMonthCount,
  thisWeekCount,
  totalDurationSec,
  totalSetsDone,
  totalWorkouts,
  weeklyCounts,
} from "@/lib/stats";
import { useWorkout } from "@/store/WorkoutContext";
import type { PlanId } from "@/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekLabel(key: string) {
  const [, m, d] = key.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl bg-zinc-900 p-4">
      <Text className="text-xs uppercase tracking-wider text-zinc-400">{title}</Text>
      {children}
    </View>
  );
}

export default function Profile() {
  const { logs, loaded } = useWorkout();

  const s = useMemo(() => {
    const groups = Object.entries(muscleGroupSets(logs))
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    return {
      total: totalWorkouts(logs),
      streak: currentStreakDays(logs),
      best: longestStreakDays(logs),
      week: thisWeekCount(logs),
      month: thisMonthCount(logs),
      time: totalDurationSec(logs),
      avg: avgDurationSec(logs),
      sets: totalSetsDone(logs),
      plans: perPlanCounts(logs),
      weeks: weeklyCounts(logs, 8),
      groups,
    };
  }, [logs]);

  const maxWeek = Math.max(1, ...s.weeks.map((w) => w.count));
  const maxGroup = Math.max(1, ...s.groups.map(([, n]) => n));

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView contentContainerClassName="p-4 gap-4">
        <View>
          <Text className="text-3xl font-bold text-white">Profile</Text>
          <Text className="text-zinc-400">Kettlebell & calisthenics</Text>
        </View>

        {loaded && logs.length === 0 ? (
          <View className="items-center rounded-2xl bg-zinc-900 p-8">
            <Text className="text-center text-zinc-400">Finish your first session to see stats</Text>
          </View>
        ) : (
          <>
            <View className="flex-row gap-3">
              <StatTile label="Total workouts" value={s.total} />
              <StatTile label="Current streak 🔥" value={s.streak} sub={`best ${s.best}`} />
            </View>
            <View className="flex-row gap-3">
              <StatTile label="This week" value={s.week} />
              <StatTile label="This month" value={s.month} />
            </View>
            <View className="flex-row gap-3">
              <StatTile label="Total time" value={formatDuration(s.time)} />
              <StatTile label="Avg session" value={formatDuration(s.avg)} />
            </View>
            <View className="flex-row gap-3">
              <StatTile label="Sets done" value={s.sets} />
            </View>

            <Card title="Last 8 weeks">
              <View className="h-32 flex-row items-end gap-2">
                {s.weeks.map((w) => (
                  <View key={w.weekStart} className="h-full flex-1 items-center justify-end gap-1">
                    <Text className="text-xs text-zinc-400">{w.count || ""}</Text>
                    <View
                      className="w-full rounded-t bg-emerald-500"
                      style={{ height: w.count ? `${(w.count / maxWeek) * 80}%` : 2, opacity: w.count ? 1 : 0.3 }}
                    />
                  </View>
                ))}
              </View>
              <View className="flex-row gap-2">
                {s.weeks.map((w) => (
                  <Text key={w.weekStart} className="flex-1 text-center text-[10px] text-zinc-500" numberOfLines={1}>
                    {weekLabel(w.weekStart)}
                  </Text>
                ))}
              </View>
            </Card>

            <Card title="Muscle groups">
              {s.groups.length === 0 ? (
                <Text className="text-zinc-500">No sets yet</Text>
              ) : (
                s.groups.map(([g, n]) => (
                  <View key={g} className="flex-row items-center gap-3">
                    <Text className="w-20 capitalize text-zinc-300">{g}</Text>
                    <View className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-800">
                      <View className="h-full rounded-full bg-emerald-500" style={{ width: `${(n / maxGroup) * 100}%` }} />
                    </View>
                    <Text className="w-8 text-right text-zinc-400">{n}</Text>
                  </View>
                ))
              )}
            </Card>

            <Card title="Plans">
              <View className="flex-row gap-3">
                {(["A", "B", "C"] as PlanId[]).map((id) => (
                  <View key={id} className="flex-1 items-center rounded-xl bg-zinc-800 py-3">
                    <Text className="text-2xl font-bold text-white">{s.plans[id]}</Text>
                    <Text className="text-sm text-emerald-400">Plan {id}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card title="Recent sessions">
              {logs.slice(0, 5).map((l) => {
                const done = l.exercises.reduce((a, e) => a + e.setsDone, 0);
                const planned = l.exercises.reduce((a, e) => a + e.setsPlanned, 0);
                return (
                  <View key={l.id} className="flex-row items-center justify-between border-t border-zinc-800 pt-3">
                    <View className="flex-1">
                      <Text className="font-semibold text-white">{dayLabel(l.startedAt)}</Text>
                      <Text className="text-sm text-zinc-400">{`Plan ${l.planId} · ${getPlan(l.planId).name}`}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-white">{formatDuration(l.durationSec)}</Text>
                      <Text className="text-sm text-zinc-400">{`${done}/${planned} sets`}</Text>
                    </View>
                  </View>
                );
              })}
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
