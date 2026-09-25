# Session Model — HoloTap Architecture

## 1. Purpose

The session model defines how HoloTap binds a device, a QR token, and a merchant identity into a single secure, verifiable session.  
Every activation, scan, and payment must occur inside a valid session.

## 2. Session Object

A session is created after successful identity, QR, and hologram verification.

### Fields

- `sessionId` — globally unique session identifier
- `deviceId` — device that initiated the session
- `merchantId` — merchant bound to the session
- `qrToken` — QR token used to create the session
- `createdAt` — timestamp of session creation
- `expiresAt` — timestamp of session expiry
- `status` — active, expired, revoked

### Guarantees

- Device binding
- Merchant binding
- QR binding
- Replay protection

## 3. Session Lifecycle

### Lifecycle States

- **CREATED** — session successfully created
- **ACTIVE** — session in use for scanning or payment
- **EXPIRED** — session timed out
- **REVOKED** — session invalidated by server

### Lifecycle Rules

- Sessions must expire after inactivity
- Sessions must be validated before payment
- Sessions cannot be transferred between devices
- Sessions cannot be reused after expiry

## 4. Session Creation Flow

### Steps

- Identity envelope validated
- QR token validated
- Merchant identity validated
- Hologram verification passed
- Session object created
- Session returned to device

## 5. Session Validation

Validation occurs before any sensitive action.

### Validation Checks

- Confirm sessionId exists
- Confirm session is active
- Confirm deviceId matches
- Confirm merchantId matches
- Confirm session has not expired

## 6. Session Expiry

Sessions expire based on server‑defined timeout rules.

### Expiry Rules

- Expire after inactivity
- Expire after maximum lifetime
- Expire immediately if merchant suspended
- Expire immediately if QR revoked

## 7. Failure Modes

- **SESSION_NOT_FOUND** — sessionId does not exist
- **SESSION_EXPIRED** — session timed out
- **DEVICE_MISMATCH** — deviceId does not match session
- **MERCHANT_MISMATCH** — merchantId does not match session
- **SESSION_REVOKED** — session invalidated by server

## 8. Integration

The session model feeds into:

- QR pipeline
- Identity layer
- Merchant identity
- Hologram verification
- Payment authorisation
- Audit logging
