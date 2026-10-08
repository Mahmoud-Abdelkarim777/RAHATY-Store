export default function Footer() {
  return (
    <>
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 mt-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className=" text-3xl font-bold">
                <a
                  href="#"
                  className="flex items-center gap-2 text-3xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
                >
                  <i className="fa-solid fa-bag-shopping "></i>
                  <span>RAHATY</span>
                  <span className="font-normal text-zinc-400">Store</span>
                </a>
              </div>
              <p className="my-3">
                Your one-step shop for the best products, amazing deals and a
                better shopping experience.
              </p>
              <div className="icons flex items-center gap-3">
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-pinterest"></i>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="mb-3">Quick Links</h5>
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">Categories</a>
              <a href="#">Deals</a>
              <a href="#">About Us</a>
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="mb-3">Customer Care</h5>
              <a href="#">Contact Us</a>
              <a href="#">Shopping Info</a>
              <a href="#">Returns & Refunds</a>
              <a href="#">FAQs</a>
              <a href="#">Help</a>
            </div>
            <div>
              <h5>Subscribe to our Newsletter</h5>
              <p className="my-3">
                Get the latest updates and exclusive offers.
              </p>
              <div className="relative">
                <input
                  className="w-full p-2 rounded-full"
                  type="text"
                  placeholder="Enter your email address"
                />
                <i className="fa-solid fa-arrow-right-long ms-3 bg-slate-800 p-2 rounded-full absolute top-1/2 right-[-14px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
