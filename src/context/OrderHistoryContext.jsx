import { createContext, useContext, useState, useEffect } from "react";

const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ss-orders") || "[]");
    } catch { return []; }
  });

  const [points, setPoints] = useState(() => {
    try { return Number(localStorage.getItem("ss-points") || "0"); }
    catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem("ss-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("ss-points", String(points));
  }, [points]);

  const addOrder = ({ orderId, form, items, totalPrice }) => {
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      buyer: form,
      items,
      total: totalPrice,
    };
    setOrders((prev) => [newOrder, ...prev]);
    // 1 point per ₹10 spent
    setPoints((p) => p + Math.floor(totalPrice / 10));
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, points, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => useContext(OrderHistoryContext);
