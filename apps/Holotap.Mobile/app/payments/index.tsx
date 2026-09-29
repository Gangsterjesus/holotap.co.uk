/**
 * =============================================================================
 * HOLOTAP MOBILE - PAYMENTS
 * =============================================================================
 * File: apps/Holotap.Mobile/app/payments/index.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Payments
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Present payment history for the active HoloTap mobile session.
 *
 * Module Responsibilities
 * - Load payments associated with the active session.
 * - Present payment amount, status and timestamp.
 * - Navigate to an individual payment.
 * - Surface loading, empty and error states.
 * =============================================================================
 */

import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useIdentity } from "../../identity/IdentityContext";
import { getPayments, type PaymentRecord } from "../../payment";

export default function PaymentsIndexScreen() {
  const router = useRouter();
  const identity = useIdentity();

  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    if (!identity?.sessionId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const records = await getPayments(identity.sessionId);
      setPayments(records);
    } catch (loadError) {
      console.error("Payment history load failed:", loadError);
      setError("Unable to load payments.");
    } finally {
      setLoading(false);
    }
  }, [identity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void loadPayments();
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadPayments]);

  if (!identity?.sessionId) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.message}>
          A HoloTap session is required to view payments.
        </Text>
      </View>
    );
  }

  if (loading && payments.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading payments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>HOLOTAP</Text>
      <Text style={styles.title}>Payments</Text>

      {error ? (
        <View style={styles.errorPanel}>
          <Text style={styles.error}>{error}</Text>

          <Pressable style={styles.retryButton} onPress={loadPayments}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          payments.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No payments yet</Text>
            <Text style={styles.message}>
              Completed payments will appear here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/payments/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardAmount}>
                £{item.amount.toFixed(2)}
              </Text>

              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>

            <Text style={styles.cardId}>{item.id}</Text>

            <Text style={styles.cardTimestamp}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },

  eyebrow: {
    color: "#6d28d9",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },

  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 24,
  },

  emptyList: {
    flexGrow: 1,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  message: {
    color: "#6b7280",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },

  errorPanel: {
    marginBottom: 16,
  },

  error: {
    color: "#b91c1c",
    marginBottom: 10,
  },

  retryButton: {
    alignSelf: "flex-start",
    backgroundColor: "#6d28d9",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  retryText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },

  cardPressed: {
    opacity: 0.8,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardAmount: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
  },

  cardStatus: {
    color: "#6d28d9",
    fontSize: 13,
    fontWeight: "700",
  },

  cardId: {
    color: "#374151",
    fontSize: 13,
    marginTop: 12,
  },

  cardTimestamp: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 5,
  },
});