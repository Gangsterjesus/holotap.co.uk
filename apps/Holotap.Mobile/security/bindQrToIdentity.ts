/**
 * ============================================================
 *  HoloTap Security — QR → Identity Binding (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: bindQrToIdentity.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Binds a decoded QR payload to a valid IdentityEnvelope.
 *
 *  INPUT (decoded QR payload):
 *    • merchantId
 *    • sessionId
 *    • deviceId
 *    • issuedAt
 *    • checksum
 *
 *  OUTPUT (IdentityEnvelope):
 *    • deviceId
 *    • issuedAt
 *    • payload: {
 *        merchantId,
 *        sessionId
 *      }
 *
 *  NOTES:
 *  - QR codes do NOT use cryptographic encryption.
 *  - This is a tokenised identity-binding step.
 *  - Deterministic, pure TypeScript.
 * ============================================================
 */

import { IdentityEnvelope } from "@/identity/IdentityEnvelope";
import { verifyChecksum } from "./verifyChecksum";

export function bindQrToIdentity(decodedQr: any): IdentityEnvelope | null {
  // Step 1: Validate checksum
  const checksumValid = verifyChecksum(decodedQr);
  if (!checksumValid) {
    console.error("bindQrToIdentity: invalid QR checksum");
    return null;
  }

  // Step 2: Validate required fields
  if (
    !decodedQr.merchantId ||
    !decodedQr.sessionId ||
    !decodedQr.deviceId ||
    !decodedQr.issuedAt
  ) {
    console.error("bindQrToIdentity: missing required QR fields");
    return null;
  }

  // Step 3: Construct IdentityEnvelope
  const envelope: IdentityEnvelope = {
    deviceId: decodedQr.deviceId,
    issuedAt: decodedQr.issuedAt,
    payload: {
      merchantId: decodedQr.merchantId,
      sessionId: decodedQr.sessionId,
    },
  };

  return envelope;
}
