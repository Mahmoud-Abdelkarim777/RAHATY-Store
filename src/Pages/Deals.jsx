import { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import { ProductsContext } from "../Contexts/ProductsContext";
import { CartContext } from "../Contexts/CartContext";
import Navbar from "../Components/Navbar";
export default function Deals() {
  const { favoriteIDs, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const { products } = useContext(ProductsContext);
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);
  // Countdown timer
  
  // Countdown timer
  const OFFER_DURATION = 23 * 60 * 60 * 1000;
  const STORAGE_KEY = "rah atystore-deals-end-time";

  const [timeLeft, setTimeLeft] = useState(() => {
    let endTime = Number(localStorage.getItem(STORAGE_KEY));

    if (!endTime || endTime <= Date.now()) {
      endTime = Date.now() + OFFER_DURATION;
      localStorage.setItem(STORAGE_KEY, endTime);
    }

    return endTime - Date.now();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const endTime = Number(localStorage.getItem(STORAGE_KEY));

      setTimeLeft(Math.max(endTime - Date.now(), 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  // End Countdown timer

  // End Countdown timer
  const deals = [...products]
    .filter((product) => product.discountPercentage > 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 8);

  const AllProducts = deals.map((product) => {
    return (
      <div
        key={product.id}
        className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
      >
        <div className="relative bg-zinc-50 h-64 flex items-center justify-center">
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </span>

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

          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-48 h-48 object-contain group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-5">
          <p className="text-xs text-zinc-400 uppercase mb-1">Beauty</p>

          <h3 className="font-semibold text-zinc-800 truncate">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-bold text-slate-800">
              $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              if (cartID.includes(product.id)) {
                removeFromCart(product.id);
              } else {
                addToCart(product.id);
              }
            }}
            className="w-full hover:bg-black bg-slate-900 text-white py-2.5 rounded-lg transition"
          >
            {cartID.includes(product.id) ? "remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <section className="my-5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
            <div>
              <h2 className="text-center text-3xl font-bold text-zinc-900 mt-1">
                Today's Deals
              </h2>

              <p className="text-zinc-500 mt-2">
                Grab your favorite products before the offer ends.
              </p>
            </div>

            {/* Countdown */}
            <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
              Limited Time
            </span>
            <div className="flex items-center gap-2">
              <div className="rounded-lg px-4 text-center text-zinc-400">
                <span className="block text-lg font-bold">
                  {String(hours).padStart(2, "0")}
                </span>
                <span className="text-xs">Hours</span>
              </div>

              <span className="font-bold text-zinc-400">:</span>

              <div className="rounded-lg px-4 text-center text-zinc-400">
                <span className="block text-lg font-bold">
                  {String(minutes).padStart(2, "0")}
                </span>
                <span className="text-xs">Minutes</span>
              </div>

              <span className="font-bold text-zinc-400">:</span>

              <div className="rounded-lg px-4 text-center text-zinc-400">
                <span className="block text-lg font-bold">
                  {String(seconds).padStart(2, "0")}
                </span>
                <span className="text-xs">Seconds</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            {AllProducts}
          </div>
        </div>
      </section>
    </>
  );
}
