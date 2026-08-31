/**
 * =============================================================================
 * HOLOTAP API — SERVER ENTRYPOINT v2.3 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          server.ts
 * Date:          22 August 2026
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
 *   • Mount API route namespaces (Flow 7, Consumer API)
 *   • Provide root diagnostics endpoint
 *   • Start HTTP listener
 *
 * ENGINEERING NOTES:
 *   • Identity pipeline MUST run before any middleware that depends on req.actor
 *   • Correlation ID MUST be generated before identity logger
 *   • Identity logger MUST run after identity pipeline
 *   • Error middleware MUST be registered last
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
 * Description:
 *   Generates a unique correlation ID for every inbound request. Used by Flow 12
 *   Identity Logger, Flow 7 Status Page, and Flow 8 Payment Lifecycle.
 * =============================================================================
 */
app.use((req, _res, next) => {
  req.correlationId = crypto.randomUUID();
  next();
});

/**
 * =============================================================================
 * Flow 11 — Unified Actor Pipeline Integration (Middleware Registration)
 * =============================================================================
 * Subsystem: Identity Resolution Layer (Flow 11)
 * Engineer: Raymond Newton — HoloTap Engineering Team (E5357171)
 *
 * SECTION: Overview
 *   Registers the Unified Actor Pipeline as an Express middleware. This pipeline
 *   resolves raw identity envelopes (founder override, session identity, QR
 *   identity) into a deterministic UnifiedActor object. The resulting envelope
 *   is injected into req.actor for downstream flows.
 *
 * SECTION: Purpose
 *   • Consolidate identity sources into a single UnifiedActor envelope.
 *   • Ensure Flow 12 Identity Logger receives a stable identity object.
 *   • Provide deterministic identity propagation for Flow 7 and Flow 8.
 *
 * SECTION: Ordering Requirements
 *   • MUST run before Flow 12 Identity Logger.
 *   • MUST run before any middleware that depends on req.actor.
 *   • MUST run after correlation ID generation (Flow 12.2).
 *
 * SECTION: Stability Notes
 *   • actorPipeline is an Express middleware and MUST NOT be invoked manually.
 *   • Express will automatically supply (req, res, next).
 * =============================================================================
 */
app.use(actorPipeline);

/**
 * =============================================================================
 * Flow 12 — Identity Logger Middleware Integration
 * =============================================================================
 * Description:
 *   Logs identity envelopes, correlation IDs, and redacted metadata for all
 *   inbound requests. Provides observability for Flow 7, Flow 8, and hardening.
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
// Mount API Namespaces
// -----------------------------------------------------------------------------
app.use("/api/session", statusRouter);
app.use("/api", apiRouter);

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
