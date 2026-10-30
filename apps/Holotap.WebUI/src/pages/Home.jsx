/**
 * ============================================================
 *  HoloTap — Public Landing Page
 *  File: src/pages/public/Home.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v5.0.0 HERO
 *  Date: 24 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *    Public entry point for the HoloTap QR payment platform.
 *
 *  Module Responsibilities:
 *    - Present HoloTap branding
 *    - Promote QR payment capabilities
 *    - Introduce merchant onboarding
 *    - Explain customer payment flow
 *    - Surface operational platform status
 * ============================================================
 */

import { Link } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/home.css";

export default function Home() {
  return (
    <Layout>
      <div className="home-container">

        <PageHeader
          title="HOLOTAP"
          subtitle="Secure QR Payments For Businesses, Merchants And Modern Organisations"
          titleClassName="text-cyan-400 text-4xl font-bold"
          subtitleClassName="text-slate-300 text-lg"
        />

        {/* ============================================================
            HERO
            ============================================================ */}

        <section className="home-hero">

          <div className="home-logo-wrapper">
            <img
              src="/Holotap-Logo.png"
              alt="HoloTap logo"
            />
          </div>

          <h2 className="home-title">
            Secure Every Scan.
          </h2>

          <p className="home-tagline">
            Generate QR payment codes, accept secure
            customer payments, verify transactions,
            and manage your organisation through the
            HoloTap merchant platform.
          </p>

          <div className="home-actions">

            <Link
              to="/onboarding"
              className="btn-primary"
            >
              Get Started
            </Link>

            <Link
              to="/scan"
              className="btn-secondary"
            >
              Scan QR
            </Link>

          </div>

        </section>

        {/* TRUST BAR */}

        <section className="home-trust">

          <div className="home-trust-item">
            QR Payments
          </div>

          <div className="home-trust-item">
            Merchant Dashboard
          </div>

          <div className="home-trust-item">
            Identity Verification
          </div>

          <div className="home-trust-item">
            Settlement Tracking
          </div>

        </section>

        {/* FEATURES */}

        <section className="home-features">

          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3 className="feature-title">
              Merchant Management
            </h3>

            <p className="feature-text">
              Create organisations, manage merchant
              accounts, and operate securely through
              the HoloTap platform.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📱
            </div>

            <h3 className="feature-title">
              QR Payments
            </h3>

            <p className="feature-text">
              Generate payment QR codes and accept
              secure customer payments in real time.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              💳
            </div>

            <h3 className="feature-title">
              Payment Security
            </h3>

            <p className="feature-text">
              Protect merchants and customers through
              identity verification, secure payment
              execution, and comprehensive audit
              logging.
            </p>

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="home-section">

          <h2 className="feature-title">
            How HoloTap Works
          </h2>

          <p className="home-description">
            A merchant generates a payment QR code.
            A customer scans the code. The merchant
            provides the bill. The customer reviews
            and pays. HoloTap verifies, records and
            tracks the transaction in real time.
          </p>

        </section>

        {/* PLATFORM STATUS */}

        <section className="feature-card">

          <h3 className="feature-title">
            Platform Status
          </h3>

          <p className="feature-text">
            Payment Services: Operational
          </p>

          <p className="feature-text">
            Merchant Platform: Operational
          </p>

          <p className="feature-text">
            Identity Services: Operational
          </p>

          <p className="feature-text">
            QR Infrastructure: Active
          </p>

        </section>

        {/* FINAL CTA */}

        <section className="home-section">

          <h2 className="feature-title">
            Ready To Accept QR Payments?
          </h2>

          <div className="home-actions">

            <Link
              to="/onboarding"
              className="btn-primary"
            >
              Get Started
            </Link>

          </div>

        </section>

      </div>
    </Layout>
  );
}