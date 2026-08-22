"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 6 — QR Identity Resolver (identity/resolveQrIdentity.ts)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Resolves identity from encrypted QR tokens produced by
 *  Flow 6 (Identity Card) in the HoloTap Mobile/Web UI.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Decrypt QR payload
 *  - Validate payload structure
 *  - Produce deterministic Actor identity fields
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveQrIdentity = resolveQrIdentity;
const token_1 = require("../utils/token");
async function resolveQrIdentity(qrToken) {
    try {
        // ------------------------------------------------------------
        // 1. Decrypt QR token payload
        // ------------------------------------------------------------
        const payload = await (0, token_1.decryptPayload)(qrToken);
        if (!payload || typeof payload !== "object") {
            return null;
        }
        // ------------------------------------------------------------
        // 2. Validate required fields
        // ------------------------------------------------------------
        const { userId, name, mobile, issuedAt } = payload;
        if (!userId || !issuedAt) {
            return null;
        }
        // ------------------------------------------------------------
        // 3. Produce deterministic Actor identity
        // ------------------------------------------------------------
        return {
            id: userId,
            type: "qr",
            method: "qr",
            role: null, // QR identity does not carry role
            issuedAt: issuedAt, // timestamp from QR payload
        };
    }
    catch (err) {
        console.error("[Flow 6] resolveQrIdentity Error:", err);
        return null;
    }
}
