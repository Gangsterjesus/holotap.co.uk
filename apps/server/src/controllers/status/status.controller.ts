/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: status.controller.ts
 * Subsystem: Flow 7 — Session Status Controller
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Implements Flow 7 backend logic. Fetches session state, validates identity
 *   propagation, applies severity classification, and returns the status envelope
 *   consumed by the web Status Page.
 *
 * SECTION: Purpose
 *   • Retrieve session by ID.
 *   • Validate identity propagation (Flow 11).
 *   • Attach correlation ID (Flow 12).
 *   • Apply severity matrix + disclosure policy (Flow 13).
 *
 * SECTION: Scope
 *   • Session lookup
 *   • Status envelope formatting
 *   • Error-safe JSON responses
 *
 * SECTION: Stability Notes
 *   This controller must never throw. All failures must be returned as JSON.
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response } from "express";
import { prisma } from "../../db";
import { validateIdentityPropagation } from "../../security/identityPropagationValidator";
import { classifySeverity } from "../../security/severityMatrix";
import { evaluateDisclosure } from "../../security/disclosurePolicy";

export async function getSessionStatusController(req: Request, res: Response) {
  const { sessionId } = req.params;

  // Identity propagation check (Flow 11)
  const identityCheck = validateIdentityPropagation(req.actor);
  if (!identityCheck.valid) {
    return res.status(400).json({
      ok: false,
      correlationId: req.correlationId,
      error: "IDENTITY_INVALID",
      reason: identityCheck.reason,
    });
  }

  // Fetch session
  let session;
  try {
    session = await prisma.session.findUnique({
      where: { sessionId },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      correlationId: req.correlationId,
      error: "DB_ERROR",
    });
  }

  if (!session) {
    return res.status(404).json({
      ok: false,
      correlationId: req.correlationId,
      error: "SESSION_NOT_FOUND",
    });
  }

  // Severity classification (Flow 12)
  const severity = classifySeverity(`session:${session.status}`);

  // Disclosure policy (Flow 13)
  const disclosure = evaluateDisclosure(req.actor!.type, `session:${session.status}`);

  // Final envelope
  return res.json({
    ok: true,
    correlationId: req.correlationId,
    severity,
    disclosure: disclosure.allowed,
    session: {
      sessionId: session.sessionId,
      merchantName: session.merchantName,
      qrToken: session.qrToken,
      hologramStatus: session.hologramStatus,
      status: session.status,
    },
  });
}
