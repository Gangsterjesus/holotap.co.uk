"use strict";
/**
 * ============================================================
 * HoloTapServer — Modern Actor Resolver
 * Flow 6 — Identity Resolution Layer
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 15 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * Resolves inbound request identities into deterministic actor
 * envelopes used throughout the HoloTap platform.
 *
 * The Modern Actor Resolver provides the primary identity entry
 * point for Flow 6 and supplies actor information consumed by
 * later identity, auditing, and registry workflows.
 *
 * RESOLUTION ORDER
 * ------------------------------------------------------------
 * • Founder Identity
 * • Session Identity
 * • QR Identity
 * • Anonymous Identity
 *
 * RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Resolve request actor identity
 * • Validate active sessions
 * • Resolve founder access
 * • Resolve QR-based identities
 * • Generate deterministic actor envelopes
 * • Support downstream identity propagation
 *
 * FLOW INTEGRATION
 * ------------------------------------------------------------
 * • Flow 6   — Identity Resolution
 * • Flow 7   — Session Lifecycle
 * • Flow 9   — Registry Binding
 * • Flow 11  — Unified Actor Pipeline
 * • Flow 12  — Correlation & Audit
 *
 * ENGINEERING NOTES
 * ------------------------------------------------------------
 * • Resolution logic only.
 * • No direct HTTP responses.
 * • No persistence operations.
 * • Deterministic actor generation.
 * • Must remain backwards compatible with legacy flows.
 *
 * OUTPUT CONTRACT
 * ------------------------------------------------------------
 * Returns:
 * • Founder actor
 * • Session actor
 * • QR actor
 * • Anonymous actor
 *
 * CHANGE LOG
 * ------------------------------------------------------------
 * v5.0.0
 * • Flow 11 compatibility review.
 * • Session resolution modernised.
 * • Actor envelope standardisation.
 * • Documentation aligned with engineering standards.
 *
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveActor = resolveActor;
const resolveFounder_1 = require("./resolveFounder");
const resolveSession_1 = require("./resolveSession");
const resolveQrIdentity_1 = require("./resolveQrIdentity");
async function resolveActor(req) {
    try {
        // ------------------------------------------------------------
        // 1. Founder Identity
        // ------------------------------------------------------------
        const founderKey = req.header("x-founder-key");
        if (founderKey) {
            const founder = (0, resolveFounder_1.resolveFounder)(founderKey, req);
            if (founder) {
                return {
                    id: "founder",
                    type: "founder",
                    method: "founder",
                    role: "founder",
                    issuedAt: Date.now(),
                };
            }
        }
        // ------------------------------------------------------------
        // 2. Session Identity
        // ------------------------------------------------------------
        const sessionId = req.header("x-identity-session");
        if (sessionId) {
            const session = await (0, resolveSession_1.resolveSession)({
                id: sessionId,
            });
            if (session) {
                return {
                    id: session.actor_id,
                    type: "session",
                    method: "session",
                    role: session.role ?? null,
                    issuedAt: session.created_at?.getTime() ?? Date.now(),
                };
            }
        }
        // ------------------------------------------------------------
        // 3. QR Identity
        // ------------------------------------------------------------
        const qrToken = req.header("x-qr-token");
        if (qrToken) {
            const actor = await (0, resolveQrIdentity_1.resolveQrIdentity)(qrToken);
            if (actor) {
                return actor;
            }
        }
        // ------------------------------------------------------------
        // 4. Anonymous Fallback
        // ------------------------------------------------------------
        return {
            id: null,
            type: "anonymous",
            method: "anonymous",
            role: null,
            issuedAt: null,
        };
    }
    catch (error) {
        console.error("[Flow 6] resolveActor Error:", error);
        return {
            id: null,
            type: "anonymous",
            method: "anonymous",
            role: null,
            issuedAt: null,
        };
    }
}
