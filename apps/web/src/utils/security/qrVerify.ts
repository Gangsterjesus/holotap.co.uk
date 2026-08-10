/**
 * File: qrVerify.ts
 * Project: HoloTap Web‑UI v2
 * Module: QR Security Payload Verification
 *
 * Author: Raymond Newton (E5357171)
 * Date: 04 August 2026
 *
 * Description:
 *  - Verifies HMAC-SHA256 signatures over QR payloads.
 *  - Validates expiry and session nonce presence.
 *  - Provides deterministic verification result codes for UI and logging.
 *  - Forms part of the triple-layer identity model:
 *      (1) Signed QR payload
 *      (2) Merchant hologram identity
 *      (3) Session-bound nonce + expiry
 *
 * Notes:
 *  - Must use the same QR_SIGNING_SECRET as qrPayload.ts.
 *  - Hologram binding is currently a placeholder hook; real registry
 *    integration will be wired via HologramRegistry.ts.
 */

import crypto from "crypto";
import type { QrPayload } from "./qrPayload";


// TODO: move to secure config / env (must match qrPayload.ts)
const QR_SIGNING_SECRET = process.env.QR_SIGNING_SECRET || "dev-secret-change-me";

export type QrVerificationCode =
  | "OK"
  | "INVALID_SIGNATURE"
  | "EXPIRED"
  | "MISSING_FIELDS"
  | "INVALID_HOLOGRAM"
  | "INTERNAL_ERROR";

export type QrVerificationResult = {
  ok: boolean;
  code: QrVerificationCode;
  message: string;
};

/**
 * Recompute HMAC-SHA256 over the payload without signature.
 */
function computeSignature(payloadWithoutSignature: Omit<QrPayload, "signature">): string {
  const canonical = JSON.stringify(payloadWithoutSignature);
  return crypto
    .createHmac("sha256", QR_SIGNING_SECRET)
    .update(canonical)
    .digest("hex");
}

/**
 * Basic field sanity check before cryptographic verification.
 */
function hasRequiredFields(payload: QrPayload): boolean {
  return (
    !!payload.merchantId &&
    !!payload.sessionNonce &&
    !!payload.hologramId &&
    typeof payload.expiresAt === "number" &&
    !!payload.signature
  );
}

/**
 * Placeholder hologram validation hook.
 * Later: check hologramId against HologramRegistry.ts and merchantId.
 */
function isHologramValid(payload: QrPayload): boolean {
  // For now, always true. This will be wired to real registry.
  return !!payload.hologramId && !!payload.merchantId;
}

/**
 * Verify a decoded QR payload.
 * This is what scan.tsx should call after decodeQrPayload().
 */
export function verifyQrPayload(payload: QrPayload): QrVerificationResult {
  try {
    if (!hasRequiredFields(payload)) {
      return {
        ok: false,
        code: "MISSING_FIELDS",
        message: "QR payload is missing required fields.",
      };
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.expiresAt < nowSeconds) {
      return {
        ok: false,
        code: "EXPIRED",
        message: "QR payload has expired.",
      };
    }

    const { signature, ...withoutSignature } = payload;
    const expectedSignature = computeSignature(withoutSignature);

    if (signature !== expectedSignature) {
      return {
        ok: false,
        code: "INVALID_SIGNATURE",
        message: "QR payload signature is invalid.",
      };
    }

    if (!isHologramValid(payload)) {
      return {
        ok: false,
        code: "INVALID_HOLOGRAM",
        message: "QR payload hologram binding is invalid.",
      };
    }

    return {
      ok: true,
      code: "OK",
      message: "QR payload is valid.",
    };
  } catch (err) {
    return {
      ok: false,
      code: "INTERNAL_ERROR",
      message: "Internal error during QR payload verification.",
    };
  }
}
/**
 * VerifiedPayload
 * -------------------------------------------------------------
 * Merges the raw QR payload with the verification result.
 * Used by Flow 6 identity injection.
 */
export type VerifiedPayload = QrPayload & QrVerificationResult;
