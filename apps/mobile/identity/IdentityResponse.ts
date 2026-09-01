/**
 * ============================================================
 *  HoloTap Identity — Response Type (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: IdentityResponse.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Defines the structure of identity responses returned from
 *  the backend during Flow 6 → Flow 7 → Flow 8.
 *
 *  STRUCTURE:
 *    valid:     Whether the identity envelope is valid
 *    message:   Optional validation or error message
 *    payload:   Decrypted payload returned from server
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Pure TypeScript
 *  - Deterministic, no generics
 * ============================================================
 */

export type ActorType = "customer" | "merchant" | "device";

export interface IdentityResponse {
  actorId: string;
  actorType: ActorType;
  issuedAt: number;
  expiresAt: number;
  sessionToken: string;
}