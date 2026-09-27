import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext();

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then(async (res) => {
        const categoriesData = res.data;

        const categoriesWithImages = await Promise.all(
          categoriesData.map(async (category) => {
            const response = await axios.get(
              `https://dummyjson.com/products/category/${category.slug}?limit=1`
            );

            return {
              ...category,
              image: response.data.products[0].thumbnail,
            };
          })
        );

        setCategories(categoriesWithImages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
}