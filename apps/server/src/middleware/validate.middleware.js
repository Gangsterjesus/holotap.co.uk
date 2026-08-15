/**
 * ============================================================
 *  HoloTapServer — Utility Layer
 *  Request Validation Middleware (validate.middleware.js)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Deterministic request-body validator used across all flows.
 *  This middleware ensures that required fields are present in
 *  req.body without performing any domain validation.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Enforce presence of required fields
 *  - Reject requests with missing fields
 *  - Provide deterministic logging
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure validation logic only
 * ============================================================
 */

function validate(requiredFields) {
  return (req, res, next) => {
    // ------------------------------------------------------------
    // 1. Iterate through required fields
    // ------------------------------------------------------------
    for (const field of requiredFields) {
      // ------------------------------------------------------------
      // 2. Check presence using "field in req.body"
      // ------------------------------------------------------------
      if (!(field in req.body)) {
        console.warn(`[VALIDATION] Missing field: ${field}`);

        return res.status(400).json({
          success: false,
          message: `Missing field: ${field}`,
        });
      }
    }

    // ------------------------------------------------------------
    // 3. Deterministic success logging
    // ------------------------------------------------------------
    console.log("[VALIDATION] OK:", requiredFields);

    // ------------------------------------------------------------
    // 4. Continue pipeline
    // ------------------------------------------------------------
    next();
  };
}

module.exports = {
  validate,
};
