/**
 * HoloTap — Deterministic ID Generator (Flow‑10)
 * Engineer: Raymond Newton (E5357171)
 *
 * Guarantees:
 *  - Cryptographically strong randomness
 *  - Ledger‑safe (Flow‑9.6)
 *  - Actor‑safe (Flow‑11)
 *  - Identity‑safe (Flow‑12)
 */

import crypto from "crypto";

export function generateId(length: number = 12): string {
  return crypto.randomBytes(length)
    .toString("base64url")   // URL‑safe, no padding
    .substring(0, length);   // deterministic length
}
