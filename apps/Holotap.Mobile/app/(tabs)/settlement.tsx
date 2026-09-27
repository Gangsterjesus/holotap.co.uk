/**
 * =============================================================================
 * HOLOTAP ENGINEERING — HERO BUILD v5.0.0
 * SETTLEMENT OVERVIEW — FLOW 10
 * =============================================================================
 * Engineer ID: E5357171
 * Author: Raymond Newton
 * File: settlement.tsx
 *
 * PURPOSE:
 * Provides the merchant settlement overview across supported currencies and
 * exposes settlement batches for navigation into the Flow 11 breakdown.
 *
 * HERO BUILD v5.0.0:
 * - Preserves multi-currency settlement presentation.
 * - Preserves Flow 10 -> Flow 11 batch navigation.
 * - Adds deterministic loading and retry states.
 * - Removes unused API_URL configuration import.
 * - Normalises backend settlement payloads defensively.
 * - Avoids synchronous state-changing invocation inside useEffect.
 * - Improves FlatList performance and empty-state presentation.
 * =============================================================================
 */

import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { apiGet } from "../../api/client";

interface SettlementTotals {
  GBP?: string;
  BTC?: string;
  ETH?: string;
  BRICS?: string;
  NFT?: string;
  CBDC?: string;
}

interface SettlementBatch {
  batchId: string;
  currency: string;
  total: string;
  timestamp: string;
  txHash?: string | null;
  nftId?: string | null;
}

interface SettlementResponse {
  totals?: SettlementTotals;
  batches?: SettlementBatch[];
}

const currencyMeta = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
} as const;

type CurrencyCode = keyof typeof currencyMeta;

const supportedCurrencies = Object.keys(currencyMeta) as CurrencyCode[];

function formatCurrency(
  amount: string | undefined,
  currency: string
): string {
  if (!amount) return "—";

  const meta =
    currencyMeta[currency as CurrencyCode] ?? currencyMeta.GBP;

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${meta.symbol}${amount}`;
  }

  return `${meta.symbol}${numericAmount.toFixed(meta.decimals)}`;
}

export default function SettlementScreen() {
  const router = useRouter();

  const [totals, setTotals] = useState<SettlementTotals>({});
  const [batches, setBatches] = useState<SettlementBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSettlement = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        (await apiGet("/settlement/overview")) as SettlementResponse;

      setTotals(data?.totals ?? {});
      setBatches(data?.batches ?? []);
    } catch {
      setError("Unable to load settlement data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadSettlement();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSettlement]);

  const openBatch = useCallback(
    (batch: SettlementBatch) => {
      router.push({
        pathname: "/settlement-batch",
        params: {
          batchId: batch.batchId,
          currency: batch.currency,
          total: batch.total,
          timestamp: batch.timestamp,
          txHash: batch.txHash ?? undefined,
          nftId: batch.nftId ?? undefined,
        },
      } as never);
    },
    [router]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>
          Loading settlement overview…
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => void loadSettlement()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settlement Overview</Text>

      <View style={styles.totalsCard}>
        <Text style={styles.sectionHeader}>Totals by Currency</Text>

        {supportedCurrencies.map((currency) => (
          <View key={currency} style={styles.totalRow}>
            <Text style={styles.totalLabel}>{currency}</Text>

            <Text style={styles.totalValue}>
              {formatCurrency(totals[currency], currency)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Settlement Batches</Text>

      <FlatList
        data={batches}
        keyExtractor={(item) => item.batchId}
        contentContainerStyle={
          batches.length === 0 ? styles.emptyList : undefined
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.batchCard}
            activeOpacity={0.75}
            onPress={() => openBatch(item)}
          >
            <Text style={styles.batchCurrency}>{item.currency}</Text>

            <Text style={styles.batchAmount}>
              {formatCurrency(item.total, item.currency)}
            </Text>

            <Text style={styles.batchTime}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>

            {item.txHash ? (
              <Text style={styles.batchMeta}>
                Tx Hash: {item.txHash}
              </Text>
            ) : null}

            {item.nftId ? (
              <Text style={styles.batchMeta}>
                NFT ID: {item.nftId}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No settlement batches available.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },

  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginVertical: 12,
  },

  totalsCard: {
    backgroundColor: "#F5F7FA",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },

  totalLabel: {
    fontSize: 16,
    color: "#4B5563",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  batchCard: {
    backgroundColor: "#F5F7FA",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  batchCurrency: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  batchAmount: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
    color: "#0078FF",
  },

  batchTime: {
    fontSize: 14,
    marginTop: 6,
    color: "#4B5563",
  },

  batchMeta: {
    fontSize: 12,
    marginTop: 5,
    color: "#6B7280",
  },

  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: "#4B5563",
  },

  error: {
    fontSize: 18,
    color: "#D32F2F",
    fontWeight: "600",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#0078FF",
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  empty: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});
