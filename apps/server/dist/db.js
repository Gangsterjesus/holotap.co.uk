"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auditLogs = exports.orgUsers = exports.orgTenants = exports.qrTokens = exports.identitySessions = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
// ---------------------------------------------------------------------------
// Flow‑10 — Identity Sessions
// ---------------------------------------------------------------------------
exports.identitySessions = {
    create: (data) => exports.prisma.identity_sessions.create({ data }),
    findOne: (where) => exports.prisma.identity_sessions.findUnique({ where }),
    findMany: (where = {}) => exports.prisma.identity_sessions.findMany({ where }),
    update: (where, data) => exports.prisma.identity_sessions.updateMany({ where, data }),
    deleteExpired: () => exports.prisma.identity_sessions.deleteMany({
        where: { expires_at: { lt: new Date() } }
    })
};
// ---------------------------------------------------------------------------
// Flow‑4 / Flow‑11 — QR Tokens
// ---------------------------------------------------------------------------
exports.qrTokens = {
    insert: (data) => exports.prisma.qr_codes.create({ data }),
    findOne: (where) => exports.prisma.qr_codes.findFirst({ where }),
    updateOne: (where, data) => exports.prisma.qr_codes.updateMany({ where, data })
};
// ---------------------------------------------------------------------------
// Flow‑8 — Org Tenants / Org Users
// ---------------------------------------------------------------------------
exports.orgTenants = {
    create: (data) => exports.prisma.org_tenants.create({ data }),
    findOne: (where) => exports.prisma.org_tenants.findFirst({ where }),
    findMany: (where = {}) => exports.prisma.org_tenants.findMany({ where })
};
exports.orgUsers = {
    create: (data) => exports.prisma.org_users.create({ data }),
    findOne: (where) => exports.prisma.org_users.findFirst({ where }),
    findMany: (where = {}) => exports.prisma.org_users.findMany({ where })
};
exports.auditLogs = {
    insert: (data) => exports.prisma.audit_logs.create({ data }),
    findMany: (where = {}) => exports.prisma.audit_logs.findMany({ where })
};
// ---------------------------------------------------------------------------
// Unified DAL Adapter
// ---------------------------------------------------------------------------
exports.db = {
    auditLogs: exports.auditLogs,
    identitySessions: exports.identitySessions,
    qrTokens: exports.qrTokens,
    orgTenants: exports.orgTenants,
    orgUsers: exports.orgUsers
};
