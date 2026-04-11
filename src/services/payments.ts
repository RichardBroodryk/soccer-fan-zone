import { apiRequest } from "./api";

export const createPaymentSession = async (tier: "premium" | "super") => {

  const token = localStorage.getItem("token"); // 🔥 ADD THIS

  const data = await apiRequest(
    "/api/payments",
    "POST",
    {
      tier
    },
    token || undefined // 🔥 PASS TOKEN
  );

  return data;
};