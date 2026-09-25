/**
 * ============================================================
 *  HoloTap — ID Utility (Browser-Safe)
 *  File: src/utils/id.js
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *  Provides deterministic ID generation for client-side flows.
 *
 *  Responsibilities:
 *  - Generate unique IDs for temporary client objects
 *  - Maintain stateless, modular architecture
 * ============================================================
 */

export function generateId() {
  return (
    "id-" +
    Math.random().toString(36).substring(2, 10) +
    "-" +
    Date.now().toString(36)
  );
}
