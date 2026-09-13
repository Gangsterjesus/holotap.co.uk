/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: db.ts
 * Flow: 5 → Modernised for Flow‑10 / Flow‑11 / Flow‑12 / Flow‑9.6
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Centralised Prisma adapter for HoloTapServer. Modernised to expose
 *   Flow‑10 identity sessions, Flow‑8 org models, Flow‑4 QR tokens, and
 *   deterministic repository interfaces.
 *
 * Notes:
 *   • Replaces legacy Flow‑7 sessions
 *   • Audit logs now handled by Flow‑9.6 ledger engine
 *   • Fully TypeScript
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Flow‑10 — Identity Sessions
// ---------------------------------------------------------------------------

export const identitySessions = {
  create: (data: any) =>
    prisma.identity_sessions.create({ data }),

  findOne: (where: any) =>
    prisma.identity_sessions.findUnique({ where }),

  findMany: (where: any = {}) =>
    prisma.identity_sessions.findMany({ where }),

  update: (where: any, data: any) =>
    prisma.identity_sessions.updateMany({ where, data }),

  deleteExpired: () =>
    prisma.identity_sessions.deleteMany({
      where: { expires_at: { lt: new Date() } }
    })
};

// ---------------------------------------------------------------------------
// Flow‑4 / Flow‑11 — QR Tokens
// ---------------------------------------------------------------------------

export const qrTokens = {
  insert: (data: any) =>
    prisma.qr_codes.create({ data }),

  findOne: (where: any) =>
    prisma.qr_codes.findFirst({ where }),

  updateOne: (where: any, data: any) =>
    prisma.qr_codes.updateMany({ where, data })
};

// ---------------------------------------------------------------------------
// Flow‑8 — Org Tenants / Org Users
// ---------------------------------------------------------------------------

export const orgTenants = {
  create: (data: any) =>
    prisma.org_tenants.create({ data }),

  findOne: (where: any) =>
    prisma.org_tenants.findFirst({ where }),

  findMany: (where: any = {}) =>
    prisma.org_tenants.findMany({ where })
};

export const orgUsers = {
  create: (data: any) =>
    prisma.org_users.create({ data }),

  findOne: (where: any) =>
    prisma.org_users.findFirst({ where }),

  findMany: (where: any = {}) =>
    prisma.org_users.findMany({ where })
};

export const auditLogs = {
  insert: (data: any) =>
    prisma.audit_logs.create({ data }),

  findMany: (where: any = {}) =>
    prisma.audit_logs.findMany({ where })
};



// ---------------------------------------------------------------------------
// Unified DAL Adapter
// ---------------------------------------------------------------------------

export const db = {
  auditLogs,
  identitySessions,
  qrTokens,
  orgTenants,
  orgUsers
};
