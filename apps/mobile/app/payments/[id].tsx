/*  
 * =====================================================================================
 *  HoloTap Mobile — Payment Detail Surface (Flow 8)
 * =====================================================================================
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPaymentById, type PaymentRecord } from "../(dal)/payment";

export default function PaymentDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getPaymentById(id)
      .then(setPayment)
      .catch(() => setError("Unable to load payment."));
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Detail</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {payment && (
        <>
          <Text style={styles.label}>Payment ID</Text>
          <Text style={styles.value}>{payment.id}</Text>

          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>£{payment.amount.toFixed(2)}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{payment.status}</Text>

          <Text style={styles.label}>Timestamp</Text>
          <Text style={styles.value}>
            {new Date(payment.timestamp).toLocaleString()}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 16 },
  label: { marginTop: 12, fontSize: 14, color: "#555" },
  value: { fontSize: 18, fontWeight: "600", color: "#000" },
  error: { fontSize: 16, color: "#c00" },
});
