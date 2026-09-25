/**
 * ============================================================
 *  HoloTap — Flow‑6 Identity Verification Surface
 *  File: src/pages/qr/verify.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (identity)
 *  Revision: v2.3 — Identity Layer Verification
 *  ------------------------------------------------------------
 *  Purpose:
 *    Provides deterministic verification of signed QR payloads.
 *    Decodes base64 payload, recomputes signature, checks expiry,
 *    validates hologram binding, and returns structured results.
 *
 *  Dependencies:
 *    - decodeQrPayload() from qrPayload.ts
 *    - verifyQrPayload() from qrVerify.ts
 *    - Tailwind v4 CSS-first UI pipeline
 *
 *  Notes:
 *    - Stateless, modular, deterministic
 *    - No hidden side-effects
 *    - Fully compatible with async-split router
 * ============================================================
 */

import { useState } from "react";
import { decodeQrPayload } from "./qrPayload";
import { verifyQrPayload } from "./qrVerify";

export default function VerifyIdentity() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<any | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleVerify() {
    try {
      const payload = decodeQrPayload(input.trim());
      setDecoded(payload);

      const verification = verifyQrPayload(payload);
      setResult(verification);

      setError(null);
    } catch (err: any) {
      setError("Invalid payload: unable to decode or verify.");
      setDecoded(null);
      setResult(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Verify Identity Payload</h1>

      <p className="text-gray-600 mb-4">
        Paste a base64‑encoded QR payload string to verify its signature,
        expiry, hologram binding, and canonical structure.
      </p>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste base64 payload here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-holotap-accent"
      />

      <button
        onClick={handleVerify}
        className="mt-4 px-6 py-3 bg-holotap-primary text-white rounded-lg hover:bg-holotap-accent transition"
      >
        Verify Payload
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Verification Result */}
      {result && (
        <div className="mt-8 p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Verification Result</h2>

          <div
            className={
              result.ok
                ? "p-4 bg-green-100 border border-green-300 rounded mb-4"
                : "p-4 bg-red-100 border border-red-300 rounded mb-4"
            }
          >
            <div className="font-bold text-lg">
              {result.ok ? "VALID" : "INVALID"}
            </div>
            <div className="text-sm">{result.message}</div>
          </div>

          <div className="mt-4 p-4 bg-white rounded border border-gray-200">
            <div className="font-semibold">Verification Code</div>
            <div className="text-sm">{result.code}</div>
          </div>

          {/* Decoded Payload */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Decoded Payload</h3>
            <pre className="bg-white p-4 rounded border border-gray-200 overflow-x-auto text-sm">
              {JSON.stringify(decoded, null, 2)}
            </pre>
          </div>

          {/* Expiry */}
          <div className="mt-6 p-4 bg-gray-200 rounded">
            <div className="font-semibold">Expires At</div>
            <div className="text-sm">
              {new Date(decoded.expiresAt * 1000).toLocaleString()}
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6 p-4 bg-holotap-primary text-white rounded">
            <div className="font-semibold">Signature</div>
            <div className="text-sm break-all">{decoded.signature}</div>
          </div>
        </div>
      )}
    </div>
  );
}
