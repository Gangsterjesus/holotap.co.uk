"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: feeCalculator.ts
 * Subsystem: Billing — Merchant Fee Calculator
 * Engineer: Raymond Newton (E5357171)
 * Version: 1.0.0
 * Date: 22 Aug 2026
 *
 * DESCRIPTION:
 *   Computes the total merchant fee for a payment initiation event. This includes
 *   percentage-based fees, fixed fees, and resource fees sourced from the
 *   merchant_fees table. Designed for deterministic billing behaviour within
 *   Flow 8 and compatible with Flow 11 actor propagation.
 *
 * SECTION: Overview
 *   Calculates merchant fees for Flow 8 payment initiation using the billing
 *   configuration stored in the merchant_fees table. Returns a numeric total fee
 *   suitable for direct persistence in the payment record.
 *
 * SECTION: Stability Notes
 *   Must never throw. All failures must return a numeric fee of 0 to preserve
 *   Flow 8 lifecycle stability guarantees.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeCalculator = feeCalculator;
const db_1 = require("../db");
async function feeCalculator(amount, merchantId) {
    try {
        const feeConfig = await db_1.prisma.merchant_fees.findUnique({
            where: { merchant_id: merchantId },
        });
        if (!feeConfig) {
            return 0;
        }
        const percentageFee = (amount * feeConfig.percentage_fee) / 100;
        const fixedFee = feeConfig.fixed_fee;
        const resourceFee = feeConfig.resource_fee;
        const totalFee = percentageFee + fixedFee + resourceFee;
        return totalFee;
    }
    catch {
        return 0;
    }
}
