"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 10 — Founder Override Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 10 evaluates whether the authenticated actor is the
 *  founder. This layer provides deterministic override logic
 *  used by privileged operations across the platform.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Consume actor identity from Flow 6
 *  - Evaluate founder secret headers
 *  - Bind req.isFounder for Flow 11 (Unified Actor Pipeline)
 *  - Provide requireFounder() guard for privileged routes
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure verification logic only
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.founderMiddleware = founderMiddleware;
exports.requireFounder = requireFounder;
const resolveFounder_1 = require("../identity/resolveFounder");
/**
 * founderMiddleware
 * ------------------------------------------------------------
 * Evaluates founder override and binds req.isFounder.
 */
function founderMiddleware(req, res, next) {
    const actor = req.actor ?? null;
    // Deterministic founder evaluation
    const { isFounder } = (0, resolveFounder_1.resolveFounder)(actor, req);
    req.isFounder = isFounder;
    next();
}
/**
 * requireFounder
 * ------------------------------------------------------------
 * Route guard for founder‑only operations.
 */
function requireFounder(req, res, next) {
    if (!req.isFounder) {
        return res.status(403).json({
            ok: false,
            error: "FOUNDER_REQUIRED",
        });
    }
    next();
}
