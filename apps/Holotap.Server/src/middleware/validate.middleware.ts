/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTapServer — Utility Layer
 * Flow U — Deterministic Request Validator (TypeScript Edition)
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 3.0.0
 * Date: 06 September 2026
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Overview:
 *   Pure request‑body validator used across all flows. Ensures required fields
 *   are present without performing domain validation or schema mutation.
 *
 * Guarantees:
 *   • Pure validation logic only
 *   • No destructive operations
 *   • Deterministic logging
 *   • Stable behaviour across all flows (6 → 12)
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response, NextFunction } from "express";

/**
 * validate
 * -------------------------------------------------------------------------------
 * Enforces presence of required fields in req.body.
 *
 * Example:
 *   router.post("/create", validate(["name", "amount"]), handler);
 */
export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Deterministic field presence check
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        console.warn(`[VALIDATION] Missing field: ${field}`);

        return res.status(400).json({
          success: false,
          message: `Missing field: ${field}`,
        });
      }
    }

    // 2. Deterministic success logging
    console.log("[VALIDATION] OK:", requiredFields);

    // 3. Continue pipeline
    next();
  };
}
