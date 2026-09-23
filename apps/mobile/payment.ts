/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: payment.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 8 — Payment Data Access Layer
 * Subsystem: Mobile Payment Services
 *
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 * wISO 27001:2026
 * Purpose:
 *   Mobile payment DAL responsible for secure communication
 *   with HoloTap payment services.
 *
 * Responsibilities:
 *   • Retrieve payments
 *   • Retrieve payment details
 *   • Create payments
 *   • Update payments
 *   • Refund payments
 *
 * ISO 27001 Alignment:
 *   • Traceability
 *   • Auditability
 *   • Data Integrity
 *   • Least Privilege
 *   • Secure API Consumption
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import { apiGet, apiPost } from "./api/client";

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: number;
}

export interface CreatePaymentInput {
  merchantId: string;
  sessionId: string;
  amount: number;
  description?: string;
  correlationId?: string;
}

function validateId(
  value: string,
  field: string,
): void {
  if (!value?.trim()) {
    throw new Error(`${field} is required`);
  }
}

export async function getPayments(
  sessionId: string,
): Promise<PaymentRecord[]> {
  validateId(sessionId, "sessionId");

  return apiGet(
    `/payments?sessionId=${encodeURIComponent(sessionId)}`,
  );
}

export async function getPaymentById(
  id: string,
): Promise<PaymentRecord> {
  validateId(id, "paymentId");

  return apiGet(
    `/payments/${encodeURIComponent(id)}`,
  );
}

export async function createPayment(
  payload: CreatePaymentInput,
): Promise<PaymentRecord> {
  validateId(payload.sessionId, "sessionId");
  validateId(payload.merchantId, "merchantId");

  if (payload.amount <= 0) {
    throw new Error(
      "amount must be greater than zero",
    );
  }

  return apiPost(
    "/payments/create",
    payload,
  );
}

export async function updatePayment(
  id: string,
  updates: Partial<PaymentRecord>,
): Promise<PaymentRecord> {
  validateId(id, "paymentId");

  return apiPost(
    `/payments/${encodeURIComponent(id)}`,
    updates,
  );
}

export async function refundPayment(
  id: string,
): Promise<PaymentRecord> {
  validateId(id, "paymentId");

  return apiPost(
    `/payments/${encodeURIComponent(id)}/refund`,
    {},
  );
}