"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: identityPropagationValidator.ts
 * Subsystem: Security — Identity Propagation Validation
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Validates identity envelopes as they propagate through middleware, routes,
 *   controllers, and services. Ensures actor correctness before Flow 12 logging
 *   and Flow 8 payment lifecycle execution.
 *
 * SECTION: Purpose
 *   • Detect missing or malformed identity envelopes.
 *   • Enforce presence of required actor fields (type, issuedAt).
 *   • Provide deterministic validation results without throwing exceptions.
 *
 * SECTION: Scope
 *   • UnifiedActor objects produced by Flow 11.
 *   • Identity propagation across backend layers.
 *   • Integration with correlation IDs and severity matrix.
 *
 * SECTION: Stability Notes
 *   This module must never throw. All validation failures must be expressed as
 *   structured results for upstream middleware to handle.
 *
 * SECTION: Engineering Notes
 *   • Actor precedence is handled by Flow 11; this module only validates output.
 *   • Missing actor envelopes must be treated as invalid propagation.
 *   • Validation logic must remain stable across all flows.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdentityPropagation = validateIdentityPropagation;
function validateIdentityPropagation(actor) {
    if (!actor) {
        return { valid: false, reason: "Missing actor" };
    }
    if (!actor.type) {
        return { valid: false, reason: "Actor missing type" };
    }
    if (!actor.issuedAt) {
        return { valid: false, reason: "Actor missing issuedAt" };
    }
    return { valid: true };
}
