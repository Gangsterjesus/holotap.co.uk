"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: severityMatrix.ts
 * Subsystem: Security — Severity Classification Matrix
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Implements deterministic severity classification for identity, payment, and
 *   system events. Used by Flow 12 (Identity Logger) and Flow 8 (Payment Lifecycle).
 *
 * SECTION: Purpose
 *   • Provide stable severity levels for all backend events.
 *   • Ensure consistent logging, monitoring, and escalation behaviour.
 *   • Support identity and payment subsystems with predictable classifications.
 *
 * SECTION: Scope
 *   • Identity events (anonymous, QR, session, founder).
 *   • Payment lifecycle events (initiation, settlement, failure).
 *   • System-level routing and middleware events.
 *
 * SECTION: Stability Notes
 *   Severity classification must remain deterministic and backward compatible.
 *   No dynamic or environment-based severity changes are permitted.
 *
 * SECTION: Engineering Notes
 *   • Founder identity events escalate to “high”.
 *   • Payment failures escalate to “critical”.
 *   • Unclassified events default to “info”.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifySeverity = classifySeverity;
function classifySeverity(event) {
    if (event.includes("identity:anonymous"))
        return "info";
    if (event.includes("identity:qr"))
        return "low";
    if (event.includes("identity:session"))
        return "medium";
    if (event.includes("identity:founder"))
        return "high";
    if (event.includes("payment:failure"))
        return "critical";
    return "info";
}
