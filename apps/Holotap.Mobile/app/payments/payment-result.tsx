/*
 * =====================================================================================
 *  HoloTap Engineering - Payment Result
 * -------------------------------------------------------------------------------------
 *  File: app/payments/payment-result.tsx
 *  Engineers:
 *      Raymond Newton (E5357171)
 *      Copilot Engineering Assistant
 *  Layer: Mobile / Customer / Payments
 *  Revision: v5.0.1
 *  Date: 19 Nov 2026
 *  Copyright (c) 2026 HoloTap Technologies Ltd.
 * -------------------------------------------------------------------------------------
 *  Module Purpose:
 *      Present the final outcome of the HoloTap HERO customer payment journey.
 *
 *  Module Responsibilities:
 *      - Receive completed payment metadata from the payment execution surface
 *      - Present payment success, pending or failure states
 *      - Display payment, merchant, amount and currency information
 *      - Preserve payment and transaction references
 *      - Display merchant confirmation status
 *      - Display payment timestamp
 *      - Provide safe fallback values when metadata is unavailable
 *      - Keep authoritative payment state server-owned
 *
 *  v5.0.1 Enhancements:
 *      - Added Payment Pending state
 *      - Added Transaction Reference support
 *      - Added Merchant Confirmation status
 *      - Added Payment Timestamp
 *      - Improved customer trust messaging
 * =====================================================================================
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

/*
 * ---------------------------------------------------------------------------
 * Route Contract
 * ---------------------------------------------------------------------------
 */

type PaymentResultParams = {
  id?: string;
  status?: string;
  amount?: string;
  currency?: string;
  merchantId?: string;

  transactionRef?: string;
  merchantStatus?: string;
  timestamp?: string;
};

/*
 * ---------------------------------------------------------------------------
 * Currency Formatting
 * ---------------------------------------------------------------------------
 */

function formatCurrency(
  amount?: string,
  currency?: string
): string {
  if (!amount) {
    return "Unavailable";
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return amount;
  }

  const currencyCode = currency ?? "GBP";

  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(numericAmount);
  } catch {
    return `${currencyCode} ${numericAmount.toFixed(2)}`;
  }
}

/*
 * =====================================================================================
 * Component: PaymentResultScreen
 * =====================================================================================
 */

export default function PaymentResultScreen() {
  const {
    id,
    status,
    amount,
    currency,
    merchantId,
    transactionRef,
    merchantStatus,
    timestamp,
  } = useLocalSearchParams<PaymentResultParams>();

  const normalizedStatus = status?.toLowerCase();

  const successful =
    normalizedStatus === "success" ||
    normalizedStatus === "successful" ||
    normalizedStatus === "confirmed" ||
    normalizedStatus === "completed" ||
    normalizedStatus === "paid";

  const failed =
    normalizedStatus === "failed" ||
    normalizedStatus === "failure" ||
    normalizedStatus === "declined";

  const pending =
    normalizedStatus === "pending" ||
    normalizedStatus === "processing" ||
    normalizedStatus === "awaiting_confirmation";

  const formattedAmount = formatCurrency(
    amount,
    currency
  );

  const resultTitle = successful
    ? "Payment Confirmed"
    : failed
      ? "Payment Failed"
      : pending
        ? "Payment Pending"
        : "Payment Result";

  const resultMessage = successful
    ? "Your HoloTap payment has been confirmed."
    : failed
      ? "Your HoloTap payment could not be completed."
      : pending
        ? "Awaiting merchant confirmation."
        : "Your payment result is available below.";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={[
            styles.statusIndicator,
            successful
              ? styles.statusSuccess
              : failed
                ? styles.statusFailure
                : pending
                  ? styles.statusPending
                  : styles.statusNeutral,
          ]}
        />

        <Text style={styles.title}>
          {resultTitle}
        </Text>

        <Text style={styles.message}>
          {resultMessage}
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Amount
            </Text>

            <Text style={styles.amount}>
              {formattedAmount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Status
            </Text>

            <Text style={styles.value}>
              {status ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment ID
            </Text>

            <Text
              style={styles.value}
              numberOfLines={1}
            >
              {id ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Transaction Reference
            </Text>

            <Text
              style={styles.value}
              numberOfLines={1}
            >
              {transactionRef ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Merchant ID
            </Text>

            <Text
              style={styles.value}
              numberOfLines={1}
            >
              {merchantId ?? "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Merchant Status
            </Text>

            <Text style={styles.value}>
              {merchantStatus ??
                "Awaiting Confirmation"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Time
            </Text>

            <Text style={styles.value}>
              {timestamp
                ? new Date(
                    timestamp
                  ).toLocaleString()
                : "Unavailable"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Currency
            </Text>

            <Text style={styles.value}>
              {currency ?? "GBP"}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          HoloTap Secure Payment • Trusted Payment Status
        </Text>
      </View>
    </SafeAreaView>
  );
}

/*
 * =====================================================================================
 * Styles
 * =====================================================================================
 */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  statusIndicator: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignSelf: "center",
    marginBottom: 24,
  },

  statusSuccess: {
    backgroundColor: "#16a34a",
  },

  statusFailure: {
    backgroundColor: "#dc2626",
  },

  statusPending: {
    backgroundColor: "#f59e0b",
  },

  statusNeutral: {
    backgroundColor: "#64748b",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#0f172a",
  },

  message: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "#64748b",
  },

  card: {
    marginTop: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  row: {
    paddingVertical: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },

  value: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  amount: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },

  divider: {
    height: 1,
    marginVertical: 12,
    backgroundColor: "#e2e8f0",
  },

  footer: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 13,
    color: "#94a3b8",
  },
});