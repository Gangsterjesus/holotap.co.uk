# HoloTap — Flow‑6 Identity Layer

Version: v2 — Unified Architecture
Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
Module: Flow‑6 Identity (QR Security Layer)

1. Purpose
Flow‑6 is the cryptographic identity layer used across HoloTap’s merchant ecosystem. It provides:

Signed QR payloads

Merchant hologram identity binding

Session‑bound nonce + expiry

Deterministic verification

Developer tools for debugging identity flows

Used by:

Merchant dashboards

QR fleet management

Payment activation flows

Identity verification surfaces

TM470 documentation

1. File & Folder Structure
Flow‑6 identity files live in two main areas.

A) Identity Security Engine (logic)
Code
apps/web/src/utils/security/
    qrPayload.ts      # builder + encoder + decoder
    qrVerify.ts       # signature + expiry + hologram validation
    verify.tsx        # optional helper UI
B) Identity UI Surfaces (pages)
Code
apps/web/src/pages/qr/
    qr.tsx            # QR generator
    payload.tsx       # Signed Payload Viewer
    verify.tsx        # Identity Verification Surface
    README.md         # ← this file
C) Dashboard Integration (enterprise identity)
Code
apps/web/src/pages/dashboard/identity/
    index.tsx         # Organisation Identity + Flow‑6 Tools Panel
3. Core Components
3.1 qrPayload.ts — Payload Builder
Responsibilities:

Construct canonical payload

Generate session nonce

Apply TTL (default: 300 seconds)

Sign payload (HMAC‑SHA256)

Encode JSON → base64

Decode base64 → JSON

Exports:

ts
buildSignedQrPayload()
encodeQrPayload()
decodeQrPayload()
signPayload()
3.2 qrVerify.ts — Verification Engine
Responsibilities:

Recompute signature

Validate expiry

Validate required fields

Validate hologram binding

Return deterministic result codes

Result codes:

Code
OK
INVALID_SIGNATURE
EXPIRED
MISSING_FIELDS
INVALID_HOLOGRAM
INTERNAL_ERROR
Exports:

ts
verifyQrPayload()
3.3 payload.tsx — Signed Payload Viewer
Developer tool for:

Decoding base64 payload

Pretty‑printing JSON

Highlighting signature

Showing expiry timestamp

Debugging QR payloads

3.4 verify.tsx — Identity Verification Surface
Developer tool for:

Running full verification

Showing VALID / INVALID

Showing verification code

Showing decoded payload

Showing signature + expiry

3.5 dashboard/identity/index.tsx — Enterprise Identity Module
Provides:

Organisation identity management

Branding + hologram style

Merchant identity fields

Contact details

Flow‑6 Tools Panel linking to:

/qr/qr

/qr/payload

/qr/verify

1. Identity Payload Structure
Canonical payload:

json
{
  "merchantId": "string",
  "sessionNonce": "string",
  "hologramId": "string",
  "amountMinorUnits": 1234,
  "currency": "GBP",
  "expiresAt": 1723200000,
  "callbackUrl": "<https://example.com/callback>",
  "signature": "hex-string"
}
Rules:

sessionNonce must be cryptographically random

expiresAt must be a unix timestamp (seconds)

signature is HMAC‑SHA256 over the payload without signature

merchantId + hologramId form the hologram binding pair

1. Identity Flow Overview
Build Payload  
buildSignedQrPayload()

Encode for QR  
encodeQrPayload()

Scan QR  
Extract base64 string

Decode Payload  
decodeQrPayload()

Verify Payload  
verifyQrPayload()

Show Result

VALID / INVALID

Signature match

Expiry status

Hologram binding status

1. Common Pitfalls
❌ Wrong import paths
Correct location for Flow‑6 logic:

Code
utils/security/
❌ Missing decodeQrPayload import
Correct import:

ts
import { decodeQrPayload } from "../../utils/security/qrPayload";
❌ Forgetting TTL expiry
Default TTL is 300 seconds.

❌ Forgetting dashboard integration
Dashboard identity must link to:

/qr/qr

/qr/payload

/qr/verify

7.Future Extensions
HologramRegistry.ts

Ed25519 signing

Identity analytics

Nonce replay protection

Merchant identity audit logs

8.TM470 Documentation Notes
Flow‑6 identity is ideal for TM470:

Cryptographic signing

Identity verification

QR transport

Merchant identity binding

Enterprise dashboard integration

Security architecture diagrams

Deterministic verification codes

End of README
