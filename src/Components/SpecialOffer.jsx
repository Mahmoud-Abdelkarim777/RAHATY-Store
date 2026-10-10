import accessories from "../assets/images/accessories.webp";
import { Link } from "react-router-dom";
export default function SpecialOffer() {
  return (
    <>
      <section className="container mx-auto px-4 mt-5">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#ebf0ff] to-[#ccd0f0]">
          <div>
            <p className="text-zinc-500 font-semibold">SPECIAL OFFER</p>
            <h1 className="text-3xl font-bold my-2">Get up to 50% off</h1>
            <p className="text-zinc-500 font-semibold">
              On selected electronics and accessories.
            </p>
            <Link to="/Products">
              <button className="flex items-center justify-center text-white font-semibold bg-slate-900 hover:bg-black px-4 py-1 mt-2 rounded-full">
                Shop Now
                <i className="fa-solid fa-arrow-right-long ms-3"></i>
              </button>
            </Link>
          </div>
          <div>
            <img
              width="519"
              height="481"
              className="w-48 h-auto"
              loading="lazy"
              decoding="async"
              src={accessories}
              alt="accessories"
            />
          </div>
        </div>
      </section>
    </>
  );
}
