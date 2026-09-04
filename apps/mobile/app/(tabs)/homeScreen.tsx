/**
 * =============================================================================
 * HOLOTAP MOBILE — HOME SCREEN v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          index.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides the initial landing screen for HoloTap Mobile. Performs a backend
 * connectivity check and exposes a minimal, unstyled engineering‑grade status
 * message. This screen acts as the entry point before dashboard navigation.
 *
 * HOME SCREEN LIFECYCLE:
 *   1. Perform backend connectivity test
 *   2. Display connection status
 *   3. Provide safe fallback when backend is unreachable
 *
 * VERSION NOTES:
 *   • v2: Rewritten for HoloTap engineering architecture
 *   • No styling, no images, no Expo Router UI
 *   • Pure logic, pure TypeScript
 *
 * FLOW ALIGNMENT:
 *   Flow 0 → Home (this screen)
 *   Flow 1 → Identity
 *   Flow 2 → QR Session
 *   Flow 3 → QR Generation
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

import { API_URL } from "../../src/config";

/**
 * Main Home Screen (unstyled)
 */
export default function HomeScreen() {
  const [status, setStatus] = useState("Connecting…");

  useEffect(() => {
    async function testConnection() {
      try {
        const res = await fetch(`${API_URL}/test`);
        const text = await res.text();
        setStatus(text || "Connected");
      } catch {
        setStatus("Backend connection failed");
      }
    }

    testConnection();
  }, []);

  return (
    <SafeAreaView>
      <Text>{status}</Text>
    </SafeAreaView>
  );
}
