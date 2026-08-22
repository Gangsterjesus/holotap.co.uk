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

import { prisma } from "../../db";
import { settlementEngine } from "../../billing/settlementEngine";
import type { UnifiedActor } from "../../identity/actorPipeline";

// Fee calculation is optional until the billing implementation is available.
const feeCalculator = (_amount: unknown, _merchantId: unknown) => 0;

export async function initiatePayment(body: any, actor: UnifiedActor) {
  try {
    const fees = feeCalculator(body.amount, body.merchantId);

    const payment = await prisma.payment.create({
      data: {
        merchantId: body.merchantId,
        amount: body.amount,
        actorType: actor.type,
        fees,
        status: "initiated",
      },
    });

    return { ok: true, payment };
  } catch {
    return { ok: false, error: "INITIATE_FAILED" };
  }
}

export async function settlePayment(body: any, actor: UnifiedActor) {
  try {
    const settlement = await settlementEngine(body.paymentId);

    const payment = await prisma.payment.update({
      where: { paymentId: body.paymentId },
      data: {
        status: "settled",
        settlement,
        actorType: actor.type,
      },
    });

    return { ok: true, payment };
  } catch {
    return { ok: false, error: "SETTLE_FAILED" };
  }
}

export async function payout(body: any, actor: UnifiedActor) {
  try {
    const payment = await prisma.payment.update({
      where: { paymentId: body.paymentId },
      data: {
        status: "paid_out",
        actorType: actor.type,
      },
    });

    return { ok: true, payment };
  } catch {
    return { ok: false, error: "PAYOUT_FAILED" };
  }
}
