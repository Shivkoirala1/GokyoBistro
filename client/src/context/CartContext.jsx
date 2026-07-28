import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // { menuItemId, name, price, quantity, note }

  const addItem = (menuItem, quantity = 1, note = "") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === menuItem._id && i.note === note);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { menuItemId: menuItem._id, name: menuItem.name, price: menuItem.price, quantity, note },
      ];
    });
  };

  const updateQuantity = (menuItemId, note, quantity) => {
    if (quantity <= 0) {
      removeItem(menuItemId, note);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.menuItemId === menuItemId && i.note === note ? { ...i, quantity } : i
      )
    );
  };

  const removeItem = (menuItemId, note) => {
    setItems((prev) => prev.filter((i) => !(i.menuItemId === menuItemId && i.note === note)));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
