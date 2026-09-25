# QR Pipeline — HoloTap Architecture

## 1. Purpose

The QR pipeline defines the full lifecycle of a QR token from activation to payment.  
It ensures that every QR interaction is authenticated, bound to a merchant, and protected against tampering.

## 2. QR Token Structure

### Token Fields

- `qrToken` — unique activation token
- `merchantId` — merchant owner of the QR
- `checksum` — integrity protection
- `issuedAt` — timestamp of QR creation

### Token Guarantees

- Token uniqueness
- Merchant binding
- Integrity protection

## 3. Activation Flow

### Activation Steps

- Device generates identity envelope
- Server validates envelope
- Server validates QR token
- Server creates activation session
- Server returns sessionId

## 4. Scan Flow

### Scan Steps

- Device captures QR + hologram frame
- QR payload decoded
- Hologram verification executed
- Merchant identity validated
- Session created or resumed

## 5. Session Creation Flow

### Session Fields

- `sessionId`
- `deviceId`
- `merchantId`
- `qrToken`
- `createdAt`

### Session Guarantees

- Device binding
- Merchant binding
- Replay protection

## 6. Payment Authorisation Flow

### Payment Steps

- Device submits sessionId + payment request
- Server validates session
- Server validates merchant status
- Server authorises payment
- Server logs audit event

## 7. Pipeline Failure Modes

- **QR_INVALID** — QR token not recognised
- **CHECKSUM_FAIL** — QR integrity failure
- **MERCHANT_MISMATCH** — QR merchantId incorrect
- **SESSION_INVALID** — session not found or expired
- **ACTIVATION_FAIL** — identity envelope invalid

## 8. Pipeline Integration Points

The QR pipeline feeds into:

- Identity layer
- Hologram verification
- Merchant identity
- Session model
- Payment authorisation
