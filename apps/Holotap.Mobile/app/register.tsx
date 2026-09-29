/**
 * =============================================================================
 * HOLOTAP MOBILE — CONSUMER REGISTRATION
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/register.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Customer Payment Entry
 * Revision: v3 - HERO Registration Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Register a HoloTap customer device for access to the QR-code payment
 * experience.
 *
 * Module Responsibilities
 * - Capture customer mobile registration details.
 * - Register the current mobile device.
 * - Acquire push capability on supported native platforms.
 * - Submit registration through the HoloTap Mobile API.
 * - Remain safe when rendered through React Native Web.
 * =============================================================================
 */

import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as Device from "expo-device";

import { mobileRegister } from "../api/mobile";

export default function RegisterScreen() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    let active = true;

    async function acquirePushToken() {
      try {
        const Notifications = await import("expo-notifications");
        const token = await Notifications.getExpoPushTokenAsync();

        if (active) {
          setExpoPushToken(token.data);
        }
      } catch (error) {
        console.warn("Push token acquisition unavailable:", error);
      }
    }

    void acquirePushToken();

    return () => {
      active = false;
    };
  }, []);

  async function handleRegister() {
    const number = mobileNumber.trim();
    const code = countryCode.trim();

    if (!number) {
      Alert.alert("Mobile number required");
      return;
    }

    if (!code) {
      Alert.alert("Country code required");
      return;
    }

    try {
      setSubmitting(true);

      await mobileRegister({
        mobile_number: number,
        country_code: code,
        device_id: Device.osBuildId ?? "unknown-device",
        platform: Platform.OS,
        push_token: expoPushToken,
      });

      Alert.alert("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>HOLOTAP</Text>

        <Text style={styles.title}>Ready to Tap.</Text>

        <Text style={styles.description}>
          Register your mobile number to continue to the HoloTap QR payment
          experience.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Country code</Text>

        <TextInput
          value={countryCode}
          onChangeText={setCountryCode}
          keyboardType="phone-pad"
          autoComplete="tel-country-code"
          style={styles.input}
        />

        <Text style={styles.label}>Mobile number</Text>

        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="07123456789"
          keyboardType="phone-pad"
          autoComplete="tel"
          style={styles.input}
        />

        <Pressable
          onPress={handleRegister}
          disabled={submitting}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            submitting && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Registering..." : "Continue"}
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
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    marginBottom: 28,
  },

  eyebrow: {
    color: "#6D28D9",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  title: {
    color: "#111827",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
  },

  description: {
    color: "#4B5563",
    fontSize: 17,
    lineHeight: 25,
  },

  card: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
    padding: 24,
  },

  label: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6D28D9",
    borderRadius: 12,
    paddingVertical: 16,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});