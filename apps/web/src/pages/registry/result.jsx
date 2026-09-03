/**
 * =================================================================================================
 *  HoloTap — Registry Result Surface (Flow‑9.4)
 *  File: apps/web/src/pages/registry/result.jsx
 *
 *  Engineers:
 *    • Raymond Newton — Lead Engineer (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Layer:
 *    Web‑UI (Creator Interface)
 *
 *  Revision:
 *    v2.2 — Deterministic Flow‑9.4 Result Surface (Backend‑Aligned + Timestamp Formatting)
 *
 *  Backend Contract:
 *    GET /api/registry/result
 *      • Stateless deterministic result endpoint
 *      • Returns latest registry binding record
 *      • Response shape:
 *          {
 *            ok: true,
 *            code: "REGISTRY_RESULT_SUCCESS",
 *            record: {
 *              sessionId,
 *              badgeId,
 *              device,
 *              merchant,
 *              status,
 *              timestamp
 *            }
 *          }
 *
 *  Description:
 *    Deterministic rendering of the latest registry binding record.
 *    Consumes backend Flow‑9.4 result endpoint (no sessionId parameter).
 *    Implements:
 *      • Deterministic loading state
 *      • Deterministic error surfaces
 *      • Deterministic payload validation
 *      • Deterministic success rendering
 *    Renders:
 *      sessionId, badgeId, device, merchant, status, timestamp (formatted).
 *  *  Rendering:
 *    • Deterministic timestamp formatting (en‑GB locale)
 *    • Deterministic field ordering
 *    • Deterministic error surfaces
 *    • Stateless latest‑record rendering (Flow‑9.4)

 *
 *  Notes:
 *    Flow‑9.4 replaces Flow‑9.3 session‑parameter routing with stateless
 *    latest‑record retrieval for unified web/mobile architecture.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RegistryResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Deterministic load on mount
   * Flow‑9.4 → registry result surface
   */
  useEffect(() => {
    async function load() {
      try {
        const res = await api.getRegistryResult(); // ⭐ backend-aligned (no params)

        // deterministic payload validation
        if (!res || typeof res !== "object" || !res.record) {
          setError({
            code: "REGISTRY_RESULT_INVALID",
            message: "Registry result payload malformed."
          });
          return;
        }

        const record = res.record;

        if (!record.sessionId || !record.badgeId) {
          setError({
            code: "REGISTRY_FIELDS_MISSING",
            message: "Required registry fields missing."
          });
          return;
        }

        setResult(record);
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
        <p>
          <strong>Timestamp:</strong>{" "}
          {new Date(result.timestamp).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}
        </p>
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
