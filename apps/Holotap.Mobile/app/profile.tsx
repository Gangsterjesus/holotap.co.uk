/*
 * =====================================================================================
 *  HoloTap Engineering - Merchant Profile
 * -------------------------------------------------------------------------------------
 *  File: apps/Holotap.Mobile/app/profile.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Merchant / Profile
 *  Revision: v5.0.0
 *  Date: 02 Oct 2026
 *  Copyright (c) 2026 HoloTap Technologies Ltd.
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Present the active merchant profile used by the HoloTap HERO experience.
 *
 *  Module Responsibilities:
 *      - Load the active merchant identity
 *      - Present merchant name, identifier and status
 *      - Preserve existing merchant identity metadata
 *      - Surface HoloTap service availability
 *      - Provide deterministic loading and failure states
 *
 *  Architecture Boundary:
 *      This screen consumes and presents merchant identity information.
 *      Authoritative merchant and identity state remains server-owned.
 * =====================================================================================
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

/*
 * =====================================================================================
 *  Section
 * =====================================================================================
 */

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}

/*
 * =====================================================================================
 *  Merchant Profile Screen
 * =====================================================================================
 */

export default function ProfileScreen() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  /*
   * ---------------------------------------------------------------------------
   * Loading State
   * ---------------------------------------------------------------------------
   */

  if (identityLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#6D28D9"
        />

        <Text style={styles.message}>
          Loading merchant profile...
        </Text>
      </SafeAreaView>
    );
  }

  /*
   * ---------------------------------------------------------------------------
   * Failure State
   * ---------------------------------------------------------------------------
   */

  if (identityError || !identity) {
    return (
      <SafeAreaView style={styles.center}>
        <View style={styles.servicePanel}>
          <Text style={styles.serviceUnavailable}>
            Merchant profile unavailable
          </Text>

          <Text style={styles.message}>
            HoloTap cannot currently verify this merchant.
          </Text>

          <Text style={styles.serviceMessage}>
            The HoloTap service could not be reached.
            Please try again when the service becomes available.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * ---------------------------------------------------------------------------
   * HERO Merchant Profile
   * ---------------------------------------------------------------------------
   */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>
          HOLOTAP
        </Text>

        <Text style={styles.header}>
          Merchant Profile
        </Text>

        <Text style={styles.subtitle}>
          Merchant information used by your HoloTap account.
        </Text>

        <View style={styles.card}>
          <Section title="Merchant">
            <Text style={styles.label}>
              Name
            </Text>

            <Text style={styles.value}>
              {identity.name}
            </Text>

            <Text style={styles.label}>
              Merchant ID
            </Text>

            <Text
              style={styles.value}
              selectable
            >
              {identity.id}
            </Text>

            <Text style={styles.label}>
              Status
            </Text>

            <View style={styles.statusRow}>
              <View style={styles.statusIndicator} />

              <Text style={styles.statusText}>
                {identity.status}
              </Text>
            </View>
          </Section>

          <Section title="Merchant Account">
            <Text style={styles.label}>
              Role
            </Text>

            <Text style={styles.value}>
              Merchant
            </Text>

            <Text style={styles.label}>
              Identity Source
            </Text>

            <Text style={styles.value}>
              HoloTap
            </Text>
          </Section>

          <Section title="HoloTap Identity">
            <Text style={styles.label}>
              Hologram ID
            </Text>

            <Text style={styles.value}>
              {identity.hologramId ?? "Not assigned"}
            </Text>
          </Section>

          <Section title="Service Status">
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator} />

              <Text style={styles.statusText}>
                HoloTap service available
              </Text>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
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

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
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
});