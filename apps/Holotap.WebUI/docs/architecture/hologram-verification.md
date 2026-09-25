# Hologram Verification — HoloTap Architecture

## 1. Purpose

The hologram verification engine ensures that the physical hologram overlay attached to a merchant’s QR code is authentic, correctly aligned, and bound to the correct merchant identity.  
This prevents QR swapping, overlay removal, impersonation, and tampering.

## 2. Verification Inputs

- Captured frame containing QR + hologram
- Merchant hologram signature
- QR payload (merchantId, checksum, sessionToken)
- Distortion + alignment metrics

## 3. Verification Pipeline

### 3.1 Extract Hologram Signature

- Detect hologram region
- Extract merchant‑specific pattern
- Validate signature format

### 3.2 Validate Merchant Pattern

- Compare extracted pattern with registered merchant signature
- Reject if pattern mismatch or signature missing

### 3.3 Validate Overlay Alignment

- Check hologram position relative to QR anchor points
- Validate rotation tolerance
- Validate scale tolerance
- Reject if overlay displaced or misaligned

### 3.4 Validate Distortion Thresholds

- Measure hologram distortion (warp, bend, glare)
- Validate against merchant‑specific thresholds
- Reject if distortion exceeds safe limits

### 3.5 Validate QR Integrity

- Decode QR payload
- Validate checksum
- Validate merchantId consistency
- Reject if QR payload tampered or mismatched

### 3.6 Confirm Merchant Identity Match

- QR merchantId must match hologram merchantId
- Reject immediately on mismatch

## 4. Outcomes

- **VALID** — hologram authentic, aligned, distortion within limits, QR integrity confirmed
- **INVALID_HOLOGRAM** — signature mismatch, missing pattern, or extraction failure
- **MERCHANT_MISMATCH** — QR merchantId ≠ hologram merchantId
- **DISTORTION_EXCEEDED** — hologram warped beyond tolerance
- **MISALIGNED_OVERLAY** — hologram not in expected position
- **QR_INTEGRITY_FAIL** — checksum or payload invalid

## 5. Anti‑Tamper Detection

The system detects:

- Swapped hologram overlays
- Removed overlays
- Misaligned overlays
- Excessive bending or glare
- Forged or incorrect merchant signatures
- QR payload tampering

## 6. Design Principles

- Fail‑closed identity enforcement
- Physical + digital hybrid trust
- Predictable failure modes
- Merchant‑specific hologram signatures
- Zero tolerance for identity mismatch

## 7. Integration

The verification engine feeds directly into:

- Identity session creation
- Payment authorisation
- Audit logging
- Fraud detection
