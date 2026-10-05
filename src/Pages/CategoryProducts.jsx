import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./../Components/Navbar";

import { CartContext } from "../Contexts/CartContext";
import { FavoritesContext } from "../Contexts/FavoritesContext";
export default function CategoryProducts() {
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);
  const { favoriteIDs, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${slug}`)
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const AllProducts = products.map((product) => {
    return (
      <div
        key={product.id}
        className="group border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
      >
        {/* Image */}
        <div className="relative h-52 bg-slate-100 overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt="Product"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </Link>
          {/* Discount */}
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -20%
          </span>

          {/* Favorite */}
          <button
            onClick={() => {
              if (favoriteIDs.includes(product.id)) {
                removeFromFavorites(product.id);
              } else {
                addToFavorites(product.id);
              }
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-slate-50 transition"
          >
            <span
              className={`text-4xl cursor-pointer transition-colors hover:text-red-500 ${
                favoriteIDs.includes(product.id)
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              ♥
            </span>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <p className="text-xs text-slate-400 uppercase">
              {product.category}
            </p>

            <h2 className="font-semibold text-slate-800 mt-1 truncate">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-400">★</span>

              <span className="text-sm text-slate-500">4.8</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg font-bold text-slate-800">
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </Link>
          {/* Add To Cart */}
          <button
            onClick={() => {
              if (cartID.includes(product.id)) {
                removeFromCart(product.id);
              } else {
                addToCart(product.id);
              }
            }}
            className="w-full mt-4 bg-black hover:bg-slate-800 text-white py-2.5 rounded-lg font-semibold  transition"
          >
            <i className="fa-solid fa-cart-shopping me-2"></i>
            {cartID.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mt-1">{slug}</h1>

            <p className="text-slate-500 mt-2">
              Explore our products in this category
            </p>
          </div>

          <Link
            to="/Products"
            className="text-blue-500 font-semibold hover:text-blue-600 transition"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {/* Product Card */}
          {AllProducts}
        </div>
      </div>
    </>
  );
}
