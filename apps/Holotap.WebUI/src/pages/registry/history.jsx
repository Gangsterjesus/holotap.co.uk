/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY HISTORY PAGE (Flow‑9.6)
 *  File: apps/web/src/pages/registry/history.jsx
 *  Date: 30/08/2026 — version 2.6
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Ledger History — Creator Audit Surface
 *
 *  Revision:
 *    v2.6 — Deterministic Ledger Rendering (Flow‑9.6)
 *
 *  Overview:
 *    Displays the full Flow‑9.6 registry ledger. Shows all binding records in deterministic order,
 *    including session, badge, device, merchant, status, and timestamp. Provides creator audit
 *    visibility and prepares for Flow‑9.7 record inspection surfaces.
 *
 *  Backend Contract:
 *    GET /registry/history
 *      → {
 *           ok: true,
 *           code: "REGISTRY_HISTORY_SUCCESS",
 *           records: [ ... ]
 *         }
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function RegistryHistory() {
  const [records, setRecords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getRegistryHistory();

        if (!res || !res.records) {
          setError({
            code: "REGISTRY_HISTORY_INVALID",
            message: "History payload malformed."
          });
          return;
        }

        setRecords(res.records);
      } catch (err) {
        setError({
          code: "REGISTRY_HISTORY_ERROR",
          message: err.message || "Unable to load registry history."
        });
      }
    }

    load();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Registry History Error</h1>
        <pre className="bg-red-900 text-white p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  if (!records) {
    return <div className="p-6">Loading registry history…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registry History</h1>

      {records.length === 0 && (
        <div className="text-gray-400">No registry records found.</div>
      )}

      {records.map((r, i) => (
        <div key={i} className="bg-gray-900 text-white p-4 rounded mb-4">
          <p><strong>Session ID:</strong> {r.sessionId}</p>
          <p><strong>Badge ID:</strong> {r.badgeId}</p>
          <p><strong>Device:</strong> {r.device}</p>
          <p><strong>Merchant:</strong> {r.merchant}</p>
          <p><strong>Status:</strong> {r.status}</p>
          <p><strong>Timestamp:</strong> {r.timestamp}</p>
        </div>
      ))}

      <a
        href="/registry"
        className="inline-block mt-4 text-holotap-accent underline"
      >
        Back to Registry Overview
      </a>
    </div>
  );
}
