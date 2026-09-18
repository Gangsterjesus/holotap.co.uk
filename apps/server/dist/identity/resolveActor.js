"use strict";
/**
 * ============================================================
 * HoloTapServer — Modern Actor Resolver
 * Flow 6 — Identity Resolution Layer
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.1.0
 * Date: 18 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveActor = resolveActor;
const resolveFounder_1 = require("./resolveFounder");
const resolveSession_1 = require("./resolveSession");
const resolveQrIdentity_1 = require("./resolveQrIdentity");
const ANONYMOUS_ACTOR = {
    id: null,
    type: "anonymous",
    method: "anonymous",
    role: null,
    issuedAt: null,
};
async function resolveActor(req) {
    try {
        /**
         * ------------------------------------------------------------
         * 1. Founder Identity
         * ------------------------------------------------------------
         */
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
        /**
         * ------------------------------------------------------------
         * 2. Session Identity
         * ------------------------------------------------------------
         */
        const sessionId = req.header("x-identity-session");
        if (sessionId) {
            const session = await (0, resolveSession_1.resolveSession)({
                id: sessionId,
            });
            if (session) {
                const resolved = session;
                return {
                    id: resolved.actor_id,
                    type: "session",
                    method: "session",
                    role: resolved.role ?? null,
                    issuedAt: resolved.created_at?.getTime() ?? Date.now(),
                };
            }
        }
        /**
         * ------------------------------------------------------------
         * 3. QR Identity
         * ------------------------------------------------------------
         */
        const qrToken = req.header("x-qr-token");
        if (qrToken) {
            const actor = await (0, resolveQrIdentity_1.resolveQrIdentity)(qrToken);
            if (actor) {
                return actor;
            }
        }
        /**
         * ------------------------------------------------------------
         * 4. Anonymous Fallback
         * ------------------------------------------------------------
         */
        return ANONYMOUS_ACTOR;
    }
    catch (error) {
        console.error("[Flow 6] resolveActor Error:", error);
        return ANONYMOUS_ACTOR;
    }
}
