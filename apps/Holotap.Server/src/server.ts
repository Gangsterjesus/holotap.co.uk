/**
 * =============================================================================
 * HoloTap Engineering - API Server Entrypoint
 * =============================================================================
 * File: apps/Holotap.Server/src/server.ts
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Server / API
 * Revision: v5.0.0 - HERO Build
 * Date: 30 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Bootstraps and exposes the HoloTap backend API.
 *
 * Module Responsibilities
 * - Load environment configuration.
 * - Initialise the Express HTTP server.
 * - Register correlation and identity middleware.
 * - Mount consumer, merchant, mobile and payment API namespaces.
 * - Mount identity-session endpoints.
 * - Provide API diagnostics.
 * - Register error handling.
 * - Listen on all interfaces for local-network and proxy access.
 * =============================================================================
 */

import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";

// -----------------------------------------------------------------------------
// Founder API
// -----------------------------------------------------------------------------
import { founderRoute } from "./routes/founder";

// -----------------------------------------------------------------------------
// Identity Subsystem
// -----------------------------------------------------------------------------
import { actorPipeline } from "./middleware/actorPipeline";

// -----------------------------------------------------------------------------
// Identity Logging
// -----------------------------------------------------------------------------
import identityLoggerMiddleware from "./middleware/identityLogger.middleware";

// -----------------------------------------------------------------------------
// Session Status API
// -----------------------------------------------------------------------------
import statusRouter from "./routes/session/status.router";

// -----------------------------------------------------------------------------
// Consumer API
// -----------------------------------------------------------------------------
import apiRouter from "./routes/consumer/index";

// -----------------------------------------------------------------------------
// Merchant API
// -----------------------------------------------------------------------------
import merchantRouter from "./routes/merchant.routes";

// -----------------------------------------------------------------------------
// Mobile API
// -----------------------------------------------------------------------------
import mobileRouter from "./routes/mobile/mobile.router";

// -----------------------------------------------------------------------------
// Payment Lifecycle API
// -----------------------------------------------------------------------------
import paymentRouter from "./routes/payment/payment.router";

// -----------------------------------------------------------------------------
// Identity Session API
// -----------------------------------------------------------------------------
import createSessionRoute from "./routes/identity/session/createSessionRoute";
import resolveSessionRoute from "./routes/identity/session/resolveSessionRoute";
import revokeSessionRoute from "./routes/identity/session/revokeSessionRoute";

// -----------------------------------------------------------------------------
// Error Middleware
// -----------------------------------------------------------------------------
import { errorMiddleware } from "./middleware/error.middleware";

// -----------------------------------------------------------------------------
// Environment
// -----------------------------------------------------------------------------
dotenv.config();

// -----------------------------------------------------------------------------
// Express
// -----------------------------------------------------------------------------
const app = express();
const port = Number(process.env.PORT) || 4000;

// -----------------------------------------------------------------------------
// Global Middleware
// -----------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// -----------------------------------------------------------------------------
// Founder API
// -----------------------------------------------------------------------------
app.use("/api/founder", founderRoute);

// -----------------------------------------------------------------------------
// Correlation ID
// -----------------------------------------------------------------------------
app.use((req, _res, next) => {
  req.correlationId = crypto.randomUUID();
  next();
});

// -----------------------------------------------------------------------------
// Unified Actor Pipeline
// -----------------------------------------------------------------------------
app.use(actorPipeline);

// -----------------------------------------------------------------------------
// Identity Logger
// -----------------------------------------------------------------------------
app.use(identityLoggerMiddleware);

// -----------------------------------------------------------------------------
// Root Diagnostic
// -----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    root: "HoloTap API root",
    use: "/api",
    docs: "/api/docs",
    status: "online",
    actor: req.actor?.type ?? "unknown",
    correlationId: req.correlationId ?? null,
  });
});

// -----------------------------------------------------------------------------
// HERO API Namespaces
// -----------------------------------------------------------------------------
app.use("/api/session", statusRouter);
app.use("/api/consumer", apiRouter);
app.use("/api/merchant", merchantRouter);
app.use("/api/mobile", mobileRouter);
app.use("/api/payment", paymentRouter);

// -----------------------------------------------------------------------------
// Identity Session API
// -----------------------------------------------------------------------------
app.use("/identity/session/create", createSessionRoute);
app.use("/identity/session/resolve", resolveSessionRoute);
app.use("/identity/session/revoke", revokeSessionRoute);

// -----------------------------------------------------------------------------
// Error Middleware
// Must remain last.
// -----------------------------------------------------------------------------
app.use(errorMiddleware);

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`HoloTap API running on port ${port}`);
});