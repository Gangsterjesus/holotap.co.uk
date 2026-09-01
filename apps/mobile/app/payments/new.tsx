/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT INITIALISATION v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          app/payments/new.tsx
 * Date:          01 September 2026
 * =============================================================================
 * PURPOSE:
 * Implements Flow 6 + Flow 7 — Payment Initialisation & Submission.
 * Receives merchantId + sessionId from Flow 4, allows the user to enter
 * payment details, submits them to the backend, and transitions into
 * Flow 8 (Payment Result).
 *
 * PAYMENT LIFECYCLE:
 *   1. Receive route params (merchantId, sessionId)
 *   2. Validate input
 *   3. Submit payment to backend
 *   4. Navigate to Payment Result screen
 *
 * VERSION NOTES:
 *   • Correct Expo Router v6 param narrowing
 *   • No generics, no TS2344, no invalid constraints
 *   • Unstyled, deterministic, identity‑aligned
 *   • Pure TypeScript, pure fintech flow
 *
 * FLOW ALIGNMENT:
 *   Flow 4 → Session Verification
 *   Flow 5 → Payment Initialisation (this screen)
 *   Flow 6 → Payment Submission
 *   Flow 8 → Payment Result
 * =============================================================================
 */

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Button } from "react-native";


import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { apiPost } from "../../api/client";

/**
 * Backend response for payment submission.
 */
interface PaymentResponse {
  success: boolean;
  message?: string;
}

/**
 * Submit payment to backend (clean + testable).
 */
async function submitPayment(
  merchantId: string,
  sessionId: string,
  amount: number,
  description: string
): Promise<PaymentResponse> {
  return apiPost("/payment/process", {
    merchantId,
    sessionId,
    amount,
    description,
  });
}

/**
 * Main Payment Initialisation Screen (unstyled)
 */
export default function PaymentScreen() {
  const router = useRouter();

  /**
   * Correct Expo Router v6 param narrowing
   */
  const params = useLocalSearchParams();

  const merchantId = params.merchantId as string | undefined;
  const sessionId = params.sessionId as string | undefined;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle payment submission.
   */
  async function handleSubmit() {
    setError(null);

    if (!merchantId || !sessionId) {
      setError("Missing merchant or session ID.");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      setError("Invalid amount — must be numeric.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitPayment(
        merchantId,
        sessionId,
        Number(amount),
        description
      );

      if (result.success) {
        const next: Href = {
          pathname: "/payment-result",
          params: {
            amount,
            merchantId,
            sessionId,
          },
        };

        router.push(next);
        return;
      }

      setError(result.message ?? "Payment failed.");
    } catch {
      setError("Network error — unable to reach payment server.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Main unstyled fintech UI
   */
  return (
    <SafeAreaView>
      <View>
        <Text>Payment Initialisation</Text>

        <Text>Merchant ID: {merchantId ?? "—"}</Text>
        <Text>Session ID: {sessionId ?? "—"}</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description (optional)"
        />

        <Button
          title={loading ? "Processing…" : "Submit Payment"}
          onPress={handleSubmit}
          disabled={loading}
        />

        {error && <Text>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}
