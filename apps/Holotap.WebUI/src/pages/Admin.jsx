/**
 * ============================================================
 *  HoloTap — Admin Operations Entry
 *  File: src/pages/admin/Admin.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Entry point for admin‑level operations.
 *    Provides restricted‑access notice and directs users to tools.
 *
 *  Responsibilities:
 *    - Display restricted access message
 *    - Provide consistent v2 layout + header
 * ============================================================
 */
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";



export default function Admin() {
  return (
    <Layout title="Admin Operations" subtitle="Restricted access area">
      <PageHeader
        title="Admin Operations"
        subtitle="Restricted — administrator access required"
        actions={null}
      />

      <div className="mt-6 text-gray-700 text-lg">
        <p>This section contains system‑level tools for HoloTap administrators.</p>
      </div>
    </Layout>
  );
}
