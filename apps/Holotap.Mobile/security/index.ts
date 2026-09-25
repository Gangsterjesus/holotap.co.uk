/**
 * ============================================================
 *  HoloTap Security — Public Security API (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: index.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Provides a clean, unified export surface for the QR-security
 *  subsystem used across Flow 6 → Flow 7 → Flow 8.
 *
 *  EXPORTED MODULES:
 *    • generateSalt
 *    • generateToken
 *    • verifyChecksum
 *    • decodeQrPayload
 *    • bindQrToIdentity
 *
 *  NOTES:
 *  - This file ensures consistent imports across the app.
 *  - Keeps Flow screens clean and avoids deep path imports.
 * ============================================================
 */

export { generateSalt } from "./generateSalt";
export { generateToken } from "./generateToken";
export { verifyChecksum } from "./verifyChecksum";
export { decodeQrPayload } from "./decodeQrPayload";
export { bindQrToIdentity } from "./bindQrToIdentity";
