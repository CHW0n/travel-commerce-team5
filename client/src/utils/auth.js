export function isLoggedIn() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("isLoggedIn") === "true";
}

export function clearLoginStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("nickname");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("authUser");
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("token");
}
