"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 8 — Organisation Access Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 8 resolves organisation context for the authenticated
 *  actor. It binds:
 *
 *      req.orgUser  → org_users record
 *      req.tenant   → org_tenants record
 *
 *  Permission resolution is handled by Flow 9 and must not be
 *  implemented inside Flow 8.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Resolve org_user from actor.id
 *  - Resolve tenant from org_user.tenant relation
 *  - Bind deterministic organisation context
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgMiddleware = orgMiddleware;
const resolveOrg_1 = require("../identity/resolveOrg");
async function orgMiddleware(req, res, next) {
    try {
        const actor = req.actor;
        // ------------------------------------------------------------
        // 1. No actor → no org context
        // ------------------------------------------------------------
        if (!actor || !actor.id) {
            req.orgUser = null;
            req.tenant = null;
            return next();
        }
        // ------------------------------------------------------------
        // 2. Resolve organisation context
        // ------------------------------------------------------------
        const { orgUser, tenant } = await (0, resolveOrg_1.resolveOrg)(actor);
        req.orgUser = orgUser ?? null;
        req.tenant = tenant ?? null;
        // ------------------------------------------------------------
        // 3. Permissions are NOT resolved here (Flow 9)
        // ------------------------------------------------------------
        // Flow 9 will attach:
        //   req.permissions = [...]
        // This middleware must NOT derive permissions.
        return next();
    }
    catch (err) {
        console.error("[Flow 8] Org Middleware Error:", err);
        req.orgUser = null;
        req.tenant = null;
        return next();
    }
}
