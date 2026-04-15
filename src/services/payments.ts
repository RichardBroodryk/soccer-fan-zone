import { apiRequest } from "./api";

export const createPaymentSession = async (tier: "premium" | "super") => {
  const token = localStorage.getItem("raz_token");   // ← Fixed key

  if (!token) {
    throw new Error("No auth token found. Please log in again.");
  }

  const data = await apiRequest(
    "/api/payments",
    "POST",
    { tier },
    token
  );

  return data;
};