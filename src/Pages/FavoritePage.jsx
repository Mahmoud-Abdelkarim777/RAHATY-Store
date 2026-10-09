import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import { CartContext } from "../Contexts/CartContext";
import axios from "axios";

export default function FavoritePage() {
  const { favoriteIDs, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (favoriteIDs.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const requests = favoriteIDs.map((id) => {
      return axios.get(`https://dummyjson.com/products/${id}`);
    });
    Promise.all(requests)
      .then((response) => {
        console.log("response", response);
        const productsData = response.map((res) => res.data);
        setProducts(productsData);
        // console.log("productsData", productsData);
      })
      .catch((error) => {
        console.error("Error fetching favorite products", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [favoriteIDs]);
  const allProducts = products.map((product) => {
    return (
      // /* Favorite Card */
      <div
        key={product.id}
        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
      >
        {/* Image */}
        <div className="relative h-56 bg-slate-100 overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </Link>
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
              className={`text-4xl cursor-pointer transition-colors ${
                favoriteIDs.includes(product.id)
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              ♥
            </span>
          </button>

          {/* Discount */}
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discountPercentage.toFixed(0)}%
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h2 className="text-lg font-semibold text-slate-800 truncate">
              {product.title}
            </h2>

            <p className="text-sm text-slate-500 mt-1">{product.category}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <i className="fa-solid fa-star text-yellow-500 text-sm"></i>

              <span className="text-sm text-slate-600">{product.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>

              <span className="text-xl font-bold text-red-500">
                $
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
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
            className="w-full mt-4 hover:bg-black bg-slate-900 text-white py-2.5 rounded-lg  transition"
          >
            <i className="fa-solid fa-cart-shopping me-2"></i>
            {cartID.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  });
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg font-semibold">Loading favorites...</p>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="min-h-[500px] flex flex-col justify-center items-center text-center">
        <i className="fa-solid fa-heart text-6xl text-slate-900 mb-5"></i>

        <h2 className="text-2xl font-bold text-slate-800">
          Your Favorite Page is Empty
        </h2>

        <p className="text-slate-500 mt-2">
          Looks like you haven't added anything to your Favorite Page yet.
        </p>

        <Link
          to="/"
          className="mt-6 hover:bg-black bg-slate-900 text-white px-6 py-3 rounded-lg  transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Favorites</h1>

            <p className="text-slate-500 mt-1">
              Products you've saved for later
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {favoriteIDs.length} items
          </span>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts}
        </div>
      </main>
    </>
  );
}
