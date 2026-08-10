/**
 * =================================================================================================
 *  HOLOTAP — BACKEND SERVER ENTRY POINT (EXPRESS)
 *  File: server/index.js
 *  Date: 11/08/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Unified Backend Bootstrap — Identity, Payments, Registry
 *
 *  Revision:
 *    v2.0 — Added Flow‑9 Registry Binding Route Integration
 *
 *  Flows:
 *    • Flow‑4 — QR Activation
 *    • Flow‑5 — Payments (Legacy)
 *    • Flow‑6 — Identity Session
 *    • Flow‑7 — Identity Verification
 *    • Flow‑8 — Payment Lifecycle
 *    • Flow‑9 — Registry Binding
 *
 *  Overview:
 *    Primary Express server bootstrap for the HoloTap backend. Registers all API routes, configures
 *    JSON middleware, and exposes deterministic REST endpoints for identity, payments, and registry
 *    binding. This module defines the backend execution surface for the unified web/mobile stack.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import express from "express";
import cors from "cors";

// Route imports
import registryRoutes from "./routes/registry.js";
// (Add other routes here as they are built)

const app = express();

/**
 * -----------------------------------------------------------------------------------------------
 *  Middleware: JSON Parsing
 *  Description:
 *    Ensures all incoming requests are parsed as JSON. Required for deterministic API behaviour
 *    across all flows (identity, payments, registry).
 * -----------------------------------------------------------------------------------------------
 */
app.use(express.json());

/**
 * -----------------------------------------------------------------------------------------------
 *  Middleware: CORS
 *  Description:
 *    Allows browser clients (web-ui, mobile-ui) to communicate with the backend safely.
 * -----------------------------------------------------------------------------------------------
 */
app.use(cors());

/**
 * -----------------------------------------------------------------------------------------------
 *  Route Registration
 *  Description:
 *    Registers all backend API routes. Each route group corresponds to a flow in the HoloTap
 *    architecture. Flow‑9 registry routes are now fully integrated.
 * -----------------------------------------------------------------------------------------------
 */
app.use("/api/registry", registryRoutes);

// Placeholder for future routes:
// app.use("/api/payment", paymentRoutes);
// app.use("/api/session", sessionRoutes);
// app.use("/api/qr", qrRoutes);

/**
 * -----------------------------------------------------------------------------------------------
 *  Server Listener
 *  Description:
 *    Starts the backend server. In production, this will be managed by PM2, Docker, or cloud
 *    orchestration. For development, this runs on port 3001.
 * -----------------------------------------------------------------------------------------------
 */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`HoloTap backend running on port ${PORT}`);
});
