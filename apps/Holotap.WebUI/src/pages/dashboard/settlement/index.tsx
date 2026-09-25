/**
 * =============================================================================
 *  HoloTap Web — Settlement (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/settlement/index.tsx
 *  Module:        5 — Settlement
 *  Date:          28 July 2026
 * =============================================================================
 *
 *  Purpose:
 *  Merchant payout ledger, daily settlement totals, and reconciliation.
 *
 *  Architecture Notes:
 *  - Next.js Pages Router module.
 *  - GET /api/settlement → fetch ledger + summary.
 *  - POST /api/settlement/run → trigger settlement cycle.
 *  - Supports multi‑tenant isolation.
 *
 *  Engineering Notes:
 *  - Fully typed React state.
 *  - Safe async flows.
 *  - Production-ready UI scaffold.
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

/* ============================================================================
   Types
   ============================================================================ */

interface SettlementEntry {
  id: string;
  date: string;
  gross: number;
  fees: number;
  net: number;
  status: "pending" | "completed" | "failed";
}

interface SettlementSummary {
  totalGross: number;
  totalFees: number;
  totalNet: number;
  lastSettlementAt?: string;
}

/* ============================================================================
   Component
   ============================================================================ */

export default function SettlementPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [entries, setEntries] = useState<SettlementEntry[]>([]);
  const [summary, setSummary] = useState<SettlementSummary>({
    totalGross: 0,
    totalFees: 0,
    totalNet: 0,
  });

  /* ============================================================================
     Load settlement ledger
     ============================================================================ */

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settlement");
        const data: { entries: SettlementEntry[]; summary: SettlementSummary } =
          await res.json();

        setEntries(data.entries);
        setSummary(data.summary);
      } catch {
        setError("Failed to load settlement ledger");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ============================================================================
     Run settlement cycle
     ============================================================================ */

  async function runSettlement() {
    setRunning(true);
    setError("");

    try {
      const res = await fetch("/api/settlement/run", {
        method: "POST",
      });

      const data: { entries: SettlementEntry[]; summary: SettlementSummary } =
        await res.json();

      setEntries(data.entries);
      setSummary(data.summary);
    } catch {
      setError("Failed to run settlement");
    } finally {
      setRunning(false);
    }
  }

  /* ============================================================================
     Render
     ============================================================================ */

  if (loading) return <p>Loading settlement ledger…</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Settlement</h1>
      <p>Daily payout ledger and reconciliation for merchant operations.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Summary */}
      <div
        style={{
          marginTop: 20,
          padding: 10,
          border: "1px solid #ccc",
          display: "flex",
          gap: 20,
        }}
      >
        <div>
          <strong>Total Gross</strong>
          <div>£{summary.totalGross.toFixed(2)}</div>
        </div>
        <div>
          <strong>Total Fees</strong>
          <div>£{summary.totalFees.toFixed(2)}</div>
        </div>
        <div>
          <strong>Total Net</strong>
          <div style={{ color: "green" }}>£{summary.totalNet.toFixed(2)}</div>
        </div>

        <button onClick={runSettlement} disabled={running}>
          {running ? "Running…" : "Run Settlement"}
        </button>
      </div>

      {/* Ledger */}
      <div style={{ marginTop: 30 }}>
        <h2>Settlement Ledger</h2>

        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              background:
                entry.status === "completed"
                  ? "#e8ffe8"
                  : entry.status === "pending"
                  ? "#fff8e0"
                  : "#ffe8e8",
            }}
          >
            <strong>{entry.date}</strong> — {entry.status}
            <br />
            Gross: £{entry.gross.toFixed(2)}
            <br />
            Fees: £{entry.fees.toFixed(2)}
            <br />
            Net: £{entry.net.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}
