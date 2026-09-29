/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT DETAIL
 * =============================================================================
 * File: apps/Holotap.Mobile/app/payments/[id].tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Payments
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Present the details of an individual HoloTap payment.
 *
 * Module Responsibilities
 * - Read the payment identifier from the active route.
 * - Retrieve the corresponding payment record.
 * - Present payment ID, amount, status and timestamp.
 * - Surface payment retrieval failures.
 *
 * Architecture Boundary
 * This screen consumes and presents payment state.
 * Authoritative payment state remains server-owned.
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getPaymentById, type PaymentRecord } from "../../payment";

export default function PaymentDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    const loadPayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const record = await getPaymentById(id);

        if (active) {
          setPayment(record);
        }
      } catch {
        if (active) {
          setError("Unable to load payment.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadPayment();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>HOLOTAP</Text>
      <Text style={styles.title}>Payment Detail</Text>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading payment...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && payment && (
        <View style={styles.card}>
          <Text style={styles.label}>Payment ID</Text>
          <Text style={styles.value}>{payment.id}</Text>

          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>
            £{payment.amount.toFixed(2)}
          </Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.status}>{payment.status}</Text>

          <Text style={styles.label}>Timestamp</Text>
          <Text style={styles.value}>
            {new Date(payment.timestamp).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    padding: 24,
  },

  eyebrow: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 24,
  },

  loading: {
    alignItems: "center",
    paddingVertical: 32,
  },

  loadingText: {
    color: "#6B7280",
    fontSize: 15,
    marginTop: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 16,
  },

  value: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800",
  },

  status: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "700",
  },

  error: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
  },
});