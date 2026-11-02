import { Text, View } from "react-native";

type Props = { label: string; value: string | number; sub?: string };

export function StatTile({ label, value, sub }: Props) {
  return (
    <View className="flex-1 gap-1 rounded-2xl bg-zinc-900 p-4">
      <Text className="text-xs uppercase tracking-wider text-zinc-400">{label}</Text>
      <Text className="text-3xl font-bold text-white">{value}</Text>
      {sub ? <Text className="text-sm text-emerald-400">{sub}</Text> : null}
    </View>
  );
}
