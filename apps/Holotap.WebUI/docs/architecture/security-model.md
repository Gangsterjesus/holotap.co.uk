# Security Model — HoloTap Architecture

## 1. Purpose

The security model defines the trust boundaries, enforcement rules, and validation layers that protect HoloTap’s identity, QR, hologram, and payment flows.  
It ensures that every interaction is authenticated, integrity‑checked, and bound to a verified merchant and device.

## 2. Trust Boundaries

### Boundaries

- **Client Boundary** — device identity, QR scanning, hologram capture
- **Server Boundary** — identity validation, session creation, merchant verification
- **Payment Boundary** — authorisation, fraud detection, audit logging

### Guarantees

- No unauthenticated entry points
- No cross‑merchant identity leakage
- No unsigned payload acceptance

## 3. Integrity Enforcement

Integrity checks ensure that all payloads are untampered and originate from trusted sources.

### Enforcement Layers

- QR checksum validation
- Identity envelope schema validation
- Timestamp freshness checks
- Nonce replay protection
- Merchant signature verification

## 4. Authentication Model

Authentication binds a device, a QR token, and a merchant identity into a single verified session.

### Authentication Steps

- Validate device identity
- Validate QR token ownership
- Validate hologram signature
- Validate merchant status
- Create or resume session

## 5. Session Security

Sessions are the core security boundary for all subsequent actions.

### Session Rules

- Sessions must be bound to a deviceId
- Sessions must be bound to a merchantId
- Sessions must expire after inactivity
- Sessions must be validated before payment

## 6. Payment Security

Payment authorisation requires full identity, QR, and hologram verification.

### Payment Checks

- Validate sessionId
- Validate merchant status
- Validate payment request schema
- Log audit event

## 7. Failure Modes

- **UNAUTHENTICATED** — missing or invalid identity envelope
- **INTEGRITY_FAIL** — checksum or signature mismatch
- **REPLAY_DETECTED** — nonce reused
- **MERCHANT_SUSPENDED** — merchant not allowed to transact
- **SESSION_INVALID** — session expired or not found

## 8. Integration

The security model underpins:

- Identity layer
- QR pipeline
- Hologram verification
- Merchant identity
- Payment authorisation
- Audit logging
