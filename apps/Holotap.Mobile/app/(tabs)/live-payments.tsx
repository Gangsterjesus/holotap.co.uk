/**
 * =============================================================================
 * HOLOTAP ENGINEERING — HERO BUILD v5.0.0
 * LIVE PAYMENTS
 * =============================================================================
 * Engineer ID: E5357171
 * File: live-payments.tsx
 *
 * PURPOSE:
 * Merchant live-payment feed with identity gating and deterministic
 * five-second backend polling.
 *
 * HERO v5.0.0:
 * - React 19.2 Effect Event architecture
 * - Hooks execute unconditionally at component top level
 * - Identity-gated backend polling
 * - Deterministic loading and error states
 * - Polling cleanup on unmount
 * =============================================================================
 */

import React, { useEffect, useEffectEvent, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { useMerchantIdentity } from "../../hooks/useMerchantIdentity";

interface PaymentEvent {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

export default function LivePayments() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  const [events, setEvents] = useState<PaymentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPayments = useEffectEvent(async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        "https://api.holotap.co/merchant/payments/live"
      );

      if (!response.ok) {
        throw new Error(`Payment feed request failed: ${response.status}`);
      }

      const payload = await response.json();

      setEvents(
        Array.isArray(payload.events)
          ? (payload.events as PaymentEvent[])
          : []
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (
      identityLoading ||
      identityError ||
      !identity ||
      identity.status !== "verified"
    ) {
      return;
    }

    const initialLoad = setTimeout(() => {
      void loadPayments();
    }, 0);

    const interval = setInterval(() => {
      void loadPayments();
    }, 5000);

    return () => {
      clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, [identity, identityError, identityLoading]);

  if (identityLoading) {
    return (
      <SafeAreaView>
        <Text>Loading identity…</Text>
      </SafeAreaView>
    );
  }

  if (identityError || !identity) {
    return (
      <SafeAreaView>
        <Text>Unable to load merchant identity.</Text>
      </SafeAreaView>
    );
  }

  if (identity.status !== "verified") {
    return (
      <SafeAreaView>
        <Text>Live payments unavailable — merchant not verified.</Text>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading live payments…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Unable to load live payments.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Live Payments</Text>

        {events.length === 0 && (
          <Text>No recent payment activity.</Text>
        )}

        {events.map((event) => (
          <View key={event.id}>
            <Text>
              Amount: {event.amount} {event.currency}
            </Text>
            <Text>Status: {event.status}</Text>
            <Text>Time: {event.timestamp}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}