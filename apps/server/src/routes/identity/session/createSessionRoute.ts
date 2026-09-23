/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Identity Session Module
  Engineer: R. Newton (E5357171)
  File: createSessionRoute.ts
  Subsystem: Flow‑10 Identity Session — Route Layer
  Date: 06 Sep 2026

  SECTION: Overview
    Defines the deterministic route surface for Flow‑10 session creation.

  SECTION: Purpose
    • Expose POST /identity/session/create
    • Bridge API → Flow‑10 session engine
    • Ensure deterministic envelope propagation

  SECTION: Stability Notes
    • Route signature must remain stable.
    • Response envelopes must remain deterministic.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { Router } from "express";
import { prisma } from "../../../db";
import { createSession } from "../../../identity/session/createSession";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      sessionId,
      actorId,
      role,
      merchantId,
      metadata,
      expiresAt,
    } = req.body;

    const session = await createSession(
      prisma,
      {
        sessionId,
        actorId,
        role,
        merchantId,
        metadata,
        expiresAt: new Date(expiresAt),
      },
    );

    return res.status(201).json(session);
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "session_creation_failed",
      details:
        err instanceof Error
          ? err.message
          : String(err),
    });
  }
});

export default router;

