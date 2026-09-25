/**
 * ============================================================
 *  HoloTap Security — Salt Generator (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: generateSalt.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Generates a deterministic salt used for QR token creation.
 *
 *  RULES:
 *    • Must be short (QR density constraint)
 *    • Must be reproducible across devices
 *    • Must avoid crypto randomness (QR readability)
 *    • Must be stable for merchant session binding
 *
 *  OUTPUT:
 *    A short alphanumeric salt string.
 *
 * ============================================================
 */

export function generateSalt(): string {
  // Deterministic seed: current minute + device time
  const now = new Date();

  const seed =
    now.getUTCFullYear().toString() +
    (now.getUTCMonth() + 1).toString() +
    now.getUTCDate().toString() +
    now.getUTCHours().toString() +
    now.getUTCMinutes().toString();

  // Convert seed → short salt (base36)
  const salt = Number(seed).toString(36);

  return salt;
}
