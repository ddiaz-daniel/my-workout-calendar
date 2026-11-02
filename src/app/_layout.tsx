import "../global.css";
import { Stack } from "expo-router";

import { WorkoutProvider } from "@/store/WorkoutContext";

export default function RootLayout() {
  return (
    <WorkoutProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#09090b" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#09090b" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="session"
          options={{ title: "Session", presentation: "fullScreenModal", gestureEnabled: false }}
        />
        <Stack.Screen name="exercise/[id]" options={{ title: "How to", presentation: "modal" }} />
      </Stack>
    </WorkoutProvider>
  );
}
