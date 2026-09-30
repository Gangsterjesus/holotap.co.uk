/**
 * =============================================================================
 * HoloTap Engineering - Mobile Registration Router
 * =============================================================================
 * File: apps/Holotap.Server/src/routes/mobile/mobile.router.ts
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Server / API / Mobile
 * Revision: v5.0.0 - HERO Build
 * Date: 30 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provides the server-owned mobile registration API boundary.
 *
 * Module Responsibilities
 * - Validate the mobile registration request envelope.
 * - Reject incomplete registration requests.
 * - Expose POST /api/mobile/register.
 * - Keep registration authority on the server.
 * =============================================================================
 */

import { Router, Request, Response } from "express";

const router = Router();

interface MobileRegistrationRequest {
  mobile_number: string;
  country_code: string;
  device_id: string;
  platform: string;
  push_token?: string;
}

router.post("/register", async (req: Request, res: Response) => {
  const {
    mobile_number,
    country_code,
    device_id,
    platform,
    push_token,
  } = req.body as Partial<MobileRegistrationRequest>;

  if (
    !mobile_number ||
    !country_code ||
    !device_id ||
    !platform
  ) {
    res.status(400).json({
      message: "Invalid mobile registration payload",
    });

    return;
  }

  res.status(200).json({
    status: "registered",
    mobile_number,
    country_code,
    device_id,
    platform,
    push_token: push_token ?? null,
  });
});

export default router;