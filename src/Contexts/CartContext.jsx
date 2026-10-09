
import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartID, setCartID] = useState([]);
  const [quantities, setQuantities] = useState({});

  const cartCount = cartID.length;

  const addToCart = (productId) => {
    setCartID((prevItems) => {
      if (prevItems.includes(productId)) {
        return prevItems;
      }

      return [...prevItems, productId];
    });
  };

  const removeFromCart = (productId) => {
    setCartID((prevItems) =>
      prevItems.filter((id) => id !== productId)
    );

    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  const handleIncrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartID,
        cartCount,
        quantities,
        addToCart,
        removeFromCart,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

