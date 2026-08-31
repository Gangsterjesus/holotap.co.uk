"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: identityLogger.middleware.ts
 * Flow: 12 — Identity Logger + Middleware
 * Subsystem: Identity Resolution + Observability Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 August 2026
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = identityLoggerMiddleware;
const crypto_1 = require("crypto");
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Correlation ID Generator
 * ────────────────────────────────────────────────────────────────────────────────
 */
function generateCorrelationId() {
    return `holotap-${Date.now()}-${(0, crypto_1.randomUUID)()}`;
}
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Metadata Redaction Rules
 * ────────────────────────────────────────────────────────────────────────────────
 */
const REDACT_FIELDS = new Set([
    "sessionToken",
    "qrSignature",
    "privateKey",
    "founderSecret",
    "authToken"
]);
function redactMetadata(metadata) {
    const safe = {};
    for (const [key, value] of Object.entries(metadata)) {
        if (!REDACT_FIELDS.has(key))
            safe[key] = value;
    }
    return safe;
}
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Identity Logging Payload Builder
 * ────────────────────────────────────────────────────────────────────────────────
 */
function buildIdentityLog(actor, correlationId) {
    return {
        correlationId,
        actorType: actor.type,
        role: actor.role,
        issuedAt: actor.issuedAt ?? Date.now(),
        metadata: redactMetadata(actor.metadata ?? {})
    };
}
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Identity Logger Middleware
 * ────────────────────────────────────────────────────────────────────────────────
 */
function identityLoggerMiddleware(req, _res, next) {
    try {
        const correlationId = generateCorrelationId();
        req.correlationId = correlationId;
        const actor = req.actor ?? {
            id: null,
            identityId: null,
            type: "anonymous",
            merchantId: null,
            role: null,
            metadata: {},
            session: null,
            orgUser: null,
            tenant: null,
            permissions: [],
            isFounder: false,
            issuedAt: Date.now()
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
