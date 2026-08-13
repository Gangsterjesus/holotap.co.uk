/**
 * ============================================================
 *  HoloTap — Registry Result (Flow‑9.3)
 *  File: apps/web/src/pages/registry/result.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v2.0 — Deterministic Flow‑9.3 Result Surface
 * ============================================================
 *  Description:
 *    Deterministic rendering of registry binding results.
 *    Consumes backend: GET /api/registry/result
 *    Renders: sessionId, badgeId, device, merchant, status, timestamp.
 *    Includes deterministic error surfaces and payload validation.
 * ============================================================
 */

import { useEffect, useState } from "react";
import api from "../../services/api"; // relative path

export default function RegistryResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Deterministic load on mount
   * Flow‑9.3 → registry result surface
   */
  useEffect(() => {
    async function load() {
      try {
        const res = await api.getRegistryResult(); // NEW endpoint

        // deterministic payload validation
        if (!res || typeof res !== "object") {
          setError({
            code: "REGISTRY_RESULT_INVALID",
            message: "Registry result payload malformed."
          });
          return;
        }

        if (!res.sessionId || !res.badgeId) {
          setError({
            code: "REGISTRY_FIELDS_MISSING",
            message: "Required registry fields missing."
          });
          return;
        }

        setResult(res);
      } catch (err) {
        setError({
          code: "REGISTRY_RESULT_ERROR",
          message: err.message || "Unable to load registry result."
        });
      }
    }

    load();
  }, []);

  /**
   * Deterministic error surface
   */
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Registry Error</h1>
        <pre className="bg-red-900 text-white p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>

        <a
          href="/registry"
          className="mt-4 inline-block text-holotap-accent underline"
        >
          Back to Registry Overview
        </a>
      </div>
    );
  }

  /**
   * Loading state
   */
  if (!result) {
    return <div className="p-6">Loading registry result…</div>;
  }

  /**
   * Deterministic result rendering
   */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registry Result</h1>

      <div className="bg-gray-900 text-white p-4 rounded">
        <p><strong>Session ID:</strong> {result.sessionId}</p>
        <p><strong>Badge ID:</strong> {result.badgeId}</p>
        <p><strong>Device:</strong> {result.device}</p>
        <p><strong>Merchant:</strong> {result.merchant}</p>
        <p><strong>Status:</strong> {result.status}</p>
        <p><strong>Timestamp:</strong> {result.timestamp}</p>
      </div>

      <a
        href="/registry"
        className="mt-4 inline-block text-holotap-accent underline"
      >
        Back to Registry Overview
      </a>
    </div>
  );
}
