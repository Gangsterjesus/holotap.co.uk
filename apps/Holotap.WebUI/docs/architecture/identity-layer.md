# Identity Layer — HoloTap Architecture

## 1. Purpose

The identity layer establishes the cryptographic and session‑level foundation that binds a device, a merchant, and a QR token into a single verifiable identity envelope.  
It ensures that every activation, scan, and payment originates from an authenticated and authorised entity.

## 2. Identity Envelope

The identity envelope is the core payload exchanged between mobile, server, and QR flows.

### Envelope Fields

- `qrToken` — unique QR activation token
- `deviceId` — persistent device identity
- `sessionNonce` — per‑session random UUID
- `timestamp` — client‑side epoch time

### Envelope Guarantees

- Device uniqueness
- Replay protection
- Temporal validity
- Merchant binding

## 3. Device Identity

Device identity is generated and stored locally on first run.

### Device Identity Rules

- Must be stable across app restarts
- Must be stored in secure storage
- Must be UUID format
- Must never be transmitted without a nonce

## 4. Server Validation

The server validates every identity envelope before creating a session.

### Validation Steps

- Schema validation (Zod)
- Timestamp freshness check
- Nonce uniqueness
