/**
 * ============================================================
 *  HoloTapServer — Deterministic ID Generator
 *  Flow 10 — Identity Session Infrastructure
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 5.0.0
 *  Date: 15 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Provides deterministic generation of cryptographically
 *  secure identifiers for HoloTap platform resources.
 *
 *  This utility forms part of the Flow 10 identity
 *  infrastructure and provides URL-safe identifiers suitable
 *  for sessions, actors, QR identities, ledger records,
 *  correlation references, and future identity artifacts.
 *
 *  Consumed By:
 *  ------------------------------------------------------------
 *      • Flow 10 — Identity Session Management
 *      • Flow 11 — Unified Actor Pipeline
 *      • Flow 12 — Correlation & Audit Layer
 *      • Flow 9.6 — Registry Ledger
 *      • Merchant Infrastructure
 *      • Consumer Infrastructure
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *      • Generate cryptographically strong identifiers
 *      • Produce URL-safe output
 *      • Eliminate padding characters
 *      • Provide deterministic output length
 *      • Support distributed identity generation
 *
 *  Security Characteristics:
 *  ------------------------------------------------------------
 *      • Backed by Node.js crypto.randomBytes()
 *      • Cryptographically secure entropy source
 *      • Suitable for externally exposed identifiers
 *      • Resistant to predictable sequencing
 *      • Safe for ledger and actor references
 *
 *  Engineering Guarantees:
 *  ------------------------------------------------------------
 *      • No database access
 *      • No network access
 *      • No side effects
 *      • No mutable state
 *      • Pure utility implementation
 *
 *  Output Contract:
 *  ------------------------------------------------------------
 *      Input:
 *          length?: number
 *
 *      Output:
 *          string
 *
 *  Version History:
 *  ------------------------------------------------------------
 *      v5.0.0
 *      • Flow 10 standardisation
 *      • Ledger compatibility review
 *      • Actor pipeline compatibility review
 *      • Identity-layer documentation refresh
 *      • Security guarantees documented
 *
 * ============================================================
 */

import crypto from "crypto";

export function generateId(length: number = 12): string {
  return crypto.randomBytes(length)
    .toString("base64url")   // URL‑safe, no padding
    .substring(0, length);   // deterministic length
}
