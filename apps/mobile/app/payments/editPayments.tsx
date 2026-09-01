/**
 * =============================================================================
 * HoloTap Mobile — Edit Payment Surface (Flow 8)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Date: 01 September 2026
 * -----------------------------------------------------------------------------
 * Description:
 *   Merchant-facing edit surface for modifying payment records.
 *   - Loads payment by ID
 *   - Allows editing amount + status
 *   - Persists changes via Payment DAL
 *   - Navigates back to Payment Detail Surface
 *
 *   Fully aligned with Flow 8 lifecycle:
 *     index → [id] → edit → refund → payment-result
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

// DAL imports — group folders must be imported literally
import type { PaymentRecord } from "../(dal)/payment";
import { getPaymentById, updatePayment } from "../(dal)/payment";

export default function EditPaymentScreen() {
  const { id } = useLocalSearchParams();

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  /**
   * Load payment details on mount.
   */
  useEffect(() => {
    if (!id) return;

    getPaymentById(id as string)
      .then((p: PaymentRecord) => {
        setPayment(p);
        setAmount(String(p.amount));
        setStatus(p.status);
      })
      .catch(() => setError("Unable to load payment."));
  }, [id]);

  /**
   * Persist changes to backend.
   */
  const handleSave = async () => {
    if (!payment) return;

    try {
      await updatePayment(payment.id, {
        amount: Number(amount),
        status,
      });

      // Expo Router v6 requires colon syntax + params object
      router.replace({
        pathname: "/payments/:id",
        params: { id: payment.id },
      });
    } catch {
      setError("Unable to update payment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Payment</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {payment && (
        <>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 16 },
  label: { marginTop: 12, fontSize: 14, color: "#555" },
  input: {
    marginTop: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#007aff",
    padding: 14,
    borderRadius: 8,
  },
  saveText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  error: { fontSize: 16, color: "#c00", marginBottom: 12 },
});
