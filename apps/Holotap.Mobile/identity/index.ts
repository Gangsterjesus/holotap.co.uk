/**
 * ============================================================
 *  HoloTap Identity — Public Entry Point (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: index.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Exposes all identity-layer functionality through a single,
 *  stable import path: "@/identity".
 *
 *  USED BY:
 *    • Flow 6 (Payment Initialisation)
 *    • Flow 7 (Payment Processing)
 *    • Flow 8 (Payment Result)
 *    • Encryption Layer
 *    • QR‑Code Logic
 *    • Backend API
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Flat, deterministic, pure TypeScript
 * ============================================================
 */

export * from "./IdentityEnvelope";
export * from "./IdentityResponse";
export * from "./buildIdentityEnvelope";
export * from "./deviceIdentity";
export * from "./validateIdentityEnvelope";
export * from "./IdentityBinding";
