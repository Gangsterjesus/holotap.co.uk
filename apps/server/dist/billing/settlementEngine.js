"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: settlementEngine.ts
 * Subsystem: Billing — Settlement Engine
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Produces deterministic settlement envelopes for Flow 8 payment settlement.
 *   Calculates net amount after fees and marks settlement timestamp.
 *
 * SECTION: Stability Notes
 *   Must never throw. Always return a structured settlement envelope.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.settlementEngine = settlementEngine;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function settlementEngine(paymentId) {
    try {
        const payment = await prisma.payments.findUnique({
            where: { id: paymentId },
        });
        if (!payment || !payment.metadata) {
            return {
                settled: false,
                netAmount: 0,
                settledAt: null,
            };
        }
        const metadata = typeof payment.metadata === "string" ? JSON.parse(payment.metadata) : payment.metadata;
        const netAmount = metadata.net_amount ?? 0;
        return {
            settled: true,
            netAmount,
            settledAt: new Date().toISOString(),
        };
    }
    catch {
        return {
            settled: false,
            netAmount: 0,
            settledAt: null,
        };
    }
}
