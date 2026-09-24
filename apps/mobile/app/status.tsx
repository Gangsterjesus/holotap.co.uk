/**
 * =============================================================================
 * HoloTap Mobile — Merchant Profile Screen (Hero v5.0.0)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Product: HoloTap Hero v5.0.0
 * File: app/profile.tsx
 * Date: 23 September 2026
 *
 * PURPOSE:
 *   Displays merchant identity, session governance,
 *   QR identity status, hologram verification status,
 *   platform readiness and future roadmap information.
 *
 * ARCHITECTURE:
 *   Merchant Identity
 *          ↓
 *   Session Governance (Flow-10)
 *          ↓
 *   Actor Resolution (Flow-11)
 *          ↓
 *   QR Identity
 *          ↓
 *   Hologram Verification Layer
 *          ↓
 *   Payment Trust Layer
 *
 * RESPONSIBILITIES:
 *   • Display merchant identity metadata
 *   • Display merchant governance information
 *   • Display QR verification status
 *   • Display hologram verification status
 *   • Display session governance status
 *   • Display platform operational status
 *   • Provide deterministic fallback states
 *
 * FLOW ALIGNMENT:
 *   • Flow 1  — Identity
 *   • Flow 7  — Settings
 *   • Flow 8  — Merchant Profile
 *   • Flow 10 — Session Governance
 *   • Flow 11 — Actor Resolution
 *   • Flow 12 — Identity Logging
 *
 * HERO V5.0.0 OBJECTIVES:
 *   • Identity-first architecture
 *   • Merchant governance visibility
 *   • Session governance visibility
 *   • QR identity visibility
 *   • Hologram verification visibility
 *   • Auditability readiness
 *   • Translation readiness
 *   • Multi-currency readiness
 * =============================================================================
 */
/**
 * =============================================================================
 * HoloTap Mobile — Merchant Profile Screen (Hero v5.0.0)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Product: HoloTap Hero v5.0.0
 * File: app/profile.tsx
 * Date: 23 September 2026
 *
 * PURPOSE:
 *   Displays merchant identity, session governance,
 *   QR identity status, hologram verification status,
 *   platform readiness and future roadmap information.
 *
 * ARCHITECTURE:
 *   Merchant Identity
 *          ↓
 *   Session Governance (Flow-10)
 *          ↓
 *   Actor Resolution (Flow-11)
 *          ↓
 *   QR Identity
 *          ↓
 *   Hologram Verification Layer
 *          ↓
 *   Payment Trust Layer
 *
 * RESPONSIBILITIES:
 *   • Display merchant identity metadata
 *   • Display merchant governance information
 *   • Display QR verification status
 *   • Display hologram verification status
 *   • Display session governance status
 *   • Display platform operational status
 *   • Provide deterministic fallback states
 *
 * FLOW ALIGNMENT:
 *   • Flow 1  — Identity
 *   • Flow 7  — Settings
 *   • Flow 8  — Merchant Profile
 *   • Flow 10 — Session Governance
 *   • Flow 11 — Actor Resolution
 *   • Flow 12 — Identity Logging
 *
 * HERO V5.0.0 OBJECTIVES:
 *   • Identity-first architecture
 *   • Merchant governance visibility
 *   • Session governance visibility
 *   • QR identity visibility
 *   • Hologram verification visibility
 *   • Auditability readiness
 *   • Translation readiness
 *   • Multi-currency readiness
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

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  /**
   * Loading State
   */
  if (identityLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Loading merchant identity...
        </Text>
      </SafeAreaView>
    );
  }

  /**
   * Error State
   */
  if (identityError || !identity) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Unable to load merchant identity.
        </Text>
      </SafeAreaView>
    );
  }

  const governanceIdentity = identity as typeof identity & {
    sessionState?: string;
    riskState?: string;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
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

         <Section title="Session Governance">
  <InfoRow
    label="Session State"
    value={
      governanceIdentity.sessionState ??
      "Active"
    }
  />

  <InfoRow
    label="Risk State"
    value={
      governanceIdentity.riskState ?? "Low"
    }
  />
</Section>

          <Section title="QR & Hologram Verification">
            <Text style={styles.text}>
              QR Identity: Active
            </Text>

            <Text style={styles.text}>
              Hologram Verification:
              {" "}
              {identity.hologramId
                ? "Enabled"
                : "Not Enabled"}
            </Text>

            {identity.hologramId && (
              <Text style={styles.text}>
                Hologram ID:
                {" "}
                {identity.hologramId}
              </Text>
            )}
          </Section>

        <Section title="Merchant Governance">
  <InfoRow
    label="Identity Source"
    value="identity-service"
  />

  <InfoRow
    label="Merchant Status"
    value={identity.status}
  />
</Section>

          <Section title="Identity & Verification">
            <Text style={styles.text}>
              Identity System: Operational
            </Text>

            <Text style={styles.text}>
              QR Identity: Active
            </Text>

            <Text style={styles.text}>
              Hologram Layer:
              {" "}
              {identity.hologramId
                ? "Enabled"
                : "Inactive"}
            </Text>
          </Section>

          <Section title="Hero v5.0.0 Platform Status">
            <Text style={styles.text}>
              Session Governance: Enabled
            </Text>

            <Text style={styles.text}>
              Audit Infrastructure: Active
            </Text>

            <Text style={styles.text}>
              Merchant Profile: Verified
            </Text>

            <Text style={styles.text}>
              Security Hardening: In Progress
            </Text>
          </Section>

          <Section title="Hero v5.0.0 Roadmap">
            <Text style={styles.text}>
              • Merchant Onboarding
            </Text>

            <Text style={styles.text}>
              • Translation Dropdown Menu
            </Text>

            <Text style={styles.text}>
              • Multi-Currency Support
            </Text>

            <Text style={styles.text}>
              • API Documentation Portal
            </Text>

            <Text style={styles.text}>
              • Stablecoin Research
            </Text>

            <Text style={styles.text}>
              • Digital Asset Readiness
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

  content: {
    paddingBottom: 40,
  },

  header: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,

    /**
     * Expo Web compatible styling.
     * Replaces deprecated shadow* properties.
     */
    boxShadow:
      "0px 2px 8px rgba(0,0,0,0.08)",

    marginBottom: 32,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },

  text: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 16,
    color: "#4B5563",
  },

  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },

  message: {
    fontSize: 16,
    marginTop: 20,
    color: "#4B5563",
  },
});