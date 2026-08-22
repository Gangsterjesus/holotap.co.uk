"use strict";
/**
 * HoloTapServer
 * Route Module — Admin Operations
 * Flow 9 — Permission Enforcement Layer
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Provides admin-only endpoints protected by Flow 9 permission guards.
 * This route demonstrates the full enforcement chain:
 *
 *   requireSession      → Flow 7 (Session must exist)
 *   requireOrgUser      → Flow 8 (Actor must belong to an organisation)
 *   requireTenant       → Flow 8 (Tenant context must be resolved)
 *   requireRole('admin') → Flow 9 (Actor must be admin)
 *   requirePermission('manage_users') → Flow 9 (Actor must have permission)
 *
 * Guarantees:
 * - No destructive operations
 * - No schema mutations
 * - Pure route logic only
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const permissions_1 = require("../middleware/permissions");
exports.adminRoute = (0, express_1.Router)();
/**
 * GET /admin/users
 *
 * Protected admin endpoint requiring:
 * - Active session
 * - Valid org user
 * - Tenant context
 * - Admin role
 * - manage_users permission
 *
 * This is the canonical example of Flow 9 enforcement.
 */
exports.adminRoute.get('/users', permissions_1.requireSession, permissions_1.requireOrgUser, permissions_1.requireTenant, (0, permissions_1.requireRole)('admin'), (0, permissions_1.requirePermission)('manage_users'), async (req, res) => {
    res.json({ ok: true, users: [] });
});
