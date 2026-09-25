/**
 * ============================================================
 *  HoloTap — Creator Identity Management Page
 *  File: src/pages/dashboard/Identity.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Allows creators to manage identity information used for
 *    hologram badge generation. Includes display name, mobile
 *    number, verification status, and QR regeneration controls.
 *
 *  Subsystem:
 *    Flow 7B — Creator Identity → Badge Management
 *
 *  Notes:
 *    - Inline styles removed
 *    - Uses external CSS (identity.css)
 * ============================================================
 */

import "../../styles/identity.css";

export default function Identity() {
  return (
    <div className="identity-container">

      {/* HEADER */}
      <h1 className="identity-title">Identity Settings</h1>
      <p className="identity-subtitle">
        Manage your creator identity and hologram badge details.
      </p>

      {/* PROFILE DETAILS */}
      <div className="identity-section">
        <h2 className="identity-section-title">Profile Information</h2>

        <label className="identity-label">Display Name</label>
        <input
          className="identity-input"
          type="text"
          placeholder="Your public creator name"
        />

        <label className="identity-label">Mobile Number</label>
        <input
          className="identity-input"
          type="text"
          placeholder="+44 7000 000000"
        />

        <button className="identity-button">Save Changes</button>
      </div>

      {/* BADGE STATUS */}
      <div className="identity-section">
        <h2 className="identity-section-title">Badge Status</h2>
        <p className="identity-status-text">Verification: Pending</p>
        <p className="identity-status-text">Badge ID: HT-00000</p>
      </div>

      {/* QR REGENERATION */}
      <div className="identity-section">
        <h2 className="identity-section-title">Identity QR</h2>
        <p className="identity-status-text">
          Your identity QR is used to verify your hologram badge.
        </p>

        <button className="identity-button-secondary">
          Regenerate Identity QR
        </button>
      </div>

    </div>
  );
}
