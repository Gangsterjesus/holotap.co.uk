/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY BIND ACTION PAGE
 *  File: apps/web/src/pages/registry/bind.jsx
 *  Date: 30/08/2026 — version 2.6
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Binding — Creator Identity Finalisation Surface
 *
 *  Revision:
 *    v2.6 — Deterministic Binding + Ledger Write + Stateless Result Routing (Flow‑9.2 → Flow‑9.6)
 *
 *  Overview:
 *    Creator‑facing registry binding surface. Executes deterministic binding between identity
 *    session, badge, device fingerprint, and merchant context. Writes binding record into the
 *    Flow‑9.6 registry ledger and routes deterministically to the stateless result surface.
 *
 *  Backend Contract:
 *    POST /registry/bind
 *      → {
 *           ok: true,
 *           code: "REGISTRY_BIND_SUCCESS",
 *           record: {
 *             sessionId,
 *             badgeId,
 *             device,
 *             merchant,
 *             status,
 *             timestamp
 *           }
 *         }
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function RegistryBind() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Deterministic Flow‑9.2 payload
   * (Flow‑6, Flow‑7 placeholders until identity wiring is complete)
   */
  function buildPayload() {
    return {
      sessionId: "session-001",
      badgeId: "badge-creator-001",
      device: navigator.userAgent,
      merchant: "merchant-001"
    };
  }

  /**
   * Flow‑9.2 → Flow‑9.6
   * Deterministic binding + ledger write + stateless routing
   */
  async function bindRegistry() {
    setLoading(true);

    try {
      const payload = buildPayload();
      const res = await api.bindRegistry(payload);

      setResult(res);

      // ⭐ Correct deterministic routing (Flow‑9.4 → Flow‑9.6)
      navigate("/registry/result");
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bind Registry</h1>

      <button
        onClick={bindRegistry}
        className="bg-holotap-accent text-white px-4 py-2 rounded"
      >
        {loading ? "Binding…" : "Bind Registry"}
      </button>

      {result && (
        <pre className="bg-gray-900 text-white p-4 rounded mt-6">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
