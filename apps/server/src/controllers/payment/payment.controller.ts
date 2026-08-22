/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.controller.ts
 * Subsystem: Flow 8 — Payment Lifecycle Controller
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response } from "express";
import { validateIdentityPropagation } from "../../security/identityPropagationValidator";
import { classifySeverity } from "../../security/severityMatrix";
import { evaluateDisclosure } from "../../security/disclosurePolicy";
// @ts-expect-error TS7016: payment.service is a JavaScript module without declarations.
import * as PaymentService from "../services/payment.service";


export async function initiatePaymentController(req: Request, res: Response) {
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  const result = await PaymentService.initiatePayment(req.body, req.actor!);

  const severity = classifySeverity("payment:initiate");
  const disclosure = evaluateDisclosure(req.actor!.type, "payment:initiate");

  return res.json({
    ok: result.ok,
    correlationId: req.correlationId,
    severity,
    disclosure: disclosure.allowed,
    ...result,
  });
}

export async function settlePaymentController(req: Request, res: Response) {
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  const result = await PaymentService.settlePayment(req.body, req.actor!);

  const severity = classifySeverity("payment:settle");
  const disclosure = evaluateDisclosure(req.actor!.type, "payment:settle");

  return res.json({
    ok: result.ok,
    correlationId: req.correlationId,
    severity,
    disclosure: disclosure.allowed,
    ...result,
  });
}

export async function payoutController(req: Request, res: Response) {
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  const result = await PaymentService.payout(req.body, req.actor!);

  const severity = classifySeverity("payment:payout");
  const disclosure = evaluateDisclosure(req.actor!.type, "payment:payout");

  return res.json({
    ok: result.ok,
    correlationId: req.correlationId,
    severity,
    disclosure: disclosure.allowed,
    ...result,
  });
}
