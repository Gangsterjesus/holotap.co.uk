/**
 * =============================================================================
 * HOLOTAP MOBILE - MERCHANT PROFILE
 * =============================================================================
 * File: apps/Holotap.Mobile/app/profile.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Merchant Identity
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Present merchant identity and platform availability information supplied
 * through the HoloTap identity subsystem.
 *
 * Module Responsibilities
 * - Load the active merchant identity.
 * - Present merchant identity information.
 * - Present available hologram metadata.
 * - Surface identity service availability to the merchant or user.
 * - Surface loading and deterministic failure states.
 *
 * Architecture Boundary
 * This screen consumes and presents merchant identity information.
 * Authoritative merchant, identity, governance and risk state remains
 * server-owned.
 * =============================================================================
 */

import type { ReactNode } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMerchantIdentity } from "../hooks/useMerchantIdentity";

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
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
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#6D28D9" />

        <Text style={styles.message}>
          Loading merchant identity...
        </Text>
      </SafeAreaView>
    );
  }

  if (identityError || !identity) {
    return (
      <SafeAreaView style={styles.center}>
        <View style={styles.servicePanel}>
          <Text style={styles.serviceUnavailable}>
            HoloTap service unavailable
          </Text>

          <Text style={styles.message}>
            Merchant identity cannot currently be verified.
          </Text>

          <Text style={styles.serviceMessage}>
            The HoloTap server or identity service could not be reached.
            Please try again when the service becomes available.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>HOLOTAP</Text>
        <Text style={styles.header}>Merchant Profile</Text>

        <View style={styles.card}>
          <Section title="Merchant Identity">
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>
              {identity.name}
            </Text>

            <Text style={styles.label}>Merchant ID</Text>
            <Text style={styles.value}>
              {identity.id}
            </Text>

            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>
              {identity.status}
            </Text>
          </Section>

          <Section title="Merchant Governance">
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>Merchant</Text>

            <Text style={styles.label}>Identity Source</Text>
            <Text style={styles.value}>
              HoloTap identity service
            </Text>
          </Section>

          <Section title="Hologram Information">
            <Text style={styles.label}>Hologram ID</Text>
            <Text style={styles.value}>
              {identity.hologramId ?? "Not assigned"}
            </Text>
          </Section>

          <Section title="Platform Status">
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator} />

              <Text style={styles.statusText}>
                HoloTap identity service available
              </Text>
            </View>
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
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    padding: 24,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  eyebrow: {
    color: "#6D28D9",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 16,
    marginBottom: 6,
  },

  header: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 3,
  },

  value: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },

  message: {
    color: "#6B7280",
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
  },

  servicePanel: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },

  serviceUnavailable: {
    color: "#B91C1C",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  serviceMessage: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    textAlign: "center",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A34A",
    marginRight: 10,
  },

  statusText: {
    color: "#166534",
    fontSize: 15,
    fontWeight: "700",
  },
});