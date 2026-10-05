import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Contexts/CartContext";
import { FavoritesContext } from "../Contexts/FavoritesContext";

import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);

  const { favoriteIDs, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { id } = useParams();
  

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-[450px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-slate-500 uppercase">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <i className="fa-solid fa-star text-yellow-500"></i>

              <span className="text-slate-600">{product.rating}</span>
            </div>

            <p className="text-3xl font-bold text-red-500 mt-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-slate-600 leading-7 mt-6">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => {
                  if (cartID.includes(product.id)) {
                    removeFromCart(product.id);
                  } else {
                    addToCart(product.id);
                  }
                }}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-slate-800 transition"
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>

                {cartID.includes(product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  if (favoriteIDs.includes(product.id)) {
                    removeFromFavorites(product.id);
                  } else {
                    addToFavorites(product.id);
                  }
                }}
                className="w-full sm:w-14 h-12 border border-slate-300 rounded-lg flex items-center justify-center hover:bg-slate-100 transition"
              >
                <span
                  className={`text-3xl ${
                    favoriteIDs.includes(product.id)
                      ? "text-red-500"
                      : "text-slate-400"
                  }`}
                >
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
