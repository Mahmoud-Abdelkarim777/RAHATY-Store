import img1 from "../assets/images/img-1.jpg";
import img2 from "../assets/images/img-2.jpg";
import img3 from "../assets/images/img-3.jpg";
import img4 from "../assets/images/img-4.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styleSwiper.css";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
export default function Hero() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <>
      <div className=" mx-auto">
        <Swiper
          pagination={pagination}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center "
              style={{
                backgroundImage: `url(${img1})`,
              }}
            >
              <div className="container mx-auto px-4 flex flex-col items-start ">
                <h1 className="m-0 text-6xl font-bold text-black">
                  Discover Your <br />
                  Style
                </h1>
                <p className="mt-5 text-black ">
                  Explore the latest trends and find
                  <br /> something made for you.
                </p>
                <Link to="/Products">
                  <button className="min-h-[48px] text-white px-4 py-3 mt-5 bg-blue-900 hover:bg-blue-950  rounded-full flex items-center justify-center">
                    Shop Now{" "}
                    <i className="fa-solid fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center "
              style={{
                backgroundImage: `url(${img2})`,
              }}
            >
              <div className="container mx-auto px-4 flex flex-col items-start ">
                <h1 className="m-0 text-6xl font-bold text-black">
                  Upgrade Your <br />
                  Everyday
                </h1>
                <p className="mt-5 text-black ">
                  Discover smart gadgets and the latest
                  <br /> technology.
                </p>
                <Link to="/Products">
                  <button className="min-h-[48px] text-white px-4 py-3 mt-5 bg-blue-900 hover:bg-blue-950  rounded-full flex items-center justify-center">
                    Explore Electronics{" "}
                    <i className="fa-solid fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center "
              style={{
                backgroundImage: `url(${img3})`,
              }}
            >
              <div className="container mx-auto px-4 flex flex-col items-start ">
                <h1 className="m-0 text-6xl font-bold text-black">
                  New Season. <br />
                  New Look.
                </h1>
                <p className="mt-5 text-black ">
                  Check out our newest products and
                  <br /> fresh arrivals.
                </p>
                <Link to="/Products">
                  <button className="min-h-[48px] text-white px-4 py-3 mt-5 bg-blue-900 hover:bg-blue-950  rounded-full flex items-center justify-center">
                    Explore New Arrivals{" "}
                    <i className="fa-solid fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center "
              style={{
                backgroundImage: `url(${img4})`,
              }}
            >
              <div className="container mx-auto px-4 flex flex-col items-start ">
                <h1 className="m-0 text-6xl font-bold text-black">
                  Great Deals, <br />
                  Better Choices
                </h1>
                <p className="mt-5 text-black ">
                  Get amazing products at prices
                  <br /> you'll love.
                </p>
                <Link to="/Products">
                  <button className="min-h-[48px] text-white px-4 py-3 mt-5 bg-blue-900 hover:bg-blue-950  rounded-full flex items-center justify-center">
                    View Deals{" "}
                    <i className="fa-solid fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
