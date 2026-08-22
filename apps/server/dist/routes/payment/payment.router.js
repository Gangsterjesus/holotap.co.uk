"use strict";
/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: payment.router.ts
 * Subsystem: Flow 8 — Payment Lifecycle Routing Layer
 * Engineer: Raymond Newton (E5357171)
 * Version: 1.0.0
 * Date: 22 Aug 2026
 *
 * DESCRIPTION:
 *   Defines the HTTP routing endpoints for the Flow 8 payment lifecycle. Each
 *   route delegates to its corresponding controller, ensuring that identity
 *   propagation, correlation IDs, severity classification, and disclosure policy
 *   are applied consistently at the controller layer.
 *
 * SECTION: Overview
 *   Provides the routing surface for payment initiation, settlement, and payout.
 *   This module contains no business logic and serves purely as an Express
 *   routing definition. All lifecycle behaviour is implemented in the
 *   payment.controller.ts subsystem.
 *
 * SECTION: Stability Notes
 *   Must remain free of business logic. Must never throw. All errors are handled
 *   by upstream middleware and Flow 13 controller envelopes.
 * ────────────────────────────────────────────────────────────────────────────────
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../../controllers/payment/payment.controller");
const router = (0, express_1.Router)();
router.post("/initiate", payment_controller_1.initiatePaymentController);
router.post("/settle", payment_controller_1.settlePaymentController);
router.post("/payout", payment_controller_1.payoutController);
exports.default = router;
