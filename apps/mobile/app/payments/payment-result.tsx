/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT RESULT SCREEN v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          app/payment-result.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Displays the final payment outcome with multi‑currency support and optional
 * blockchain metadata. This screen is identity‑aware, session‑aware, and part
 * of the core fintech flow.
 *
 * PAYMENT RESULT LIFECYCLE:
 *   1. Receive payment metadata via route params
 *   2. Format currency using scalable metadata
 *   3. Display merchant + session + blockchain fields
 *   4. Provide safe fallback states when params are missing
 *
 * VERSION NOTES:
 *   • v2: Rewritten for HoloTap engineering architecture
 *   • Removed Animated.Text (invalid JSX component)
 *   • Pure logic, pure TypeScript, unstyled
 *   • Identity‑aware and session‑aware
 *
 * FLOW ALIGNMENT:
 *   Flow 6 → Payment Initialisation
 *   Flow 7 → Payment Submission
 *   Flow 8 → Payment Result (this screen)
 * =============================================================================
 */

import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

/**
 * Currency metadata for scalable multi‑currency formatting.
 */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
};

/**
 * Currency formatter (safe fallback).
 */
function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";

  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);

  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * Main Payment Result Screen (unstyled)
 */
export default function PaymentResultScreen() {
  const {
    amount,
    currency,
    merchantId,
    sessionId,
    txHash,
    nftId,
  } = useLocalSearchParams<{
    amount?: string;
    currency?: string;
    merchantId?: string;
    sessionId?: string;
    txHash?: string;
    nftId?: string;
  }>();

  const formattedAmount = formatCurrency(amount, currency);

  return (
    <SafeAreaView>
      <View>
        <Text>Payment Result</Text>

        <Text>Amount: {formattedAmount}</Text>
        <Text>Currency: {currency ?? "—"}</Text>

        <Text>Merchant ID: {merchantId ?? "—"}</Text>
        <Text>Session ID: {sessionId ?? "—"}</Text>

        {txHash && (
          <View>
            <Text>Blockchain Tx Hash:</Text>
            <Text>{txHash}</Text>
          </View>
        )}

        {nftId && (
          <View>
            <Text>NFT Receipt ID:</Text>
            <Text>{nftId}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
