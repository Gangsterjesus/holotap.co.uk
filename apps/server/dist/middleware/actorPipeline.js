"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 11 — Unified Actor Pipeline
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 11 consolidates identity context from all upstream flows:
 *
 *      • Flow 6 — Actor Identity
 *      • Flow 7 — Session Lifecycle
 *      • Flow 8 — Organisation Resolution
 *      • Flow 9 — Permission Roles
 *      • Flow 10 — Founder Override
 *
 *  This middleware guarantees that every request carries a fully
 *  resolved identity context for deterministic access control.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Bind unified actor object to req.actor
 *  - Bind organisation context (orgUser + tenant)
 *  - Bind permissions (Flow 9)
 *  - Bind founder override flag
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Founder override always evaluated last
 *
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.actorPipeline = actorPipeline;
const resolveFounder_1 = require("../identity/resolveFounder");
function actorPipeline(req, res, next) {
    // ------------------------------------------------------------
    // 1. Flow 6 — Actor Identity
    // ------------------------------------------------------------
    const actor = req.actor ?? null;
    // ------------------------------------------------------------
    // 2. Flow 7 — Session Context
    // ------------------------------------------------------------
    const session = req.session ?? null;
    // ------------------------------------------------------------
    // 3. Flow 8 — Organisation Context
    // ------------------------------------------------------------
    const orgUser = req.orgUser ?? null;
    const tenant = req.tenant ?? null;
    // ------------------------------------------------------------
    // 4. Flow 9 — Permission Roles (placeholder)
    // ------------------------------------------------------------
    const permissions = req.permissions ?? [];
    // ------------------------------------------------------------
    // 5. Flow 10 — Founder Override
    // ------------------------------------------------------------
    const { isFounder } = (0, resolveFounder_1.resolveFounder)(actor, req);
    // ------------------------------------------------------------
    // 6. Unified Actor Object (Flow 11 Output Contract)
    // ------------------------------------------------------------
    req.actor = {
        ...actor,
        session,
        orgUser,
        tenant,
        permissions,
        isFounder,
    };
    // ------------------------------------------------------------
    // 7. Pipeline Complete
    // ------------------------------------------------------------
    next();
}
