/* 
===========================================================
HoloTap Engineering Header
File: payment.dal.ts
Subsystem: Flow 9 — Payment Lifecycle DAL
Engineer: Raymond Newton (E5357171)
Date: 31 Aug 2026
===========================================================
*/

import { PrismaClient } from "@prisma/client";
import { feeCalculator } from "./feeCalculator";

// Local Prisma client instance
const prisma = new PrismaClient() as any;

export async function createPayment(
  identityId: string,
  merchantId: string,
  amount: number,
  currency: string = "GBP"
) {
  try {
    const totalFee = await feeCalculator(amount, merchantId);
    const netAmount = amount - totalFee;

    const payment = await prisma.payments.create({
      data: {
        identity_id: identityId,
        merchant_id: merchantId,
        amount,
        currency,
        status: "pending",
        metadata: {
          total_fee: totalFee,
          net_amount: netAmount,
        },
      },
    });

    return payment;
  } catch {
    return null;
  }
}
