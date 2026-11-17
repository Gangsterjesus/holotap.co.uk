/* ============================================================================
   HoloTap Mobile Platform
   File: app/register.tsx

   Engineers:
   - Raymond Newton (E5357171)
   - Copilot Engineering Assistant

   Layer: Identity & Registration Layer

   Revision: v5.1.0
   Date: 17 November 2026

   Copyright (c) 2026 HoloTap.
   All Rights Reserved.

   ----------------------------------------------------------------------------

   Module Purpose

   Captures consumer registration details prior to entering the protected
   HoloTap payment experience.

   ----------------------------------------------------------------------------

   Module Responsibilities

   - Capture country code.
   - Capture mobile number.
   - Acquire push token on native platforms.
   - Register consumer device.
   - Display HoloTap branding.
   - Prevent duplicate submissions.

   ============================================================================ */

import { useEffect, useState } from "react";
import {
  Alert,
  Image,
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

        const token =
          await Notifications.getExpoPushTokenAsync();

        if (active) {
          setExpoPushToken(token.data);
        }
      } catch (error) {
        console.warn(
          "Push token acquisition unavailable:",
          error,
        );
      }
    }

    void acquirePushToken();

    return () => {
      active = false;
    };
  }, []);

  async function handleRegister() {
    if (submitting) {
      return;
    }

    const number = mobileNumber.trim();
    const code = countryCode.trim();

    if (!code) {
      Alert.alert(
        "Country Code Required",
        "Please enter your country code.",
      );
      return;
    }

    if (!number) {
      Alert.alert(
        "Mobile Number Required",
        "Please enter your mobile number.",
      );
      return;
    }

    try {
      setSubmitting(true);

      await mobileRegister({
        mobile_number: number,
        country_code: code,
        device_id:
          Device.osBuildId ?? "unknown-device",
        platform: Platform.OS,
        push_token: expoPushToken || undefined,
      });

      Alert.alert(
        "Registration Successful",
        "Your device has been registered.",
      );
    } catch (error) {
      console.error(
        "Consumer registration failed:",
        error,
      );

      Alert.alert(
        "Registration Failed",
        "Your details could not be verified. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.screen}>
      {/* -------------------------------------------------------------------
         HoloTap Hero Area
         ------------------------------------------------------------------- */}

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
          Ready to Tap.
        </Text>

        <Text style={styles.description}>
          Register your mobile number to continue
          to the HoloTap QR payment experience.
        </Text>
      </View>

      {/* -------------------------------------------------------------------
         Registration Card
         ------------------------------------------------------------------- */}

      <View style={styles.card}>
        <Text style={styles.label}>
          Country Code
        </Text>

        <TextInput
          value={countryCode}
          onChangeText={setCountryCode}
          keyboardType="phone-pad"
          autoComplete="tel-country-code"
          editable={!submitting}
          style={styles.input}
        />

        <Text style={styles.label}>
          Mobile Number
        </Text>

        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="07123456789"
          keyboardType="phone-pad"
          autoComplete="tel"
          editable={!submitting}
          style={styles.input}
        />

        <Pressable
          onPress={handleRegister}
          disabled={submitting}
          style={({ pressed }) => [
            styles.button,
            pressed &&
              !submitting &&
              styles.buttonPressed,
            submitting &&
              styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {submitting
              ? "Registering..."
              : "Continue"}
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
    alignItems: "center",
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 12,
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
    textAlign: "center",
  },

  description: {
    color: "#4B5563",
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 18,
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
    borderWidth: 1,
    borderRadius: 12,
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
    opacity: 0.9,
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