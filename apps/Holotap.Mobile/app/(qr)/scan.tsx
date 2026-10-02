/*
 * =====================================================================================
 *  HoloTap Engineering — Customer HERO Payment Flow
 * -------------------------------------------------------------------------------------
 *  File: apps/Holotap.Mobile/app/(qr)/scan.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Customer / QR Scanner
 *  Revision: v5.0.0
 *  Date: 02 Oct 2026
 *  Copyright (c) 2026 HoloTap
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Scan a merchant HoloTap QR code and begin the customer HERO payment journey.
 *
 *  Module Responsibilities:
 *      - Request and handle camera permission
 *      - Restrict barcode scanning to QR codes
 *      - Prevent duplicate scan processing
 *      - Parse the merchant QR payload
 *      - Validate the payment identifier contained in the payload
 *      - Reject malformed or unsupported QR payloads
 *      - Navigate to the corresponding payment detail surface
 *      - Provide visible processing, permission and scan-error states
 * =====================================================================================
 */

import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

type HeroQrPayload = Record<string, unknown>;

export default function QRScanScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * ---------------------------------------------------------------------------
   * HERO QR HANDLER
   * ---------------------------------------------------------------------------
   */

  const handleScan = useCallback(
    ({ data }: { data: string }) => {
      if (processing) {
        return;
      }

      setProcessing(true);
      setError(null);

      try {
        const payload: HeroQrPayload = JSON.parse(data);

        if (
          !payload ||
          typeof payload !== "object" ||
          Array.isArray(payload)
        ) {
          throw new Error("Invalid HoloTap QR payload.");
        }

        /*
         * The current HERO payment route requires a payment identifier.
         * Do not revive the retired Flow 6 identity-validation contract here.
         */
        if (
          !("id" in payload) ||
          (typeof payload.id !== "string" &&
            typeof payload.id !== "number") ||
          String(payload.id).trim().length === 0
        ) {
          throw new Error(
            "HoloTap QR code does not contain a valid payment ID."
          );
        }

        /*
         * HERO customer journey:
         *
         * Merchant creates bill
         *        ↓
         * Merchant generates QR
         *        ↓
         * Consumer scans QR
         *        ↓
         * Resolve corresponding payment
         *        ↓
         * Display bill
         *        ↓
         * Consumer reviews and pays
         */

        router.replace({
          pathname: "/payments/[id]",
          params: {
            id: String(payload.id),
          },
        });
      } catch (scanError) {
        console.warn("HoloTap HERO QR scan failed:", scanError);

        setError(
          scanError instanceof Error
            ? scanError.message
            : "Unable to read this HoloTap QR code."
        );

        setProcessing(false);
      }
    },
    [processing, router]
  );

  /*
   * ---------------------------------------------------------------------------
   * CAMERA PERMISSION STATES
   * ---------------------------------------------------------------------------
   */

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera access required</Text>

        <Text style={styles.message}>
          HoloTap needs camera access to scan a merchant payment QR code.
        </Text>

        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow camera</Text>
        </Pressable>
      </View>
    );
  }

  /*
   * ---------------------------------------------------------------------------
   * HERO SCANNER
   * ---------------------------------------------------------------------------
   */

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={processing ? undefined : handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Scan merchant QR</Text>

        <Text style={styles.message}>
          Point the camera at the HoloTap payment QR code.
        </Text>

        {processing && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={styles.loader}
          />
        )}

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
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

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#000000",
  },

  overlay: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 48,
    alignItems: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  message: {
    color: "#d1d5db",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },

  loader: {
    marginTop: 20,
  },

  errorBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#7f1d1d",
  },

  errorText: {
    color: "#ffffff",
    textAlign: "center",
  },

  button: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});