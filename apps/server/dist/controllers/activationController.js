"use strict";
/**
 * HoloTapServer — Activation Controller
 * Author: Raymond Newton
 * Date: 24/07/2026
 *
 * Overview:
 *  Handles QR activation requests from the web client.
 *  Provides replay‑safe token activation and emits audit events.
 *
 * Sections:
 *  01 — Imports
 *  02 — Audit Logging Loader (Dynamic)
 *  03 — activateQr Handler
 *        - Token validation
 *        - Replay protection
 *        - Audit logging
 *        - Response shaping
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateQr = activateQr;
const qrTokenService_1 = require("../services/qrTokenService");
/* -------------------------------------------------------------------------- */
/*  02 — Audit Logging Loader (Dynamic)                                       */
/* -------------------------------------------------------------------------- */
let logEvent = async () => { };
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const svc = require('../services/auditLogService');
    if (svc && typeof svc.logEvent === 'function') {
        logEvent = svc.logEvent;
    }
}
catch {
    // No‑op fallback (audit logging disabled)
}
/* -------------------------------------------------------------------------- */
/*  03 — activateQr Handler                                                   */
/* -------------------------------------------------------------------------- */
async function activateQr(req, res) {
    const { tokenId, tenantId } = req.body;
    // Token lookup
    const token = await (0, qrTokenService_1.getToken)(tokenId);
    if (!token || token.tenantId !== tenantId) {
        await logEvent({
            action: 'qr_activation',
            result: 'failure',
            reason: 'invalid_token',
            tenantId,
            origin: 'web',
            meta: { tokenId },
        });
        return res.status(400).json({ error: 'Invalid token' });
    }
    // Replay‑safe activation
    const ok = await (0, qrTokenService_1.activateToken)(tokenId);
    if (!ok) {
        await logEvent({
            action: 'qr_activation',
            result: 'failure',
            reason: 'replay_or_expired',
            tenantId,
            origin: 'web',
            meta: { tokenId },
        });
        return res.status(400).json({ error: 'Token expired or already used' });
    }
    // Successful activation
    await logEvent({
        action: 'qr_activation',
        result: 'success',
        reason: 'activated',
        tenantId,
        origin: 'web',
        meta: { tokenId },
    });
    return res.json({ status: 'activated' });
}
