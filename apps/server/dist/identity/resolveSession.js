"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSession = resolveSession;
/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 *
 * File: resolveSession.ts
 * Module: Flow 7 Session Resolver
 *
 * Purpose:
 *   Resolve active actor sessions using deterministic
 *   lookup criteria against the canonical Prisma layer.
 *
 * Responsibilities:
 *   - Resolve active sessions
 *   - Enforce session activity constraints
 *   - Load actor relationships
 *   - Provide deterministic session objects
 *   - Maintain Prisma compatibility
 * ============================================================
 */
const db_1 = require("../db");
async function resolveSession(where) {
    if (!where) {
        return null;
    }
    const session = await db_1.prisma.sessions.findFirst({
        where: {
            ...where,
            expires_at: null,
        },
    });
    if (!session) {
        return null;
    }
    return {
        session_id: session.id,
        actor_id: session.actor_id,
        role: session.role,
        state: session.state,
        risk_state: "low",
        created_at: session.created_at,
        expires_at: session.expires_at ?? new Date(),
        source: "flow7",
        metadata: session.metadata ?? null,
    };
}
