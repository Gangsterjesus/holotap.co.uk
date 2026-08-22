"use strict";
/**
 * HoloTapServer
 * Bootstrap Module — Server Initialisation
 * Flow 0 — Application Entry Point
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Provides the main Express application bootstrap. All middleware layers
 * (Flow 6–11) and all route modules (Flow 10, org, user, QR, etc.) are
 * mounted here in deterministic order.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actorPipeline_1 = require("./middleware/actorPipeline");
const founder_1 = require("./routes/founder");
const app = (0, express_1.default)();
// ------------------------------------------------------
// 1. Global Middleware
// ------------------------------------------------------
app.use(express_1.default.json());
// ------------------------------------------------------
// 2. Flow 11 — Unified Actor Pipeline
// ------------------------------------------------------
app.use(actorPipeline_1.actorPipeline);
// ------------------------------------------------------
// 3. Flow 10 — Founder Routes
// ------------------------------------------------------
app.use('/founder', founder_1.founderRoute);
// ------------------------------------------------------
// 4. Additional Routes (future wiring)
// ------------------------------------------------------
// app.use('/org', orgRoute);
// app.use('/user', userRoute);
// app.use('/qr', qrRoute);
// ------------------------------------------------------
// 5. Server Start
// ------------------------------------------------------
app.listen(3000, () => {
    console.log('HoloTapServer running on port 3000');
});
exports.default = app;
