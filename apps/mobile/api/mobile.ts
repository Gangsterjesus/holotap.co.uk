import { apiPost } from "./client";

export async function mobileRegister(payload: {
  mobile_number: string;
  country_code: string;
  device_id: string;
  platform: string;
  push_token?: string;
}) {
  return apiPost("/mobile/register", payload);
}
