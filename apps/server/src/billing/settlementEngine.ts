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

import { prisma } from "../db";

export async function settlementEngine(paymentId: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { paymentId },
    });

    if (!payment) {
      return {
        settled: false,
        netAmount: 0,
        settledAt: null,
      };
    }

    const netAmount = payment.amount - payment.fees.totalFee;

    return {
      settled: true,
      netAmount,
      settledAt: new Date().toISOString(),
    };
  } catch {
    return {
      settled: false,
      netAmount: 0,
      settledAt: null,
    };
  }
}
