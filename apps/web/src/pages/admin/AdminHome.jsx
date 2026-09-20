/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 * Version: 5.0.0
 *
 * Module: Admin Portal
 * File: AdminHome.jsx
 *
 * Purpose:
 *   Administrative entry point providing access to
 *   platform operations, governance, monitoring,
 *   merchant management and support workflows.
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import Button from "../../components/Button.jsx";

import { adminActions } from "./data/adminAction.js";

export default function AdminHome() {
  const navigateTo = (route) => {
    window.location.href = route;
  };

  return (
    <Layout>
      <PageHeader
        title="Admin Portal"
        subtitle="Access operational, governance and platform management tools"
      />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Administrative Tools
        </h2>

        <div className="flex flex-wrap gap-4">
          {adminActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant ?? "primary"}
              onClick={() => navigateTo(action.route)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </section>
    </Layout>
  );
}