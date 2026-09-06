/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: disclosurePolicy.ts
 * Subsystem: Security — Responsible Disclosure Policy
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * Purpose:
 *   Deterministic disclosure rules for identity, payment, and system events.
 *   Integrated with Flow‑12 identity logging and severity matrix.
 *
 * Stability:
 *   • Must never throw.
 *   • Must return deterministic decisions.
 *   • All callers must inspect the returned decision.
 * ────────────────────────────────────────────────────────────────────────────────
 */

export type ActorType =
  | "anonymous"
  | "creator"
  | "merchant"
  | "system"
  | "founder";

export type EventType =
  | `identity:${string}`
  | `payment:${string}`
  | `system:${string}`
  | `general:${string}`;

export interface DisclosureDecision {
  allowed: boolean;
  reason: string;
}

/**
 * Core deterministic disclosure engine (Flow‑12)
 */
export function evaluateDisclosure(
  actorType: ActorType,
  eventType: EventType
): DisclosureDecision {
  // Founder override — highest visibility tier
  if (actorType === "founder") {
    return {
      allowed: true,
      reason: "Founder-level visibility override"
    };
  }

  // Payment lifecycle events (Flow‑8)
  if (eventType.startsWith("payment:")) {
    return {
      allowed: false,
      reason: "Payment events restricted by policy"
    };
  }

  // Identity events (Flow‑6 / Flow‑10 / Flow‑11)
  if (eventType.startsWith("identity:")) {
    return {
      allowed: false,
      reason: "Identity events restricted by policy"
    };
  }

  // System-level events (Flow‑12)
  if (eventType.startsWith("system:")) {
    return {
      allowed: true,
      reason: "System event — safe to disclose"
    };
  }

  // General events (default allow)
  return {
    allowed: true,
    reason: "General event — disclosure permitted"
  };
}
