/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: qrTokenHardening.ts
 * Subsystem: Security — QR Token Hardening
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * Overview:
 *   Deterministic validation for QR identity tokens produced by Flow‑6.
 *   Ensures structural integrity, expiry correctness, and signature validity
 *   before propagation into Flow‑11 (Unified Actor Pipeline) and Flow‑12
 *   (Identity Logger).
 *
 * Stability:
 *   • Must never throw.
 *   • All failures must be expressed as deterministic results.
 * ────────────────────────────────────────────────────────────────────────────────
 */

import crypto from "crypto";

export interface QRIdentityToken {
  signature: string;
  issuedAt: number;
  expiresAt: number;
  metadata: Record<string, unknown>;
  actorId?: string;
  correlationId?: string;
}

export interface QRTokenValidationResult {
  valid: boolean;
  reason?: string;
  redacted?: Record<string, unknown>;
}

/**
 * Deterministic QR token validator (Flow‑6 / Flow‑11 / Flow‑12)
 */
export function validateQrToken(
  token: QRIdentityToken | undefined | null
): QRTokenValidationResult {
  // Structural validation
  if (!token || typeof token !== "object") {
    return { valid: false, reason: "Malformed token" };
  }

  const { signature, issuedAt, expiresAt, metadata } = token;

  if (!signature) {
    return { valid: false, reason: "Missing signature" };
  }

  if (typeof issuedAt !== "number" || issuedAt <= 0) {
    return { valid: false, reason: "Invalid issuedAt timestamp" };
  }

  if (typeof expiresAt !== "number" || expiresAt <= issuedAt) {
    return { valid: false, reason: "Invalid expiresAt timestamp" };
  }

  // Expiry check
  if (Date.now() > expiresAt) {
    return { valid: false, reason: "Token expired" };
  }

  // Deterministic signature check (Flow‑6 lightweight crypto)
  const expected = crypto
    .createHash("sha256")
    .update(JSON.stringify(metadata))
    .digest("hex");

  if (expected !== signature) {
    return { valid: false, reason: "Invalid signature" };
  }

  // Redaction — remove sensitive metadata before returning
  const redactedMetadata = { ...metadata };
  if ("privateKey" in redactedMetadata) {
    redactedMetadata.privateKey = undefined;
  }

  return {
    valid: true,
    redacted: {
      issuedAt,
      expiresAt,
      metadata: redactedMetadata
    }
  };
}
