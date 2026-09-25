/**
 * ============================================================
 *  HoloTap Engineering — HERO Merchant Dashboard
 *  File: src/pages/merchant/MerchantDashboard.jsx
 *  Layer: web-ui
 *  Version: HERO v5.0.0
 *  Engineer ID: E5357171
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  SECURITY CLASSIFICATION:
 *    Merchant Business Data
 *
 *  Purpose:
 *    Provides the authenticated merchant dashboard presentation
 *    surface within the HoloTap WebUI.
 *
 *  Responsibilities:
 *    - Present the merchant dashboard shell
 *    - Reserve surfaces for merchant operational information
 *    - Avoid fabricated financial or transaction information
 *    - Fail safely while backend integration is unavailable
 *    - Minimise disclosure of merchant-sensitive information
 *
 *  HERO Security Principles:
 *    - Backend remains authoritative
 *    - No client-side authorization assumptions
 *    - No hard-coded production financial data
 *    - No fabricated merchant metrics
 *    - Minimal information disclosure
 *    - Fail-safe rendering
 *
 *  IMPORTANT:
 *    The backend MUST independently enforce:
 *      - Authentication
 *      - Merchant authorization
 *      - Organisation / tenant isolation
 *      - Financial-data integrity
 *      - Audit and security logging
 *
 *    Merchant metrics MUST NOT be populated until an
 *    authoritative backend API contract has been established.
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

/**
 * ============================================================
 *  Element: MerchantDashboard
 *  Version: HERO v5.0.0
 *  Date: 25 September 2026
 *  Author: Raymond Newton — E5357171
 *
 *  Description:
 *    Primary merchant dashboard presentation component.
 *
 *    This component intentionally contains no merchant API
 *    dependency until the authoritative server-side merchant
 *    dashboard contract is established.
 * ============================================================
 */

export default function MerchantDashboard() {
  return (
    <Layout
      title="Merchant Dashboard"
      subtitle="Business overview and payment activity"
    >
      {/*
       * ========================================================
       * Element: Merchant Dashboard Header
       * Version: HERO v5.0.0
       * Date: 25 September 2026
       * Author: Raymond Newton — E5357171
       *
       * Description:
       * Provides the merchant dashboard page heading and context.
       * ========================================================
       */}
      <PageHeader
        title="Merchant Dashboard"
        subtitle="Business overview and payment activity"
        actions={null}
      />

      {/*
       * ========================================================
       * Element: Integration Status
       * Version: HERO v5.0.0
       * Date: 25 September 2026
       * Author: Raymond Newton — E5357171
       *
       * Description:
       * Fail-safe status surface displayed while the
       * authoritative merchant API remains unwired.
       * ========================================================
       */}
      <DashboardCard title="Merchant Dashboard">
        <p
          className="text-gray-700"
          role="status"
          aria-live="polite"
        >
          Merchant business data is currently unavailable.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Dashboard information will appear when the merchant
          service is available.
        </p>
      </DashboardCard>

      {/*
       * ========================================================
       * Element: Merchant Operational Grid
       * Version: HERO v5.0.0
       * Date: 25 September 2026
       * Author: Raymond Newton — E5357171
       *
       * Description:
       * Reserves presentation surfaces for authoritative
       * merchant metrics without generating placeholder
       * financial or operational values.
       * ========================================================
       */}
      <DashboardGrid>
        <DashboardCard
          title="Revenue"
          value="Unavailable"
        />

        <DashboardCard
          title="Payments"
          value="Unavailable"
        />

        <DashboardCard
          title="Verification Status"
          value="Unavailable"
        />

        <DashboardCard
          title="QR Code Status"
          value="Unavailable"
        />
      </DashboardGrid>
    </Layout>
  );
}