/**
 * =============================================================================
 * HOLOTAP MOBILE — LIVE PAYMENTS LAYER v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          live-payments.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides the merchant with a backend‑driven, identity‑aware feed of
 * incoming payments. This screen polls the backend at a fixed interval
 * and exposes payment events in an unstyled engineering‑grade structure.
 *
 * PAYMENT FEED LIFECYCLE:
 *   1. Merchant identity must be verified
 *   2. Load live payment events from backend
 *   3. Poll feed every 5 seconds for updates
 *   4. Provide safe fallback states when identity or feed is unavailable
 *
 * VERSION NOTES:
 *   • v2: Rewritten for HoloTap engineering architecture
 *   • Identity‑aware payment feed
 *   • No styling, no Expo Router, no UI formatting
 *   • Pure logic, pure TypeScript
 *
 * FLOW ALIGNMENT:
 *   Flow 1 → Identity
 *   Flow 2 → QR Session
 *   Flow 3 → QR Generation
 *   Flow 4 → Live Payments (this screen)
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { useMerchantIdentity } from "../../hooks/useMerchantIdentity";

/**
 * Payment event payload returned by backend.
 */
interface PaymentEvent {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

/**
 * Main Live Payments screen.
 * Identity‑aware, backend‑driven, unstyled.
 */
export default function LivePayments() {
  // Identity subsystem
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  // Payment feed state
  const [events, setEvents] = useState<PaymentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Identity loading state
   */
  if (identityLoading) {
    return (
      <SafeAreaView>
        <Text>Loading identity…</Text>
      </SafeAreaView>
    );
  }

  /**
   * Identity error state
   */
  if (identityError || !identity) {
    return (
      <SafeAreaView>
        <Text>Unable to load merchant identity.</Text>
      </SafeAreaView>
    );
  }

  /**
   * Identity guard — merchant must be verified
   */
  if (identity.status !== "verified") {
    return (
      <SafeAreaView>
        <Text>Live payments unavailable — merchant not verified.</Text>
      </SafeAreaView>
    );
  }

  /**
   * Load payment feed from backend
   */
  async function loadPayments() {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("https://api.holotap.co/merchant/payments/live");
      const json = await res.json();

      setEvents(json.events ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Initial load + polling
   */
  useEffect(() => {
    loadPayments();

    const interval = setInterval(loadPayments, 5000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading live payments…</Text>
      </SafeAreaView>
    );
  }

  /**
   * Error state
   */
  if (error) {
    return (
      <SafeAreaView>
        <Text>Unable to load live payments.</Text>
      </SafeAreaView>
    );
  }

  /**
   * Main unstyled payment feed
   */
  return (
    <SafeAreaView>
      <View>
        <Text>Live Payments</Text>

        {events.length === 0 && <Text>No recent payment activity.</Text>}

        {events.map((event) => (
          <View key={event.id}>
            <Text>Amount: {event.amount} {event.currency}</Text>
            <Text>Status: {event.status}</Text>
            <Text>Time: {event.timestamp}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
