import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favoriteIDs, setFavoriteIDs] = useState([]);

  const addToFavorites = (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to be logged in to add items to the favorites.");
      return;
    } 
    setFavoriteIDs((prevIDs) => {
      if (prevIDs.includes(productId)) {
        return prevIDs;
      }

      return [...prevIDs, productId];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavoriteIDs((prevIDs) => prevIDs.filter((id) => id !== productId));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIDs,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
