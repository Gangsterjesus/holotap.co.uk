/**
 * ============================================================
 * HoloTapServer — Consumer Service
 * Flow 7 / Flow 11 — Consumer Management Service
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 5.0.0
 * Date: 15 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * Provides deterministic in-memory consumer registration and
 * lookup functionality for development, testing, and Flow 7
 * session lifecycle integration.
 *
 * RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Generate consumer identifiers
 * • Create consumer records
 * • Maintain temporary consumer registry
 * • Provide deterministic consumer storage
 *
 * FLOW INTEGRATION
 * ------------------------------------------------------------
 * • Flow 7  — Session Lifecycle
 * • Flow 9  — Consumer Identity
 * • Flow 11 — Unified Actor Pipeline
 *
 * ENGINEERING NOTES
 * ------------------------------------------------------------
 * • In-memory implementation only.
 * • Data is lost on application restart.
 * • Intended for development and prototype workflows.
 * • Future production versions should persist via Prisma.
 *
 * CHANGE LOG
 * ------------------------------------------------------------
 * v5.0.0
 * • Converted from JavaScript to TypeScript.
 * • Added generic Map typing.
 * • Added typed consumer payload handling.
 * • Standardised engineering documentation.
 *
 * ============================================================
 */
import { generateId } from "../utils/id";

interface Consumer {
  id: string;
  [key: string]: unknown;
}

const consumers = new Map<string, Consumer>();

export const consumerService = {
  createConsumer(data: Record<string, unknown>): Consumer {
    const id = generateId();

    const consumer: Consumer = {
      id,
      ...data,
    };

    consumers.set(id, consumer);

    return consumer;
  },
};