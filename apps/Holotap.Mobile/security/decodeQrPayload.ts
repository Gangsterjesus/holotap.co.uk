/**
 * ============================================================
 *  HoloTap Security — QR Payload Decoder (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: decodeQrPayload.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Decodes raw QR scan text into a structured QR payload.
 *
 *  INPUT (raw QR string):
 *    JSON string containing:
 *      • merchantId
 *      • sessionId
 *      • deviceId
 *      • issuedAt
 *      • checksum
 *
 *  OUTPUT (decoded QR object):
 *    Returns null if:
 *      • JSON is invalid
 *      • required fields missing
 *
 *  NOTES:
 *  - QR codes contain readable JSON, not encrypted ciphertext.
 *  - This is the first step before bindQrToIdentity().
 * ============================================================
 */

export function decodeQrPayload(rawQrText: string): any | null {
  try {
    // Step 1: Parse JSON from QR
    const decoded = JSON.parse(rawQrText);

    // Step 2: Validate required fields
    const requiredFields = [
      "merchantId",
      "sessionId",
      "deviceId",
      "issuedAt",
      "checksum",
    ];

    for (const field of requiredFields) {
      if (!decoded[field]) {
        console.error(`decodeQrPayload: missing field "${field}"`);
        return null;
      }
    }

    // Step 3: Return structured QR payload
    return decoded;
  } catch (error) {
    console.error("decodeQrPayload: invalid QR JSON", error);
    return null;
  }
}
