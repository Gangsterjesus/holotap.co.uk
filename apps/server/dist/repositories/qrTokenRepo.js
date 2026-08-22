"use strict";
/**
 * HoloTapServer
 * QR Token Repository
 *
 * Purpose:
 *  - Persistence layer for QR activation tokens.
 *  - Abstracts storage so services/controllers don't care about DB details.
 *  - Replay-safe operations (atomic activate).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertToken = insertToken;
exports.findToken = findToken;
exports.activateTokenAtomic = activateTokenAtomic;
const db_1 = require("../db");
/**
 * Insert a new QR activation token.
 */
async function insertToken(token) {
    await db_1.db.qrTokens.insert(token);
}
/**
 * Retrieve a token by ID.
 */
async function findToken(tokenId) {
    const token = await db_1.db.qrTokens.findOne({ tokenId });
    return token;
}
/**
 * Atomically activate a token.
 *
 * Returns:
 *  - true  → activation succeeded
 *  - false → token not found, expired, or already activated
 */
async function activateTokenAtomic(tokenId) {
    const token = await db_1.db.qrTokens.findOne({ tokenId });
    if (!token)
        return false;
    if (token.activated)
        return false;
    if (token.expiresAt < new Date())
        return false;
    await db_1.db.qrTokens.updateOne({ tokenId }, { activated: true });
    return true;
}
