# Merchant Identity — HoloTap Architecture

## 1. Purpose

The merchant identity layer binds a physical merchant, their QR assets, their hologram signature, and their organisation record into a single verifiable identity object.  
It ensures that every activation, scan, and payment is attributed to the correct merchant.

## 2. Merchant Identity Object

The merchant identity object is stored server‑side and referenced during all QR and hologram verification flows.

### Fields

- `merchantId` — globally unique merchant identifier
- `orgId` — organisation the merchant belongs to
- `hologramSignature` — merchant‑specific hologram pattern
- `qrSet` — list of QR tokens assigned to the merchant
- `status` — active, suspended, or revoked

### Guarantees

- Merchant uniqueness
- Organisation binding
- Hologram authenticity
- QR ownership

## 3. Hologram Signature

Each merchant has a unique hologram signature used during hologram verification.

### Signature Rules

- Must be unique per merchant
- Must be registered during onboarding
- Must be immutable once issued
- Must match the physical hologram overlay

## 4. QR Ownership

QR tokens assigned to a merchant must always resolve back to the same merchant identity.

### Ownership Rules

- QR tokens cannot be shared across merchants
- QR tokens cannot be reassigned without revocation
- QR tokens must match the merchant’s hologram signature
- QR tokens must be present in the merchant’s `qrSet`

## 5. Identity Validation

Merchant identity validation occurs during:

- QR activation
- QR scanning
- Hologram verification
- Payment authorisation

### Validation Steps

- Confirm `merchantId` exists
- Confirm QR token belongs to merchant
- Confirm hologram signature matches merchant
- Confirm merchant status is active

## 6. Failure Modes

- **MERCHANT_NOT_FOUND** — merchantId does not exist
- **QR_NOT_OWNED** — QR token not assigned to merchant
- **SIGNATURE_MISMATCH** — hologram signature incorrect
- **MERCHANT_SUSPENDED** — merchant not allowed to transact

## 7. Integration

The merchant identity layer feeds into:

- Hologram verification
- QR pipeline
- Session creation
- Payment authorisation
- Admin audit logging
