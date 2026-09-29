/**
 * =============================================================================
 * HOLOTAP MOBILE - MERCHANT TAB LAYOUT
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/_layout.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Protected Merchant Navigation
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provide the protected tab-navigation shell for the authenticated HoloTap
 * merchant experience.
 *
 * Module Responsibilities
 * - Present merchant dashboard navigation.
 * - Present QR-code payment generation.
 * - Present merchant settings.
 * - Apply theme-aware navigation presentation.
 *
 * Architecture Boundary
 * This layout does not establish registration or authentication.
 * Access to this route group must be authorised by the root application
 * protection layer before the merchant navigation becomes available.
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
            <IconSymbol
              size={26}
              name="qrcode"
              color={color}
            />
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