/**
 * -------------------------------------------------------------
 * File: actorBuilder.ts
 * Project: HoloTap Web‑UI v2
 * Module: Session Actor Construction (Flow 6 Backbone)
 *
 * Author: Raymond Newton (E5357171)
 * Date: 10 August 2026
 *
 * Description:
 *  - Constructs deterministic identity actors for session storage.
 *  - Used by Flow 6 (identity injection) and Flow 7 (status page).
 *  - Ensures stable, typed identity propagation across flows.
 * -------------------------------------------------------------
 */

export type SessionActor = {
  creator: string;
  org: string;
  merchant: string;
  device: string;
  issuedAt: number;
};

/**
 * buildActorChain
 * -------------------------------------------------------------
 * Creates a deterministic actor object from verified identity data.
 */
export function buildActorChain(input: SessionActor): SessionActor {
  return {
    creator: input.creator,
    org: input.org,
    merchant: input.merchant,
    device: input.device,
    issuedAt: input.issuedAt,
  };
}
