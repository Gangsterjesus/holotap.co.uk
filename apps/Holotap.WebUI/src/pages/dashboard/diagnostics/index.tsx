/**
 * =============================================================================
 *  HoloTap Web — Diagnostics (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/diagnostics/index.tsx
 *  Module:        3 — Diagnostics
 *  Date:          28 July 2026
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

/* ============================================================================
   Types
   ============================================================================ */

interface DiagnosticCheck {
  id: string;
  name: string;
  status: "pass" | "warn" | "fail";
  description: string;
  lastRunAt: string;
}

interface DiagnosticsSummary {
  total: number;
  passed: number;
  warned: number;
  failed: number;
}

/* ============================================================================
   Component
   ============================================================================ */

export default function DiagnosticsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [checks, setChecks] = useState<DiagnosticCheck[]>([]);
  const [summary, setSummary] = useState<DiagnosticsSummary>({
    total: 0,
    passed: 0,
    warned: 0,
    failed: 0,
  });

  /* ============================================================================
     Load diagnostics
     ============================================================================ */

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/diagnostics");
        const data: { checks: DiagnosticCheck[]; summary: DiagnosticsSummary } =
          await res.json();
        setChecks(data.checks);
        setSummary(data.summary);
      } catch (err) {
        setError("Failed to load diagnostics");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ============================================================================
     Run diagnostics
     ============================================================================ */

  async function runDiagnostics() {
    setRunning(true);
    setError("");

    try {
      const res = await fetch("/api/diagnostics/run", {
        method: "POST",
      });

      const data: { checks: DiagnosticCheck[]; summary: DiagnosticsSummary } =
        await res.json();
      setChecks(data.checks);
      setSummary(data.summary);
    } catch (err) {
      setError("Failed to run diagnostics");
    } finally {
      setRunning(false);
    }
  }

  /* ============================================================================
     Render
     ============================================================================ */

  if (loading) return <p>Loading diagnostics…</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Diagnostics</h1>
      <p>Health checks for QR fleet, hologram overlays, and merchant identity.</p>

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
          <strong>Total Checks</strong>
          <div>{summary.total}</div>
        </div>
        <div>
          <strong>Passed</strong>
          <div style={{ color: "green" }}>{summary.passed}</div>
        </div>
        <div>
          <strong>Warnings</strong>
          <div style={{ color: "orange" }}>{summary.warned}</div>
        </div>
        <div>
          <strong>Failed</strong>
          <div style={{ color: "red" }}>{summary.failed}</div>
        </div>

        <button onClick={runDiagnostics} disabled={running}>
          {running ? "Running…" : "Run Diagnostics"}
        </button>
      </div>

      {/* Checks */}
      <div style={{ marginTop: 30 }}>
        <h2>Checks</h2>

        {checks.map((check) => (
          <div
            key={check.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              background:
                check.status === "pass"
                  ? "#e8ffe8"
                  : check.status === "warn"
                  ? "#fff8e0"
                  : "#ffe8e8",
            }}
          >
            <strong>{check.name}</strong> —{" "}
            {check.status === "pass"
              ? "Pass"
              : check.status === "warn"
              ? "Warning"
              : "Fail"}
            <br />
            <small>Last run: {check.lastRunAt}</small>
            <br />
            <span>{check.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
