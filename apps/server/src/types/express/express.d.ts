/**
 * ============================================================
 * HoloTapServer — Express Request Extensions
 *
 * Engineer: Raymond Newton (Founder-Architect, E5357171)
 * Version: 2.4.2
 * Date: 15 August 2026
 * ============================================================
 *
 * Purpose:
 * ------------------------------------------------------------
 * Extends the Express Request interface with HoloTap
 * identity and tracing properties used throughout
 * Flows 6-11.
 *
 * Features:
 * ------------------------------------------------------------
 * - Unified Actor injection
 * - Correlation ID tracking
 * - Founder identity override
 * - Session identity propagation
 * - QR identity propagation
 *
 * Notes:
 * ------------------------------------------------------------
 * This file provides type augmentation only and contains
 * no runtime logic.
 * ============================================================
 */

import "express-serve-static-core";
import type { UnifiedActor } from "../UnifiedActor";

declare module "express-serve-static-core" {
  interface Request {
    actor?: UnifiedActor;
    correlationId?: string;

    founderOverride?: unknown;
    sessionIdentity?: unknown;
    qrIdentity?: unknown;
  }
}

export {};