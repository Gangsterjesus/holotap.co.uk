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

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Unified Actor Pipeline (Flow‑11)
 * ────────────────────────────────────────────────────────────────────────────────
 */

export function actorPipeline(
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
    type: raw?.type ?? null,
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

  next();
}
