/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: routes/founder.ts
 * Flow: 10 — Founder Override Layer
 * Subsystem: Privileged Operations + Flow‑9.6 Ledger
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Provides privileged system‑level routes accessible only to the founder.
 *   All routes emit Flow‑9.6 ledger envelopes for deterministic replay and
 *   auditability. Requires req.isFounder from Flow‑10 middleware.
 *
 * Guarantees:
 *   • Pure founder‑only access logic
 *   • No destructive operations unless explicitly coded
 *   • Deterministic envelopes + correlation IDs
 *   • Ledger‑safe + replay‑safe
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { Router, Request, Response } from "express";
import { requireFounder } from "../middleware/founderMiddleware";
import { addRecord } from "../registryLedger.pg";

export const founderRoute = Router();

/**
 * Utility: Emit Flow‑9.6 ledger entry for founder actions
 */
async function emitFounderLedger(
  req: Request,
  event: string,
  envelope: Record<string, unknown>
) {
  const actor = (req as any)?.actor ?? {};
  const correlationId = (req as any)?.correlationId ?? "no-correlation-id";

 await addRecord({
  flow: "flow-10",
  event: "actor_pipeline_resolved",
  sessionId: actor.session?.id ?? null,
  actor: {
    type: actor.type ?? "founder",
    sessionId: actor.session?.id ?? null,
    merchantId: actor.merchantId ?? null,
    consumerId: actor.identityId ?? null
  },
  correlationId,
  envelope,
  timestamp: Date.now()
});
/**
 * GET /founder/ping
 * Founder override verification
 */
founderRoute.get("/ping", requireFounder, async (req: Request, res: Response) => {
  const envelope = {
    message: "Founder override active",
    timestamp: Date.now()
  };

  await emitFounderLedger(req, "founder_ping", envelope);

  res.json({
    ok: true,
    founder: true,
    message: "Founder override active."
  });
});


founderRoute.get("/system", requireFounder, async (req: Request, res: Response) => {
  const envelope = {
    node: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    timestamp: Date.now()
  };

  await emitFounderLedger(req, "founder_system_introspection", envelope);

  res.json({
    ok: true,
    system: envelope
  });
});


founderRoute.get("/env", requireFounder, async (req: Request, res: Response) => {
  const safeEnv = {
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.VERSION
  };

  await emitFounderLedger(req, "founder_env_inspection", safeEnv);

  res.json({
    ok: true,
    env: safeEnv
  });
});


founderRoute.post(
  "/recovery/activate",
  requireFounder,
  async (req: Request, res: Response) => {
    const envelope = {
      recovery: true,
      timestamp: Date.now()
    };

    await emitFounderLedger(req, "founder_recovery_activated", envelope);

    res.json({
      ok: true,
      recovery: true,
      message: "Founder recovery mode activated."
    });
  }
);


founderRoute.post(
  "/qr/override",
  requireFounder,
  async (req: Request, res: Response) => {
    const envelope = {
      action: "QR_OVERRIDE_TRIGGERED",
      received: req.body,
      timestamp: Date.now()
    };

    await emitFounderLedger(req, "founder_qr_override", envelope);

    res.json({
      ok: true,
      action: "QR_OVERRIDE_TRIGGERED"
    });
  }
);


founderRoute.post(
  "/tenant/repair",
  requireFounder,
  async (req: Request, res: Response) => {
    const envelope = {
      action: "TENANT_REPAIR_TRIGGERED",
      received: req.body,
      timestamp: Date.now()
    };

    await emitFounderLedger(req, "founder_tenant_repair", envelope);

    res.json({
      ok: true,
      action: "TENANT_REPAIR_TRIGGERED"
    });
  }
);


founderRoute.post(
  "/user/repair",
  requireFounder,
  async (req: Request, res: Response) => {
    const envelope = {
      action: "USER_REPAIR_TRIGGERED",
      received: req.body,
      timestamp: Date.now()
    };

    await emitFounderLedger(req, "founder_user_repair", envelope);

    res.json({
      ok: true,
      action: "USER_REPAIR_TRIGGERED"
    });
  }
);
}
export default founderRoute;
