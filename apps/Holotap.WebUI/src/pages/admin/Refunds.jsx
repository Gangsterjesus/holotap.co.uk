/**
 * ============================================================
 *  HoloTap — Refunds & Void Operations (Admin)
 *  File: src/pages/admin/Refunds.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Provides administrators with tools to process refunds and void
 *    transactions. Includes search, transaction lookup, and action
 *    controls. Restricted to admin role only.
 *
 *  Responsibilities:
 *    - Search for transactions
 *    - Display transaction details
 *    - Provide refund and void actions
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";



/* ============================
   PAGE
   ============================ */

export default function Refunds() {
  return (
    <Layout>
      <PageHeader
        title="Refunds & Voids"
        subtitle="Search transactions and perform refund or void operations"
      />

      {/* Search Section */}
      <div className="max-w-lg mx-auto flex flex-col gap-6 mb-10">
        <h2 className="text-xl font-semibold">Find Transaction</h2>

        <label className="font-medium">Transaction ID</label>

        <Input
          placeholder="Enter transaction ID (e.g., TX-49302)"
          type="text"
        />

        <Button variant="primary">Search</Button>
      </div>

      {/* Transaction Details */}
      <div className="max-w-lg mx-auto flex flex-col gap-4 mb-10">
        <h2 className="text-xl font-semibold">Transaction Details</h2>
        <p className="text-gray-600">No transaction selected.</p>
      </div>

      {/* Action Buttons */}
      <div className="max-w-lg mx-auto flex flex-col gap-4 mb-10">
        <h2 className="text-xl font-semibold">Actions</h2>

        <Button variant="success">Process Refund</Button>
        <Button variant="danger">Void Transaction</Button>
      </div>
    </Layout>
  );
}
