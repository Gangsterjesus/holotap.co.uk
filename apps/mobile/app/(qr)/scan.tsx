/*  
 * =====================================================================================
 *  HoloTap Engineering — Mobile Identity Layer
 * -------------------------------------------------------------------------------------
 *  File: scan.tsx
 *  Version: 2.4
 *  Engineer: E5357171 (R. Newton)
 *  Date: 20 Aug 2026
 *  Module: QR Identity Scan (Flow 6 — Identity Injection)
 *
 *  Purpose:
 *      - Acquire identity envelope via QR scan
 *      - Perform minimal client-side validation (backend enforces strict schema)
 *      - Inject validated identity into IdentityContext
 *      - Transition into Flow 7 (Identity Surface)
 *
 *  Notes:
 *      - CameraView is configured for QR-only scanning
 *      - IdentityContext must wrap the application root
 *      - Navigation uses typed router.replace for deterministic routing
 * =====================================================================================
 */

import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useIdentityActions } from "../(content)/IdentityContext";

/* --------------------------------------------------------------------------
 *  Component: QRScanScreen
 *  Description:
 *      - Renders camera surface for QR scanning
 *      - Parses QR payload into IdentityPayload
 *      - Injects identity into context and navigates to Flow 7
 * -------------------------------------------------------------------------- */
export default function QRScanScreen() {
  const router = useRouter();
  const { setIdentity } = useIdentityActions();

  /* ----------------------------------------------------------------------
   *  Function: handleScan
   *  Description:
   *      - Parses QR JSON payload
   *      - Performs minimal shape validation
   *      - Injects identity and navigates to identity status surface
   * ---------------------------------------------------------------------- */
  const handleScan = useCallback(
    (result: { data: string }) => {
      try {
        const parsed = JSON.parse(result.data);

        // Minimal validation — backend enforces strict schema
        if (
          typeof parsed.id === "string" &&
          (parsed.type === "user" || parsed.type === "merchant") &&
          typeof parsed.sessionId === "string" &&
          typeof parsed.issuedAt === "number" &&
          (parsed.device === "mobile" || parsed.device === "web")
        ) {
          setIdentity(parsed);

          // Deterministic navigation into Flow 7
          router.replace("/identity/status" as Parameters<typeof router.replace>[0]);
        } else {
          console.warn("Invalid identity payload");
        }
      } catch (err) {
        console.warn("QR parse error:", err);
      }
    },
    [setIdentity, router]
  );

  /* ----------------------------------------------------------------------
   *  Render: Camera Surface
   *  Description:
   *      - Fullscreen QR scanner
   *      - Restricted to QR barcode type
   * ---------------------------------------------------------------------- */
  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
    </View>
  );
}

/* --------------------------------------------------------------------------
 *  Stylesheet: Deterministic layout + dark scan surface
 * -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
