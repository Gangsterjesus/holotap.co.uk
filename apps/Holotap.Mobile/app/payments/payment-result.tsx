/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT RESULT
 * =============================================================================
 * File: apps/Holotap.Mobile/app/payment-result.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Payment Experience
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Presents the final payment outcome for the HoloTap mobile payment flow.
 *
 * Module Responsibilities
 * - Consume payment metadata supplied through route parameters.
 * - Format supported currency values.
 * - Present merchant and session information.
 * - Present optional transaction and receipt metadata.
 * - Provide safe fallback values when payment metadata is unavailable.
 *
 * Architecture Boundary
 * This screen presents payment-result information only.
 * Authoritative payment state remains server-owned.
 * =============================================================================
 */

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

type CurrencyMetadata = {
  symbol: string;
  decimals: number;
};

type PaymentResultParams = {
  amount?: string;
  currency?: string;
  merchantId?: string;
  sessionId?: string;
  txHash?: string;
  nftId?: string;
};

const currencyMeta: Record<string, CurrencyMetadata> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) {
    return "—";
  }

  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);

  if (!Number.isFinite(numeric)) {
    return `${meta.symbol}${amount}`;
  }

  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

export default function PaymentResultScreen() {
  const {
    amount,
    currency,
    merchantId,
    sessionId,
    txHash,
    nftId,
  } = useLocalSearchParams<PaymentResultParams>();

  const formattedAmount = formatCurrency(amount, currency);

  return (
    <SafeAreaView>
      <View>
        <Text>Payment Result</Text>

        <Text>Amount: {formattedAmount}</Text>
        <Text>Currency: {currency ?? "—"}</Text>

        <Text>Merchant ID: {merchantId ?? "—"}</Text>
        <Text>Session ID: {sessionId ?? "—"}</Text>

        {txHash ? (
          <View>
            <Text>Blockchain Tx Hash:</Text>
            <Text>{txHash}</Text>
          </View>
        ) : null}

        {nftId ? (
          <View>
            <Text>NFT Receipt ID:</Text>
            <Text>{nftId}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}