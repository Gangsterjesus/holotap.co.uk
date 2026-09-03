"use strict";
/**
 * =============================================================================
 * HOLOTAP API — SERVER ENTRYPOINT v2.4 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          server.ts
 * Date:          03 September 2026
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
 *   • Mount API route namespaces (Flow 7, Flow 10, Consumer API)
 *   • Provide root diagnostics endpoint
 *   • Start HTTP listener
 *
 * ENGINEERING NOTES:
 *   • Identity pipeline MUST run before any middleware that depends on req.actor
 *   • Correlation ID MUST be generated before identity logger
 *   • Identity logger MUST run after identity pipeline
 *   • Flow‑10 MUST mount before error middleware
 *   • Bound to 0.0.0.0 for LAN + Caddy reverse proxy compatibility
 * =============================================================================
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
// -----------------------------------------------------------------------------
// Identity Subsystem (Flow 11)
// -----------------------------------------------------------------------------
const actorPipeline_1 = require("./middleware/actorPipeline");
// -----------------------------------------------------------------------------
// Middleware Subsystem (Flow 12)
// -----------------------------------------------------------------------------
const identityLogger_middleware_1 = __importDefault(require("./middleware/identityLogger.middleware"));
// -----------------------------------------------------------------------------
// Flow 7 — Status Page Backend
// -----------------------------------------------------------------------------
const status_router_1 = __importDefault(require("./routes/status/status.router"));
// -----------------------------------------------------------------------------
// Root Consumer API Router
// -----------------------------------------------------------------------------
const index_1 = __importDefault(require("./routes/consumer/index"));
// -----------------------------------------------------------------------------
// Flow 10 — Identity Session API (create / resolve / revoke)
// -----------------------------------------------------------------------------
const createSessionRoute_1 = __importDefault(require("./routes/identity/session/createSessionRoute"));
const resolveSessionRoute_1 = __importDefault(require("./routes/identity/session/resolveSessionRoute"));
const revokeSessionRoute_1 = __importDefault(require("./routes/identity/session/revokeSessionRoute"));
// -----------------------------------------------------------------------------
// Error Middleware
// -----------------------------------------------------------------------------
const error_middleware_1 = require("./middleware/error.middleware");
// -----------------------------------------------------------------------------
// Load environment variables
// -----------------------------------------------------------------------------
dotenv_1.default.config();
// -----------------------------------------------------------------------------
// Initialise Express
// -----------------------------------------------------------------------------
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 4000;
// -----------------------------------------------------------------------------
// Global Middleware
// -----------------------------------------------------------------------------
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * =============================================================================
 * Flow 12.2 — Correlation ID Generator
 * =============================================================================
 */
app.use((req, _res, next) => {
    req.correlationId = crypto_1.default.randomUUID();
    next();
});
/**
 * =============================================================================
 * Flow 11 — Unified Actor Pipeline Integration
 * =============================================================================
 */
app.use(actorPipeline_1.actorPipeline);
/**
 * =============================================================================
 * Flow 12 — Identity Logger Middleware Integration
 * =============================================================================
 */
app.use(identityLogger_middleware_1.default);
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
// Flow 7 — Status + Consumer API
// -----------------------------------------------------------------------------
app.use("/api/session", status_router_1.default);
app.use("/api", index_1.default);
/**
 * =============================================================================
 * Flow 10 — Identity Session API Route Integration
 * =============================================================================
 * Subsystem: Identity Session API (Flow‑10)
 * Engineer: Raymond Newton — HoloTap Engineering Team (E5357171)
 *
 * SECTION: Overview
 *   Mounts the Flow‑10 Identity Session route surfaces into the Express runtime.
 *
 * SECTION: Routes
 *   • POST /identity/session/create   — Create identity session
 *   • POST /identity/session/resolve  — Resolve identity session
 *   • POST /identity/session/revoke   — Revoke identity session
 *
 * SECTION: Stability Notes
 *   • MUST mount before error middleware
 *   • MUST remain deterministic across all flows
 * =============================================================================
 */
app.use("/identity/session/create", createSessionRoute_1.default);
app.use("/identity/session/resolve", resolveSessionRoute_1.default);
app.use("/identity/session/revoke", revokeSessionRoute_1.default);
// -----------------------------------------------------------------------------
// Error Middleware (must be last)
// -----------------------------------------------------------------------------
app.use(error_middleware_1.errorMiddleware);
// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
app.listen(port, "0.0.0.0", () => {
    console.log(`HoloTap API running on port ${port}`);
});
