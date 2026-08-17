/**
 * =============================================================================
 * HOLOTAP MOBILE — DIAGNOSTICS SCREEN v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          app/(tabs)/diagnostics.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Developer‑only diagnostics screen for verifying backend connectivity,
 * identity subsystem status, QR session lifecycle, and payment pipeline
 * readiness. Not part of the consumer fintech flow.
 *
 * DIAGNOSTICS LIFECYCLE:
 *   1. Test backend connectivity (/test)
 *   2. Load merchant identity
 *   3. Load QR session (if identity is verified)
 *   4. Display raw diagnostic output (unstyled)
 *
 * VERSION NOTES:
 *   • v2: Rewritten for HoloTap engineering architecture
 *   • Identity‑aware diagnostics
 *   • Backend‑driven checks
 *   • No styling, no UI decoration
 *   • Pure logic, pure TypeScript
 *
 * FLOW ALIGNMENT (Developer Journey):
 *   D1 — Developer opens diagnostics tab
 *   D2 — Developer checks API, device, runtime, and session pipeline
 *   D3 — Developer validates QR → Session → Payment pipeline
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { API_URL } from "../../src/config";
import { useMerchantIdentity } from "../../hooks/useMerchantIdentity";
import { useQrSession } from "../../hooks/QRSessionLayer";

export default function DiagnosticsScreen() {
  /**
   * Backend connectivity status
   */
  const [backendStatus, setBackendStatus] = useState("Checking…");

  /**
   * Identity subsystem
   */
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  /**
   * QR session subsystem
   */
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useQrSession();

  /**
   * Backend connectivity test
   */
  useEffect(() => {
    async function testBackend() {
      try {
        const res = await fetch(`${API_URL}/test`);
        const text = await res.text();
        setBackendStatus(text || "Backend reachable");
      } catch {
        setBackendStatus("Backend unreachable");
      }
    }

    testBackend();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>HoloTap Diagnostics</Text>

        {/* Backend */}
        <Text>Backend: {backendStatus}</Text>

        {/* Identity */}
        {identityLoading && <Text>Identity: Loading…</Text>}
        {identityError && <Text>Identity: Error loading identity</Text>}
        {identity && (
          <View>
            <Text>Identity Status: {identity.status}</Text>
            <Text>Merchant ID: {identity.id}</Text>
            <Text>Merchant Name: {identity.name}</Text>
            {identity.hologramId && (
              <Text>Hologram ID: {identity.hologramId}</Text>
            )}
          </View>
        )}

        {/* QR Session */}
        {sessionLoading && <Text>QR Session: Loading…</Text>}
        {sessionError && <Text>QR Session: Error loading session</Text>}
        {session && (
          <View>
            <Text>QR Session Active: {session.active ? "Yes" : "No"}</Text>
            {session.sessionId && <Text>Session ID: {session.sessionId}</Text>}
            {session.expiresAt && <Text>Expires At: {session.expiresAt}</Text>}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
