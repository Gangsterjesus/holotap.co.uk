/**
 * ============================================================
 *  HoloTap — Creator Settings Page
 *  File: src/pages/dashboard/Settings.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides creator‑level configuration options including account
 *  preferences, notification settings, security controls, and
 *  session management. Part of the creator dashboard suite.
 * ============================================================
 */

export default function Settings() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Settings</h1>
      <p style={styles.subtitle}>
        Manage your account preferences and security options.
      </p>

      {/* ============================
          ACCOUNT PREFERENCES SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Account Preferences</h2>

        <label style={styles.label}>Email Address</label>
        <input
          style={styles.input}
          type="email"
          placeholder="you@example.com"
        />

        <label style={styles.label}>Preferred Currency</label>
        <select style={styles.input}>
          <option>GBP (£)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
        </select>

        <button style={styles.button}>Save Preferences</button>
      </div>

      {/* ============================
          NOTIFICATION SETTINGS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Notifications</h2>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" /> Payment Alerts
        </label>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" /> Badge Scan Alerts
        </label>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" /> Fraud Detection Alerts
        </label>

        <button style={styles.button}>Update Notifications</button>
      </div>

      {/* ============================
          SECURITY SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Security</h2>

        <label style={styles.label}>New Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter new password"
        />

        <button style={styles.buttonSecondary}>Change Password</button>
      </div>

      {/* ============================
          SESSION MANAGEMENT SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Session Management</h2>
        <p style={styles.statusText}>
          You are currently logged in on 1 device.
        </p>

        <button style={styles.logoutButton}>Log Out</button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // Header
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },

  // Section wrapper
  section: {
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  // Form fields
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  // Checkbox labels
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
  },

  // Buttons
  button: {
    padding: "14px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonSecondary: {
    padding: "14px",
    backgroundColor: "#eee",
    color: "#111",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "14px",
    backgroundColor: "#c62828",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  // Status text
  statusText: {
    fontSize: "16px",
    color: "#444",
  },
};
