// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const BG = "#0B0D10";
const CARD = "#13161B";
const MUTED = "#9AA3AF";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: CARD,
          borderTopColor: "rgba(255,255,255,0.06)",
          height: 68,
        },
        tabBarActiveTintColor: "#F8F8F8",
        tabBarInactiveTintColor: MUTED,
      }}
    >
      <Tabs.Screen
        name="discover/index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="events/index"
        options={{
          title: "My Events",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="messages/index"
        options={{
          title: "Message",
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
