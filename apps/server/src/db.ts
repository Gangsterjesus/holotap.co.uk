/**
 * HoloTapServer
 * Data Access Layer — Prisma-backed Repository Adapter
 * Flow 5 — Deterministic DB Abstraction
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Centralised, deterministic data access adapter for HoloTapServer.
 * Provides stable repository interfaces over PrismaClient, ensuring
 * consistent, predictable behaviour across all server flows including
 * Flow 6 (Identity Layer) and Flow 7 (Session Management).
 *
 * Descriptors:
 * Module Type: Core Infrastructure Component
 * Layer: Flow 5 — Data Access Layer (DAL)
 * Stability Level: Critical — Must remain deterministic across releases
 * External Dependencies: PrismaClient (auto-generated), PostgreSQL (holotap schema)
 * Internal Contracts:
 *   - Provides repository interfaces consumed by Flow 6 (Identity Layer)
 *   - Provides QR-token persistence for Flow 4 and Flow 5
 *   - Provides audit logging for all flows requiring traceability
 *   - Provides session lifecycle management for Flow 7
 *
 * Performance Characteristics:
 *   - All operations are single-query, low-latency, and index-friendly
 *   - No multi-join or heavy aggregation inside this layer
 *   - DAL guarantees minimal overhead and predictable execution paths
 *
 * Safety & Determinism:
 *   - No schema mutations, migrations, or destructive operations
 *   - No dynamic SQL; all queries are Prisma-generated and typed
 *   - No direct database access outside this adapter
 *
 * Architectural Guarantees:
 *   - DAL remains stable even if domain logic evolves
 *   - Repository naming and signatures remain invariant
 *   - Flow-driven architecture ensures forward compatibility
 */



// Runtime-safe PrismaClient loader (works even when TS cannot see generated types)




const { PrismaClient } = require("@prisma/client") as {
  PrismaClient: new () => any;
};

export const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Flow 5 — Audit Logs
// ---------------------------------------------------------------------------

async function insertAuditLog(event: any) {
  return prisma.audit_logs.create({
    data: {
      actor_id: event.actor_id ?? null,
      actor_type: event.actor_type ?? null,
      action: event.action,
      metadata: event.metadata ?? null,
    },
  });
}

// ---------------------------------------------------------------------------
// Flow 5 — QR Tokens
// ---------------------------------------------------------------------------

async function insertQrCode(data: any) {
  return prisma.qr_codes.create({ data });
}

async function findQrCode(where: any) {
  return prisma.qr_codes.findFirst({ where });
}

async function updateQrCode(where: any, update: any) {
  return prisma.qr_codes.updateMany({
    where,
    data: update,
  });
}

// ---------------------------------------------------------------------------
// Flow 7 — Sessions (Aligned to Prisma Schema)
// ---------------------------------------------------------------------------

async function createSession(data: any) {
  return prisma.sessions.create({
    data: {
      actor_id: data.actor_id,
      role: data.role,
      state: data.state,
      metadata: data.metadata ?? null,
      expires_at: data.expires_at ?? null,
    },
  });
}

async function findSession(where: any) {
  return prisma.sessions.findFirst({ where });
}

async function invalidateSession(where: any) {
  return prisma.sessions.updateMany({
    where,
    data: { expires_at: new Date() },
  });
}

// ---------------------------------------------------------------------------
// Flow 8 — Org Access (org_tenants, org_users)
// ---------------------------------------------------------------------------

// org_tenants ---------------------------------------------------------------

async function createTenant(data: any) {
  return prisma.org_tenants.create({ data });
}

async function findTenant(where: any) {
  return prisma.org_tenants.findFirst({ where });
}

async function listTenants(where: any = {}) {
  return prisma.org_tenants.findMany({ where });
}

// org_users -----------------------------------------------------------------

async function createOrgUser(data: any) {
  return prisma.org_users.create({ data });
}

async function findOrgUser(where: any) {
  return prisma.org_users.findFirst({ where });
}

async function listOrgUsers(where: any = {}) {
  return prisma.org_users.findMany({ where });
}

// ---------------------------------------------------------------------------
// Unified DAL Adapter (Flows 5, 7, 8)
// ---------------------------------------------------------------------------

export const db = {
  auditLogs: {
    insert: insertAuditLog,
  },

  qrTokens: {
    insert: insertQrCode,
    findOne: findQrCode,
    updateOne: updateQrCode,
  },

  sessions: {
    create: createSession,
    findOne: findSession,
    invalidate: invalidateSession,
  },

  orgTenants: {
    create: createTenant,
    findOne: findTenant,
    findMany: listTenants,
  },

  orgUsers: {
    create: createOrgUser,
    findOne: findOrgUser,
    findMany: listOrgUsers,
  },
};