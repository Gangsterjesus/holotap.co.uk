# HoloTap Security Policy

<!--  
 * =====================================================================================
 *  HoloTap Engineering — Security Policy
 * -------------------------------------------------------------------------------------
 *  File: SECURITY.md
 *  Version: 2.4
 *  Engineer: E5357171 (R. Newton)
 *  Date: 20 Aug 2026
 *
 *  Purpose:
 *      - Define HoloTap’s security posture across mobile, web, and backend systems
 *      - Align with ISO 27001 Annex A, SOC 2 Security, NIST CSF 2.0, and OWASP ASVS
 *      - Provide clear guidance for vulnerability reporting and secure development
 *
 *  Notes:
 *      - HIPAA is not applicable (HoloTap does not process PHI)
 *      - All identity flows (6–8) follow strict validation and auditability rules
 * =====================================================================================
 -->

HoloTap is a fintech platform built with a security‑first architecture.  
Identity, session integrity, and auditability are core to every subsystem.

---

## Supported Versions

The following versions currently receive security patches, monitoring, and compliance updates:

| Version | Status |
| -------- | -------- |
| **2.4.x** | Fully supported (full security updates) |
| **2.3.x** | Security‑only updates |
| **< 2.3** | Unsupported |

Older versions should be upgraded immediately to maintain protection.

---

## Security Principles

HoloTap follows modern security standards aligned with ISO 27001 Annex A, SOC 2, NIST, and OWASP:

- No password storage on client devices  
- Signed identity envelopes for QR flows  
- Replay‑safe activation and session controllers  
- Short‑lived sessions with enforced
