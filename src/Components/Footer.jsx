import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 mt-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className=" text-3xl font-bold">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-3xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
                >
                  <i className="fa-solid fa-bag-shopping "></i>
                  <span>RAHATY</span>
                  <span className="font-normal text-zinc-400">Store</span>
                </Link>
              </div>
              <p className="my-3">
                Your one-step shop for the best products, amazing deals and a
                better shopping experience.
              </p>
              <div className="icons flex items-center gap-3">
                <a
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://twitter.com/"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
                  href="https://www.youtube.com/"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="https://www.pinterest.com/"
                  aria-label="Pinterest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-pinterest"></i>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3">Quick Links</p>
              <Link to="/">Home</Link>
              <Link to="/Products">Products</Link>
              <Link to="/">Categories</Link>
              <Link to="/Deals">Deals</Link>
              <Link to="/About">About Us</Link>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3">Customer Care</p>
              <Link to="/">Contact Us</Link>
              <Link to="/">Shopping Info</Link>
              <Link to="/">Returns & Refunds</Link>
              <Link to="/">FAQs</Link>
              <Link to="/">Help</Link>
            </div>
            <div>
              <p>Subscribe to our Newsletter</p>
              <p className="my-3">
                Get the latest updates and exclusive offers.
              </p>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full p-2 rounded-full text-black"
                  placeholder="Enter your email address"
                />
                <i className="fa-solid fa-arrow-right-long ms-3 bg-slate-900 hover:bg-black p-2 rounded-full absolute top-1/2 right-[-14px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
