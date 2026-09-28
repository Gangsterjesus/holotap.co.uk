/**
 * =============================================================================
 * HOLOTAP MOBILE — SETTINGS SCREEN
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/settings.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile WebUI / Settings
 * Revision: HERO
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provides the HoloTap merchant settings and account-management interface.
 *
 * Module Responsibilities
 * - Present merchant account information.
 * - Provide merchant profile navigation.
 * - Present application version information.
 * - Provide HoloTap information navigation.
 * - Present the account logout action.
 * =============================================================================
 */

import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  const appVersion = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>HOLOTAP</Text>
        <Text style={styles.header}>Settings</Text>

        <Text style={styles.subtitle}>
          Manage your merchant account and HoloTap application settings.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Merchant Profile</Text>

        <View style={styles.detail}>
          <Text style={styles.label}>Merchant</Text>
          <Text style={styles.value}>HoloTap Merchant</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>merchant@example.com</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.primaryButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>HoloTap</Text>

        <View style={styles.detail}>
          <Text style={styles.label}>App version</Text>
          <Text style={styles.value}>{appVersion}</Text>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.secondaryButtonText}>About HoloTap</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 48,
  },

  hero: {
    marginBottom: 24,
  },

  eyebrow: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  header: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
    marginBottom: 16,
    padding: 20,
  },

  cardTitle: {
    color: "#111827",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 16,
  },

  detail: {
    marginBottom: 12,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },

  value: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
  },

  primaryButton: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 13,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    alignItems: "center",
    borderColor: "#007AFF",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 8,
    paddingVertical: 12,
  },

  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutButton: {
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    paddingVertical: 14,
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },
});