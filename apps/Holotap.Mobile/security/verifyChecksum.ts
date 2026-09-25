/**
 * ============================================================
 *  HoloTap Security — Checksum Verification (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: verifyChecksum.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Generates and verifies a lightweight checksum for QR payloads.
 *
 *  RULES:
 *    • Must be QR-safe (short, alphanumeric)
 *    • Must be deterministic
 *    • Must avoid crypto hashing (QR readability)
 *    • Must detect tampering or corruption
 *
 *  METHOD:
 *    - Convert object → sorted JSON string
 *    - Sum char codes
 *    - Convert to base36 for compactness
 *
 * ============================================================
 */

export function verifyChecksum(obj: any): string | boolean {
  // If verifying: obj contains a checksum field
  const isVerificationMode = typeof obj.checksum !== "undefined";

  // Step 1: Clone object without checksum
  const clone = { ...obj };
  delete clone.checksum;

  // Step 2: Stable JSON string (sorted keys)
  const sortedKeys = Object.keys(clone).sort();
  const stableJson = JSON.stringify(
    sortedKeys.reduce((acc, key) => {
      acc[key] = clone[key];
      return acc;
    }, {} as any)
  );

  // Step 3: Compute checksum (sum of char codes → base36)
  let sum = 0;
  for (let i = 0; i < stableJson.length; i++) {
    sum += stableJson.charCodeAt(i);
  }

  const checksum = sum.toString(36); // QR‑safe

  // If verifying, return boolean
  if (isVerificationMode) {
    return obj.checksum === checksum;
  }

  // If generating, return checksum string
  return checksum;
}
