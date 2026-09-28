/**
 * =============================================================================
 * HOLOTAP MOBILE — REFUND / VOID
 * =============================================================================
 * File: apps/Holotap.Mobile/app/(tabs)/refund.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Merchant Payments
 * Revision: v5.0.0 - HERO Build
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provide the merchant-facing entry point for refund and void operations.
 *
 * Module Responsibilities
 * - Present the Refund / Void HERO surface.
 * - Reserve the screen for eligible transaction refund operations.
 * - Avoid inactive backend dependencies until refund execution is wired.
 * =============================================================================
 */

import { StyleSheet, Text, View } from "react-native";

export default function RefundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refund / Void</Text>

      <Text style={styles.description}>
        Select an eligible payment to begin a refund or void operation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
  },
});