/**
 * HoloTapServer
 * QR Activation Token Model
 */

export interface QrActivationToken {
  tokenId: string;
  tenantId: string;
  createdAt: Date;
  expiresAt: Date;
  activated: boolean;
}
