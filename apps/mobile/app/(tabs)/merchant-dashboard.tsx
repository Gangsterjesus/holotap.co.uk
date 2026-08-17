/**
 * =============================================================================
 * HOLOTAP MOBILE — MERCHANT DASHBOARD v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          merchant-dashboard.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * The Merchant Dashboard is the central operational surface for merchants using
 * HoloTap Mobile. It provides:
 *
 *   • Live revenue + settlement metrics
 *   • Recent payment/refund/settlement activity
 *   • Identity‑aware QR session visibility
 *   • Navigation to core merchant flows
 *
 * DESIGN:
 *   • Pure logic, zero styling (unstyled edition)
 *   • Fully commented for engineering clarity
 *   • Identity‑aware QR session logic
 *   • Strong TypeScript typing
 *   • Clean JSX structure
 *
 * ROUTING (Expo Router v6):
 *   Valid hrefs:
 *     "/generate-qrc"
 *     "/live-payments"
 *     "/refund"
 *     "/settlement"
 *     "/settings"
 *     "/merchant-dashboard"
 *
 * =============================================================================
 */


import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useQrSession } from "../../hooks/QRSessionLayer";
import { Href, Link } from "expo-router";

/* =============================================================================
 * Backend Payload Types
 * =============================================================================
 */
interface MerchantSummary {
  todayTotal: string;
  weekTotal: string;
  pendingSettlements: number;
  completedSettlements: number;
  lastPaymentTime: string;
}

interface ActivityItemPayload {
  id: string;
  type: "payment" | "refund" | "settlement";
  amount: string;
  currency: string;
  timestamp: string;
}

/* =============================================================================
 * MetricCard (unstyled)
 * =============================================================================
 */
const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <View>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

/* =============================================================================
 * ActivityItem (unstyled)
 * =============================================================================
 */
const ActivityItem = ({ item }: { item: ActivityItemPayload }) => (
  <View>
    <Text>{item.type.toUpperCase()}</Text>
    <Text>
      {item.currency} {item.amount}
    </Text>
    <Text>{item.timestamp}</Text>
  </View>
);

/* =============================================================================
 * DashboardCard (unstyled)
 * =============================================================================
 */
const DashboardCard = ({
  title,
  href,
}: {
  title: string;
  href: Href;
}) => (
  <Link href={href} asChild>
    <TouchableOpacity>
      <Text>{title}</Text>
    </TouchableOpacity>
  </Link>
);

/* =============================================================================
 * Main Merchant Dashboard
 * =============================================================================
 */
export default function MerchantDashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<MerchantSummary | null>(null);
  const [activity, setActivity] = useState<ActivityItemPayload[]>([]);
  const [error, setError] = useState(false);

  const {
    session: qrSession,
    loading: qrLoading,
    error: qrError,
    identity,
  } = useQrSession();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [summaryRes, activityRes] = await Promise.all([
          fetch("https://api.holotap.co/merchant/summary"),
          fetch("https://api.holotap.co/merchant/activity"),
        ]);

        setSummary(await summaryRes.json());
        setActivity(await activityRes.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // Loading state (dashboard + QR)
  if (loading || qrLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Loading dashboard…</Text>
      </SafeAreaView>
    );
  }

  // Error state
  if (error || !summary) {
    return (
      <SafeAreaView>
        <Text>Unable to load dashboard</Text>
        <Text>Please try again later.</Text>
      </SafeAreaView>
    );
  }

  // Success state
  return (
    <SafeAreaView>
      {/* Logo */}
      <Image source={require("../../assets/icon.png")} />

      {/* Header */}
      <Text>Merchant Dashboard</Text>
      <Text>Live business performance</Text>

      {/* Metrics */}
      <View>
        <MetricCard label="Today" value={`£${summary.todayTotal}`} />
        <MetricCard label="This Week" value={`£${summary.weekTotal}`} />
      </View>

      <View>
        <MetricCard label="Pending Settlements" value={summary.pendingSettlements} />
        <MetricCard label="Completed" value={summary.completedSettlements} />
      </View>

      {/* Identity‑Aware QR Session */}
      {qrError || !qrSession || !qrSession.active ? (
        <View>
          <Text>
            {identity && identity.status !== "verified"
              ? "QR unavailable — merchant not verified"
              : "No Active QR Session"}
          </Text>
        </View>
      ) : (
        <View>
          {qrSession && (
            <>
              <Text>Active QR Session</Text>
              <Text>Session ID: {qrSession.sessionId}</Text>
              <Text>Expires: {qrSession.expiresAt}</Text>
            </>
          )}
        </View>
      )}

      {/* Navigation */}
      <View>
        <DashboardCard title="Show My QR Code" href="/generate-qrc" />
        <DashboardCard title="Live Payments" href="/live-payments" />
        <DashboardCard title="Refund / Void" href="/refund" />
        <DashboardCard title="Settlement" href="/settlement" />
        <DashboardCard title="Settings" href="/settings" />
      </View>

      {/* Activity Feed */}
      <Text>Recent Activity</Text>

      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityItem item={item} />}
      />
    </SafeAreaView>
  );
}
