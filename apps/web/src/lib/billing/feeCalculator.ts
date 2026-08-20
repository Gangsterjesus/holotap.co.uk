
/* 
 * HoloTap Engineering — Fee Calculator
 * Engineer: E5357171
 * Date: 2026-08-20
 * Description:
 * Pure calculation engine for Billing (Flow 8).
 * Computes percentage, fixed, and resource fees and returns
 * a SettlementPreview structure for UI and service layers.
 * 
 * Notes:
 * - Deterministic, side‑effect free
 * - Must match backend fee resolver logic
 * - Part of this week's Billing + QR Hologram build cycle
 */

import { MerchantFee, TransactionEnvelope, SettlementPreview } from "../../types/billing";

export function calculateFees(
  tx: TransactionEnvelope,
  fee: MerchantFee
): SettlementPreview {
  const percentageFee = tx.amount * fee.percentage;
  const fixedFee = fee.fixed;
  const resourceFee = fee.resource;

  const totalFees = percentageFee + fixedFee + resourceFee;

  return {
    gross: tx.amount,
    fees: fee,
    net: tx.amount - totalFees
  };
}
