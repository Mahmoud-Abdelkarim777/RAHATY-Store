// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../Contexts/style.css";
// import required modules
import { Pagination } from "swiper/modules";

import { useContext } from "react";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import { Link } from "react-router-dom";
export default function Category() {
  const { categories } = useContext(CategoriesContext);
  // console.log(categories);

  const Categories = categories.map((category) => {
    return (
      <SwiperSlide
        className="SwiperSlide height border shadow-sm border-slate-200 rounded-lg"
        key={category.slug}
      >
        <Link to={`/products/category/${category.slug}`}>
          <div className="flex flex-col justify-center items-center">
            <img
              className="category-img w-[120px] h-[120px] rounded-full"
              src={category.image}
              alt="category-image"
            />
            <p className="mt-3 text-base font-semibold">{category.name}</p>
          </div>
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <>
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-2xl font-bold">Shop by Category</p>
            <p className="text-zinc-500 font-semibold">
              Find what you need, all in one place
            </p>
          </div>
          <Link to="/Products">
            <button className="flex items-center text-black font-semibold hover:text-slate-900 transition-all duration-300">
              View all Categories
              <i className="fa-solid fa-arrow-right-long ms-3"></i>
            </button>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 justify-between items-center gap-5">
          <Swiper
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
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
                slidesPerView: 6,
              },

              1280: {
                slidesPerView: 8,
              },
            }}
            modules={[Pagination]}
            className="mySwiper Swiper"
          >
            {Categories}
          </Swiper>
        </div>
      </section>
    </>
  );
}
