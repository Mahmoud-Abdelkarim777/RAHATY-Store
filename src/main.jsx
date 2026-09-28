import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import ProductsProvider from "./Contexts/ProductsContext.jsx";
import CategoriesProvider from "./Contexts/CategoriesContext.jsx";
import CartProvider from "./Contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>,
);
