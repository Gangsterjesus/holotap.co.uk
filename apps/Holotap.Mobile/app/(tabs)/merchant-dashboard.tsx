/* ============================================================================
   HoloTap Mobile Platform
   File: app/(tabs)/merchant-dashboard.tsx

   Engineers:
   - Raymond Newton (E5357171)
   - Copilot Engineering Assistant

   Layer: Merchant Experience Layer

   Revision: v5.1.0
   Date: 17 November 2026

   Copyright (c) 2026 HoloTap.
   All Rights Reserved.

   ----------------------------------------------------------------------------

   Module Purpose

   Provides the primary merchant dashboard experience, displaying merchant
   performance metrics, QR-session status, operational shortcuts and recent
   payment activity.

   ----------------------------------------------------------------------------

   Module Responsibilities

   - Display merchant revenue metrics.
   - Display settlement information.
   - Surface QR session state.
   - Provide navigation to merchant workflows.
   - Display recent payment activity.
   - Integrate merchant identity verification state.

   ============================================================================ */
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
import { Href, Link } from "expo-router";
import { useQrSession } from "../../hooks/QRSessionLayer";

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

const MetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const ActivityItem = ({
  item,
}: {
  item: ActivityItemPayload;
}) => (
  <View>
    <Text>{item.type.toUpperCase()}</Text>
    <Text>
      {item.currency} {item.amount}
    </Text>
    <Text>{item.timestamp}</Text>
  </View>
);

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

  if (loading || qrLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Loading dashboard...</Text>
      </SafeAreaView>
    );
  }

  if (error || !summary) {
    return (
      <SafeAreaView>
        <Text>Unable to load dashboard</Text>
        <Text>Please try again later.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/images/Holotap-2026.png")}
        resizeMode="contain"
        style={{
          width: 160,
          height: 160,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text>Merchant Dashboard</Text>
      <Text>Live business performance</Text>

      <View>
        <MetricCard
          label="Today"
          value={`£${summary.todayTotal}`}
        />
        <MetricCard
          label="This Week"
          value={`£${summary.weekTotal}`}
        />
      </View>

      <View>
        <MetricCard
          label="Pending Settlements"
          value={summary.pendingSettlements}
        />
        <MetricCard
          label="Completed"
          value={summary.completedSettlements}
        />
      </View>

      {qrError || !qrSession || !qrSession.active ? (
        <View>
          <Text>
            {identity && identity.status !== "verified"
              ? "QR unavailable - merchant not verified"
              : "No Active QR Session"}
          </Text>
        </View>
      ) : (
        <View>
          <Text>Active QR Session</Text>
          <Text>Session ID: {qrSession.sessionId}</Text>
          <Text>Expires: {qrSession.expiresAt}</Text>
        </View>
      )}

      <View>
        <DashboardCard
          title="Show My QR Code"
          href="/generate-qrc"
        />

        <DashboardCard
          title="Live Payments"
          href="/live-payments"
        />

        <DashboardCard
          title="Refund / Void"
          href="/refund"
        />

        <DashboardCard
          title="Settlement"
          href="/settlement"
        />

        <DashboardCard
          title="Settings"
          href="/settings"
        />
      </View>

      <Text>Recent Activity</Text>

      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityItem item={item} />
        )}
      />
    </SafeAreaView>
  );
}