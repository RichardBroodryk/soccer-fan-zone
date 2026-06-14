import { apiRequest } from "../config/api";

export const registerUser = async (
  email: string,
  password: string
) => {
  return apiRequest(
    "/api/register",
    "POST",
    {
      email,
      password,
    }
  );
};

export const loginUser = async (
  email: string,
  password: string
) => {
  return apiRequest(
    "/api/login",
    "POST",
    {
      email,
      password,
    }
  );
};