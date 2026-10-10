import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../Contexts/style.css";
// import required modules
import { Pagination } from "swiper/modules";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
// context
import { CartContext } from "../Contexts/CartContext";
import { FavoritesContext } from "../Contexts/FavoritesContext";

export default function FeatureProducts() {
  const { cartID, addToCart, removeFromCart } = useContext(CartContext);
  const { favoriteIDs, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const [itemsFeature, setItemsFeature] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?sortBy=rating&order=desc&limit=15")
      .then((res) => {
        setItemsFeature(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const AllItemsFeature = itemsFeature.map((item) => {
    const finalPrice =
      item.price - (item.price * item.discountPercentage) / 100;
    const reviewCount = Math.round(item.rating * 15 + item.reviews.length * 10);
    return (
      <SwiperSlide
        className="SwiperSlide heightOfSwiperSlied rounded-lg shadow-lg"
        key={item.id}
      >
        <div className="relative flex flex-col h-full bg-white shadow-sm border border-slate-200 rounded-lg">
          {/* Image */}
          <div className="relative m-2.5 overflow-hidden rounded-md">
            <Link to={`/product/${item.id}`}>
              <img
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
                src={item.thumbnail}
                alt={item.title}
                className=" aspect-square object-cover"
              />
            </Link>
            <span className="absolute top-0 left-0 px-2 font-semibold text-white bg-red-800 rounded-full">
              {Math.round(item.discountPercentage)}%
            </span>
            <button
              onClick={() => {
                if (favoriteIDs.includes(item.id)) {
                  removeFromFavorites(item.id);
                } else {
                  addToFavorites(item.id);
                }
              }}
              className="absolute top-[-10px] right-2"
            >
              <span
                className={`text-4xl cursor-pointer transition-colors ${
                  favoriteIDs.includes(item.id)
                    ? "text-red-500"
                    : "text-slate-400"
                }`}
              >
                ♥
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="px-2 flex-grow">
            <Link to={`/product/${item.id}`}>
              <p className="mb-2 text-slate-800 text-base font-semibold">
                {item.title}
              </p>
              <p className="text-slate-600 leading-normal font-light">
                <i className="fa-solid fa-star text-yellow-500"></i>

                <span>
                  {" "}
                  {item.rating} {reviewCount}
                </span>
              </p>
              {/* Price */}
              <div className="mt-3">
                <span className="line-through text-slate-600 font-semibold">
                  ${item.price}
                </span>

                <span className="text-xl text-red-500 font-bold ms-2">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </Link>
          </div>
          {/* Add To Cart */}
          <div className="p-2 pt-0">
            <button
              onClick={() => {
                if (cartID.includes(item.id)) {
                  removeFromCart(item.id);
                } else {
                  addToCart(item.id);
                }
              }}
              className="w-full bg-slate-900 hover:bg-black text-white py-2.5 rounded-lg  transition"
            >
              <i className="fa-solid fa-cart-shopping text-white me-2"></i>
              {cartID.includes(item.id) ? "remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <>
      <section className="container mx-auto px-4 mt-5">
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-2xl font-bold">Feature Products</p>
            <p className="text-zinc-500 font-semibold">Handpicked for you</p>
          </div>
          <Link to="/Products">
            <button className="flex items-center text-black font-semibold hover:text-slate-900 transition-all duration-300">
              View all Categories
              <i className="fa-solid fa-arrow-right-long ms-3"></i>
            </button>
          </Link>
        </div>
        <Swiper
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            // clickable: true,
            dynamicMainBullets: 3,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },

            640: {
              slidesPerView: 3,
            },

            768: {
              slidesPerView: 4,
            },

            1024: {
              slidesPerView: 5,
            },
            1400: {
              slidesPerView: 7,
            },
          }}
          modules={[Pagination]}
          className="mySwiper heightOfSwiper mt-5"
        >
          {AllItemsFeature}
        </Swiper>
      </section>
    </>
  );
}
