import { getExercise } from "@/data/exercises";
import { toLocalDateKey } from "@/lib/dates";
import type { MuscleGroup, PlanId, SessionLog } from "@/types";

const DAY_MS = 86400000;

/** Parse a 'YYYY-MM-DD' key as a local-midnight Date. */
function fromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Local Monday of the week containing d, at local midnight. */
function weekStartOf(d: Date): Date {
  const offset = (d.getDay() + 6) % 7;
  return addDays(d, -offset);
}

function dayIndex(key: string): number {
  const d = fromKey(key);
  return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
}

function uniqueDays(logs: SessionLog[]): string[] {
  return [...new Set(logs.map((l) => toLocalDateKey(l.endedAt)))].sort();
}

export function totalWorkouts(logs: SessionLog[]): number {
  return logs.length;
}

export function totalDurationSec(logs: SessionLog[]): number {
  return logs.reduce((s, l) => s + l.durationSec, 0);
}

export function avgDurationSec(logs: SessionLog[]): number {
  return logs.length ? totalDurationSec(logs) / logs.length : 0;
}

export function currentStreakDays(logs: SessionLog[], now: Date = new Date()): number {
  const days = new Set(uniqueDays(logs));
  if (days.size === 0) return 0;
  let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(toLocalDateKey(cursor))) cursor = addDays(cursor, -1);
  let n = 0;
  while (days.has(toLocalDateKey(cursor))) {
    n++;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function longestStreakDays(logs: SessionLog[]): number {
  const days = uniqueDays(logs).map(dayIndex);
  let best = 0;
  let run = 0;
  days.forEach((d, i) => {
    run = i > 0 && d - days[i - 1] === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  });
  return best;
}

export function thisWeekCount(logs: SessionLog[], now: Date = new Date()): number {
  const start = toLocalDateKey(weekStartOf(now));
  const end = toLocalDateKey(addDays(weekStartOf(now), 7));
  return logs.filter((l) => {
    const k = toLocalDateKey(l.endedAt);
    return k >= start && k < end;
  }).length;
}

export function thisMonthCount(logs: SessionLog[], now: Date = new Date()): number {
  const prefix = toLocalDateKey(now).slice(0, 7);
  return logs.filter((l) => toLocalDateKey(l.endedAt).startsWith(prefix)).length;
}

export function totalSetsDone(logs: SessionLog[]): number {
  return logs.reduce((s, l) => s + l.exercises.reduce((a, e) => a + e.setsDone, 0), 0);
}

export function completionRate(logs: SessionLog[]): number {
  let done = 0;
  let planned = 0;
  for (const l of logs) {
    for (const e of l.exercises) {
      done += e.setsDone;
      planned += e.setsPlanned;
    }
  }
  return planned > 0 ? Math.min(1, done / planned) : 0;
}

export function perPlanCounts(logs: SessionLog[]): Record<PlanId, number> {
  const out: Record<PlanId, number> = { A: 0, B: 0, C: 0 };
  for (const l of logs) out[l.planId] = (out[l.planId] ?? 0) + 1;
  return out;
}

export function muscleGroupSets(logs: SessionLog[]): Record<MuscleGroup, number> {
  const out: Record<MuscleGroup, number> = {
    legs: 0, glutes: 0, chest: 0, back: 0, shoulders: 0, arms: 0, core: 0, full: 0,
  };
  for (const l of logs) {
    for (const e of l.exercises) {
      const ex = getExercise(e.exerciseId);
      if (!ex) continue;
      for (const g of ex.groups) out[g] += e.setsDone;
    }
  }
  return out;
}

export function weeklyCounts(
  logs: SessionLog[],
  n = 8,
  now: Date = new Date(),
): { weekStart: string; count: number }[] {
  const thisStart = weekStartOf(now);
  const weeks = Array.from({ length: n }, (_, i) => ({
    weekStart: toLocalDateKey(addDays(thisStart, -7 * (n - 1 - i))),
    count: 0,
  }));
  for (const l of logs) {
    const k = toLocalDateKey(weekStartOf(new Date(l.endedAt)));
    const w = weeks.find((x) => x.weekStart === k);
    if (w) w.count++;
  }
  return weeks;
}

export function formatDuration(sec: number): string {
  const totalMin = Math.round(Math.max(0, sec) / 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}
