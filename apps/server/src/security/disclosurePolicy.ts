/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: disclosurePolicy.ts
 * Subsystem: Security — Responsible Disclosure Policy
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Implements the Responsible Disclosure Policy used across backend hardening,
 *   Flow 12 identity logging, and Flow 8 payment lifecycle. Determines whether
 *   identity, payment, or system events may be disclosed to the caller or logs.
 *
 * SECTION: Purpose
 *   • Enforce strict disclosure rules for sensitive identity and payment events.
 *   • Provide deterministic decisions for logging and API responses.
 *   • Prevent accidental leakage of identity envelopes or payment metadata.
 *
 * SECTION: Scope
 *   • Identity events (anonymous, QR, session, founder).
 *   • Payment lifecycle events (initiation, settlement, failure).
 *   • System-level events (routing, middleware, correlation IDs).
 *   • Integration with severity matrix and identity logger.
 *
 * SECTION: Stability Notes
 *   This module must never throw. All callers must inspect the returned decision.
 *   Disclosure rules must remain deterministic and stable across all flows.
 *
 * SECTION: Engineering Notes
 *   • Founder-level visibility overrides all restrictions.
 *   • Payment and identity events are restricted by default.
 *   • General system events are allowed unless explicitly classified.
 * ────────────────────────────────────────────────────────────────────────────────
 */


export interface DisclosureDecision {
  allowed: boolean;
  reason: string;
}

export function evaluateDisclosure(actorType: string, eventType: string): DisclosureDecision {
  if (actorType === "founder") {
    return { allowed: true, reason: "Founder-level visibility" };
  }

  if (eventType.startsWith("payment:")) {
    return { allowed: false, reason: "Payment events restricted" };
  }

  if (eventType.startsWith("identity:")) {
    return { allowed: false, reason: "Identity events restricted" };
  }

  return { allowed: true, reason: "General event" };
}
