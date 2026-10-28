/**
 * ============================================================
 * HoloTap HERO v5.0.0 — Signed Payload Viewer
 * ============================================================
 * File: src/pages/qr/payload.tsx
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
 * Purpose:
 *   Developer and testing utility for inspecting Flow‑6
 *   signed QR payloads used in the HERO payment flow.
 *
 * Responsibilities:
 *   • Decode payloads
 *   • Display payment metadata
 *   • Display verification metadata
 *   • Display security metadata
 *   • Validate payload structure
 * ============================================================
 */

import { useState } from "react";
import { decodeQrPayload } from "../../utils/security/qrPayload";

export default function SignedPayloadViewer() {
  const [input, setInput] = useState("");
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDecode() {
    try {
      const decoded = decodeQrPayload(input.trim());

      setPayload(decoded);
      setError(null);
    } catch {
      setPayload(null);
      setError(
        "Invalid payload: unable to decode or parse payload."
      );
    }
  }

  const formattedExpiry = (() => {
    const expiresAt = payload?.expiresAt;

    if (
      expiresAt === undefined ||
      expiresAt === null
    ) {
      return "Not available";
    }

    const timestamp =
      typeof expiresAt === "number"
        ? expiresAt * 1000
        : Number(expiresAt);

    const date = new Date(timestamp);

    return Number.isNaN(date.getTime())
      ? "Invalid expiry date"
      : date.toLocaleString();
  })();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-3">
        Flow‑6 Signed Payload Viewer
      </h1>

      <p className="text-gray-600 mb-6">
        Decode and inspect HERO identity and payment QR payloads.
      </p>

      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {error
          ? error
          : payload
            ? "Payload decoded successfully"
            : "Ready to decode payload"}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste base64 payload here..."
        className="
          w-full
          h-40
          p-4
          border
          border-gray-300
          rounded-lg
          focus:outline-none
        "
      />

      <button
        type="button"
        onClick={handleDecode}
        disabled={!input.trim()}
        className="
          mt-4
          px-6
          py-3
          bg-black
          text-white
          rounded-lg
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Decode Payload
      </button>

      {error && (
        <div
          role="alert"
          className="
            mt-4
            p-4
            bg-red-100
            text-red-700
            border
            border-red-300
            rounded
          "
        >
          {error}
        </div>
      )}

      {payload && (
        <div className="mt-8 space-y-4">

          <div className="p-6 bg-gray-100 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Decoded Payload
            </h2>

            <pre className="bg-white p-4 rounded border overflow-x-auto text-sm">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold mb-2">
              HERO Metadata
            </h3>

            <div className="space-y-2 text-sm">

              {"paymentId" in payload && (
                <div>
                  <span className="font-semibold">
                    Payment ID:
                  </span>{" "}
                  <code>
                    {String(payload.paymentId)}
                  </code>
                </div>
              )}

              {"identitySessionId" in payload && (
                <div>
                  <span className="font-semibold">
                    Identity Session:
                  </span>{" "}
                  <code>
                    {String(payload.identitySessionId)}
                  </code>
                </div>
              )}

              {"merchantId" in payload && (
                <div>
                  <span className="font-semibold">
                    Merchant ID:
                  </span>{" "}
                  <code>
                    {String(payload.merchantId)}
                  </code>
                </div>
              )}

            </div>
          </div>

          {"signature" in payload && (
            <div className="p-4 bg-black text-white rounded-lg">
              <div className="font-semibold mb-2">
                Signature
              </div>

              <div className="text-sm break-all">
                {String(payload.signature)}
              </div>
            </div>
          )}

          <div className="p-4 bg-gray-200 rounded-lg">
            <div className="font-semibold">
              Expires At
            </div>

            <div className="text-sm">
              {formattedExpiry}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}