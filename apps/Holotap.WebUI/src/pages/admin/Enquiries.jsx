/* ============================================================
   HoloTap — Enquiries Contact Surface (Admin)
   File: src/pages/admin/Enquiries.jsx
   Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
   Layer: web-ui
   Revision: v2 — Unified Architecture
   Date: 03 August 2026
   ============================================================
 *
 *  Purpose:
 *    Provides administrators with the official public contact
 *    address for HoloTap enquiries.
 *
 *  Responsibilities:
 *    - Display contact information
 *    - Provide consistent v2 layout + header
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";

export default function Enquiries() {
  return (
    <Layout
      title="Enquiries"
      subtitle="Public contact address for HoloTap"
    >
      <PageHeader
        title="Enquiries"
        subtitle="Official public contact channel"
        actions={null}
      />

      <div className="mt-6 text-gray-700 text-lg">
        <p>For general enquiries, please contact:</p>

        <p className="mt-2 font-semibold text-black">
          enquiries@holotap.co.uk
        </p>
      </div>
    </Layout>
  );
}
