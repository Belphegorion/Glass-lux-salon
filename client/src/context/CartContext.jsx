// client/src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
/**
 * CartContext
 * - Persistent cart stored in localStorage (sb_cart)
 * - Normalizes id field (supports item.id or item.serviceId)
 * - Normalizes quantity naming: supports .qty or .quantity on input; stores .qty internally
 * - Exposes addToCart, removeFromCart, updateItem, clearCart, total, count, showCart, toggleCart, openCart, closeCart
 */

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItem: () => {},
  clearCart: () => {},
  total: 0,
  count: 0,
  showCart: false,
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
});

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("sb_cart");
      const arr = raw ? JSON.parse(raw) : [];
      // normalize stored items to use .qty
      return Array.isArray(arr)
        ? arr.map((it) => ({ ...it, qty: Number(it.qty ?? it.quantity ?? 1) }))
        : [];
    } catch {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("sb_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // helper to get canonical id for an item
  const itemId = (item) => item?.id ?? item?.serviceId ?? item?.service_id ?? item?.name ?? null;

  // normalize incoming item shape and return new item object
  const normalizeIncoming = (item) => {
    const id = itemId(item);
    const qty = Number(item.qty ?? item.quantity ?? 1);
    const price = Number(item.price ?? item.cost ?? 0);
    return { ...item, id, qty: Number.isFinite(qty) ? Math.max(0, qty) : 1, price: Number.isFinite(price) ? price : 0 };
  };

  const addToCart = (item) => {
    const incoming = normalizeIncoming(item);
    const id = incoming.id;

    // if no id, push as unique anonymous item (still stored with qty)
    if (!id) {
      setCart((prev) => [...prev, incoming]);
      setShowCart(true);
      return;
    }

    setCart((prev) => {
      const idx = prev.findIndex((i) => String(itemId(i)) === String(id));
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (Number(copy[idx].qty) || 0) + (Number(incoming.qty) || 1) };
        return copy;
      }
      return [...prev, incoming];
    });
    setShowCart(true);
  };

  const removeFromCart = (idOrItem) => {
    const id = typeof idOrItem === "object" ? itemId(idOrItem) : idOrItem;
    setCart((prev) => prev.filter((i) => String(itemId(i)) !== String(id)));
  };

  const updateItem = (idOrItem, changes) => {
    const id = typeof idOrItem === "object" ? itemId(idOrItem) : idOrItem;
    setCart((prev) =>
      prev
        .map((i) => {
          if (String(itemId(i)) !== String(id)) return i;
          // merge changes and normalize qty
          const merged = { ...i, ...changes };
          const qty = Number(merged.qty ?? merged.quantity ?? merged.qty ?? merged.quantity ?? i.qty ?? 1);
          merged.qty = Number.isFinite(qty) ? qty : i.qty;
          // ensure price normalized
          merged.price = Number(merged.price ?? merged.cost ?? i.price ?? 0);
          return merged;
        })
        .filter((i) => Number(i.qty) > 0) // drop zero/negative qty items
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
  const count = cart.reduce((s, it) => s + (Number(it.qty) || 0), 0);

  // cart UI control helpers
  const toggleCart = () => setShowCart((s) => !s);
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItem,
        clearCart,
        total,
        count,
        showCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
