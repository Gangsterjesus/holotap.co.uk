/*
 * =====================================================================================
 *  HoloTap Engineering - Payment Status
 * -------------------------------------------------------------------------------------
 *  File: apps/Holotap.Mobile/app/payments/status.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Payments / Status
 *  Revision: v5.0.0
 *  Date: 02 Oct 2026
 *  Copyright (c) 2026 HoloTap Technologies Ltd.
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Present the current payment status within the HoloTap HERO payment flow.
 *
 *  Module Responsibilities:
 *      - Consume payment metadata supplied through route parameters
 *      - Present payment identifier and merchant identifier
 *      - Present payment amount and currency
 *      - Present the current payment status
 *      - Provide deterministic fallback values
 *
 *  Architecture Boundary:
 *      This screen presents payment state only.
 *      Authoritative payment state remains server-owned.
 * =====================================================================================
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

type PaymentStatusParams = {
  id?: string;
  status?: string;
  amount?: string;
  currency?: string;
  merchantId?: string;
};

function formatAmount(
  amount?: string,
  currency?: string
): string {
  if (!amount) {
    return "Unavailable";
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return amount;
  }

  const currencyCode = currency ?? "GBP";

  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(numericAmount);
  } catch {
    return `${currencyCode} ${numericAmount.toFixed(2)}`;
  }
}

export default function PaymentStatusScreen() {
  const {
    id,
    status,
    amount,
    currency,
    merchantId,
  } = useLocalSearchParams<PaymentStatusParams>();

  const formattedAmount = formatAmount(
    amount,
    currency
  );

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
          Payment Status
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Amount
            </Text>

            <Text style={styles.amount}>
              {formattedAmount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Status
            </Text>

            <Text style={styles.value}>
              {status ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment ID
            </Text>

            <Text
              style={styles.value}
              selectable
            >
              {id ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Merchant ID
            </Text>

            <Text
              style={styles.value}
              selectable
            >
              {merchantId ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Currency
            </Text>

            <Text style={styles.value}>
              {currency ?? "GBP"}
            </Text>
          </View>
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

  content: {
    padding: 20,
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

  row: {
    paddingVertical: 6,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
  },

  value: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },

  amount: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
});