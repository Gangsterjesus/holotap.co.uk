/**
 * ============================================================
 * HoloTap — Payment DAL
 * File: src/dal/payment.dal.ts
 * Engineers: Raymond Newton
 *            Copilot Engineering Assistant
 * Layer: Data Access Layer
 * Revision: v5.1.0
 * Date: 17.11.2026
 * © 2026 HoloTap Technologies Ltd.
 * ============================================================
 *
 * Purpose:
 *  Central payment record creation and persistence.
 *
 * Responsibilities:
 *  - Create payment records
 *  - Calculate merchant fees
 *  - Generate payment references
 *  - Maintain pending payment state
 *  - Support Google Pay integration
 * ============================================================
 */

import { PrismaClient, Prisma } from "@prisma/client";
import { feeCalculator } from "./feeCalculator";

const prisma = new PrismaClient();

export interface CreatePaymentResult {
  success: boolean;
  payment?: unknown;
  error?: string;
}

export async function createPayment(
  identityId: string,
  merchantId: string,
  amount: number,
  currency: string = "GBP",
  provider: string = "google_pay"
): Promise<CreatePaymentResult> {
  try {
    if (!identityId) {
      throw new Error("Identity ID is required");
    }

    if (!merchantId) {
      throw new Error("Merchant ID is required");
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Payment amount must be greater than zero");
    }

    const totalFee = await feeCalculator(amount, merchantId);
    const netAmount = amount - totalFee;

    const paymentReference =
      `HT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const metadata: Prisma.JsonObject = {
      provider,
      payment_reference: paymentReference,
      total_fee: totalFee,
      net_amount: netAmount,
      payment_flow: "scan-pay-done",
    };

    const payment = await prisma.payments.create({
      data: {
        identity_id: identityId,
        merchant_id: merchantId,
        amount,
        currency,
        status: "pending",
        metadata,
      },
    });

    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error(
      "[HoloTap] createPayment failed",
      {
        identityId,
        merchantId,
        amount,
      },
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "UNKNOWN_PAYMENT_ERROR",
    };
  }
}
