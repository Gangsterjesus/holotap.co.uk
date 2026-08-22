"use strict";
/**
 * =============================================================================
 * HOLOTAP API — CONSUMER ROUTER v2.4 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          routes/consumer/index.ts
 * Date:          17 August 2026
 * =============================================================================
 * PURPOSE:
 * Provides all consumer‑side API endpoints:
 *   • Consumer identity verification
 *   • QR session validation
 *   • Payment initialisation (Flow 8)
 *
 * ENGINEERING NOTES:
 *   • This router is mounted at `/api/consumer`
 *   • All endpoints must be deterministic and typed
 *   • No JS routers allowed — TS only
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * ---------------------------------------------------------------------------
 * GET /api/consumer/status
 * Simple diagnostic endpoint for consumer namespace
 * ---------------------------------------------------------------------------
 */
router.get("/status", (req, res) => {
    res.json({
        namespace: "consumer",
        status: "online",
        flows: ["identity", "qr-session", "payment-init"],
    });
});
/**
 * ---------------------------------------------------------------------------
 * POST /api/consumer/verify
 * Flow 6 — Consumer identity verification
 * (Placeholder — wiring added when identity module is ready)
 * ---------------------------------------------------------------------------
 */
router.post("/verify", (req, res) => {
    res.json({
        flow: "consumer-verify",
        received: req.body,
        status: "pending-implementation",
    });
});
/**
 * ---------------------------------------------------------------------------
 * POST /api/consumer/init-payment
 * Flow 8 — Payment initialisation
 * (Placeholder — will call billing + session modules)
 * ---------------------------------------------------------------------------
 */
router.post("/init-payment", (req, res) => {
    res.json({
        flow: "init-payment",
        received: req.body,
        status: "pending-implementation",
    });
});
exports.default = router;
