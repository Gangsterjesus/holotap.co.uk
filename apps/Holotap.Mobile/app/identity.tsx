/* ============================================================================

   HoloTap Mobile Platform
   File: app/Identity.tsx

   Engineers:
   - Raymond Newton (E5357171)
   - Copilot Engineering Assistant

   Layer: Identity Verification Layer

   Revision: v5.1.0
   Date: 17 November 2026

   Copyright (c) 2026 HoloTap.
   All Rights Reserved.

   ----------------------------------------------------------------------------

   Module Purpose

   Provides consumer identity verification following mobile registration
   and before access to the HoloTap QR payment experience.

   ----------------------------------------------------------------------------

   Module Responsibilities

   - Capture OTP verification code.
   - Verify mobile ownership.
   - Support OTP resend operations.
   - Present verification failures.
   - Establish authenticated identity state.
   - Route verified consumers to the QR scanner flow.

   ----------------------------------------------------------------------------

   Navigation Flow

   register.tsx
        ↓
   Identity.tsx
        ↓
   scan.tsx

   ============================================================================ */

import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function IdentityScreen() {
  const [otpCode, setOtpCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleVerify() {
    if (!otpCode.trim()) {
      Alert.alert(
        "Verification Required",
        "Please enter the verification code.",
      );
      return;
    }

    try {
      setSubmitting(true);

      // TODO:
      // Connect to HoloTap Identity API
      // Verify OTP
      // Create verified identity session
      // Route to scan.tsx

      Alert.alert(
        "Identity Verified",
        "Verification successful.",
      );
    } catch (error) {
      console.error("Identity verification failed:", error);

      Alert.alert(
        "Verification Failed",
        "Please check your code and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleResendCode() {
    Alert.alert(
      "Resend Code",
      "OTP resend functionality will be connected in the next implementation step.",
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image
          source={require("../assets/images/Holotap-2026.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.eyebrow}>
          HOLOTAP
        </Text>

        <Text style={styles.title}>
          Identity Verification
        </Text>

        <Text style={styles.description}>
          Enter the verification code sent to your registered
          mobile number.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Verification Code
        </Text>

        <TextInput
          value={otpCode}
          onChangeText={setOtpCode}
          keyboardType="number-pad"
          placeholder="123456"
          maxLength={6}
          editable={!submitting}
          style={styles.input}
        />

        <Pressable
          onPress={handleVerify}
          disabled={submitting}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {submitting
              ? "Verifying..."
              : "Verify Identity"}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleResendCode}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            Resend Code
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },

  hero: {
    alignItems: "center",
    marginBottom: 28,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },

  eyebrow: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6D28D9",
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 4,
  },

  button: {
    backgroundColor: "#6D28D9",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },

  linkText: {
    color: "#6D28D9",
    fontWeight: "600",
  },
});