/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.controller.ts
 * Subsystem: Flow 8 — Payment Lifecycle Controller
 * Engineer: Raymond Newton (E5357171)
 * Version: 1.2.0
 * Date: 31 Aug 2026
 *
 * DESCRIPTION:
 *   Implements the controller layer for the Flow 8 payment lifecycle. Each
 *   controller enforces identity propagation, correlation tracking, severity
 *   classification, and disclosure policy evaluation before delegating to the
 *   underlying service layer. This module contains no business logic.
 *
 * SECTION: Responsibilities
 *   • Validate actor identity propagation (Flow 11)
 *   • Apply severity matrix classification (Flow 6)
 *   • Apply disclosure policy evaluation (Flow 6)
 *   • Delegate lifecycle operations to payment.service.ts
 *   • Return deterministic envelopes to upstream middleware
 *
 * SECTION: Stability Notes
 *   • Must never throw
 *   • Must never perform business logic
 *   • All failures must be expressed as structured envelopes
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response } from "express";
import { validateIdentityPropagation } from "../../security/identityPropagationValidator";
import { classifySeverity } from "../../security/severityMatrix";
import { evaluateDisclosure } from "../../security/disclosurePolicy";
import * as PaymentService from "../../services/payment/payment.service";

/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: initiatePaymentController
 * Flow 8 — Payment Initiation
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   payment initiation to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
export async function initiatePaymentController(req: Request, res: Response) {
  // Identity propagation validation
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  // Delegate to service layer
  const result = await PaymentService.initiatePayment(req.body, req.actor!);

  // Response envelope
  return res.json({
    correlationId: req.correlationId,
    severity: classifySeverity("payment:initiate"),
    disclosure: evaluateDisclosure(req.actor!.type, "payment:initiate").allowed,
    ...result,
  });
}

/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: settlePaymentController
 * Flow 9 — Payment Settlement
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   settlement operations to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
export async function settlePaymentController(req: Request, res: Response) {
  // Identity propagation validation
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  // Delegate to service layer
  const result = await PaymentService.settlePayment(req.body, req.actor!);

  // Response envelope
  return res.json({
    correlationId: req.correlationId,
    severity: classifySeverity("payment:settle"),
    disclosure: evaluateDisclosure(req.actor!.type, "payment:settle").allowed,
    ...result,
  });
}

/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: payoutController
 * Flow 13 — Merchant Payout
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   payout operations to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
export async function payoutController(req: Request, res: Response) {
  // Identity propagation validation
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  // Delegate to service layer
  const result = await PaymentService.payout(req.body, req.actor!);

  // Response envelope
  return res.json({
    correlationId: req.correlationId,
    severity: classifySeverity("payment:payout"),
    disclosure: evaluateDisclosure(req.actor!.type, "payment:payout").allowed,
    ...result,
  });
}
