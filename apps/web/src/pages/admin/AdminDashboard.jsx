/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 * AI: Microsoft Copilot (2026)
 * Version: 5.0.0
 *
 * Module: Admin Dashboard
 * FilePath: src/pages/admin/AdminDashboard.jsx
 * ISO:27001
 *
 * Purpose:
 *   ...
 *
 * Responsibilities:
 *   ...
 *
 * Scope:
 *   ...
 *
 * Security:
 *   - Authentication Required
 *   - Authorisation Required
 *   - Audit Logged
 *
 * Dependencies:
 *   - DashboardGrid
 *   - DashboardCard
 *   - PageHeader
 *
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";
import Button from "../../components/Button.jsx";
import { adminActions } from "./data/adminAction.js";

import {
  dashboardMetrics,
  onboardingMetrics,
} from "./data/adminMetrics.js";

import {
  operationalAlerts,
  platformHealth,
} from "./data/adminHealth.js";

export default function AdminDashboard() {
  return (
    <Layout
      title="Admin Dashboard"
      subtitle="Platform Operations & Monitoring"
    >
      <PageHeader
        title="Admin Dashboard"
        subtitle="System overview and operational metrics"
      />

      {/* Admin Actions */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Administrative Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          {adminActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant}
              onClick={() => {
                window.location.href = action.route;
              }}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Core Metrics */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Platform Metrics
        </h2>

        <DashboardGrid>
          {dashboardMetrics.map((metric) => (
            <DashboardCard
              key={metric.key}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
              severity={metric.severity}
            />
          ))}
        </DashboardGrid>
      </section>

      {/* Merchant Onboarding */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Merchant Onboarding
        </h2>

        <DashboardGrid>
          {onboardingMetrics.map((metric) => (
            <DashboardCard
              key={metric.key}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
              severity={metric.severity}
            />
          ))}
        </DashboardGrid>
      </section>

      {/* Platform Health */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Platform Health
        </h2>

        <DashboardGrid>
          {platformHealth.map((service) => (
            <DashboardCard
              key={service.key}
              title={service.title}
              value={service.status}
              trend={service.uptime}
              severity={service.severity}
            />
          ))}
        </DashboardGrid>
      </section>

      {/* Operational Alerts */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Operational Alerts
        </h2>

        <DashboardGrid>
          {operationalAlerts.map((alert) => (
            <DashboardCard
              key={alert.key}
              title={alert.title}
              value={alert.value}
              severity={alert.severity}
            />
          ))}
        </DashboardGrid>
      </section>
    </Layout>
  );
}