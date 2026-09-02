/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Test Infrastructure
  Engineer: R. Newton (E5357171)
  File: jest.config.cjs
  Subsystem: Backend Test Harness — Flow‑Core
  Date: 02 Sep 2026

  SECTION: Overview
    Jest configuration for TypeScript‑based backend testing. Integrates ts‑jest
    to ensure deterministic test execution across all server modules.

  SECTION: Purpose
    • Provide a stable test environment for ledger, identity, and routing layers.
    • Ensure TypeScript transforms remain consistent with server runtime.
    • Maintain compatibility with Flow‑9, Flow‑11, and Flow‑Core subsystems.

  SECTION: Stability Notes
    • Transform presets must remain deterministic.
    • Test environment must remain Node‑based for backend parity.
  ────────────────────────────────────────────────────────────────────────────────
*/

const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
