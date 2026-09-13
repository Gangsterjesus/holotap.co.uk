"use strict";
/**
 * ============================================================
 * HoloTapServer — Identity Layer
 * Flow 6 — Modern Actor Resolver
 *
 * Engineer: Raymond Newton (E5357171)
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
                session_id: sessionId,
            });
            if (session) {
                return {
                    id: session.actor_id,
                    type: "session",
                    method: "session",
                    role: session.role ?? null,
                    issuedAt: session.created_at?.getTime() ?? null,
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
