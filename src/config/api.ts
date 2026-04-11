// src/config/api.ts

// Production backend
const PROD_API = "https://rugby-anthem-backend.fly.dev/api";

// Local development backend
const DEV_API = "http://localhost:4000";

// Choose automatically
export const API_BASE_URL =
  window.location.hostname === "localhost"
    ? DEV_API
    : PROD_API;


// Generic API helper
export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
) => {

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

 const response = await fetch(
  `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`,
  {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
};