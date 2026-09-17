/**
 * ============================================================
 *  HoloTap — Button Component
 *  File: src/components/Button.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable button component with consistent styling
 *  across the HoloTap web application.
 *
 *  Responsibilities:
 *  - Render primary, secondary, and ghost button variants
 *  - Support click actions
 *  - Support disabled state
 * ============================================================
 */

const base =
  "px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 focus:outline-none";

const variants = {
  primary:
    "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:-translate-y-0.5 shadow-lg",

  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 shadow-sm",

  ghost:
    "border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950",
};
