/**
 * =============================================================================
 *  HoloTap Web — Refunds (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/refund/index.tsx
 *  Module:        6 — Refunds
 *  Date:          28 July 2026
 * =============================================================================
 *
 *  Purpose:
 *  Handles refund requests, approval, and audit trail for merchant disputes.
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

/* ============================================================================
   Types
   ============================================================================ */

interface Refund {
  id: string;
  transactionId: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  resolvedAt?: string;
}

/* ============================================================================
   Component
   ============================================================================ */

export default function RefundPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [transactionId, setTransactionId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/refund");
        const data: Refund[] = await res.json();
        setRefunds(data);
      } catch {
        setError("Failed to load refunds");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function createRefund() {
    if (!transactionId.trim() || !amount.trim() || !reason.trim()) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId,
          amount: parseFloat(amount),
          reason,
        }),
      });

      if (!res.ok) throw new Error("Create failed");

      const updated: Refund[] = await res.json();
      setRefunds(updated);
      setTransactionId("");
      setAmount("");
      setReason("");
    } catch {
      setError("Failed to create refund");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(id: string, status: Refund["status"]) {
    try {
      const res = await fetch(`/api/refund/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const updated: Refund[] = await res.json();
      setRefunds(updated);
    } catch {
      setError("Failed to update refund status");
    }
  }

  if (loading) return <p>Loading refunds…</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Refunds</h1>
      <p>Manage refund requests, approvals, and dispute resolution.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Refund */}
      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
        <h2>Create Refund Request</h2>

        <label>Transaction ID</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button onClick={createRefund} disabled={saving}>
          {saving ? "Creating…" : "Create Refund"}
        </button>
      </div>

      {/* Refund List */}
      <div style={{ marginTop: 30 }}>
        <h2>Refund Requests</h2>

        {refunds.map((refund) => (
          <div
            key={refund.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              background:
                refund.status === "approved"
                  ? "#e8ffe8"
                  : refund.status === "pending"
                  ? "#fff8e0"
                  : "#ffe8e8",
            }}
          >
            <strong>{refund.transactionId}</strong> — £
            {refund.amount.toFixed(2)} ({refund.status})
            <br />
            <small>Requested: {refund.requestedAt}</small>
            {refund.resolvedAt && (
              <>
                <br />
                <small>Resolved: {refund.resolvedAt}</small>
              </>
            )}
            <br />
            <span>{refund.reason}</span>
            <br />
            <button onClick={() => setStatus(refund.id, "approved")}>
              Approve
            </button>
            <button onClick={() => setStatus(refund.id, "rejected")}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
