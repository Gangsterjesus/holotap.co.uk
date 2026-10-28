/**
 * ============================================================
 * HoloTap HERO v5.0.0 — Identity Verification QR
 * ============================================================
 * File: src/pages/qr/qr.tsx
 * Engineers: Raymond Newton (E5357171),
 *            Copilot Engineering Assistant
 * Layer: HERO WebUI
 * Revision: v5.0.0
 * Date: 28 October 2026
 *
 * © 2026 HoloTap Technologies Ltd.
 * All Rights Reserved.
 * ============================================================
 *
 * MODULE PURPOSE
 * ------------------------------------------------------------
 * Generates a signed Flow‑6 identity QR challenge used within
 * the HERO payment journey.
 *
 * MODULE RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Request identity QR session
 * • Display generated QR image
 * • Display payment metadata
 * • Display expiry metadata
 * • Support secure regeneration
 * • Handle loading and API errors
 * ============================================================
 */

import React, { useEffect, useState } from "react";
import { generateQR } from "../../lib/api";

export default function QRPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [payload, setPayload] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQR = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await generateQR();

      if (!response?.qr) {
        throw new Error("QR image was not returned");
      }

      setQr(response.qr);
      setPayload(response?.payload ?? null);

      setPaymentId(response?.paymentId ?? null);

      const expiry =
        response?.expiresAt &&
        !Number.isNaN(new Date(response.expiresAt).getTime())
          ? response.expiresAt
          : null;

      setExpiresAt(expiry);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate QR code"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchQR();
  }, []);

  const formattedExpiry = (() => {
    if (!expiresAt) {
      return null;
    }

    const date = new Date(expiresAt);

    if (Number.isNaN(date.getTime())) {
      return "Invalid expiry date";
    }

    return date.toLocaleString();
  })();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        HoloTap Identity Verification
      </h1>

      <p className="text-gray-600 mb-8">
        Flow‑6 signed identity challenge for HERO verification.
      </p>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {loading
          ? "Generating QR code"
          : error
            ? `Error: ${error}`
            : qr
              ? "QR code generated successfully"
              : "Ready to generate QR code"}
      </div>

      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 border rounded-lg bg-gray-50"
        >
          Generating QR...
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="p-4 border rounded-lg bg-red-50 text-red-700"
        >
          {error}
        </div>
      )}

      {!loading && qr && (
        <div className="border rounded-xl p-8 bg-white shadow-sm">
          <div className="flex flex-col items-center">
            <img
              src={`data:image/png;base64,${qr}`}
              alt="HoloTap Identity QR"
              className="w-60 h-60"
            />

            <button
              type="button"
              disabled={loading}
              aria-disabled={loading}
              aria-label={
                loading
                  ? "Generating QR code"
                  : "Generate a new identity QR code"
              }
              onClick={fetchQR}
              className="
                mt-6
                px-4
                py-2
                rounded-lg
                bg-black
                text-white
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Generating..." : "Regenerate QR"}
            </button>

            {(paymentId || expiresAt) && (
              <div className="mt-6 w-full max-w-lg">
                <div className="bg-gray-50 border rounded-lg p-4">
                  {paymentId && (
                    <div className="mb-2">
                      <span className="font-semibold">
                        Payment ID:
                      </span>{" "}
                      <code>{paymentId}</code>
                    </div>
                  )}

                  {formattedExpiry && (
                    <div>
                      <span className="font-semibold">
                        Expires:
                      </span>{" "}
                      {formattedExpiry}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {payload && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">
                Signed Payload
              </h2>

              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto whitespace-pre-wrap break-all">
                {payload}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}