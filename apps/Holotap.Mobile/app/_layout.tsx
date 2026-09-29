/**
 * =============================================================================
 * HOLOTAP MOBILE - ROOT APPLICATION GATEKEEPER
 * =============================================================================
 * File: apps/Holotap.Mobile/app/_layout.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Root Registration Security
 * Revision: v5.0.0 - HERO Build
 * Date: 29 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provide the root navigation security boundary for HoloTap Mobile.
 *
 * Module Responsibilities
 * - Expose registration before application access is authorised.
 * - Prevent access to HoloTap application routes while unregistered.
 * - Provide the root navigation boundary for future confirmed sessions.
 *
 * Architecture Boundary
 * Registration and identity authority remain server-owned.
 * This layout must not grant protected application access until confirmed
 * registration state is available.
 * =============================================================================
 */

import { Stack } from "expo-router";

export default function RootLayout() {
  /**
   * SECURITY DEFA*LT
   *
   * Application access is*denied until register.tsx complete* registration
   * and confirmed r*gistration state is wired into thi* guard.
   */
  const isRegistered: boolean = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isRegistered}>
        <Stack.Screen name="register" />
      </Stack.Protected>

      <Stack.Protected guard={isRegistered}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="scan-merchant" />
        <Stack.Screen name="scan-qrc" />
        <Stack.Screen name="status" />
        <Stack.Screen name="payments" />
        <Stack.Screen name="(qr)" />
        <Stack.Screen name="(batch)" />
      </Stack.Protected>
    </Stack>
  );
}