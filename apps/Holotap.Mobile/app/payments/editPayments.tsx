/*
 * =====================================================================================
 *  HoloTap Engineering - Merchant Payment Management
 * -------------------------------------------------------------------------------------
 *  File: edit.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Merchant / Payments
 *  Revision: v5.0.0
 *  Date: 02 Oct 2026
 *  Copyright (c) 2026 HoloTap
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Provide the merchant-facing payment editing surface used by the
 *      HoloTap HERO payment journey.
 *
 *  Module Responsibilities:
 *      - Resolve an existing payment by ID
 *      - Present the current payment amount and status
 *      - Validate editable payment data
 *      - Persist approved payment changes through the Payment DAL
 *      - Return to the payment detail surface after a successful update
 *      - Surface loading and persistence failures to the merchant
 * =====================================================================================
 */

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import type { PaymentRecord } from "../../payment";
import {
  getPaymentById,
  updatePayment,
} from "../../payment";

export default function EditPaymentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hasId = typeof id === "string" && id.length > 0;

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(!hasId ? false : true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(
    hasId ? null : "Payment ID is missing.",
  );

  /*
   * ---------------------------------------------------------------------------
   * Load Payment
   * ---------------------------------------------------------------------------
   */

  useEffect(() => {
    if (!hasId) {
      return;
    }

    let active = true;

    const loadPayment = async () => {
      try {
        const record = await getPaymentById(id);

        if (!active) {
          return;
        }

        setPayment(record);
        setAmount(String(record.amount));
        setStatus(record.status);
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
  }, [id, hasId]);

  /*
   * ---------------------------------------------------------------------------
   * Save Payment
   * ---------------------------------------------------------------------------
   */

  const handleSave = async () => {
    if (!payment || saving) {
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter a valid payment amount.");
      return;
    }

    if (!status.trim()) {
      setError("Payment status is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updatePayment(payment.id, {
        amount: numericAmount,
        status: status.trim(),
      });

      router.replace({
        pathname: "/payments/[id]",
        params: {
          id: payment.id,
        },
      });
    } catch {
      setError("Unable to update payment.");
      setSaving(false);
    }
  };

  /*
   * ---------------------------------------------------------------------------
   * Render
   * ---------------------------------------------------------------------------
   */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading payment...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Edit Payment
      </Text>

      <Text style={styles.subtitle}>
        Update the merchant payment details.
      </Text>

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {payment && (
        <>
          <Text style={styles.label}>
            Amount
          </Text>

          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            editable={!saving}
          />

          <Text style={styles.label}>
            Status
          </Text>

          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
            editable={!saving}
          />

          <Pressable
            style={[
              styles.saveButton,
              saving && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveText}>
                Save Changes
              </Text>
            )}
          </Pressable>
        </>
      )}
    </View>
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
    padding: 24,
    backgroundColor: "#ffffff",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 15,
    color: "#6b7280",
  },

  loadingText: {
    marginTop: 12,
    color: "#6b7280",
  },

  label: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    marginTop: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  saveButton: {
    marginTop: 24,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#007aff",
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveText: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },

  error: {
    marginBottom: 12,
    fontSize: 16,
    color: "#b91c1c",
  },
});