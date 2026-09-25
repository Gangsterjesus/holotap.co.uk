/**
 * File: qrPayload.ts
 * Project: HoloTap Web‑UI v2
 * Module: QR Security Payload Builder
 *
 * Author: Raymond Newton (E5357171)
 * Date: 04 August 2026
 *
 * Description:
 *  - Constructs the canonical QR payload used across HoloTap’s identity and
 *    hologram‑bound security layer.
 *  - Generates cryptographically strong session nonces.
 *  - Applies HMAC‑SHA256 signing over the canonical payload.
 *  - Encodes/decodes payloads for QR transport (JSON → base64).
 *
 * Notes:
 *  - QR_SIGNING_SECRET must be provided via environment.
 *  - This module forms the foundation of the triple‑layer identity model:
 *      (1) Signed QR payload
 *      (2) Merchant hologram identity
 *      (3) Session‑bound nonce + expiry
 *  - Verification logic is implemented separately in qrVerify.ts.
 */

import crypto from "crypto";

export type QrPayload = {
  merchantId: string;
  sessionNonce: string;
  hologramId: string;
  amountMinorUnits?: number; // e.g. 1234 = £12.34
  currency?: string;         // e.g. "GBP"
  expiresAt: number;         // unix timestamp (seconds)
  callbackUrl?: string;
  signature: string;         // HMAC / EdDSA signature over payloadWithoutSignature
};

export type QrPayloadInput = Omit<QrPayload, "signature" | "sessionNonce"> & {
  sessionNonce?: string;
};

const DEFAULT_TTL_SECONDS = 300; // 5 minutes

// TODO: move to secure config / env
const QR_SIGNING_SECRET = process.env.QR_SIGNING_SECRET || "dev-secret-change-me";

/**
 * Generate a cryptographically strong session nonce.
 */
export function generateSessionNonce(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Build the unsigned payload (without signature).
 * This is the canonical structure used for signing.
 */
export function buildUnsignedPayload(input: QrPayloadInput): Omit<QrPayload, "signature"> {
  const nowSeconds = Math.floor(Date.now() / 1000);

  const sessionNonce = input.sessionNonce ?? generateSessionNonce();

  return {
    merchantId: input.merchantId,
    sessionNonce,
    hologramId: input.hologramId,
    amountMinorUnits: input.amountMinorUnits,
    currency: input.currency ?? "GBP",
    expiresAt: input.expiresAt ?? nowSeconds + DEFAULT_TTL_SECONDS,
    callbackUrl: input.callbackUrl,
  };
}

/**
 * Compute HMAC-SHA256 signature over the canonical payload.
 * You can later swap this for EdDSA / public-key crypto.
 */
export function signPayload(payloadWithoutSignature: Omit<QrPayload, "signature">): string {
  const canonical = JSON.stringify(payloadWithoutSignature);
  return crypto
    .createHmac("sha256", QR_SIGNING_SECRET)
    .update(canonical)
    .digest("hex");
}

/**
 * Build a fully signed QR payload.
 */
export function buildSignedQrPayload(input: QrPayloadInput): QrPayload {
  const unsigned = buildUnsignedPayload(input);
  const signature = signPayload(unsigned);

  return {
    ...unsigned,
    signature,
  };
}

/**
 * Encode the signed payload into a compact string for QR.
 * For now: JSON → base64. Later: CBOR if you want.
 */
export function encodeQrPayload(payload: QrPayload): string {
  const json = JSON.stringify(payload);
  return Buffer.from(json, "utf8").toString("base64");
}

/**
 * Decode a QR payload string back into a typed object.
 * This is what scan.tsx will use.
 */
export function decodeQrPayload(encoded: string): QrPayload {
  const json = Buffer.from(encoded, "base64").toString("utf8");
  const parsed = JSON.parse(json);

  return parsed as QrPayload;
}
