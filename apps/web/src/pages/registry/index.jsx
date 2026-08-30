/**
 * =================================================================================================
 *  HoloTap — Registry Overview (Flow‑9.1 → Flow‑9.6)
 *  File: apps/web/src/pages/registry/index.jsx
 *  Date: 30/08/2026 — version 2.6
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Overview — Creator Identity Finalisation Surface
 *
 *  Revision:
 *    v2.6 — Added Flow‑9.5 Status Polling + Flow‑9.6 Ledger Awareness
 *
 *  Overview:
 *    Provides the creator with a deterministic overview of the registry subsystem. Displays
 *    real‑time registry status (Flow‑9.5) and prepares the surface for multi‑record ledger
 *    integration (Flow‑9.6). Acts as the entry point for registry binding and result inspection.
 *
 *  Backend Contract:
 *    GET /registry/status
 *      → {
 *           ok: true,
 *           code: "REGISTRY_STATUS_OK",
 *           status: "idle" | "bound",
 *           lastBoundAt: "2026‑08‑30T08:00:00Z"
 *         }
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { useRegistryStatus } from "../../lib/useRegistryStatus";

export default function RegistryOverview() {
  const { status, error } = useRegistryStatus(8000); // ⭐ deterministic polling

  if (!status && !error) {
    return <div className="p-6">Loading registry…</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Registry Error</h1>
        <pre className="bg-red-900 text-white p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>

        <a
          href="/registry/bind"
          className="mt-6 inline-block bg-holotap-accent text-white px-4 py-2 rounded"
        >
          Bind Registry
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registry Overview</h1>

      <div className="bg-gray-900 text-white p-4 rounded mb-6">
        <p><strong>Status:</strong> {status.status}</p>

        {status.lastBoundAt && (
          <p><strong>Last Bound:</strong> {status.lastBoundAt}</p>
        )}

        <p><strong>Code:</strong> {status.code}</p>
      </div>

      <a
        href="/registry/bind"
        className="inline-block bg-holotap-accent text-white px-4 py-2 rounded"
      >
        Bind Registry
      </a>
    </div>
  );
}
