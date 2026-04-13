import { apiRequest } from "./api";

const TOKEN_KEY = "raz_token";
const USER_ID_KEY = "raz_user_id";
const TIER_KEY = "raz_tier";

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

    // 🔥 AUTO LOGIN AFTER REGISTER
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    // 🔥 GET TIER IMMEDIATELY
    const tier = await getUserTier();
    localStorage.setItem(TIER_KEY, tier);

    return {
      ...data,
      tier,
    };

  } catch (err) {
    if (err instanceof Error) {
  if (err.message.toLowerCase().includes("exists")) {
    const loginData = await loginUser(email, password);
    return loginData;
  }
}

    throw err;
  }
};

/**
 * LOGIN USER
 */
export const loginUser = async (email: string, password: string) => {
  const data = await apiRequest("/api/login", "POST", {
    email,
    password,
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  // 🔥 FETCH USER TIER IMMEDIATELY
  const tier = await getUserTier();
  localStorage.setItem(TIER_KEY, tier);

  // Optional user id support
  if (data.user && data.user.id) {
    localStorage.setItem(USER_ID_KEY, String(data.user.id));
  }

  return {
    ...data,
    tier,
  };
};

/**
 * TOKEN
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * USER ID
 */
export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

/**
 * LOGOUT
 */
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(TIER_KEY);
};

/**
 * FETCH USER TIER FROM BACKEND
 */
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

/**
 * FAST LOCAL TIER ACCESS (NO API CALL)
 */
export const getStoredTier = () => {
  return localStorage.getItem(TIER_KEY) || "freemium";
};