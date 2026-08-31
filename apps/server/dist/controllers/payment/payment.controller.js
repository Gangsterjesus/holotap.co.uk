"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.controller.ts
 * Subsystem: Flow 8 — Payment Lifecycle Controller
 * Engineer: Raymond Newton (E5357171)
 * Version: 1.2.0
 * Date: 31 Aug 2026
 *
 * DESCRIPTION:
 *   Implements the controller layer for the Flow 8 payment lifecycle. Each
 *   controller enforces identity propagation, correlation tracking, severity
 *   classification, and disclosure policy evaluation before delegating to the
 *   underlying service layer. This module contains no business logic.
 *
 * SECTION: Responsibilities
 *   • Validate actor identity propagation (Flow 11)
 *   • Apply severity matrix classification (Flow 6)
 *   • Apply disclosure policy evaluation (Flow 6)
 *   • Delegate lifecycle operations to payment.service.ts
 *   • Return deterministic envelopes to upstream middleware
 *
 * SECTION: Stability Notes
 *   • Must never throw
 *   • Must never perform business logic
 *   • All failures must be expressed as structured envelopes
 * ────────────────────────────────────────────────────────────────────────────────
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiatePaymentController = initiatePaymentController;
exports.settlePaymentController = settlePaymentController;
exports.payoutController = payoutController;
const identityPropagationValidator_1 = require("../../security/identityPropagationValidator");
const severityMatrix_1 = require("../../security/severityMatrix");
const disclosurePolicy_1 = require("../../security/disclosurePolicy");
const PaymentService = __importStar(require("../../services/payment/payment.service"));
/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: initiatePaymentController
 * Flow 8 — Payment Initiation
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   payment initiation to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
async function initiatePaymentController(req, res) {
    // Identity propagation validation
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    // Delegate to service layer
    const result = await PaymentService.initiatePayment(req.body, req.actor);
    // Response envelope
    return res.json({
        correlationId: req.correlationId,
        severity: (0, severityMatrix_1.classifySeverity)("payment:initiate"),
        disclosure: (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:initiate").allowed,
        ...result,
    });
}
/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: settlePaymentController
 * Flow 9 — Payment Settlement
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   settlement operations to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
async function settlePaymentController(req, res) {
    // Identity propagation validation
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    // Delegate to service layer
    const result = await PaymentService.settlePayment(req.body, req.actor);
    // Response envelope
    return res.json({
        correlationId: req.correlationId,
        severity: (0, severityMatrix_1.classifySeverity)("payment:settle"),
        disclosure: (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:settle").allowed,
        ...result,
    });
}
/* ────────────────────────────────────────────────────────────────────────────────
 * CONTROLLER: payoutController
 * Flow 13 — Merchant Payout
 * DESCRIPTION:
 *   Validates actor identity, applies severity/disclosure envelopes, and delegates
 *   payout operations to the service layer.
 * ────────────────────────────────────────────────────────────────────────────────
 */
async function payoutController(req, res) {
    // Identity propagation validation
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    // Delegate to service layer
    const result = await PaymentService.payout(req.body, req.actor);
    // Response envelope
    return res.json({
        correlationId: req.correlationId,
        severity: (0, severityMatrix_1.classifySeverity)("payment:payout"),
        disclosure: (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:payout").allowed,
        ...result,
    });
}
