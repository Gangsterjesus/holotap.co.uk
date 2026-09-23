"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: routes/founder.ts
 * Flow: 10 — Founder Override Layer
 * Subsystem: Privileged Operations + Flow‑9.6 Ledger
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Provides privileged system‑level routes accessible only to the founder.
 *   All routes emit Flow‑9.6 ledger envelopes for deterministic replay and
 *   auditability. Requires req.isFounder from Flow‑10 middleware.
 *
 * Guarantees:
 *   • Pure founder‑only access logic
 *   • No destructive operations unless explicitly coded
 *   • Deterministic envelopes + correlation IDs
 *   • Ledger‑safe + replay‑safe
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.founderRoute = void 0;
const express_1 = require("express");
const founderMiddleware_1 = require("../middleware/founderMiddleware");
const registryLedger_pg_1 = require("../registryLedger.pg");
exports.founderRoute = (0, express_1.Router)();
/**
 * Utility: Emit Flow‑9.6 ledger entry for founder actions
 */
async function emitFounderLedger(req, event, envelope) {
    const actor = req?.actor ?? {};
    const correlationId = req?.correlationId ?? "no-correlation-id";
    await (0, registryLedger_pg_1.addRecord)({
        flow: "flow-10",
        event: "actor_pipeline_resolved",
        sessionId: actor.session?.id ?? null,
        actor: {
            type: actor.type ?? "founder",
            sessionId: actor.session?.id ?? null,
            merchantId: actor.merchantId ?? null,
            consumerId: actor.identityId ?? null
        },
        correlationId,
        envelope,
        timestamp: Date.now()
    });
    /**
     * GET /founder/ping
     * Founder override verification
     */
    exports.founderRoute.get("/ping", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            message: "Founder override active",
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_ping", envelope);
        res.json({
            ok: true,
            founder: true,
            message: "Founder override active."
        });
    });
    exports.founderRoute.get("/system", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            node: process.version,
            platform: process.platform,
            uptime: process.uptime(),
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_system_introspection", envelope);
        res.json({
            ok: true,
            system: envelope
        });
    });
    exports.founderRoute.get("/env", founderMiddleware_1.requireFounder, async (req, res) => {
        const safeEnv = {
            NODE_ENV: process.env.NODE_ENV,
            VERSION: process.env.VERSION
        };
        await emitFounderLedger(req, "founder_env_inspection", safeEnv);
        res.json({
            ok: true,
            env: safeEnv
        });
    });
    exports.founderRoute.post("/recovery/activate", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            recovery: true,
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_recovery_activated", envelope);
        res.json({
            ok: true,
            recovery: true,
            message: "Founder recovery mode activated."
        });
    });
    exports.founderRoute.post("/qr/override", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            action: "QR_OVERRIDE_TRIGGERED",
            received: req.body,
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_qr_override", envelope);
        res.json({
            ok: true,
            action: "QR_OVERRIDE_TRIGGERED"
        });
    });
    exports.founderRoute.post("/tenant/repair", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            action: "TENANT_REPAIR_TRIGGERED",
            received: req.body,
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_tenant_repair", envelope);
        res.json({
            ok: true,
            action: "TENANT_REPAIR_TRIGGERED"
        });
    });
    exports.founderRoute.post("/user/repair", founderMiddleware_1.requireFounder, async (req, res) => {
        const envelope = {
            action: "USER_REPAIR_TRIGGERED",
            received: req.body,
            timestamp: Date.now()
        };
        await emitFounderLedger(req, "founder_user_repair", envelope);
        res.json({
            ok: true,
            action: "USER_REPAIR_TRIGGERED"
        });
    });
}
exports.default = exports.founderRoute;
