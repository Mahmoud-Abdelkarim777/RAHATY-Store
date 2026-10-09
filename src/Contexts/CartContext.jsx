import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartID, setCartID] = useState([]);
  const [quantities, setQuantities] = useState({});

  const cartCount = cartID.length;

  const addToCart = (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to be logged in to add items to the cart.");
      return;
    }
    setCartID((prevItems) => {
      if (prevItems.includes(productId)) {
        return prevItems;
      }

      return [...prevItems, productId];
    });
  };

  const removeFromCart = (productId) => {
    setCartID((prevItems) => prevItems.filter((id) => id !== productId));

    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      // Remove the deleted product's quantity so we don't keep unnecessary data in the cart.
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  
const handleIncrease = (productId) => {
  setQuantities((prev) => ({
    ...prev,
    [productId]: Math.min(5, (prev[productId] || 1) + 1),
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
