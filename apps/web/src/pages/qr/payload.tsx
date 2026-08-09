/**
 * ============================================================
 *  HoloTap — Flow‑6 Signed Payload Viewer
 *  File: src/pages/qr/payload.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (identity)
 *  Revision: v2.2 — Identity Layer
 *  ------------------------------------------------------------
 *  Purpose:
 *    Provides a deterministic viewer for signed QR payloads.
 *    Accepts a base64-encoded QR payload string, decodes it,
 *    validates structure, and renders a typed JSON viewer.
 *
 *  Dependencies:
 *    - decodeQrPayload() from mobile/security/decodeQrPayload.ts
 *    - Tailwind v4 CSS-first UI pipeline
 *
 *  Notes:
 *    - Stateless, modular, deterministic
 *    - No hidden side-effects
 *    - Fully compatible with async-split router
 * ============================================================
 */

import { useState } from "react";
import { decodeQrPayload } from "../../utils/security/qrPayload";





export default function SignedPayloadViewer() {
  const [input, setInput] = useState("");
  const [payload, setPayload] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDecode() {
    try {
      const decoded = decodeQrPayload(input.trim());
      setPayload(decoded);
      setError(null);
    } catch (err: any) {
      setError("Invalid payload: unable to decode or parse JSON.");
      setPayload(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Signed Payload Viewer</h1>

      <p className="text-gray-600 mb-4">
        Paste a base64‑encoded QR payload string to decode and inspect its
        signed contents.
      </p>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste base64 payload here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-holotap-accent"
      />

      <button
        onClick={handleDecode}
        className="mt-4 px-6 py-3 bg-holotap-primary text-white rounded-lg hover:bg-holotap-accent transition"
      >
        Decode Payload
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Output */}
      {payload && (
        <div className="mt-8 p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Decoded Payload</h2>

          <pre className="bg-white p-4 rounded border border-gray-200 overflow-x-auto text-sm">
            {JSON.stringify(payload, null, 2)}
          </pre>

          {/* Signature Highlight */}
          <div className="mt-6 p-4 bg-holotap-primary text-white rounded">
            <div className="font-semibold">Signature</div>
            <div className="text-sm break-all">{payload.signature}</div>
          </div>

          {/* Expiry */}
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <div className="font-semibold">Expires At</div>
            <div className="text-sm">
              {new Date(payload.expiresAt * 1000).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
