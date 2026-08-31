"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: actorPipeline.ts
 * Flow: 11 — Unified Actor Pipeline
 * Subsystem: Identity Resolution Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.actorPipeline = actorPipeline;
const resolveFounder_1 = require("../identity/resolveFounder");
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Unified Actor Pipeline (Flow‑11)
 * ────────────────────────────────────────────────────────────────────────────────
 */
function actorPipeline(req, _res, next) {
    const raw = req.actor;
    const session = req.session ?? null;
    const orgUser = req.orgUser ?? null;
    const tenant = req.tenant ?? null;
    const permissions = req.permissions ?? [];
    const { isFounder } = (0, resolveFounder_1.resolveFounder)(raw, req);
    const unified = {
        id: raw?.id ?? null,
        identityId: raw?.id ?? null,
        type: raw?.type ?? null,
        merchantId: null,
        role: raw?.role ?? null,
        metadata: raw?.metadata ?? null,
        session,
        orgUser,
        tenant,
        permissions,
        isFounder,
        issuedAt: raw?.issuedAt ?? Date.now()
    };
    req.actor = unified;
    next();
}
