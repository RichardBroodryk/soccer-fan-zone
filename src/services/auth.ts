import { apiRequest } from "./api";

const TOKEN_KEY = "raz_token";
const USER_ID_KEY = "raz_user_id";

/**
 * REGISTER USER
 * Allows the flow to continue if the backend returns
 * "User already exists".
 */
export const registerUser = async (email: string, password: string) => {
  try {
    const data = await apiRequest("/api/register", "POST", {
      email,
      password,
    });

    // 🔥 CRITICAL FIX — AUTO LOGIN AFTER REGISTER
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    return data;

  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "User already exists") {
        // 🔥 ALSO LOGIN EXISTING USER
        const loginData = await loginUser(email, password);
        return loginData;
      }
    }

    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  const data = await apiRequest("/api/login", "POST", {
    email,
    password,
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  // backend currently returns only { token }
  // but we support future user object
  if (data.user && data.user.id) {
    localStorage.setItem(USER_ID_KEY, String(data.user.id));
  }

  return data;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export const getUserTier = async () => {
  const token = getToken();
  if (!token) return "freemium";

  try {
    const data = await apiRequest(
      "/api/subscription",
      "GET",
      undefined,
      token
    );

    return data.tier || "freemium";
  } catch {
    return "freemium";
  }
};