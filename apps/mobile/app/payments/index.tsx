/*  
 * =====================================================================================
 *  HoloTap Mobile — Payment Lifecycle Shell (Flow 8)
 * =====================================================================================
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useIdentity } from "../(content)/IdentityContext";
import { getPayments, type PaymentRecord } from "../(dal)/payment";

export default function PaymentsIndexScreen() {
  const router = useRouter();
  const identity = useIdentity();

  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identity) return;

    getPayments(identity.sessionId)
      .then(setPayments)
      .catch(() => setError("Unable to load payments."));
  }, [identity]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              router.push({
                pathname: "/payments/:id",
                params: { id: item.id },
              });
            }}
          >
            <Text style={styles.cardId}>{item.id}</Text>
            <Text style={styles.cardAmount}>£{item.amount.toFixed(2)}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
            <Text style={styles.cardTs}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 8 },
  error: { color: "#c00", marginBottom: 16 },
  card: {
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardId: { fontSize: 16, fontWeight: "600" },
  cardAmount: { fontSize: 14, marginTop: 4 },
  cardStatus: { fontSize: 14, marginTop: 4 },
  cardTs: { fontSize: 12, color: "#666", marginTop: 4 },
});
