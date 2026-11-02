import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { nextPlanId as computeNextPlanId } from '@/data/plans';
import { toLocalDateKey } from '@/lib/dates';
import type { PlanId, SessionLog } from '@/types';

const STORAGE_KEY = 'workout.logs.v1';

type WorkoutContextValue = {
  logs: SessionLog[]; // newest first
  loaded: boolean;
  addLog(log: SessionLog): Promise<void>;
  nextPlanId: PlanId;
  workoutDates: Set<string>;
};

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [loaded, setLoaded] = useState(false);
  const logsRef = useRef<SessionLog[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) {
          logsRef.current = parsed;
          setLogs(parsed);
        }
      } catch {
        // corrupt or unavailable storage: start empty
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const addLog = useCallback(async (log: SessionLog) => {
    const next = [log, ...logsRef.current];
    logsRef.current = next;
    setLogs(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // keep in-memory state even if persisting fails
    }
  }, []);

  const value = useMemo<WorkoutContextValue>(
    () => ({
      logs,
      loaded,
      addLog,
      nextPlanId: computeNextPlanId(logs[0]?.planId),
      workoutDates: new Set(logs.map((l) => toLocalDateKey(l.endedAt))),
    }),
    [logs, loaded, addLog],
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkout(): WorkoutContextValue {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
}
