/**
 * ============================================================
 *  HoloTap — Creator Payments Page
 *  File: src/pages/dashboard/Payments.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays all payment activity associated with the creator’s
 *    HoloTap badge. Includes recent transactions, payout history,
 *    and settlement status. This page is part of the creator
 *    dashboard suite.
 *
 *  Subsystem:
 *    Flow 8 — Payments → Settlement Overview
 *
 *  Notes:
 *    - Inline styles removed
 *    - Uses external CSS (payments.css)
 * ============================================================
 */

import "../../styles/payments.css";

export default function Payments() {
  return (
    <div className="payments-container">

      {/* HEADER */}
      <h1 className="payments-title">Payments</h1>
      <p className="payments-subtitle">
        Your recent transactions and payout history.
      </p>

      {/* SUMMARY */}
      <div className="payments-summary">
        <div className="payments-card">
          <h2>Total Earnings</h2>
          <p>£0.00</p>
        </div>

        <div className="payments-card">
          <h2>Pending Payouts</h2>
          <p>£0.00</p>
        </div>

        <div className="payments-card">
          <h2>Completed Transactions</h2>
          <p>0</p>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="payments-transactions">
        <h2>Recent Transactions</h2>
        <p className="payments-placeholder">No transactions yet.</p>
      </div>

    </div>
  );
}
