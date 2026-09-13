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
// Flow‑9.6 PostgreSQL Ledger
const registryLedger_pg_1 = require("../registryLedger.pg");
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Unified Actor Pipeline (Flow‑11)
 * ────────────────────────────────────────────────────────────────────────────────
 */
async function actorPipeline(req, _res, next) {
    const raw = req.actor;
    const session = req.session ?? null;
    const orgUser = req.orgUser ?? null;
    const tenant = req.tenant ?? null;
    const permissions = req.permissions ?? [];
    const { isFounder } = (0, resolveFounder_1.resolveFounder)(raw, req);
    const unified = {
        id: raw?.id ?? null,
        identityId: raw?.id ?? null,
        type: (raw?.type ?? null),
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
    /**
     * ────────────────────────────────────────────────────────────────────────────────
     * Flow‑11 → Flow‑9.6 Ledger Emission
     * -------------------------------------------------------------------------------
     * Every inbound request now produces a deterministic actor envelope.
     * This enables:
     *   • Full actor replay (Flow‑15)
     *   • Full identity traceability (Flow‑12)
     *   • Full audit history for all flows
     *   • Deterministic debugging + correlation
     * ────────────────────────────────────────────────────────────────────────────────
     */
    try {
        await (0, registryLedger_pg_1.addRecord)({
            flow: "flow-11",
            event_type: "actor_pipeline_resolved",
            sessionId: unified.session?.id ?? null,
            actor: {
                type: unified.type,
                sessionId: unified.session?.id ?? null,
                merchantId: unified.merchantId ?? null,
                consumerId: unified.identityId ?? null
            },
            correlationId: req.correlationId ?? "no-correlation-id",
            envelope: unified,
            timestamp: Date.now()
        });
    }
    catch (err) {
        console.error("[Flow‑11 Ledger] Failed to write actor envelope:", err);
    }
    next();
}
