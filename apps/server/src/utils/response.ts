/**
 * HoloTap — Deterministic Response Surface (Flow‑10 / Flow‑11 / Flow‑12)
 * Engineer: Raymond Newton (E5357171)
 */

import { Response } from "express";

export interface ResponseMeta {
  correlationId?: string;
  actorId?: string;
  sessionId?: string;
  envelopeId?: string;
}

export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T | null;
  meta?: ResponseMeta;
}

export interface ErrorResponse {
  success: false;
  message: string;
  meta?: ResponseMeta;
}

export function sendSuccess<T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null,
  meta: ResponseMeta = {}
) {
  const body: SuccessResponse<T> = {
    success: true,
    message,
    data,
    meta
  };

  return res.status(status).json(body);
}

export function sendError(
  res: Response,
  status: number,
  message: string,
  meta: ResponseMeta = {}
) {
  const body: ErrorResponse = {
    success: false,
    message,
    meta
  };

  return res.status(status).json(body);
}
