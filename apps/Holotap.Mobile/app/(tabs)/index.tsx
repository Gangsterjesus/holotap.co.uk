/**
 * =============================================================================
 * HOLOTAP MOBILE — TABS LAYOUT v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          app/(tabs)/index.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides the tabbed navigation shell for the developer diagnostics suite.
 * This layout is strictly for engineering/debugging workflows and is not part
 * of the consumer-facing fintech experience.
 *
 * DEVELOPER FLOW ALIGNMENT:
 *   D1 — Developer opens diagnostics tab
 *   D2 — Developer checks API, device, runtime, and session pipeline
 *   D3 — Developer validates QR → Session → Payment pipeline
 *
 * ARCHITECTURE NOTES:
 *   • Expo Router v6 tab layout
 *   • Each tab corresponds to a screen inside /app/(tabs)
 *   • Diagnostics screen lives at /app/(tabs)/diagnostics.tsx
 *   • No styling, no consumer UI, pure engineering shell
 *
 * TESTING NOTES:
 *   • Confirm tab loads correctly
 *   • Confirm diagnostics screen renders
 *   • Confirm navigation stack is isolated from consumer flow
 * =============================================================================
 */

import { Tabs } from "expo-router";

/**
 * Developer-only tab layout.
 * Exposes diagnostics screen for engineering workflows.
 */
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: "Diagnostics",
        }}
      />
    </Tabs>
  );
}
