"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.controller.ts
 * Subsystem: Flow 8 — Payment Lifecycle Controller
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
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
// @ts-expect-error TS7016: payment.service is a JavaScript module without declarations.
const PaymentService = __importStar(require("../services/payment.service"));
async function initiatePaymentController(req, res) {
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    const result = await PaymentService.initiatePayment(req.body, req.actor);
    const severity = (0, severityMatrix_1.classifySeverity)("payment:initiate");
    const disclosure = (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:initiate");
    return res.json({
        ok: result.ok,
        correlationId: req.correlationId,
        severity,
        disclosure: disclosure.allowed,
        ...result,
    });
}
async function settlePaymentController(req, res) {
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    const result = await PaymentService.settlePayment(req.body, req.actor);
    const severity = (0, severityMatrix_1.classifySeverity)("payment:settle");
    const disclosure = (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:settle");
    return res.json({
        ok: result.ok,
        correlationId: req.correlationId,
        severity,
        disclosure: disclosure.allowed,
        ...result,
    });
}
async function payoutController(req, res) {
    const identityCheck = (0, identityPropagationValidator_1.validateIdentityPropagation)(req.actor);
    if (!identityCheck.valid) {
        return res.status(400).json({
            ok: false,
            correlationId: req.correlationId,
            error: "IDENTITY_INVALID",
            reason: identityCheck.reason,
        });
    }
    const result = await PaymentService.payout(req.body, req.actor);
    const severity = (0, severityMatrix_1.classifySeverity)("payment:payout");
    const disclosure = (0, disclosurePolicy_1.evaluateDisclosure)(req.actor.type, "payment:payout");
    return res.json({
        ok: result.ok,
        correlationId: req.correlationId,
        severity,
        disclosure: disclosure.allowed,
        ...result,
    });
}
