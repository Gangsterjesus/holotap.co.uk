# HoloTap Architecture Documentation

Welcome to the HoloTap architecture suite.

This directory contains the full technical specification for HoloTap’s identity, QR, hologram, merchant, session, and security systems.

The architecture is designed around a simple principle:

**Every QR interaction must be cryptographically bound to a verified device, a verified merchant, and a verified hologram.**

---

## Architecture Index

### Identity & Trust

- identity-layer.md  
- merchant-identity.md  
- hologram-verification.md  

### QR & Session Pipeline

- qr-pipeline.md  
- session-model.md  

### Security & Enforcement

- security-model.md  

### Overview

- architecture-index.md  

---

## Core Architectural Principles

### Device‑Bound Identity

Every session begins with a device identity envelope containing a nonce, timestamp, and QR token.

### Merchant‑Bound QR Tokens

QR tokens are permanently assigned to a merchant and cannot be reassigned without revocation.

### Physical Hologram Verification

A merchant‑specific hologram signature prevents QR swapping, overlay removal, and impersonation.

### Session‑Bound Actions

All sensitive actions require an active session bound to a device and merchant.

### Fail‑Closed Security

Any mismatch results in immediate rejection.

---

## End‑to‑End Flow Summary

1. QR Activation  
2. QR Scan  
3. Payment Authorisation  

---

## How to Use This Documentation

- Start with **architecture-index.md**  
- Read **identity-layer.md** and **merchant-identity.md**  
- Study **hologram-verification.md**  
- Follow **qr-pipeline.md** and **session-model.md**  
- Finish with **security-model.md**  

---

## Versioning

This architecture is versioned alongside the HoloTap codebase.  
Updates to identity, QR, hologram, or session logic must be reflected here.

---

## © 2026 HoloTap Technologies Ltd

All rights reserved.  
This documentation is internal and confidential.
