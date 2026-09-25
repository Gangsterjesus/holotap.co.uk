/**
 * =============================================================================
 *  HoloTap Mobile — Enterprise Tab Layout
 * =============================================================================
 */

import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[scheme].tint,
        headerShown: false,
      }}
    >

      {/* Dashboard */}
      <Tabs.Screen
        name="merchant-dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />
          ),
        }}
      />

      {/* QR Code */}
      <Tabs.Screen
        name="generate-qrc"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode" color={color} />
          ),
        }}
      />

      {/* Payments */}
      <Tabs.Screen
        name="live-payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="creditcard.fill" color={color} />
          ),
        }}
      />

      {/* Refunds */}
      <Tabs.Screen
        name="refund"
        options={{
          title: "Refunds",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="arrow.uturn.left.circle.fill" color={color} />
          ),
        }}
      />

      {/* Settlement */}
      <Tabs.Screen
        name="settlement"
        options={{
          title: "Settlement",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="banknote.fill" color={color} />
          ),
        }}
      />

      {/* Diagnostics */}
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: "Diagnostics",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wrench.fill" color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
