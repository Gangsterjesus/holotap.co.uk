/**
 * =============================================================================
 * HOLOTAP MOBILE — MERCHANT QR GENERATION
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/generate-qrc.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Merchant Payment Entry
 * Revision: v5.0.0 — HERO QR Generation Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Present the active merchant QR payment session for customer scanning.
 *
 * Module Responsibilities
 * - Validate merchant identity state.
 * - Consume the active QR session subsystem.
 * - Prevent QR presentation for unverified merchants.
 * - Present the active session as a customer-scannable QR code.
 * - Surface session expiry information.
*/
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { useMerchantIdentity } from "../../hooks/useMerchantIdentity";
import { useQrSession } from "../../hooks/QRSessionLayer";

export default function GenerateQRC() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useQrSession();

  if (identityLoading) {
    return <StatusScreen message="Loading merchant identity..." />;
  }

  if (identityError || !identity) {
    return <StatusScreen message="Unable to load merchant identity." error />;
  }

  if (identity.status !== "verified") {
    return (
      <StatusScreen
        message="QR payments are unavailable until the merchant is verified."
        error
      />
    );
  }

  if (sessionLoading) {
    return <StatusScreen message="Generating secure payment QR..." />;
  }

  if (sessionError || !session) {
    return <StatusScreen message="Unable to generate QR session." error />;
  }

  if (!session.active || !session.sessionId) {
    return <StatusScreen message="No active QR payment session." />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>HOLOTAP</Text>
        <Text style={styles.title}>Ready to Scan.</Text>

        <Text style={styles.description}>
          Ask the customer to scan this QR code to continue with their HoloTap
          payment.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Payment session active</Text>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={session.sessionId}
            size={240}
            backgroundColor="#FFFFFF"
            color="#111827"
          />
        </View>

        <Text style={styles.expiryLabel}>Session expires</Text>
        <Text style={styles.expiryValue}>{session.expiresAt}</Text>
      </View>

      <Text style={styles.securityText}>
        Secure HoloTap merchant payment session
      </Text>
    </SafeAreaView>
  );
}

function StatusScreen({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.statusCard}>
        <Text style={styles.eyebrow}>HOLOTAP</Text>

        <Text style={error ? styles.errorMessage : styles.statusMessage}>
          {message}
        </Text>
      </View>
    </SafeAreaView>
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
    marginBottom: 24,
  },

  eyebrow: {
    color: "#6D28D9",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.5,
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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 20,
    borderWidth: 1,
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
    padding: 28,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 8,
  },

  statusText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },

  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },

  expiryLabel: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  expiryValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },

  securityText: {
    alignSelf: "center",
    color: "#6B7280",
    fontSize: 13,
    marginTop: 18,
  },

  statusCard: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 18,
    borderWidth: 1,
    padding: 24,
  },

  statusMessage: {
    color: "#374151",
    fontSize: 17,
    lineHeight: 25,
  },

  errorMessage: {
    color: "#B91C1C",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 25,
  },
});