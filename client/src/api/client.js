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
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function fetchRegions() {
  return request("/api/regions");
}

export async function fetchProducts(region, page = 1, perPage = 16) {
  const params = new URLSearchParams({ region, page: String(page), perPage: String(perPage) });
  return request(`/api/products?${params}`);
}

export async function fetchProductDetail(productId) {
  return request(`/api/products/${encodeURIComponent(productId)}`);
}

export async function createOrder(payload) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchOrders() {
  return request("/api/orders");
}
