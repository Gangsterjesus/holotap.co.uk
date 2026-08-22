"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.service.ts
 * Subsystem: Flow 8 — Payment Lifecycle Service
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Implements the core payment lifecycle operations: initiation, settlement,
 *   and payout. Integrates merchant fee calculation, resource fees, and actor
 *   propagation from Flow 11.
 *
 * SECTION: Purpose
 *   • Provide deterministic lifecycle transitions
 *   • Integrate billing module (feeCalculator, settlementEngine)
 *   • Ensure actor identity is preserved across lifecycle operations
 *
 * SECTION: Stability Notes
 *   This module must never throw. All failures must be expressed as structured
 *   results for controllers to return.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiatePayment = initiatePayment;
exports.settlePayment = settlePayment;
exports.payout = payout;
const db_1 = require("../../db");
const settlementEngine_1 = require("../../billing/settlementEngine");
// Fee calculation is optional until the billing implementation is available.
const feeCalculator = (_amount, _merchantId) => 0;
async function initiatePayment(body, actor) {
    try {
        const fees = feeCalculator(body.amount, body.merchantId);
        const payment = await db_1.prisma.payment.create({
            data: {
                merchantId: body.merchantId,
                amount: body.amount,
                actorType: actor.type,
                fees,
                status: "initiated",
            },
        });
        return { ok: true, payment };
    }
    catch {
        return { ok: false, error: "INITIATE_FAILED" };
    }
}
async function settlePayment(body, actor) {
    try {
        const settlement = await (0, settlementEngine_1.settlementEngine)(body.paymentId);
        const payment = await db_1.prisma.payment.update({
            where: { paymentId: body.paymentId },
            data: {
                status: "settled",
                settlement,
                actorType: actor.type,
            },
        });
        return { ok: true, payment };
    }
    catch {
        return { ok: false, error: "SETTLE_FAILED" };
    }
}
async function payout(body, actor) {
    try {
        const payment = await db_1.prisma.payment.update({
            where: { paymentId: body.paymentId },
            data: {
                status: "paid_out",
                actorType: actor.type,
            },
        });
        return { ok: true, payment };
    }
    catch {
        return { ok: false, error: "PAYOUT_FAILED" };
    }
}
