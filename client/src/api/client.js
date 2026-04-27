const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: res.statusText,
    }));

    throw new Error(error.message || error.error || `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}


// Region / Product API

export async function fetchRegions() {
  return request("/api/regions");
}

export async function fetchProducts(region, page = 1, perPage = 16, date) {
  const params = new URLSearchParams({
    region,
    page: String(page),
    perPage: String(perPage),
  });

  if (date) {
    params.set("date", date);
  }

  return request(`/api/products?${params}`);
}

export async function fetchProductDetail(productId) {
  return request(`/api/products/${encodeURIComponent(productId)}`);
}


// Order API

export async function createOrder(payload) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchOrders() {
  return request("/api/orders");
}


// User API

export async function signupUser(payload) {
  return request("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return request("/api/users/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser() {
  return request("/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
}

export async function checkEmail(email) {
  const params = new URLSearchParams({
    email,
  });

  return request(`/api/users/check-email?${params}`);
}

export async function checkNickname(nickname) {
  const params = new URLSearchParams({
    nickname,
  });

  return request(`/api/users/check-nickname?${params}`);
}

export async function fetchMyInfo() {
  return request("/api/users/me", {
    method: "GET",
    credentials: "include",
  });
}

export async function changePassword(payload) {
  return request("/api/users/password", {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(payload),
  });
}

export async function withdrawUser() {
  return request("/api/users/withdraw", {
    method: "PATCH",
    credentials: "include",
  });
}
