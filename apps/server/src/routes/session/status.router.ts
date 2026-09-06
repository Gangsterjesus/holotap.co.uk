/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: status.router.ts
 * Flow: 10 — Identity Session Status Route
 * Subsystem: Flow‑10 Session Lifecycle + Flow‑9.6 Ledger
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 Sep 2026
 *
 * SECTION: Overview
 *   Provides deterministic session status envelopes for the web Status Page.
 *   Uses the new identity_sessions table (Flow‑10) and emits Flow‑9.6 ledger
 *   envelopes for full replay + audit compatibility.
 *
 * SECTION: Purpose
 *   • Lookup identity session by session_id
 *   • Return stable, typed status envelope
 *   • Emit Flow‑9.6 ledger entry
 *
 * SECTION: Stability Notes
 *   • Must never throw
 *   • All errors expressed as structured JSON
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { Router, Request, Response } from "express";
import { prisma } from "../../db";
import { addRecord } from "../../registryLedger.pg";

const router = Router();

/**
 * GET /api/session/:sessionId
 * Flow‑10 — Deterministic Session Status
 */
router.get("/:sessionId", async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;
  const correlationId = (req as any)?.correlationId ?? "no-correlation-id";

  try {
    // 1. Lookup session in Flow‑10 identity store
    const session = await prisma.identity_sessions.findUnique({
      where: { session_id: sessionId }
    });

    // 2. Build deterministic envelope
    const envelope = {
      sessionId,
      exists: !!session,
      state: session?.state ?? "unknown",
      role: session?.role ?? null,
      actorId: session?.actor_id ?? null,
      merchantId: session?.merchant_id ?? null,
      badgeId: session?.badge_id ?? null,
      deviceId: session?.device_id ?? null,
      risk: session?.risk_state ?? null,
      createdAt: session?.created_at ?? null,
      expiresAt: session?.expires_at ?? null,
      correlationId,
      timestamp: Date.now()
    };

    // 3. Emit Flow‑9.6 ledger entry
    await addRecord({
      flow: "flow-10",
      event_type: "session_status_checked",
      sessionId,
      actor: {
        type: (req as any)?.actor?.type ?? "unknown",
        sessionId,
        merchantId: session?.merchant_id ?? null,
        consumerId: session?.actor_id ?? null
      },
      correlationId,
      envelope,
      timestamp: Date.now()
    });

    // 4. Return deterministic response
    return res.json({
      ok: true,
      flow: "flow-10",
      session: envelope
    });
  } catch (err) {
    console.error("[Flow‑10 Status] Error:", err);

    // 5. Deterministic error envelope
    return res.status(500).json({
      ok: false,
      flow: "flow-10",
      error: "SESSION_STATUS_ERROR",
      correlationId,
      sessionId,
      timestamp: Date.now()
    });
  }
});

export default router;
