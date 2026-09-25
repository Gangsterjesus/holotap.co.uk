/**
 * =============================================================================
 * HoloTap Mobile — About Screen
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Version: Hero v5.0.0
 *
 * Purpose:
 *   Displays HoloTap product information, version metadata,
 *   environment details, and technology overview.
 *
 * Notes:
 *   • Expo SDK 57 compatible
 *   • React Native Web compatible
 *   • No deprecated shadow* properties
 *   • No runtime dependencies beyond Expo Constants
 * =============================================================================
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

const appVersion =
  Constants.expoConfig?.version ??
  (Constants as any)?.manifest?.version ??
  "1.0.0";

const buildNumber =
  Constants.expoConfig?.extra?.buildNumber ??
  (Constants as any)?.manifest?.extra?.buildNumber ??
  "N/A";

const environment =
  Constants.expoConfig?.extra?.env ??
  (Constants as any)?.manifest?.extra?.env ??
  "production";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({
  title,
  children,
}: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          About HoloTap
        </Text>

        <View style={styles.card}>
          <Section title="Our Mission">
            <Text style={styles.text}>
              HoloTap enables fast, secure,
              frictionless QR-powered payments for
              merchants and customers.
            </Text>

            <Text style={styles.text}>
              Built around digital identity,
              verification, and scalable payment
              infrastructure.
            </Text>
          </Section>

          <Section title="Application Information">
            <Text style={styles.text}>
              Version: {appVersion}
            </Text>

            <Text style={styles.text}>
              Build: {buildNumber}
            </Text>

            <Text style={styles.text}>
              Environment: {environment}
            </Text>

            <Text style={styles.text}>
              Engineer ID: E5357171
            </Text>
          </Section>

          <Section title="Technology Stack">
            <Text style={styles.text}>
              React Native
            </Text>

            <Text style={styles.text}>
              Expo SDK 57
            </Text>

            <Text style={styles.text}>
              Expo Router
            </Text>

            <Text style={styles.text}>
              TypeScript
            </Text>

            <Text style={styles.text}>
              Node.js
            </Text>

            <Text style={styles.text}>
              PostgreSQL
            </Text>

            <Text style={styles.text}>
              Prisma ORM
            </Text>
          </Section>

          <Section title="Hero v5.0.0">
            <Text style={styles.text}>
              Identity Layer
            </Text>

            <Text style={styles.text}>
              Session Management
            </Text>

            <Text style={styles.text}>
              Payment Processing
            </Text>

            <Text style={styles.text}>
              Audit Infrastructure
            </Text>

            <Text style={styles.text}>
              Ledger Verification
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,

    /* SDK 57 / RN Web */
    boxShadow:
      "0px 2px 8px rgba(0,0,0,0.08)",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },

  text: {
    fontSize: 16,
    color: "#444444",
    marginBottom: 6,
    lineHeight: 24,
  },
});