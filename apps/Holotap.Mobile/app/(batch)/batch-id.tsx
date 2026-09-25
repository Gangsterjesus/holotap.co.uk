/**
 * =============================================================================
 * HOLOTAP MOBILE — SETTLEMENT BATCH DETAIL SCREEN (batch-id.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 12 August 2026
 * =============================================================================
 * Deterministic rendering of settlement batch payloads:
 * - Fetches batch metadata + transaction list
 * - Applies currency formatting rules (GBP, BTC, ETH, BRICS, CBDC)
 * - Handles loading, error, and null‑payload states
 * - Renders transaction list with stable keys (txId)
 * =============================================================================
 */

import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

/**
 * Inline deterministic styles
 */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loadingText: { marginTop: 12, textAlign: "center", color: "#333" },
  errorHeader: { fontSize: 18, fontWeight: "600", color: "#c00" },
  errorNote: { marginTop: 8, color: "#666" },
  link: { marginTop: 16, color: "#0078FF" },
  txCard: {
    padding: 12,
    marginBottom: 10, 
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
  },
  txLabel: { fontSize: 12, color: "#666" },
  txValue: { fontSize: 14, color: "#111", marginBottom: 6 },
  statusSuccess: { color: "green" },
  statusFailed: { color: "red" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { padding: 12, backgroundColor: "#fff", marginBottom: 12 },
  label: { fontSize: 12, color: "#666" },
  value: { fontSize: 14, color: "#111", marginBottom: 6 },
  subHeader: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  listContent: { paddingBottom: 40 },
});

/**
 * Types
 */
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

/**
 * Currency formatting rules
 */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * Main Component
 */
export default function BatchDetail() {
  const router = useRouter();
  const { batchId } = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [batch, setBatch] = useState<BatchPayload | null>(null);

  useEffect(() => {
    async function loadBatch() {
      if (!batchId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.holotap.co/batch/${batchId}`);
        const json = await res.json();
        setBatch(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadBatch();
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

        <Text style={styles.link} onPress={() => router.replace("/settlement")}>
          Return to Settlement Overview
        </Text>
      </SafeAreaView>
    );
  }

  const renderItem = useCallback(
    ({ item }: { item: BatchItem }) => (
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
    ),
    []
  );

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
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Text style={styles.link} onPress={() => router.replace("/settlement")}>
        Return to Settlement Overview
      </Text>
    </SafeAreaView>
  );
}
