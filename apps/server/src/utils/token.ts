/**
 * =================================================================================================
 *  HoloTapServer — Token Utilities (Flow‑10 / Flow‑11 / Flow‑12)
 *  File: server/utils/token.ts
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 3.0.0
 *  Date: 06 September 2026
 * =================================================================================================
 *
 *  Purpose:
 *    Deterministic QR‑token decoding for Flow‑10 identity sessions.
 *    QR tokens are base64url‑encoded JSON envelopes containing identity metadata.
 *
 *  Guarantees:
 *    - Pure decode logic
 *    - No schema mutation
 *    - Deterministic output
 *    - Actor/session/correlation‑safe (Flow‑11 / Flow‑12)
 * =================================================================================================
 */

export interface QRIdentityPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  qrCode?: string;
  id_qr_code?: string;
  timestamp?: string;

  // Flow‑11 / Flow‑12 metadata
  actorId?: string;
  correlationId?: string;
  sessionId?: string;
}

export async function decryptPayload(token: string): Promise<QRIdentityPayload | null> {
  try {
    // 1. Base64 decode (URL‑safe)
    const buffer = Buffer.from(token, "base64");

    // 2. Convert to UTF‑8 JSON string
    const json = buffer.toString("utf8");

    // 3. Parse JSON payload
    const payload = JSON.parse(json);

    // 4. Return typed identity payload
    return payload as QRIdentityPayload;
  } catch (err) {
    console.error("[QR] decryptPayload Error:", err);
    return null;
  }
}
