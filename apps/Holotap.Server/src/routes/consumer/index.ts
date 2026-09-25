/**
 * =============================================================================
 * HOLOTAP API — CONSUMER ROUTER v3.0 (Flow‑9.6 Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          routes/consumer/index.ts
 * Date:          06 September 2026
 * =============================================================================
 * PURPOSE:
 * Provides all consumer‑side API endpoints:
 *   • Consumer identity verification (Flow 6)
 *   • QR session validation (Flow 7 → Flow 10)
 *   • Payment initialisation (Flow 8 → Flow 11 → Flow 12)
 *
 * ENGINEERING NOTES:
 *   • Mounted at `/api/consumer`
 *   • All endpoints must be deterministic and typed
 *   • All envelopes must be Flow‑9.6 ledger‑compatible
 * =============================================================================
 */

import { Router, Request, Response } from "express";
import { addRecord } from "../../registryLedger.pg";

const router = Router();

/**
 * ---------------------------------------------------------------------------
 * GET /api/consumer/status
 * Simple diagnostic endpoint for consumer namespace
 * ---------------------------------------------------------------------------
 */
router.get("/status", async (req: Request, res: Response) => {
  await addRecord({
    flow: "consumer",
    event_type: "status_checked",
    sessionId: (req as any)?.session?.id ?? null,
    actor: {
      type: (req as any)?.actor?.type ?? "unknown",
      sessionId: (req as any)?.session?.id ?? null,
      merchantId: null,
      consumerId: (req as any)?.actor?.identityId ?? null
    },
    correlationId: (req as any)?.correlationId ?? "no-correlation-id",
    envelope: {
      namespace: "consumer",
      status: "online",
      timestamp: Date.now()
    },
    timestamp: Date.now()
  });

  res.json({
    namespace: "consumer",
    status: "online",
    flows: ["identity", "qr-session", "payment-init"]
  });
});

/**
 * ---------------------------------------------------------------------------
 * POST /api/consumer/verify
 * Flow 6 — Consumer identity verification
 * (Placeholder — Flow 6 identityMiddleware handles real resolution)
 * ---------------------------------------------------------------------------
 */
router.post("/verify", async (req: Request, res: Response) => {
  await addRecord({
    flow: "flow-6",
    event_type: "consumer_identity_verify_called",
    sessionId: (req as any)?.session?.id ?? null,
    actor: {
      type: (req as any)?.actor?.type ?? "anonymous",
      sessionId: (req as any)?.session?.id ?? null,
      merchantId: null,
      consumerId: (req as any)?.actor?.identityId ?? null
    },
    correlationId: (req as any)?.correlationId ?? "no-correlation-id",
    envelope: {
      received: req.body,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  });

  res.json({
    flow: "consumer-verify",
    received: req.body,
    status: "pending-implementation"
  });
});

/**
 * ---------------------------------------------------------------------------
 * POST /api/consumer/init-payment
 * Flow 8 — Payment initialisation
 * (Placeholder — billing + session modules will be wired here)
 * ---------------------------------------------------------------------------
 */
router.post("/init-payment", async (req: Request, res: Response) => {
  await addRecord({
    flow: "flow-8",
    event_type: "consumer_payment_init_called",
    sessionId: (req as any)?.session?.id ?? null,
    actor: {
      type: (req as any)?.actor?.type ?? "anonymous",
      sessionId: (req as any)?.session?.id ?? null,
      merchantId: null,
      consumerId: (req as any)?.actor?.identityId ?? null
    },
    correlationId: (req as any)?.correlationId ?? "no-correlation-id",
    envelope: {
      received: req.body,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  });

  res.json({
    flow: "init-payment",
    received: req.body,
    status: "pending-implementation"
  });
});

export default router;
