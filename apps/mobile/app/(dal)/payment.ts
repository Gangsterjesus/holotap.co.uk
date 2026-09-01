/**
 * =============================================================================
 * HoloTap Mobile — Payment Data Access Layer (DAL)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Date: 01 September 2026
 * -----------------------------------------------------------------------------
 * Description:
 *   Production-grade DAL responsible for:
 *     - Fetching all payments for a session
 *     - Fetching a single payment by ID
 *     - Creating new payments
 *     - Updating existing payments
 *     - Refunding payments
 *
 *   This DAL communicates directly with the backend API using:
 *     - apiGet   → HTTP GET
 *     - apiPost  → HTTP POST
 *     - apiPut   → HTTP PUT
 *
 *   No mock data. No placeholders. Fully wired for Flow 8.
 * =============================================================================
 */

import { apiGet, apiPost } from "../../api/client";

/**
 * Shape of a payment record returned by the backend.
 */
export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: number; // Unix epoch (ms)
}

/**
 * Fetch all payments associated with a given session.
 *
 * @param sessionId - Active merchant session identifier
 * @returns Promise<PaymentRecord[]>
 */
export async function getPayments(sessionId: string): Promise<PaymentRecord[]> {
  return apiGet(`/payments?sessionId=${sessionId}`);
}

/**
 * Fetch a single payment by its unique ID.
 *
 * @param id - Payment identifier
 * @returns Promise<PaymentRecord>
 */
export async function getPaymentById(id: string): Promise<PaymentRecord> {
  return apiGet(`/payments/${id}`);
}

/**
 * Create a new payment.
 *
 * @param payload - Payment creation details
 * @returns Promise<PaymentRecord>
 */
export async function createPayment(payload: {
  merchantId: string;
  sessionId: string;
  amount: number;
  description?: string;
}): Promise<PaymentRecord> {
  return apiPost("/payments/create", payload);
}

/**
 * Update an existing payment.
 *
 * @param id - Payment identifier
 * @param updates - Partial fields to update
 * @returns Promise<PaymentRecord>
 */
export async function updatePayment(
  id: string,
  updates: Partial<PaymentRecord>
): Promise<PaymentRecord> {
  return apiPost(`/payments/${id}`, updates);
}

/**
 * Refund a payment.
 *
 * @param id - Payment identifier
 * @returns Promise<PaymentRecord>
 */
export async function refundPayment(id: string): Promise<PaymentRecord> {
  return apiPost(`/payments/${id}/refund`, {});
}
