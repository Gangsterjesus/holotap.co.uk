/*  
 * =====================================================================================
 *  HoloTap Engineering — Mobile Identity Layer
 * -------------------------------------------------------------------------------------
 *  File: status.tsx
 *  Version: 2.4
 *  Engineer: E5357171 (R. Newton)
 *  Date: 20 Aug 2026
 *  Module: Identity Surface (Flow 7)
 *
 *  Purpose:
 *      - Surface the injected identity envelope after QR acquisition (Flow 6)
 *      - Provide deterministic visibility of identity type, session binding,
 *        issuance timestamp, and device origin
 *      - Act as the transition surface into Flow 8 (Payment Lifecycle)
 *
 *  Notes:
 *      - Requires IdentityProvider to be mounted at the application root
 *      - IdentityPayload is strongly typed to ensure deterministic rendering
 *      - All sections below are commented for engineering clarity
 * =====================================================================================
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useIdentity } from "./(content)/IdentityContext";

/* --------------------------------------------------------------------------
 *  Component: IdentityStatusScreen
 *  Description:
 *      - Reads the current identity envelope from IdentityContext
 *      - Renders identity fields when present
 *      - Renders fallback message when identity is absent
 *      - Provides deterministic transition into Flow 8
 * -------------------------------------------------------------------------- */
export default function IdentityStatusScreen() {
  const router = useRouter();
  const identity = useIdentity(); // IdentityPayload | null

  return (
    <View style={styles.container}>
      {/* ------------------------------------------------------------------
       *  Section: Title
       * ------------------------------------------------------------------ */}
      <Text style={styles.title}>Identity Status</Text>

      {/* ------------------------------------------------------------------
       *  Section: Identity Rendering
       * ------------------------------------------------------------------ */}
      {identity ? (
        <>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{identity.id}</Text>

          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{identity.type}</Text>

          <Text style={styles.label}>Session</Text>
          <Text style={styles.value}>{identity.sessionId}</Text>

          <Text style={styles.label}>Issued</Text>
          <Text style={styles.value}>
            {new Date(identity.issuedAt).toLocaleString()}
          </Text>

          <Text style={styles.label}>Device</Text>
          <Text style={styles.value}>{identity.device}</Text>

          {/* ------------------------------------------------------------------
           *  Section: Transition to Flow 8
           * ------------------------------------------------------------------ */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.replace("/payments" as Parameters<typeof router.replace>[0])
            }
          >
            <Text style={styles.buttonText}>Continue to Payments</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noIdentity}>No identity loaded.</Text>
      )}
    </View>
  );
}

/* --------------------------------------------------------------------------
 *  Stylesheet: Deterministic layout + spacing
 * -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#4DA6FF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  noIdentity: {
    fontSize: 16,
    color: "#444",
  },
});
