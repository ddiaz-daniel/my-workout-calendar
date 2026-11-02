import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ColorValue, Text } from "react-native";

function icon(name: "calendar" | "person.crop.circle", glyph: string) {
  return function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return (
      <SymbolView
        name={name}
        size={size}
        tintColor={color}
        fallback={<Text style={{ color, fontSize: size - 4 }}>{glyph}</Text>}
      />
    );
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarStyle: { backgroundColor: "#09090b", borderTopColor: "#27272a" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: icon("calendar", "◷") }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: icon("person.crop.circle", "●") }} />
    </Tabs>
  );
}
