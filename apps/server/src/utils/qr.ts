/**
 * HoloTap — QR Identity Token Generator (Flow‑11)
 * Engineer: Raymond Newton (E5357171)
 *
 * Guarantees:
 *  - Cryptographically strong randomness
 *  - URL‑safe token format
 *  - Deterministic length
 *  - Actor‑safe (Flow‑11)
 *  - Session‑safe (Flow‑10)
 *  - Ledger‑safe (Flow‑9.6)
 */

import crypto from "crypto";

export function generateQRToken(length: number = 16): string {
  const raw = crypto.randomBytes(length)
    .toString("base64url")      // URL‑safe, no padding
    .substring(0, length);      // deterministic length

  return `qr_${raw}`;
}
