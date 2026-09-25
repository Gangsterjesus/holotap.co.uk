/**
 * ============================================================
 *  HoloTap Identity — Envelope Type (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: IdentityEnvelope.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Defines the structure of the identity envelope used by
 *  HoloTap Mobile during Flow 6 → Flow 7 → Flow 8.
 *
 *  STRUCTURE:
 *    deviceId:  Stable device identity string
 *    issuedAt:  Timestamp (ms)
 *    payload:   Arbitrary merchant/session/payment data
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Pure TypeScript
 *  - Deterministic, no generics
 * ============================================================
 */

export interface IdentityEnvelope {
  deviceId: string;
  issuedAt: number;
  payload: Record<string, unknown>;
}
