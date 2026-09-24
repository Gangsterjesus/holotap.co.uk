/**
 * =============================================================================
 * ENGINEERING HEADER — QR SCANNER SCREEN
 * =============================================================================
 * Author: Raymond Newton (E5357171)
 * Product: HoloTap Hero v5.0.0
 * File: scan-qr.tsx
 * Date: 23 September 2026
 *
 * Purpose:
 *   Consumer-facing QR scanning flow.
 *
 * Responsibilities:
 *   • Capture merchant QR codes
 *   • Verify QR token with backend
 *   • Validate backend response
 *   • Prevent duplicate scans
 *   • Navigate to payment flow
 *
 * Hero Objectives:
 *   • Strict TypeScript compliance
 *   • Runtime response validation
 *   • Deterministic state transitions
 *   • API safety
 *   • QR verification hardening
 * =============================================================================
 */

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";

import { API_URL } from "../src/config";

interface QRVerifyRequest {
  token: string;
}

interface QRVerifySuccessResponse {
  merchantId: string;
  sessionId: string;
}

interface QRVerifyErrorResponse {
  message: string;
}

function isQRVerifySuccessResponse(
  value: unknown,
): value is QRVerifySuccessResponse {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as Record<
    string,
    unknown
  >;

  return (
    typeof candidate.merchantId === "string" &&
    typeof candidate.sessionId === "string"
  );
}

function getErrorMessage(
  value: unknown,
): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (
      value as QRVerifyErrorResponse
    ).message === "string"
  ) {
    return (
      value as QRVerifyErrorResponse
    ).message;
  }

  return "Invalid QR code";
}

export default function ScanQR() {
  const router = useRouter();

  const [
    permission,
    requestPermission,
  ] = useCameraPermissions();

  const [scanned, setScanned] =
    useState<boolean>(false);

  useEffect(() => {
    if (!permission?.granted) {
      void requestPermission();
    }
  }, [
    permission,
    requestPermission,
  ]);

  const handleScan = async (
    data: string,
  ): Promise<void> => {
    if (scanned) {
      return;
    }

    setScanned(true);

    try {
      const payload: QRVerifyRequest = {
        token: data,
      };

      const response = await fetch(
        `${API_URL}/session/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result: unknown =
        await response.json();

      if (response.ok) {
        if (
          !isQRVerifySuccessResponse(result)
        ) {
          throw new Error(
            "QR verification response validation failed",
          );
        }

        router.push({
          pathname: "/payment",
          params: {
            merchantId:
              result.merchantId,
            sessionId:
              result.sessionId,
          },
        } as never);

        return;
      }

      Alert.alert(
        "QR Verification Failed",
        getErrorMessage(result),
      );

      setScanned(false);
    } catch (error) {
      console.error(
        "QR verification error",
        error,
      );

      Alert.alert(
        "Network Error",
        "Unable to verify QR code.",
      );

      setScanned(false);
    }
  };

  if (!permission) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50,
        }}
      />
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={({
          data,
        }) => {
          void handleScan(data);
        }}
      />

      <Text style={styles.scanText}>
        Scan Merchant QR Code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  scanText: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
  },
});