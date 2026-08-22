"use strict";
/**
 * HoloTapServer
 * QR Token Service
 *
 * Purpose:
 *  - Generate activation tokens
 *  - Validate tokens
 *  - Activate tokens (replay-safe)
 *  - Uses repository layer for persistence
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.getToken = getToken;
exports.activateToken = activateToken;
const qrTokenRepo_1 = require("../repositories/qrTokenRepo");
/**
 * Generate a new QR activation token.
 */
async function generateToken(tenantId) {
    const token = {
        tokenId: crypto.randomUUID(),
        tenantId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
        activated: false,
    };
    await (0, qrTokenRepo_1.insertToken)(token);
    return token;
}
/**
 * Retrieve a token.
 */
async function getToken(tokenId) {
    return await (0, qrTokenRepo_1.findToken)(tokenId);
}
/**
 * Activate a token (replay-safe).
 */
async function activateToken(tokenId) {
    return await (0, qrTokenRepo_1.activateTokenAtomic)(tokenId);
}
