import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartID, setCartID] = useState([]);

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
  };

  return (
    <CartContext.Provider
      value={{
        cartID,
        cartCount,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}