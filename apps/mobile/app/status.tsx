/*  
 * =====================================================================================
 *  HoloTap Engineering — Mobile Identity Layer
 * -------------------------------------------------------------------------------------
 *  File: status.tsx
 *  Version: 2,4
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
import { View, Text, StyleSheet } from "react-native";
import { useIdentity } from "./content/IdentityContext";

/* --------------------------------------------------------------------------
 *  Component: IdentityStatusScreen
 *  Description:
 *      - Reads the current identity envelope from IdentityContext
 *      - Renders identity fields when present
 *      - Renders fallback message when identity is absent
 * -------------------------------------------------------------------------- */
export default function IdentityStatusScreen() {
  const identity = useIdentity(); // IdentityPayload | null

  return (
    <View style={styles.container}>
      {/* ------------------------------------------------------------------
       *  Section: Title
       *  Description:
       *      - Provides deterministic header for the identity surface
       * ------------------------------------------------------------------ */}
      <Text style={styles.title}>Identity Status</Text>

      {/* ------------------------------------------------------------------
       *  Section: Identity Rendering
       *  Description:
       *      - Renders identity envelope fields when present
       *      - Fallback message when identity is null
       * ------------------------------------------------------------------ */}
      {identity ? (
        <>
          <Text>ID: {identity.id}</Text>
          <Text>Type: {identity.type}</Text>
          <Text>Session: {identity.sessionId}</Text>
          <Text>Issued: {identity.issuedAt}</Text>
          <Text>Device: {identity.device}</Text>
        </>
      ) : (
        <Text>No identity loaded.</Text>
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
});
