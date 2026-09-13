"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: severityMatrix.ts
 * Subsystem: Security — Severity Classification Matrix
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * Overview:
 *   Deterministic severity classification for identity, payment, and system events.
 *   Used by Flow‑12 (Identity Logger) and Flow‑8 (Payment Lifecycle).
 *
 * Stability:
 *   • Must remain deterministic and backward compatible.
 *   • No environment‑based or dynamic severity changes permitted.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifySeverity = classifySeverity;
/**
 * Deterministic Flow‑12 severity classifier.
 * Must never throw.
 */
function classifySeverity(event, actor) {
    // Founder escalation (Flow‑11 precedence)
    if (actor === "founder") {
        return "high";
    }
    // Identity events (Flow‑6 / Flow‑10 / Flow‑11)
    if (event.startsWith("identity:anonymous"))
        return "info";
    if (event.startsWith("identity:qr"))
        return "low";
    if (event.startsWith("identity:session"))
        return "medium";
    if (event.startsWith("identity:founder"))
        return "high";
    // Payment lifecycle events (Flow‑8)
    if (event.startsWith("payment:failure"))
        return "critical";
    if (event.startsWith("payment:settlement"))
        return "medium";
    if (event.startsWith("payment:initiation"))
        return "low";
    // System events (Flow‑12)
    if (event.startsWith("system:"))
        return "info";
    // Default classification
    return "info";
}
