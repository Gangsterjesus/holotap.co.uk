/**
 * -------------------------------------------------------------
 * File: identityInject.ts
 * Project: HoloTap Web‑UI v2
 * Module: Flow 6 — Identity Injection Handler
 *
 * Author: Raymond Newton (E5357171)
 * Date: 10 August 2026
 *
 * Description:
 *   Injects a verified QR payload into the session chain.
 *   Uses the merged VerifiedPayload type:
 *     - Raw QR payload fields
 *     - Verification result fields
 *
 * Notes:
 *   - This is the bridge between Flow 5 (verify) and Flow 7 (status).
 * -------------------------------------------------------------
 */

import type { VerifiedPayload } from "./qrVerify";
import { SessionActor, buildActorChain } from "../session/actorBuilder";
import { setSessionValue } from "../session/sessionStore";

export function injectIdentity(payload: VerifiedPayload): SessionActor {
  if (!payload.ok) {
    throw new Error(`Cannot inject identity — verification failed (${payload.code})`);
  }

  const actor: SessionActor = buildActorChain({
    creator: payload.merchantId,
    org: payload.merchantId, // placeholder until org registry exists
    merchant: payload.merchantId,
    device: payload.sessionNonce,
    issuedAt: payload.expiresAt,
  });

  setSessionValue("actor", actor);

  return actor;
}
