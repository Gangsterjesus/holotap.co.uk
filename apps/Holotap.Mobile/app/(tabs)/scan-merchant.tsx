/**
 * =============================================================================
 * HOLOTAP MOBILE — CONSUMER QR SCAN SCREEN v1.2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          scan-merchant.tsx
 * Date:          17 August 2026
 * =============================================================================
 * PURPOSE:
 * Implements Flow 4 — Consumer Scan.
 *
 * This screen:
 *   • Opens camera
 *   • Scans merchant QR code
 *   • Extracts sessionId
 *   • Sends sessionId → backend verification (Flow 5)
 *
 * ARCHITECTURE:
 *   • Uses Expo Camera (expo-camera)
 *   • Uses CameraView QR detection (Expo Go compatible)
 *   • No styling (unstyled engineering edition)
 *   • No Expo-era helpers
 *
 * FLOW ALIGNMENT:
 *   Flow 3 → Merchant QR Generation
 *   Flow 4 → Consumer Scan (this screen)
 *   Flow 5 → Backend Verification
 *   Flow 6 → Payment Initialisation
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

/**
 * =============================================================================
 * Main Component — ScanMerchant
 * =============================================================================
 */
export default function ScanMerchant() {
  // ============================================================================
  // SECTION: Camera Permission State
  // Purpose: Ensures camera access before scanning QR codes.
  // ============================================================================
  const [permission, requestPermission] = useCameraPermissions();

  // ============================================================================
  // SECTION: Scan State
  // Purpose: Prevents duplicate scans and stores verification result.
  // ============================================================================
  const [scanned, setScanned] = useState(false);
  const [verification, setVerification] = useState<any>(null);

  // ============================================================================
  // SECTION: Permission Request
  // Purpose: Automatically request camera permission on mount.
  // ============================================================================
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // ============================================================================
  // SECTION: QR Scan Handler
  // Purpose: Extract sessionId from QR → send to backend verification (Flow 5).
  // ============================================================================
  async function handleScan(event: any) {
    if (scanned) return;
    setScanned(true);

    const sessionId = event?.data;

    try {
      const res = await fetch("https://api.holotap.co/consumer/verify-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const json = await res.json();
      setVerification(json);
    } catch {
      setVerification({ verified: false, reason: "network-error" });
    }
  }

  // ============================================================================
  // SECTION: Permission Guard
  // Purpose: Prevents camera usage without permission.
  // ============================================================================
  if (!permission?.granted) {
    return (
      <SafeAreaView>
        <Text>Camera permission required.</Text>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // SECTION: Verification Result
  // Purpose: Displays backend verification payload (Flow 5).
  // ============================================================================
  if (verification) {
    return (
      <SafeAreaView>
        <View>
          <Text>Verification Result</Text>
          <Text>Verified: {String(verification.verified)}</Text>
          <Text>Reason: {verification.reason ?? "ok"}</Text>
          <Text>Merchant: {verification.merchantName ?? "N/A"}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // SECTION: Main Camera View
  // Purpose: Scans merchant QR code using Expo CameraView (Expo Go compatible).
  // ============================================================================
  return (
    <SafeAreaView>
      <CameraView
        style={{ width: "100%", height: 400 }}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Text>Scan Merchant QR Code</Text>
    </SafeAreaView>
  );
}
