import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "orders";
const LEGACY_LATEST_KEY = "latestOrder";

const BookingContext = createContext(null);

function readStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }

    const legacyRaw = localStorage.getItem(LEGACY_LATEST_KEY);
    if (legacyRaw) {
      const legacyOrder = JSON.parse(legacyRaw);
      if (legacyOrder && typeof legacyOrder === "object") {
        return [{
          id: legacyOrder.id ?? `legacy-${Date.now()}`,
          createdAt: legacyOrder.createdAt ?? new Date().toISOString(),
          ...legacyOrder,
        }];
      }
    }
  } catch (error) {
    console.error("Failed to parse order storage", error);
  }
  return [];
}

export function BookingProvider({ children }) {
  const [orders, setOrders] = useState(() => readStoredOrders());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderPayload) => {
    const order = {
      id: orderPayload.id ?? `order-${Date.now()}`,
      createdAt: orderPayload.createdAt ?? new Date().toISOString(),
      ...orderPayload,
    };

    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const value = useMemo(
    () => ({
      orders,
      latestOrder: orders[0] ?? null,
      addOrder,
    }),
    [orders]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
