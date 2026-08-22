/**
 * =============================================================================
 * HOLOTAP API — Express Request Extensions
 * =============================================================================
 * Extends Express.Request with HoloTap identity fields.
 * =============================================================================
 */

import type { UnifiedActor } from "../identity/actorPipeline";

declare global {
  namespace Express {
    interface Request {
      actor?: UnifiedActor;
      correlationId?: string;

      founderOverride?: unknown;
      sessionIdentity?: unknown;
      qrIdentity?: unknown;
    }
  }
}

export {};
