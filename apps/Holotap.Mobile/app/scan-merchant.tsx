/**
 * =============================================================================
 * HOLOTAP MOBILE - MERCHANT QR SCANNER
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/scan-merchant.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Customer Payment Entry
 * Revision: v5.0.0 - HERO Build
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Scan a merchant HoloTap QR code and submit its payment session for
 * backend verification.
 *
 * Module Responsibilities
 * - Request camera permission when required.
 * - Scan merchant QR payment codes.
 * - Prevent duplicate scan processing.
 * - Submit the scanned session for verification.
 * - Present the verification result to the customer.
 * =============================================================================
 */

import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

interface VerificationResult {
  verified: boolean;
  reason?: string;
  merchantName?: string;
}

export default function ScanMerchant() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [verification, setVerification] =
    useState<VerificationResult | null>(null);

  async function handleScan(event: BarcodeScanningResult) {
    if (scanned) {
      return;
    }

    setScanned(true);

    try {
      const response = await fetch(
        "https://api.holotap.co/consumer/verify-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: event.data,
          }),
        },
      );

      const result = (await response.json()) as VerificationResult;

      setVerification(result);
    } catch (error) {
      console.error("Merchant verification failed:", error);

      setVerification({
        verified: false,
        reason: "network-error",
      });
    }
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.status}>Checking camera access...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Camera access required</Text>

          <Text style={styles.description}>
            HoloTap needs camera access to scan a merchant payment QR code.
          </Text>

          <Pressable style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Enable camera</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (verification) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Payment verification</Text>

          <Text>
            Verified: {verification.verified ? "Yes" : "No"}
          </Text>

          <Text>
            Merchant: {verification.merchantName ?? "Unavailable"}
          </Text>

          <Text>
            Status: {verification.reason ?? "Ready"}
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => {
              setVerification(null);
              setScanned(false);
            }}
          >
            <Text style={styles.buttonText}>Scan another code</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan to pay</Text>

        <Text style={styles.description}>
          Point the camera at the merchant HoloTap QR code.
        </Text>
      </View>

      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    padding: 24,
  },

  card: {
    margin: 24,
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4b5563",
    marginBottom: 20,
  },

  status: {
    margin: 24,
    fontSize: 16,
  },

  camera: {
    flex: 1,
  },

  button: {
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#6d28d9",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});