/**
 * =============================================================================
 * HOLOTAP API — SERVER ENTRYPOINT v2.4 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          server.ts
 * Date:          17 August 2026
 * =============================================================================
 * PURPOSE:
 * Bootstraps the HoloTap backend API.
 *
 * Responsibilities:
 *   • Load environment variables
 *   • Initialise Express server
 *   • Register global middleware
 *   • Mount API route namespaces
 *   • Provide root diagnostics endpoint
 *   • Start HTTP listener
 *
 * ENGINEERING NOTES:
 *   • CORS enabled for mobile + web clients
 *   • JSON body parsing enabled
 *   • Error middleware registered last
 *   • Bound to 0.0.0.0 for Expo + mobile LAN access
 * =============================================================================
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Root router (routes/index.ts)
import apiRouter from "./routes/consumer/index";

// Error middleware (TS version only)
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

// -----------------------------------------------------------------------------
// Root Diagnostic Route
// -----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    root: "HoloTap API root",
    use: "/api",
    docs: "/api/docs",
    status: "online",
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
