/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY BIND ACTION PAGE
 *  File: apps/web/src/pages/registry/bind.jsx
 *  Date: 13/08/2026 version 2.0 
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering
 *    • Copilot — Engineering Assistant 'Watson'
 *
 *  Module:
 *    Flow‑9 Registry Binding — Creator Identity Finalisation Surface
 *
 *  Revision:
 *    v2.0 — Deterministic Payload Finalisation (Flow‑9.2 → Flow‑9.3)
 *
 *  Overview:
 *    This module provides the creator‑facing registry binding surface. It triggers the binding
 *    operation between identity session, badge, device, and merchant profile. The result of the
 *    binding operation is displayed deterministically and routed to the registry result surface.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RegistryBind() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function buildPayload() {
    return {
      sessionId: "session-001",       // Flow‑6 placeholder
      badgeId: "badge-creator-001",   // Flow‑7 placeholder
      device: navigator.userAgent,    // deterministic browser fingerprint
      merchant: "merchant-001"        // deterministic merchant context
    };
  }

  async function bindRegistry() {
    setLoading(true);

    try {
      const payload = buildPayload();
      const res = await api.bindRegistry(payload);

      setResult(res);

      // ⭐ Correct deterministic routing → Flow‑9.3
      // Pass the sessionId to the result page
      navigate(`/registry/result/${res.sessionId}`);
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
