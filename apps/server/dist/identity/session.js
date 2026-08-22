"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 7 — Session Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 7 attaches the active session (if any) to the incoming
 *  request. This middleware runs immediately after Flow 6 and
 *  guarantees deterministic access to:
 *
 *      req.actor    → Flow 6 identity
 *      req.session  → Flow 7 session
 *      req.role     → actor/session role
 *      req.state    → session state
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Resolve active (non‑expired) sessions
 *  - Bind session + role + state to the request object
 *  - Maintain deterministic behaviour across all flows
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - No domain logic inside middleware
 *
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = sessionMiddleware;
const resolveSession_1 = require("../identity/resolveSession");
/**
 * sessionMiddleware
 * ------------------------------------------------------------
 * Attaches Flow 7 session context to the request.
 */
async function sessionMiddleware(req, res, next) {
    try {
        // ------------------------------------------------------------
        // 1. Flow 6 must run before Flow 7
        // ------------------------------------------------------------
        const actor = req.actor;
        if (!actor || !actor.id) {
            req.session = null;
            req.role = null;
            req.state = null;
            return next();
        }
        // ------------------------------------------------------------
        // 2. Resolve active session for this actor
        // ------------------------------------------------------------
        const session = await (0, resolveSession_1.resolveSession)({ actor_id: actor.id });
        // ------------------------------------------------------------
        // 3. Bind session context to request
        // ------------------------------------------------------------
        req.session = session ?? null;
        // Role precedence:
        //   1. session.role
        //   2. actor.role (Flow 6)
        req.role = session?.role ?? actor.role ?? null;
        // State precedence:
        //   1. session.state
        req.state = session?.state ?? null;
        return next();
    }
    catch (err) {
        console.error("Flow 7 Session Middleware Error:", err);
        // ------------------------------------------------------------
        // 4. Deterministic fallback on error
        // ------------------------------------------------------------
        req.session = null;
        req.role = null;
        req.state = null;
        return next();
    }
}
