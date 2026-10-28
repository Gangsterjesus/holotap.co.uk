# Version: v5.0.0 — HERO Payment Flow

 Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 Module: Flow‑6 Identity Verification & QR Security Layer

1. Purpose

Flow‑6 is the identity verification and QR security layer used throughout the HoloTap HERO platform.

Flow‑6 provides:

Signed QR payloads
Payment-bound identity verification
Session-bound nonce and expiry controls
Deterministic verification responses
Secure QR transport for customer journeys
Developer tools for verification and diagnostics
PaymentId binding for HERO payment execution

Used by:

Merchant dashboards
Payment activation flows
Customer verification journeys
QR management tools
Identity verification surfaces
TM470 security documentation
2. File & Folder Structure
A) Identity Security Engine
Plain Text
apps/web/src/utils/security/

qrPayload.ts # Payload builder + encoder + decoder
qrVerify.ts # Signature + expiry + payment validation
verify.tsx # Optional helper utilities
B) Identity UI Surfaces
Plain Text
apps/web/src/pages/qr/

qr.tsx # Identity QR generator
payload.tsx # Payload inspection tool
verify.tsx # Verification surface
README.md # This document
C) Dashboard Integration
Plain Text
apps/web/src/pages/dashboard/identity/

index.tsx # Identity administration tools
3. Core Components
3.1 qrPayload.ts — Payload Builder

Responsibilities:

Construct canonical payload
Generate secure nonce
Apply session TTL
Create cryptographic signature
Encode payload for QR transport
Decode payload from QR transport

Exports:

TypeScript
buildSignedQrPayload()
encodeQrPayload()
decodeQrPayload()
signPayload()
3.2 qrVerify.ts — Verification Engine

Responsibilities:

Verify payload signature
Verify expiry time
Verify required fields
Verify payment binding
Verify merchant ownership
Return deterministic verification codes

Result codes:

Plain Text
OK
INVALID_SIGNATURE
EXPIRED
MISSING_FIELDS
INVALID_PAYMENT
INVALID_MERCHANT
INTERNAL_ERROR

Exports:

TypeScript
verifyQrPayload()
3.3 payload.tsx — Payload Viewer

Developer utility for:

Decoding payloads
Inspecting QR contents
Viewing signed metadata
Viewing expiry values
Troubleshooting verification issues
3.4 verify.tsx — Identity Verification Surface

Developer utility for:

Full payload verification
VALID / INVALID verification status
Verification code display
Payload inspection
Signature inspection
Expiry validation
3.5 dashboard/identity/index.tsx

Provides:

Organisation identity settings
Merchant identity information
Verification tools
Flow‑6 administration panel

Links to:

Plain Text
/qr/qr
/qr/payload
/qr/verify
4. HERO Canonical Payload Structure
Canonical Payload
JSON
{
"version": "5.0.0",
"paymentId": "PAY_123456",
"merchantId": "MERCHANT_123",
"sessionNonce": "random-secure-nonce",
"issuedAt": 1723200000,
"expiresAt": 1723200300,
"signature": "hex-string"
}
Rules
paymentId must reference a valid payment record
merchantId must reference the owning merchant
sessionNonce must be cryptographically random
issuedAt must be a Unix timestamp
expiresAt must be a Unix timestamp
signature must be HMAC-SHA256 over the payload excluding the signature field
Backend payment records remain the authoritative source of payment information
5. Identity Verification Flow
Build Payload
Plain Text
buildSignedQrPayload()

↓

Encode For QR
Plain Text
encodeQrPayload()

↓

Present QR
Plain Text
Merchant displays QR

↓

Scan QR
Plain Text
Customer scans code

↓

Decode Payload
Plain Text
decodeQrPayload()

↓

Verify Payload
Plain Text
verifyQrPayload()

↓

Load Payment
Plain Text
paymentId -> Payment Record

↓

Continue HERO Flow
Plain Text
Identity Verification
↓
Customer Review
↓
Payment Execution
↓
Payment Result
6. HERO Security Controls

Implemented Controls:

HMAC-SHA256 payload signing
Payment-bound QR sessions
Session expiry enforcement
Merchant verification
Nonce rotation
Deterministic verification responses

Recommended Future Controls:

Replay attack detection
Nonce reuse prevention
Enhanced audit logging
Ed25519 signatures
Identity analytics
7. Common Pitfalls
Incorrect Import Location

Use:

TypeScript
import {
decodeQrPayload
} from "../../utils/security/qrPayload";
Missing Payment Binding

Every QR payload must include:

JSON
{
"paymentId": "..."
}

Flow‑6 in HERO is payment-bound.

Missing Expiry Validation

Always validate:

TypeScript
expiresAt

before allowing continuation.

Dashboard Integration Missing

Identity dashboard should provide links to:

Plain Text
/qr/qr
/qr/payload
/qr/verify

1. Future HERO Enhancements
Plain Text
Replay protection
Settlement verification hooks
Merchant verification analytics
Payment journey telemetry
Enhanced audit events
Ed25519 signing
Hardware-backed key storage
2. TM470 Documentation Notes

Flow‑6 remains a strong TM470 security component because it demonstrates:

Cryptographic signing
QR-based transport
Identity verification
Session management
Expiry enforcement
Secure payment binding
Verification workflows
Security-focused architecture

End of README — HERO v5.0.0
