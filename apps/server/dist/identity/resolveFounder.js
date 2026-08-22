"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 10 — Founder Override Resolver
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 10 provides a deterministic founder‑override mechanism
 *  used for critical administrative operations. This resolver
 *  verifies founder identity using:
 *
 *    • Actor identity from Flow 6
 *    • Founder secret header (x-founder-secret)
 *    • Founder key header (x-founder-key)
 *    • Recovery key (x-founder-recovery)
 *
 *  Stability Level:
 *  ------------------------------------------------------------
 *  Critical — must remain deterministic, pure, and side‑effect free.
 *
 *  External Dependencies:
 *    - Environment variable: FOUNDER_SECRET
 *
 *  Internal Contracts:
 *    - Consumes actor identity from Flow 6
 *    - Produces `isFounder` boolean for Flow 10 middleware
 *
 *  Guarantees:
 *    - No destructive operations
 *    - No schema mutations
 *    - Pure verification logic only
 *
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFounder = resolveFounder;
/**
 * resolveFounder
 * ------------------------------------------------------------
 * Determines whether the current actor is the founder.
 *
 * Inputs:
 *   actor: Flow 6 identity object
 *   req: Express request containing founder headers
 *
 * Output:
 *   { isFounder: boolean }
 */
function resolveFounder(actor, req) {
    // ------------------------------------------------------------
    // 1. Static Founder Identity (Email)
    // ------------------------------------------------------------
    const founderEmail = "ray-newton@live.co.uk";
    // ------------------------------------------------------------
    // 2. Primary Founder Secret (Environment)
    // ------------------------------------------------------------
    const founderSecret = process.env.FOUNDER_SECRET;
    // ------------------------------------------------------------
    // 3. Recovery Key (Hard‑coded fallback)
    // ------------------------------------------------------------
    // Used ONLY when environment variables fail or Windows resets.
    const recoveryKey = "HOLOTAP-FOUNDER-RECOVERY-KEY-001";
    // ------------------------------------------------------------
    // 4. Supplied Secrets (Headers)
    // ------------------------------------------------------------
    const suppliedSecret = req.headers["x-founder-secret"] ||
        req.headers["x-founder-key"] ||
        null;
    const suppliedRecovery = req.headers["x-founder-recovery"] ||
        null;
    // ------------------------------------------------------------
    // 5. Deterministic Founder Verification
    // ------------------------------------------------------------
    const isFounder = actor?.email === founderEmail || // Flow 6 actor identity
        (founderSecret && suppliedSecret === founderSecret) || // Primary founder secret
        suppliedRecovery === recoveryKey; // Recovery override
    // ------------------------------------------------------------
    // 6. Output Contract
    // ------------------------------------------------------------
    return { isFounder };
}
