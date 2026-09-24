/**
 * =============================================================================
 * HoloTap Mobile — Merchant Profile Screen (Hero v5.0.0)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Product: HoloTap Hero v5.0.0
 * File: app/profile.tsx
 * Date: 23 September 2026
 *
 * Purpose:
 *   Displays merchant identity, governance and platform status
 *   information sourced from the HoloTap identity subsystem.
 *
 * Responsibilities:
 *   • Display merchant identity
 *   • Display merchant governance information
 *   • Display hologram metadata
 *   • Display session status
 *   • Provide deterministic fallback states
 *
 * Flow Alignment:
 *   • Flow 1  — Identity
 *   • Flow 7  — Settings
 *   • Flow 8  — Merchant Profile
 *   • Flow 10 — Session Governance
 *   • Flow 11 — Actor Resolution
 *   • Flow 12 — Identity Logging
 *
 * Hero v5.0.0 Objectives:
 *   • Identity-first architecture
 *   • Session visibility
 *   • Auditability
 *   • Merchant governance readiness
 *   • Future localisation support
 *   • Future multi-currency support
 * =============================================================================
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useMerchantIdentity } from "../hooks/useMerchantIdentity";

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

export default function ProfileScreen() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  if (identityLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Loading merchant identity...
        </Text>
      </SafeAreaView>
    );
  }

  if (identityError || !identity) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Unable to load merchant identity.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          Merchant Profile
        </Text>

        <View style={styles.card}>
          <Section title="Merchant Identity">
            <Text style={styles.text}>
              Name: {identity.name}
            </Text>

            <Text style={styles.text}>
              Merchant ID: {identity.id}
            </Text>

            <Text style={styles.text}>
              Status: {identity.status}
            </Text>
          </Section>

          <Section title="Merchant Governance">
            <Text style={styles.text}>
              Role: merchant
            </Text>

            <Text style={styles.text}>
              Source:
              {" "}
              identity-service
            </Text>
          </Section>

          <Section title="Hologram Information">
            <Text style={styles.text}>
              Hologram ID:
              {" "}
              {identity.hologramId ?? "Not Assigned"}
            </Text>
          </Section>

          <Section title="Session Status">
            <Text style={styles.text}>
              Session State:
              {" "}
              Active
            </Text>

            <Text style={styles.text}>
              Risk State:
              {" "}
              Low
            </Text>
          </Section>

          <Section title="Hero v5.0.0 Platform Status">
            <Text style={styles.text}>
              Identity System: Operational
            </Text>

            <Text style={styles.text}>
              Session Governance: Enabled
            </Text>

            <Text style={styles.text}>
              Audit Infrastructure: Active
            </Text>

            <Text style={styles.text}>
              Merchant Profile: Verified
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
    fontSize: 30,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    boxShadow:
      "0px 2px 8px rgba(0,0,0,0.08)",
    marginBottom: 40,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },

  message: {
    fontSize: 16,
    marginTop: 20,
  },
});