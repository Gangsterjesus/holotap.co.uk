export interface IdentityPayload {
  id: string;
  type: "user" | "merchant";
  sessionId: string;
  issuedAt: number;
  device: "mobile" | "web";
}
