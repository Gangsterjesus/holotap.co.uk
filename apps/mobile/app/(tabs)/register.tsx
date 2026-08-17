/**
 * =============================================================================
 * HOLOTAP MOBILE — CONSUMER REGISTRATION v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          register.tsx
 * Date:          17 August 2026
 * =============================================================================
 * PURPOSE:
 * The Consumer Registration screen is the entry point for Flow 6 (Identity
 * Onboarding). It creates:
 *
 *   • mobile_user
 *   • mobile_device
 *   • mobile_session
 *
 * via the backend /mobile/register API.
 *
 * DESIGN:
 *   • Pure logic, minimal styling (unstyled edition)
 *   • Fully commented for engineering clarity
 *   • Uses Expo Device + Notifications for device identity + push token
 *   • Strong TypeScript typing
 *   • Clean JSX structure
 *
 * ROUTING (Expo Router v6):
 *   Valid hrefs:
 *     "/register"
 *
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { mobileRegister } from "../../api/mobile";

export default function RegisterScreen() {

  // ============================================================================
  // SECTION: Local State
  // Purpose: Store user input and push token required for registration.
  // ============================================================================
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [expoPushToken, setExpoPushToken] = useState("");

  // ============================================================================
  // SECTION: Push Token Acquisition
  // Purpose: Retrieve Expo push token for device registration.
  // Notes: Required for future notification flows and device identity.
  // ============================================================================
  useEffect(() => {
    async function acquirePushToken() {
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);
      } catch (err) {
        console.log("Push token acquisition failed:", err);
      }
    }

    acquirePushToken();
  }, []);

  // ============================================================================
  // SECTION: Registration Handler
  // Purpose: Calls backend /mobile/register to create user, device, and session.
  // Notes: Uses Device.osInternalId and Platform.OS for device identity.
  // ============================================================================
  async function handleRegister() {
    try {
      const result = await mobileRegister({
        mobile_number: mobileNumber,
        country_code: countryCode,
        device_id: Device.osBuildId ?? "unknown-device",

        platform: Platform.OS,
        push_token: expoPushToken
      });

      console.log("Registered:", result);
      alert("Registration successful");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed");
    }
  }

  // ============================================================================
  // SECTION: UI Rendering
  // Purpose: Provides input fields and action button for registration.
  // ============================================================================
  return (
    <View>
      <Text>Mobile Number</Text>
      <TextInput
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="07123456789"
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
