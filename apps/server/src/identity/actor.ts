/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 6 — Actor Model (identity/actor.ts)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 * ============================================================
 *
 *  Purpose:
 *  ------------------------------------------------------------
 *  Defines the unified Actor identity shape for all backend flows.
 *  Every resolver (Flow 6–11) MUST return an object conforming to
 *  this model to ensure deterministic identity propagation.
 */

export type ActorMethod =
  | "founder"
  | "session"
  | "qr"
  | "anonymous";

export interface Actor {
  id: string | null;          // Stable identity ID
  type: ActorMethod;          // Identity type (Flow 6)
  method: ActorMethod;        // Alias for downstream flows
  role?: string | null;       // Optional role (session/org)
  issuedAt?: number | null;   // Optional timestamp for QR/session
}

