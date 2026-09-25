/**
 * HoloTapServer
 * QR Token Service
 *
 * Purpose:
 *  - Generate activation tokens
 *  - Validate tokens
 *  - Activate tokens (replay-safe)
 *  - Uses repository layer for persistence
 */

import { QrActivationToken } from '../models/QrActivationToken';
import { insertToken, findToken, activateTokenAtomic } from '../repositories/qrTokenRepo';

/**
 * Generate a new QR activation token.
 */
export async function generateToken(tenantId: string): Promise<QrActivationToken> {
  const token: QrActivationToken = {
    tokenId: crypto.randomUUID(),
    tenantId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
    activated: false,
  };

  await insertToken(token);
  return token;
}

/**
 * Retrieve a token.
 */
export async function getToken(tokenId: string): Promise<QrActivationToken | null> {
  return await findToken(tokenId);
}

/**
 * Activate a token (replay-safe).
 */
export async function activateToken(tokenId: string): Promise<boolean> {
  return await activateTokenAtomic(tokenId);
}
