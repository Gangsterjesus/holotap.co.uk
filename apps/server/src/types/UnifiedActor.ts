/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: UnifiedActor.ts
 * Subsystem: Identity Resolution Layer — Flow 11
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Defines the UnifiedActor identity envelope used across Flow 11, Flow 12,
 *   Flow 7, and Flow 8. This type represents the fully‑resolved identity object
 *   injected into req.actor by the Unified Actor Pipeline.
 *
 * SECTION: Purpose
 *   • Provide a stable identity envelope for all backend flows.
 *   • Ensure deterministic identity propagation across middleware layers.
 *   • Maintain compatibility with founder overrides, session identity, and QR
 *     identity sources.
 *
 * SECTION: Stability Notes
 *   • This type must remain stable across all flows.
 *   • Additional fields may be added, but existing fields must never be removed.
 * ────────────────────────────────────────────────────────────────────────────────
 */

export interface UnifiedActor {
  id: string | null;
  identityId: string | null;
  type: string | null;
  merchantId?: string | null;
  role?: string | null;
  metadata?: any;

  session?: any;
  orgUser?: any;
  tenant?: any;
  permissions?: any[];
  isFounder?: boolean;

  issuedAt: number;   // REQUIRED for Flow‑11 + Flow‑12
}
