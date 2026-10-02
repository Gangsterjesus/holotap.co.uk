/*
 * =====================================================================================
 *  HoloTap Engineering - HERO QR Scanner
 * -------------------------------------------------------------------------------------
 *  File: apps/Holotap.Mobile/app/scan-qr.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Customer / QR Payment
 *  Revision: v5.0.0
 *  Date: 02 Oct 2026
 *  Copyright (c) 2026 HoloTap Technologies Ltd.
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Provide the customer-facing QR scanning entry point for the HoloTap
 *      HERO payment experience.
 *
 *  Module Responsibilities:
 *      - Request and validate camera permission
 *      - Restrict scanning to QR codes
 *      - Prevent duplicate scan processing
 *      - Submit scanned QR tokens to the server for verification
 *      - Validate the server verification response at runtime
 *      - Surface deterministic verification and network failures
 *      - Navigate into the existing payment surface
 *
 *  Architecture Boundary:
 *      QR verification and authoritative payment state remain server-owned.
 *      The mobile client captures the QR token, validates the response shape
 *      and presents the resulting payment journey.
 * =====================================================================================
 */

import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
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

/*
 * =====================================================================================
 *  Verification Contracts
 * =====================================================================================
 */

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

/*
 * ---------------------------------------------------------------------------
 * Runtime Response Validation
 * ---------------------------------------------------------------------------
 */

function isQRVerifySuccessResponse(
  value: unknown
): value is QRVerifySuccessResponse {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate =
    value as Record<string, unknown>;

  return (
    typeof candidate.merchantId === "string" &&
    candidate.merchantId.length > 0 &&
    typeof candidate.sessionId === "string" &&
    candidate.sessionId.length > 0
  );
}

function getErrorMessage(
  value: unknown
): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value
  ) {
    const message =
      (value as QRVerifyErrorResponse).message;

    if (
      typeof message === "string" &&
      message.length > 0
    ) {
      return message;
    }
  }

  return "Invalid QR code.";
}

/*
 * =====================================================================================
 *  Component: ScanQR
 * =====================================================================================
 */

export default function ScanQR() {
  const router = useRouter();

  const [
    permission,
    requestPermission,
  ] = useCameraPermissions();

  const [scanned, setScanned] =
    useState(false);

  /*
   * ---------------------------------------------------------------------------
   * QR Scan Handler
   * ---------------------------------------------------------------------------
   */

  const handleScan = async (
    data: string
  ): Promise<void> => {
    if (scanned || !data.trim()) {
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result: unknown =
        await response.json();

      if (!response.ok) {
        Alert.alert(
          "QR Verification Failed",
          getErrorMessage(result)
        );

        setScanned(false);
        return;
      }

      if (!isQRVerifySuccessResponse(result)) {
        Alert.alert(
          "QR Verification Failed",
          "Invalid verification response."
        );

        setScanned(false);
        return;
      }

      /*
       * -----------------------------------------------------------------------
       * HERO Payment Transition
       * -----------------------------------------------------------------------
       */

      router.push({
        pathname: "/payments",
        params: {
          merchantId: result.merchantId,
          sessionId: result.sessionId,
        },
      });
    } catch {
      Alert.alert(
        "Unable to Verify",
        "Please try again."
      );

      setScanned(false);
    }
  };

  /*
   * ---------------------------------------------------------------------------
   * Camera Permission Resolution
   * ---------------------------------------------------------------------------
   */

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#6D28D9"
        />

        <Text style={styles.text}>
          Preparing camera...
        </Text>
      </View>
    );
  }

  /*
   * ---------------------------------------------------------------------------
   * Camera Permission Required
   * ---------------------------------------------------------------------------
   */

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            void requestPermission();
          }}
        >
          <Text style={styles.buttonText}>
            Allow Camera
          </Text>
        </Pressable>
      </View>
    );
  }

  /*
   * ---------------------------------------------------------------------------
   * HERO QR Scanner
   * ---------------------------------------------------------------------------
   */

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                void handleScan(data);
              }
        }
      />

      <Text style={styles.scanText}>
        {scanned
          ? "Verifying HoloTap QR..."
          : "Scan Merchant QR Code"}
      </Text>
    </View>
  );
}

/*
 * =====================================================================================
 *  Styles
 * =====================================================================================
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    padding: 24,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
  },

  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#000000",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});