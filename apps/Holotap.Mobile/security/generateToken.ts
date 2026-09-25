/**
 * ============================================================
 *  HoloTap Security — Token Generator (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: generateToken.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Generates a QR-safe token containing:
 *    • merchantId
 *    • sessionId
 *    • deviceId
 *    • issuedAt
 *    • salt
 *    • checksum
 *
 *  RULES:
 *    • Must be readable in QR form
 *    • Must avoid crypto ciphertext
 *    • Must be deterministic
 *    • Must be small (QR density constraint)
 *
 * ============================================================
 */

import { generateSalt } from "./generateSalt";
import { verifyChecksum } from "./verifyChecksum";

export function generateToken({
  merchantId,
  sessionId,
  deviceId,
}: {
  merchantId: string;
  sessionId: string;
  deviceId: string;
}) {
  const issuedAt = Date.now();
  const salt = generateSalt();

  // Build raw token object
  const tokenObject = {
    merchantId,
    sessionId,
    deviceId,
    issuedAt,
    salt,
  };

  // Compute checksum
  const checksum = verifyChecksum(tokenObject);

  // Final QR payload
  const qrPayload = {
    ...tokenObject,
    checksum,
  };

  // QR codes carry JSON text
  return JSON.stringify(qrPayload);
}
