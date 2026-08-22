"use strict";
/**
 * HoloTapServer
 * DB Adapter (Prisma-backed)
 * Flow 5 — Data Access Layer
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-05
 *
 * Purpose:
 *  - Provide a deterministic, typed interface for repositories.
 *  - Expose auditLogs and qrTokens with consistent method signatures.
 *  - Backed by PrismaClient for Postgres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.db = {
    auditLogs: {
        insert: async (event) => {
            console.log('[auditLogs.insert]', event);
            // TODO: wire to real DB
        },
    },
    qrTokens: {
        insert: async (token) => {
            console.log('[qrTokens.insert]', token);
            // TODO: wire to real DB
        },
        findOne: async (query) => {
            console.log('[qrTokens.findOne]', query);
            return null; // TODO: replace with real lookup
        },
        updateOne: async (query, update) => {
            console.log('[qrTokens.updateOne]', query, update);
            return null; // TODO: replace with real atomic update
        },
    },
};
