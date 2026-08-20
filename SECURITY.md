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
- Short‑lived sessions with enforced rotation  
- Full audit logging for identity and payment lifecycle events  
- TLS 1.2+ enforced across all transport layers  
- Least‑privilege access control for backend services  
- Secure coding practices, static analysis, and mandatory code review  
- Deterministic identity propagation (Flow 6 → Flow 7 → Flow 8)

Security is not a feature — it is a discipline embedded into every part of HoloTap.

---

## Reporting a Vulnerability

We strongly encourage responsible disclosure.  
If you believe you’ve found a security issue, please report it privately so we can investigate and resolve it quickly.

### Contact  

Email: **<ray-newton@live.co.uk>**

Please include:

- Steps to reproduce  
- Impact assessment  
- Relevant logs or payloads  
- Suggested remediation (optional)

We aim to respond within **48 hours**.

---

## Secure Development Requirements

All engineering work must follow:

- Typed identity schemas  
- Deterministic flow versioning  
- Static analysis (SAST)  
- Dependency scanning  
- No dynamic code injection  
- No unvalidated QR payloads  
- No client‑side trust assumptions  
- Mandatory peer review for all changes  

---

## Cryptography

- TLS 1.2+ enforced  
- QR identity envelopes must be signed  
- Session tokens must be short‑lived  
- No plaintext secrets in code or logs  

---

## Logging & Monitoring

- All identity events logged  
- All payment lifecycle events logged  
- Logs are immutable and retained per ISO 27001 A.12.4  
- Monitoring alerts for abnormal identity/session behaviour  

---

## Incident Response

- Immediate triage  
- Containment  
- Root cause analysis  
- Patch deployment  
- Post‑incident review  

---

## Compliance Alignment

HoloTap aligns with:

- **ISO 27001 Annex A (2022)**  
- **SOC 2 Security**  
- **NIST CSF 2.0**  
- **OWASP ASVS / MASVS**  

HIPAA is **not applicable** (no PHI processed).
