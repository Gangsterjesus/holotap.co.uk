/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HOLOTAP ENGINEERING
 * ────────────────────────────────────────────────────────────────────────────────
 * File: actorPipeline.ts
 * Flow: 11 — Unified Actor Pipeline
 * Subsystem: HERO Identity Resolution Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 27 Sep 2026
 *
 * Description:
 * Provides the unified actor-processing pipeline used by the HERO identity layer.
 *
 * Purpose:
 * Centralises actor resolution within Flow 11 and provides a consistent processing
 * path for identities entering the HoloTap HERO system.
 *
 * Responsibility:
 * - Resolve actor identity.
 * - Normalise actor data for downstream processing.
 * - Coordinate the Flow 11 actor pipeline.
 * - Preserve clear subsystem boundaries.
 * - Provide deterministic failure handling at the pipeline boundary.
 *
 * Engineering Scope:
 * HERO identity resolution only. Payment execution, presentation logic and
 * unrelated application concerns remain outside this module.
 *
 * ────────────────────────────────────────────────────────────────────────────────
 * HOLOTAP ENGINEERING | E5357171
 * ────────────────────────────────────────────────────────────────────────────────
 */
import type { Request, Response, NextFunction } from "express";
import type { UnifiedActor } from "../types/UnifiedActor";
import type { Actor } from "../identity/actor";

import { resolveFounder } from "../identity/resolveFounder";
import { addRecord } from "../registryLedger.pg";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Flow-11 — HERO Unified Actor Pipeline
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Creates the canonical actor envelope consumed by downstream HERO flows.
 *
 * Responsibilities:
 *   • Resolve the inbound identity
 *   • Preserve session and organisation context
 *   • Resolve founder status
 *   • Attach the UnifiedActor to the Express request
 *   • Emit the resolved actor into the audit ledger
 *
 * This middleware does not execute payments.
 * Payment lifecycle logic remains downstream of identity resolution.
 * ────────────────────────────────────────────────────────────────────────────────
 */

export async function actorPipeline(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const rawActor = (req as any).actor as Actor | null;

  const session = (req as any).session ?? null;
  const orgUser = (req as any).orgUser ?? null;
  const tenant = (req as any).tenant ?? null;
  const permissions = (req as any).permissions ?? [];

  const { isFounder } = resolveFounder(rawActor, req);

  const unifiedActor: UnifiedActor = {
    id: rawActor?.id ?? null,
    identityId: rawActor?.id ?? null,
    type: rawActor?.type ?? "anonymous",

    merchantId: null,

    role: rawActor?.role ?? null,
    metadata: (rawActor as any)?.metadata ?? null,

    session,
    orgUser,
    tenant,
    permissions,

    isFounder,

    issuedAt: rawActor?.issuedAt ?? Date.now()
  };

  /**
   * Replace the provisional actor with the canonical HERO actor.
   */
  (req as any).actor = unifiedActor;

  /**
   * ──────────────────────────────────────────────────────────────────────────────
   * Flow-11 — HERO Ledger Emission
   * ──────────────────────────────────────────────────────────────────────────────
   *
   * Records successful actor resolution before execution continues into
   * downstream HERO flows.
   *
   * IMPORTANT:
   * registryLedger.pg expects `event`, not `event_type`.
   * ──────────────────────────────────────────────────────────────────────────────
   */

  try {
    await addRecord({
      flow: "flow-11",
      event: "actor_pipeline_resolved",

      sessionId: unifiedActor.session?.id ?? null,

      actor: {
        type: unifiedActor.type,
        sessionId: unifiedActor.session?.id ?? null,
        merchantId: unifiedActor.merchantId ?? null,
        consumerId: unifiedActor.identityId ?? null
      },

      correlationId:
        req.correlationId ?? "no-correlation-id",

      envelope: unifiedActor,

      timestamp: Date.now()
    });
  } catch (error) {
    console.error(
      "[HoloTap HERO][Flow-11][Ledger] Actor envelope write failed:",
      error
    );
  }

  next();
}

