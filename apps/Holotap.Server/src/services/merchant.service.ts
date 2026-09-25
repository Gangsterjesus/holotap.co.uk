import { generateId } from "../utils/id";

interface Merchant {
  id: string;
  [key: string]: unknown;
}

const merchants = new Map<string, Merchant>();

export const merchantService = {
  createMerchant(data: Record<string, unknown>): Merchant {
    const id = generateId();

    const merchant: Merchant = {
      id,
      ...data,
    };

    merchants.set(id, merchant);

    return merchant;
  },

  getMerchant(id: string): Merchant | null {
    return merchants.get(id) ?? null;
  },
};