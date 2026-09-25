/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: actorPipeline.ts
 * Flow: 11 — Unified Actor Pipeline
 * Subsystem: Identity Resolution Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response, NextFunction } from "express";
import type { UnifiedActor } from "../types/UnifiedActor";
import type { Actor } from "../identity/actor";
import { resolveFounder } from "../identity/resolveFounder";

// Flow‑9.6 PostgreSQL Ledger
import { addRecord } from "../registryLedger.pg";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Unified Actor Pipeline (Flow‑11)
 * ────────────────────────────────────────────────────────────────────────────────
 */

export async function actorPipeline(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const raw = (req as any).actor as Actor | null;

  const session = (req as any).session ?? null;
  const orgUser = (req as any).orgUser ?? null;
  const tenant = (req as any).tenant ?? null;
  const permissions = (req as any).permissions ?? [];

  const { isFounder } = resolveFounder(raw, req);

  const unified: UnifiedActor = {
    id: raw?.id ?? null,
    identityId: raw?.id ?? null,
    type: raw?.type ?? "anonymous",
    merchantId: null,
    role: raw?.role ?? null,
    metadata: (raw as any)?.metadata ?? null,
    session,
    orgUser,
    tenant,
    permissions,
    isFounder,
    issuedAt: raw?.issuedAt ?? Date.now()
  };

  (req as any).actor = unified;

  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * Flow‑11 → Flow‑9.6 Ledger Emission
   * -------------------------------------------------------------------------------
   * Every inbound request now produces a deterministic actor envelope.
   * This enables:
   *   • Full actor replay (Flow‑15)
   *   • Full identity traceability (Flow‑12)
   *   • Full audit history for all flows
   *   • Deterministic debugging + correlation
   * ────────────────────────────────────────────────────────────────────────────────
   */
  try {
    await addRecord({
      flow: "flow-11",
     event: "actor_pipeline_resolved",

      sessionId: unified.session?.id ?? null,
      actor: {
        type: unified.type,
        sessionId: unified.session?.id ?? null,
        merchantId: unified.merchantId ?? null,
        consumerId: unified.identityId ?? null
      },
      correlationId: req.correlationId ?? "no-correlation-id",
      envelope: unified,
      timestamp: Date.now()
    });
  } catch (err) {
    console.error("[Flow‑11 Ledger] Failed to write actor envelope:", err);
  }

  next();
}
