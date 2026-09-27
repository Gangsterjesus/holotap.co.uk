/**
 * =============================================================================
 * HOLOTAP ENGINEERING — HERO BUILD v5.0.0
 * SETTLEMENT BATCH DETAIL SCREEN
 * =============================================================================
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * File: batch-id.tsx
 * Updated: 27 September 2026
 * =============================================================================
 *
 * PURPOSE:
 * Provides deterministic rendering of a settlement batch and its associated
 * transaction records.
 *
 * RESPONSIBILITIES:
 * - Resolve the settlement batch identifier from the active route
 * - Retrieve batch metadata and transaction records from the backend
 * - Render deterministic loading, failure, and success states
 * - Format supported settlement currencies consistently
 * - Render transaction records using stable transaction identifiers
 *
 * HERO BUILD v5.0.0:
 * - Removed conditional useCallback architecture
 * - Maintains unconditional React Hook execution
 * - Added explicit HTTP response validation
 * - Added defensive response payload handling
 * - Preserved settlement routing behavior
 * - Preserved deterministic currency formatting
 * =============================================================================
 */

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

interface RouteParams {
  batchId?: string;
}

interface BatchItem {
  txId: string;
  amount: string;
  currency: string;
  merchantId: string;
  sessionId: string;
  status: "success" | "failed";
}

interface BatchPayload {
  batchId: string;
  currency: string;
  totalAmount: string;
  itemCount: number;
  timestamp: string;
  items: BatchItem[];
}

interface CurrencyMeta {
  symbol: string;
  decimals: number;
}

const currencyMeta: Record<string, CurrencyMeta> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) {
    return "—";
  }

  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${meta.symbol}${amount}`;
  }

  return `${meta.symbol}${numericAmount.toFixed(meta.decimals)}`;
}

/**
 * HERO v5.0.0
 *
 * Plain render function intentionally exists outside the component.
 * No React Hook or memoization is required for deterministic transaction
 * rendering.
 */
function renderTransaction({ item }: { item: BatchItem }) {
  return (
    <View style={styles.txCard}>
      <Text style={styles.txLabel}>Transaction ID:</Text>
      <Text style={styles.txValue}>{item.txId}</Text>

      <Text style={styles.txLabel}>Amount:</Text>
      <Text style={styles.txValue}>
        {formatCurrency(item.amount, item.currency)}
      </Text>

      <Text style={styles.txLabel}>Status:</Text>
      <Text
        style={[
          styles.txValue,
          item.status === "success"
            ? styles.statusSuccess
            : styles.statusFailed,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );
}

export default function BatchDetail() {
  const router = useRouter();
  const { batchId } = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [batch, setBatch] = useState<BatchPayload | null>(null);

  useEffect(() => {
    let active = true;

    async function loadBatch() {
      if (!batchId) {
        if (active) {
          setError(true);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(
          `https://api.holotap.co/batch/${encodeURIComponent(batchId)}`
        );

        if (!response.ok) {
          throw new Error(
            `Settlement batch request failed: ${response.status}`
          );
        }

        const payload = (await response.json()) as BatchPayload;

        if (active) {
          setBatch(payload);
          setError(false);
        }
      } catch {
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadBatch();

    return () => {
      active = false;
    };
  }, [batchId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Loading batch details…</Text>
      </SafeAreaView>
    );
  }

  if (error || !batch) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorHeader}>Unable to load batch</Text>

        <Text style={styles.errorNote}>
          Something went wrong while fetching batch data.
        </Text>

        <Text
          style={styles.link}
          onPress={() => router.replace("/settlement")}
        >
          Return to Settlement Overview
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Batch Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Batch ID:</Text>
        <Text style={styles.value}>{batch.batchId}</Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>
          {formatCurrency(batch.totalAmount, batch.currency)}
        </Text>

        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{batch.currency}</Text>

        <Text style={styles.label}>Items:</Text>
        <Text style={styles.value}>{batch.itemCount}</Text>

        <Text style={styles.label}>Timestamp:</Text>
        <Text style={styles.value}>{batch.timestamp}</Text>
      </View>

      <Text style={styles.subHeader}>Transactions</Text>

      <FlatList
        data={batch.items}
        keyExtractor={(item) => item.txId}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContent}
      />

      <Text
        style={styles.link}
        onPress={() => router.replace("/settlement")}
      >
        Return to Settlement Overview
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    textAlign: "center",
    color: "#333",
  },
  errorHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#c00",
  },
  errorNote: {
    marginTop: 8,
    color: "#666",
  },
  link: {
    marginTop: 16,
    color: "#0078FF",
  },
  txCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
  },
  txLabel: {
    fontSize: 12,
    color: "#666",
  },
  txValue: {
    fontSize: 14,
    color: "#111",
    marginBottom: 6,
  },
  statusSuccess: {
    color: "green",
  },
  statusFailed: {
    color: "red",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#111",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
});


