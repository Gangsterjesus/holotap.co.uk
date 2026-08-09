/**
 * ============================================================
 *  File: qr.tsx
 *  Project: HoloTap Web (Flow 6 — Identity QR Layer)
 *  Engineer: Raymond Newton (E5357171)
 *  Co‑Engineer: Copilot Engineering Assistant
 *  Date: 09 August 2026
 *
 *  Description:
 *    Generates and displays a cryptographically signed QR‑code
 *    identity token for HoloTap. Calls backend /qr endpoint,
 *    receives base64 PNG + signed payload, and renders both.
 *
 *  Notes:
 *    - Part of Flow 6 (Identity Layer)
 *    - Payload includes nonce, expiry, signature
 *    - Regeneration rotates nonce + signature
 *    - ErrorBoundary protects render‑level failures
 *    - Local error state protects API‑level failures
 * ============================================================
 */

import React, { useState, useEffect } from "react";
import { generateQR } from "../../lib/api";
import { ErrorBoundary } from "../../components/ErrorBoundary";

/**
 * ============================================================
 *  Component: QRPage
 *  Purpose:
 *    - Fetch QR identity token from backend
 *    - Display QR image + signed payload
 *    - Allow regeneration (nonce rotation)
 *    - Handle loading + error states
 * ============================================================
 */
export default function QRPage() {
  // Base64 PNG returned from backend
  const [qr, setQr] = useState<string | null>(null);

  // Signed identity payload (nonce, exp, sig)
  const [payload, setPayload] = useState<string | null>(null);

  // Loading state for API calls
  const [loading, setLoading] = useState(false);

  // Error message for API failures
  const [error, setError] = useState<string | null>(null);

  /**
   * ------------------------------------------------------------
   * Function: fetchQR
   * Purpose:
   *   Calls backend POST /qr
   *   Receives { qr, payload }
   *   Updates UI state
   *   Handles errors gracefully
   * ------------------------------------------------------------
   */
  const fetchQR = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await generateQR();

      setQr(res.qr);
      setPayload(res.payload);
    } catch (err: any) {
      setError(err?.message || "Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ------------------------------------------------------------
   * Effect: Auto-generate QR on first page load
   * ------------------------------------------------------------
   */
  useEffect(() => {
    fetchQR();
  }, []);

  /**
   * ------------------------------------------------------------
   * Render:
   *   - ErrorBoundary wraps entire page
   *   - Loading state
   *   - Error message
   *   - QR image (base64 PNG)
   *   - Regenerate button
   *   - Signed payload block
   * ------------------------------------------------------------
   */
  return (
  <ErrorBoundary>
  <div style={{ padding: 32 }}>
    {/* Page Title */}
    <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
      HoloTap Identity QR
    </h1>

    {/* Loading Indicator */}
    {loading && (
      <div style={{ fontSize: 18, marginTop: 16 }}>
        Generating QR…
      </div>
    )}

    {/* Error Message */}
    {error && (
      <div style={{ color: "red", marginTop: 16 }}>
        {error}
      </div>
    )}

    {/* QR Image */}
    {qr && (
      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={`data:image/png;base64,${qr}`}
          alt="HoloTap QR Code"
          style={{ width: 240, height: 240 }}
        />

        {/* Regenerate Button */}
        <button style={{ marginTop: 24 }} onClick={fetchQR}>
          Regenerate QR
        </button>
      </div>
    )}

    {/* Signed Payload Display */}
    {payload && (
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          Signed Payload
        </div>

        <pre
          style={{
            marginTop: 12,
            fontFamily: "monospace",
            backgroundColor: "#f5f5f5",
            padding: 12,
            borderRadius: 8,
            wordBreak: "break-all",
          }}
        >
          {payload}
        </pre>
      </div>
    )}
  </div>
  </ErrorBoundary>
  );
}