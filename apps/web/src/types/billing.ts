
/* 
 * HoloTap Engineering — Billing Types Module
 * Engineer: E5357171
 * Date: 2026-08-20
 * Description:
 * Core type definitions for the Billing subsystem (Flow 8).
 * Provides canonical shapes for MerchantFee, TransactionEnvelope,
 * SettlementPreview and related billing structures.
 * 
 * Notes:
 * - Used by feeCalculator.ts and settlementEngine.ts
 * - Must remain schema‑aligned with backend billing models
 * - Part of this week's Billing + QR Hologram build cycle
 */


export type MerchantFee = {
  percentage: number;
  fixed: number;
  resource: number;
};

export type TransactionEnvelope = {
  amount: number;
  merchantId: string;
  identitySessionId: string;
};

export type SettlementPreview = {
  gross: number;
  fees: MerchantFee;
  net: number;
};
