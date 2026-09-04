/**
 * =============================================================================
 * HOLOTAP API — SERVER ENTRYPOINT v2.5 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          server.ts
 * Date:          04 September 2026
 * =============================================================================
 * PURPOSE:
 *   Bootstraps the HoloTap backend API.
 *
 * Responsibilities:
 *   • Load environment variables
 *   • Initialise Express server
 *   • Register identity pipeline (Flow 11)
 *   • Register correlation ID generator (Flow 12.2)
 *   • Register identity logger (Flow 12)
 *   • Register global middleware
 *   • Mount API route namespaces (Flow 7, Flow 10, Consumer API, Merchant API)
 *   • Provide root diagnostics endpoint
 *   • Start HTTP listener
 *
 * ENGINEERING NOTES:
 *   • Identity pipeline MUST run before any middleware that depends on req.actor
 *   • Correlation ID MUST be generated before identity logger
 *   • Identity logger MUST run after identity pipeline
 *   • Flow‑10 MUST mount before error middleware
 *   • Merchant API MUST mount inside /api namespace
 *   • Bound to 0.0.0.0 for LAN + Caddy reverse proxy compatibility
 * =============================================================================
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

// -----------------------------------------------------------------------------
// Identity Subsystem (Flow 11)
// -----------------------------------------------------------------------------
import { actorPipeline } from "./middleware/actorPipeline";

// -----------------------------------------------------------------------------
// Middleware Subsystem (Flow 12)
// -----------------------------------------------------------------------------
import identityLoggerMiddleware from "./middleware/identityLogger.middleware";

// -----------------------------------------------------------------------------
// Flow 7 — Status Page Backend
// -----------------------------------------------------------------------------
import statusRouter from "./routes/status/status.router";

// -----------------------------------------------------------------------------
// Root Consumer API Router
// -----------------------------------------------------------------------------
import apiRouter from "./routes/consumer/index";

// -----------------------------------------------------------------------------
// Merchant API Router (NEW)
// -----------------------------------------------------------------------------
import merchantRouter from "./routes/merchant.routes";


// -----------------------------------------------------------------------------
// Flow 10 — Identity Session API (create / resolve / revoke)
// -----------------------------------------------------------------------------
import createSessionRoute from "./routes/identity/session/createSessionRoute";
import resolveSessionRoute from "./routes/identity/session/resolveSessionRoute";
import revokeSessionRoute from "./routes/identity/session/revokeSessionRoute";

// -----------------------------------------------------------------------------
// Error Middleware
// -----------------------------------------------------------------------------
import { errorMiddleware } from "./middleware/error.middleware";

// -----------------------------------------------------------------------------
// Load environment variables
// -----------------------------------------------------------------------------
dotenv.config();

// -----------------------------------------------------------------------------
// Initialise Express
// -----------------------------------------------------------------------------
const app = express();
const port = Number(process.env.PORT) || 4000;

// -----------------------------------------------------------------------------
// Global Middleware
// -----------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

/**
 * =============================================================================
 * Flow 12.2 — Correlation ID Generator
 * =============================================================================
 */
app.use((req, _res, next) => {
  req.correlationId = crypto.randomUUID();
  next();
});

/**
 * =============================================================================
 * Flow 11 — Unified Actor Pipeline Integration
 * =============================================================================
 */
app.use(actorPipeline);

/**
 * =============================================================================
 * Flow 12 — Identity Logger Middleware Integration
 * =============================================================================
 */
app.use(identityLoggerMiddleware);

// -----------------------------------------------------------------------------
// Root Diagnostic Route
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
// Flow 7 — Status + Consumer API + Merchant API
// -----------------------------------------------------------------------------
app.use("/api/session", statusRouter);
app.use("/api", apiRouter);
app.use("/api/merchant", merchantRouter);

/**
 * =============================================================================
 * Flow 10 — Identity Session API Route Integration
 * =============================================================================
 */
app.use("/identity/session/create", createSessionRoute);
app.use("/identity/session/resolve", resolveSessionRoute);
app.use("/identity/session/revoke", revokeSessionRoute);

// -----------------------------------------------------------------------------
// Error Middleware (must be last)
// -----------------------------------------------------------------------------
app.use(errorMiddleware);

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`HoloTap API running on port ${port}`);
});
