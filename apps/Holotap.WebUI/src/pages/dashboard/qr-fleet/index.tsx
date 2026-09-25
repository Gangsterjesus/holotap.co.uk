/**
 * =============================================================================
 *  HoloTap Web — QR Fleet Management (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/qr-fleet/index.tsx
 *  Module:        4 — QR Fleet Management
 *  Date:          28 July 2026
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

/* ============================================================================
   Types
   ============================================================================ */

interface QrCode {
  id: string;
  label: string;
  status: "active" | "inactive" | "revoked";
  createdAt: string;
  lastUsedAt?: string;
}

/* ============================================================================
   Component
   ============================================================================ */

export default function QrFleetPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [codes, setCodes] = useState<QrCode[]>([]);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/qr-fleet");
        const data: QrCode[] = await res.json();
        setCodes(data);
      } catch {
        setError("Failed to load QR fleet");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function createCode() {
    if (!label.trim()) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/qr-fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });

      if (!res.ok) throw new Error("Create failed");

      const updated: QrCode[] = await res.json();
      setCodes(updated);
      setLabel("");
    } catch {
      setError("Failed to create QR code");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(id: string, status: QrCode["status"]) {
    try {
      const res = await fetch(`/api/qr-fleet/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const updated: QrCode[] = await res.json();
      setCodes(updated);
    } catch {
      setError("Failed to update QR status");
    }
  }

  if (loading) return <p>Loading QR fleet…</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>QR Fleet Management</h1>
      <p>Manage merchant QR codes, activation, and revocation.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
        <h2>Create QR Code</h2>
        <label>Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button onClick={createCode} disabled={saving}>
          {saving ? "Creating…" : "Create QR"}
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>QR Codes</h2>
        {codes.map((code) => (
          <div
            key={code.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              background:
                code.status === "active"
                  ? "#e8ffe8"
                  : code.status === "inactive"
                  ? "#fff8e0"
                  : "#ffe8e8",
            }}
          >
            <strong>{code.label}</strong> — {code.status}
            <br />
            <small>Created: {code.createdAt}</small>
            {code.lastUsedAt && (
              <>
                <br />
                <small>Last used: {code.lastUsedAt}</small>
              </>
            )}
            <br />
            <button onClick={() => setStatus(code.id, "active")}>
              Activate
            </button>
            <button onClick={() => setStatus(code.id, "inactive")}>
              Deactivate
            </button>
            <button onClick={() => setStatus(code.id, "revoked")}>
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
