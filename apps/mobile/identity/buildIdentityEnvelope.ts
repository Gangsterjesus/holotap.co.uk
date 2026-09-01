/**
 * ============================================================
 *  HoloTap Identity — Envelope Builder (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: buildIdentityEnvelope.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Constructs the identity envelope used by HoloTap Mobile.
 *  This envelope is attached to all encrypted payloads and
 *  submitted during Flow 6 → Flow 7 → Flow 8.
 *
 *  STRUCTURE:
 *    {
 *      deviceId: string;
 *      issuedAt: number;
 *      payload: Record<string, unknown>;
 *    }
 *
 *  NOTES:
 *  - Stateless
 *  - JSON‑safe
 *  - Mobile‑only identity layer
 *  - Server validates via validateIdentityEnvelope.ts
 * ============================================================
 */

import type { IdentityEnvelope } from "./IdentityEnvelope";
import { getDeviceIdentity } from "./deviceIdentity";

export async function buildIdentityEnvelope(
  payload: Record<string, unknown>
): Promise<IdentityEnvelope> {
  const deviceId = await getDeviceIdentity();

  return {
    deviceId,
    issuedAt: Date.now(),
    payload,
  };
}