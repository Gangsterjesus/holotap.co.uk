"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentitySession = createIdentitySession;
/**
 * Flow 10 Defaults
 * ------------------------------------------------------------
 * Canonical session creation defaults.
 *
 * Any modification to these values requires review of:
 *   • Flow 10 Identity Session Store
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit & Correlation
 */
const DEFAULT_SESSION_STATE = "active";
const DEFAULT_RISK_STATE = "normal";
const DEFAULT_SOURCE = "flow-10";
async function createIdentitySession(prisma, { sessionId, actorId, role, merchantId = null, metadata = null, expiresAt, }) {
    return prisma.identity_sessions.create({
        data: {
            session_id: sessionId,
            actor_id: actorId,
            role,
            merchant_id: merchantId,
            state: DEFAULT_SESSION_STATE,
            risk_state: DEFAULT_RISK_STATE,
            source: DEFAULT_SOURCE,
            created_at: new Date(),
            expires_at: expiresAt,
            metadata: metadata ?? {},
        },
    });
}
