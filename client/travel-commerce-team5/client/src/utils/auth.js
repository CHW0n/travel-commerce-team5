const LOGIN_STORAGE_KEYS = ["authUser", "user", "accessToken", "token"];

export function isLoggedIn() {
  if (typeof window === "undefined") {
    return false;
  }

  return LOGIN_STORAGE_KEYS.some((key) => {
    const value = window.localStorage.getItem(key);
    return Boolean(value && String(value).trim());
  });
}
