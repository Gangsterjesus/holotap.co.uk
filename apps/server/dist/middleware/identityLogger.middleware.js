"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: identityLogger.middleware.ts
 * Flow: 12 — Identity Logger + Middleware
 * Subsystem: Identity Resolution + Observability Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 August 2026
 *
 * SECTION: Overview
 *   Provides deterministic identity logging for all inbound requests. Captures
 *   actor type, role, issuedAt timestamp, correlation ID, and redacted metadata.
 *   Supports Flow 7 (Status), Flow 8 (Payment Lifecycle), and backend hardening.
 *
 * SECTION: Purpose
 *   • Add observability to identity subsystem
 *   • Provide correlation IDs for multi‑flow tracing
 *   • Log identity envelopes safely with redaction rules
 *   • Support audit trails and severity matrix
 *
 * SECTION: Stability Notes
 *   This middleware must never throw. Logging failures degrade gracefully.
 *   Sensitive metadata must always be redacted before logging.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = identityLoggerMiddleware;
const crypto_1 = require("crypto");
// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Correlation ID Generator
// ────────────────────────────────────────────────────────────────────────────────
function generateCorrelationId() {
    return `holotap-${Date.now()}-${(0, crypto_1.randomUUID)()}`;
}
// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Metadata Redaction Rules
// ────────────────────────────────────────────────────────────────────────────────
const REDACT_FIELDS = new Set([
    "sessionToken",
    "qrSignature",
    "privateKey",
    "founderSecret",
    "authToken",
]);
function redactMetadata(metadata) {
    const safe = {};
    for (const [key, value] of Object.entries(metadata)) {
        if (!REDACT_FIELDS.has(key))
            safe[key] = value;
    }
    return safe;
}
// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Identity Logging Payload Builder
// ────────────────────────────────────────────────────────────────────────────────
function buildIdentityLog(actor, correlationId) {
    return {
        correlationId,
        actorType: actor.type,
        role: actor.role,
        issuedAt: actor.issuedAt,
        metadata: redactMetadata(actor.metadata),
    };
}
// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Identity Logger Middleware
// ────────────────────────────────────────────────────────────────────────────────
function identityLoggerMiddleware(req, _res, next) {
    try {
        const correlationId = generateCorrelationId();
        req.correlationId = correlationId;
        const actor = req.actor ?? {
            type: "anonymous",
            role: null,
            issuedAt: Date.now(),
            metadata: {},
        };
        const payload = buildIdentityLog(actor, correlationId);
        console.log("[IdentityLogger]", JSON.stringify(payload));
        next();
    }
    catch (err) {
        console.error("[IdentityLoggerError]", err);
        next();
    }
}
