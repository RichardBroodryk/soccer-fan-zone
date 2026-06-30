// ==========================================================
// Soccer Fan Zone
// User Service
// ==========================================================

export interface UserProfile {
  id: string | null;
  email: string | null;
  token: string | null;
}

const USER_ID = "sfz_user_id";
const USER_EMAIL = "sfz_user_email";
const USER_TOKEN = "sfz_token";

// ==========================================================
// GET USER
// ==========================================================

export function getCurrentUser(): UserProfile {
  return {
    id: localStorage.getItem(USER_ID),
    email: localStorage.getItem(USER_EMAIL),
    token: localStorage.getItem(USER_TOKEN),
  };
}

// ==========================================================
// SAVE USER
// ==========================================================

export function saveUser(
  id: string,
  email: string,
  token: string
) {
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USER_EMAIL, email);
  localStorage.setItem(USER_TOKEN, token);
}

// ==========================================================
// CLEAR USER
// ==========================================================

export function clearUser() {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(USER_TOKEN);
}

// ==========================================================
// HELPERS
// ==========================================================

export function getUserEmail() {
  return localStorage.getItem(USER_EMAIL);
}

export function getToken() {
  return localStorage.getItem(USER_TOKEN);
}

export function getUserId() {
  return localStorage.getItem(USER_ID);
}