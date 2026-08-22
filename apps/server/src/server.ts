/**
 * =============================================================================
 * HOLOTAP API — SERVER ENTRYPOINT v2.5 (Engineering Edition)
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
 *   • Register identity logger (Flow 12)
 *   • Register global middleware
 *   • Mount API route namespaces
 *   • Provide root diagnostics endpoint
 *   • Start HTTP listener
 *
 * ENGINEERING NOTES:
 *   • Identity pipeline MUST run before any middleware that depends on req.actor
 *   • Identity logger MUST run after identity pipeline
 *   • Error middleware MUST be registered last
 *   • Bound to 0.0.0.0 for LAN + Caddy reverse proxy compatibility
 * =============================================================================
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// -----------------------------------------------------------------------------
// Identity Subsystem (Flow 11)
// -----------------------------------------------------------------------------
import { actorPipeline } from "./identity/actorPipeline";

// -----------------------------------------------------------------------------
// Middleware Subsystem (Flow 12)
// -----------------------------------------------------------------------------
import identityLoggerMiddleware from "./middleware/identityLogger.middleware";

// -----------------------------------------------------------------------------
// Root router (routes/index.ts)
// -----------------------------------------------------------------------------
import apiRouter from "./routes/consumer/index";

// -----------------------------------------------------------------------------
// Error middleware (TS version only)
// -----------------------------------------------------------------------------
import { errorMiddleware } from "./middleware/error.middleware";

// Extend Express's request type for the identity envelope injected below.
declare global {
  namespace Express {
    interface Request {
      actor?: ReturnType<typeof actorPipeline>;
    }
  }
}

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
 * Flow 11 — Unified Actor Pipeline Integration
 * =============================================================================
 * Description:
 *   Injects the UnifiedActor identity envelope into req.actor for all inbound
 *   requests. This MUST run before any middleware that depends on identity,
 *   including Flow 12 Identity Logger and all route handlers.
 * =============================================================================
 */
app.use((req, _res, next) => {
  const request = req as typeof req & {
    founderOverride?: unknown;
    sessionIdentity?: unknown;
    qrIdentity?: unknown;
  };

  req.actor = actorPipeline({
    founder: request.founderOverride as any,
    session: request.sessionIdentity as any,
    qr: request.qrIdentity as any,
  });
  next();
});

/**
 * =============================================================================
 * Flow 12 — Identity Logger Middleware Integration
 * =============================================================================
 * Description:
 *   Logs identity envelopes, correlation IDs, and redacted metadata for all
 *   inbound requests. Provides observability for Flow 7 (Status), Flow 8
 *   (Payment Lifecycle), and backend hardening modules.
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
