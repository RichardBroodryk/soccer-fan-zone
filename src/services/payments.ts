import { apiRequest } from "./api";

export const createPaymentSession = async (tier: "premium" | "super") => {

  const data = await apiRequest(
    "/api/payments",
    "POST",
    {
      tier
    }
  );

  return data;
};