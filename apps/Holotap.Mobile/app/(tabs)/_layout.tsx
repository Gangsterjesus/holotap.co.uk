/**
 * =============================================================================
 * HOLOTAP MOBILE — ENTERPRISE TAB LAYOUT
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/_layout.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Merchant Navigation
 * Revision: v2 - HERO Merchant Navigation
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provides the primary tab-based navigation shell for the HoloTap merchant
 * mobile experience.
 *
 * Module Responsibilities
 * - Expose the merchant dashboard.
 * - Expose merchant QR-code payment generation.
 * - Expose live payment activity.
 * - Expose refund operations.
 * - Expose settlement information.
 * - Expose merchant application settings.
 * - Apply theme-aware navigation presentation.
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
        headerShown: false,
        tabBarActiveTintColor: Colors[scheme].tint,
        tabBarInactiveTintColor: Colors[scheme].tabIconDefault,
        tabBarStyle: {
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="merchant-dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={26}
              name="square.grid.2x2.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="generate-qrc"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="qrcode" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={26}
              name="gearshape.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}