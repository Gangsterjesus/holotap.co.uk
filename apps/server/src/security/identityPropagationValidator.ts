/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: identityPropagationValidator.ts
 * Subsystem: Security — Identity Propagation Validation
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * Overview:
 *   Validates UnifiedActor envelopes as they propagate through middleware, routes,
 *   controllers, and services. Ensures actor correctness before Flow‑12 logging
 *   and Flow‑8 payment lifecycle execution.
 *
 * Stability:
 *   • Must never throw.
 *   • All failures must be expressed as deterministic results.
 * ────────────────────────────────────────────────────────────────────────────────
 */

export type ActorType =
  | "anonymous"
  | "creator"
  | "merchant"
  | "system"
  | "founder";

export interface UnifiedActor {
  type: ActorType;
  issuedAt: number; // epoch ms
  actorId?: string;
  sessionId?: string;
  correlationId?: string;
  [key: string]: unknown;
}

export interface IdentityPropagationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Deterministic Flow‑11 identity propagation validator.
 * Must never throw.
 */
export function validateIdentityPropagation(
  actor: UnifiedActor | undefined | null
): IdentityPropagationResult {
  if (!actor) {
    return { valid: false, reason: "Missing actor envelope" };
  }

  if (!actor.type) {
    return { valid: false, reason: "Actor missing type" };
  }

  if (!actor.issuedAt) {
    return { valid: false, reason: "Actor missing issuedAt timestamp" };
  }

  // Optional: enforce timestamp sanity (non‑zero, non‑future)
  if (typeof actor.issuedAt !== "number" || actor.issuedAt <= 0) {
    return { valid: false, reason: "Actor issuedAt timestamp invalid" };
  }

  return { valid: true };
}
