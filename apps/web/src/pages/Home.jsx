/**
 * ============================================================
 *  HoloTap — Public Landing Page
 *  File: src/pages/public/Home.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v5 — Landing Experience System
 *  Date: 11 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *    Public entry point for the HoloTap platform,
 *    introducing Identity, QR Verification,
 *    and Digital Trust Infrastructure.
 *
 *  Module Responsibilities:
 *    - Present HoloTap branding
 *    - Explain platform capabilities
 *    - Route users to onboarding
 *    - Surface trust indicators
 *    - Promote identity verification services
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
  subtitle="Secure Digital Trust Infrastructure For Identity Verification, QR Security, Access Control And Trusted Organisations"
  titleClassName="text-cyan-400 text-4xl font-bold"
  subtitleClassName="text-slate-300 text-lg"
/>
     {/* ============================================================

HERO

Badge should be centered andremain visually centred on the web page.

Engineer: Raymond Newton (E5357171)

============================================================ */}
<section className="text-center">
  <div className="flex justify-center mb-8">
    <img
      src="/icon.png"
      alt="HoloTap Icon"
      className="w-24 h-24"
    />
  </div>
          <h2 className="home-title">
            Secure Every Scan.
          </h2>

          <p className="home-tagline">
            Identity verification, QR security,
            access control, and trusted digital
            infrastructure for organisations,
            venues, operators, and modern businesses.
          </p>

          <div className="home-actions">
            <Link
              to="/onboarding"
              className="btn-primary"
            >
              Get Started
            </Link>

            <Link
              to="/verify"
              className="btn-secondary"
            >
              Verify Badge
            </Link>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="home-trust">
          <div className="home-trust-item">
            QR Identity
          </div>

          <div className="home-trust-item">
            Badge Verification
          </div>

          <div className="home-trust-item">
            Audit Logging
          </div>

          <div className="home-trust-item">
            Access Control
          </div>
        </section>

        {/* FEATURES */}
        <section className="home-features">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>

            <h3 className="feature-title">
              Digital Identity
            </h3>

            <p className="feature-text">
              Create secure digital identities
              for people, visitors, staff,
              merchants, and organisations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>

            <h3 className="feature-title">
              QR Verification
            </h3>

            <p className="feature-text">
              Validate identities instantly
              using trusted QR workflows and
              cryptographically linked records.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3 className="feature-title">
              Access Control
            </h3>

            <p className="feature-text">
              Secure facilities, events,
              operations, and trusted
              organisation environments.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="home-section">
          <h2 className="feature-title">
            How HoloTap Works
          </h2>

          <p className="home-description">
            Create an identity, issue a badge,
            scan the QR code, and verify trust
            in real time across the HoloTap
            ecosystem.
          </p>
        </section>

        {/* PLATFORM STATUS */}
        <section className="feature-card">
          <h3 className="feature-title">
            Platform Status
          </h3>

          <p className="feature-text">
            Identity Verification Services:
            Operational
          </p>

          <p className="feature-text">
            QR Infrastructure:
            Operational
          </p>

          <p className="feature-text">
            Trust Services:
            Active
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="home-section">
          <h2 className="feature-title">
            Ready To Secure Every Scan?
          </h2>

          <div className="home-actions">
            <Link
              to="/onboarding"
              className="btn-primary"
            >
              Start Onboarding
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}