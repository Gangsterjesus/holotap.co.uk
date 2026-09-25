import { Request, Response, NextFunction } from "express";
import { merchantService } from "../services/merchant.service";

import { sendSuccess, sendError } from "../utils/response.js";

export function createMerchant(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const merchant = merchantService.createMerchant(req.body);
    sendSuccess(res, 201, "Merchant created", merchant);
  } catch (err) {
    next(err);
  }
}

export function getMerchant(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const merchant = merchantService.getMerchant(
      req.params.merchantId
    );

    if (!merchant) {
      sendError(res, 404, "Merchant not found");
      return;
    }

    sendSuccess(res, 200, "Merchant retrieved", merchant);
  } catch (err) {
    next(err);
  }
}