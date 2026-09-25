/**
 * ============================================================
 *  HoloTap Engineering — Support Page
 *  File: src/pages/admin/Support.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Provides the official support contact channel for HoloTap.
 *
 *  Notes:
 *    - Deterministic architecture only
 *    - Tailwind v4 UI
 *    - Stateless public-facing admin surface
 * ============================================================
 */
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";



export default function Support() {
  return (
    <Layout
      title="Support"
      subtitle="Official support contact for HoloTap"
    >
      <PageHeader
        title="Support"
        subtitle="Support contact channel"
        actions={null}
      />

      <div className="mt-6 text-gray-700 text-lg">
        <p>
          For support enquiries, please contact:
        </p>

        <p className="mt-2 font-semibold text-black">
          support@holotap.co.uk
        </p>
      </div>
    </Layout>
  );
}
