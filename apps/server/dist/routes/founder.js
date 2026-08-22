"use strict";
/**
 * HoloTapServer
 * Route Module — Founder Operations
 * Flow 10 — Founder-Only Override Layer
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Provides privileged system-level routes accessible only to the founder.
 * These routes bypass org, role, and permission layers, enabling direct
 * inspection, repair, and override operations across the platform.
 *
 * Descriptors:
 * Module Type: Privileged Route Module
 * Layer: Flow 10 — Founder Override Layer
 * Stability Level: Critical — Restricted to founder-only access
 * Internal Contracts:
 *   - Requires req.isFounder from Flow 10 middleware
 *   - Provides system-level introspection and repair endpoints
 *
 * Guarantees:
 *   - No destructive operations unless explicitly coded
 *   - No dependency on org, role, or tenant layers
 *   - Pure founder-only access logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.founderRoute = void 0;
const express_1 = require("express");
const founder_1 = require("../middleware/founder");
exports.founderRoute = (0, express_1.Router)();
/**
 * GET /founder/ping
 *
 * Simple founder-only endpoint verifying override access.
 */
exports.founderRoute.get('/ping', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        founder: true,
        message: 'Founder override active.',
    });
});
/**
 * GET /founder/system
 *
 * Returns high-level system introspection for founder-only diagnostics.
 */
exports.founderRoute.get('/system', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        system: {
            node: process.version,
            platform: process.platform,
            uptime: process.uptime(),
        },
    });
});
/**
 * GET /founder/env
 *
 * Returns environment visibility for founder-only inspection.
 * (Does NOT expose secrets unless explicitly coded.)
 */
exports.founderRoute.get('/env', founder_1.requireFounder, (req, res) => {
    const safeEnv = {
        NODE_ENV: process.env.NODE_ENV,
        VERSION: process.env.VERSION,
        // founder secret intentionally omitted
    };
    res.json({
        ok: true,
        env: safeEnv,
    });
});
/**
 * POST /founder/recovery/activate
 *
 * Activates founder recovery mode — used when identity/session/org layers fail.
 */
exports.founderRoute.post('/recovery/activate', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        recovery: true,
        message: 'Founder recovery mode activated.',
    });
});
/**
 * POST /founder/qr/override
 *
 * Founder-only QR override endpoint.
 * Placeholder for your QR override logic (Flow 10 → QR subsystem).
 */
exports.founderRoute.post('/qr/override', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        action: 'QR_OVERRIDE_TRIGGERED',
    });
});
/**
 * POST /founder/tenant/repair
 *
 * Founder-only tenant repair endpoint.
 * Placeholder for your tenant repair logic.
 */
exports.founderRoute.post('/tenant/repair', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        action: 'TENANT_REPAIR_TRIGGERED',
    });
});
/**
 * POST /founder/user/repair
 *
 * Founder-only user repair endpoint.
 * Placeholder for your user repair logic.
 */
exports.founderRoute.post('/user/repair', founder_1.requireFounder, (req, res) => {
    res.json({
        ok: true,
        action: 'USER_REPAIR_TRIGGERED',
    });
});
