import Navbar from "../Components/Navbar";

import { useContext } from "react";
import { ProductsContext } from "../Contexts/ProductsContext";
import { CartContext } from "../Contexts/CartContext";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../Contexts/FavoritesContext";
export default function Products() {
  const { products, loading, error } = useContext(ProductsContext);
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);
  // console.log(products);
  const { favoriteIDs, addToFavorites, removeFromFavorites } =
      useContext(FavoritesContext);

  const LimtedData = products.map((product) => {
    return (
      <div
        key={product.id}
        className="cursor-pointer relative flex flex-col h-full bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden"
      >
        {/* Product Image */}
        <div className="relative h-56 m-2.5 overflow-hidden rounded-md">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />

            {/* Discount */}
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{Math.round(product.discountPercentage)}%
            </span>
          </Link>

          {/* Wishlist */}
          <button
              onClick={() => {
                if (favoriteIDs.includes(product.id)) {
                  removeFromFavorites(product.id);
                } else {
                  addToFavorites(product.id);
                }
              }}
              className="absolute top-[6px] right-2"
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
        </div>

        {/* Product Info */}
        <Link to={`/product/${product.id}`}>
          <div className="p-4 flex-grow">
            <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
              {product.title}
            </h2>

            <p className="text-sm text-slate-500 mt-1">{product.category}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <i className="fa-solid fa-star text-yellow-400"></i>

              <span className="text-sm text-slate-600">{product.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xl font-bold text-slate-900">
                ${product.price}
              </span>
            </div>
          </div>
        </Link>
        {/* Add To Cart */}
        <div className="p-4 pt-0">
          <button onClick={() => {
            if(cartID.includes(product.id)){
              removeFromCart(product.id)
            }else{
              addToCart(product.id)
            }
          }} className="w-full hover:bg-black bg-slate-900 text-white py-2.5 rounded-lg  transition">
            {cartID.includes(product.id) ? "remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LimtedData}
        </div>
      </section>
    </>
  );
}
