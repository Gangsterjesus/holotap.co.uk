/**
 * HoloTapServer
 * QR Token Repository
 *
 * Purpose:
 *  - Persistence layer for QR activation tokens.
 *  - Abstracts storage so services/controllers don't care about DB details.
 *  - Replay-safe operations (atomic activate).
 */

import { db } from '../db';
import { QrActivationToken } from '../models/QrActivationToken';

/**
 * Insert a new QR activation token.
 */
export async function insertToken(token: QrActivationToken): Promise<void> {
  await db.qrTokens.insert(token);
}

/**
 * Retrieve a token by ID.
 */
export async function findToken(tokenId: string): Promise<QrActivationToken | null> {
  const token = await db.qrTokens.findOne({ tokenId });
  return token as QrActivationToken | null;
}

/**
 * Atomically activate a token.
 *
 * Returns:
 *  - true  → activation succeeded
 *  - false → token not found, expired, or already activated
 */
export async function activateTokenAtomic(tokenId: string): Promise<boolean> {
  const token = await db.qrTokens.findOne({ tokenId }) as QrActivationToken | null;
  if (!token) return false;

  if (token.activated) return false;
  if (token.expiresAt < new Date()) return false;

  await db.qrTokens.updateOne(
    { tokenId },
    { activated: true }
  );

  return true;
}
