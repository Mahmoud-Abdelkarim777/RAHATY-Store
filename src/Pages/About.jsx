import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";


export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-zinc-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              About RAHATYStore
            </span>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-zinc-900">
              Shopping Made Simple.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-zinc-500 leading-7">
              We believe shopping should be simple, enjoyable, and accessible.
              RAHATYStore brings quality products together in one place, making
              your everyday shopping experience easier.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl bg-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
                    alt="RAHATYStore shopping"
                    className="w-full h-[450px] object-cover"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl shadow-xl p-5">
                  <p className="text-3xl font-bold text-zinc-900">10K+</p>

                  <p className="text-sm text-zinc-500 mt-1">Happy Customers</p>
                </div>
              </div>

              {/* Text */}
              <div>
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  Who We Are
                </span>

                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-900">
                  More than just a store.
                </h2>

                <p className="mt-6 text-zinc-500 leading-7">
                  RAHATYStore was created with one simple idea: to make online
                  shopping easier and more enjoyable.
                </p>

                <p className="mt-4 text-zinc-500 leading-7">
                  From everyday essentials to products you love, we carefully
                  bring everything together in one convenient shopping
                  experience.
                </p>

                <button className="mt-7 px-6 py-3 hover:bg-black bg-slate-900 text-white rounded-lg font-medium transition">
                  Explore Our Products
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-zinc-200 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-zinc-900">10K+</h3>
                <p className="mt-2 text-sm text-zinc-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-zinc-900">500+</h3>
                <p className="mt-2 text-sm text-zinc-500">Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-zinc-900">20+</h3>
                <p className="mt-2 text-sm text-zinc-500">Categories</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-zinc-900">4.9/5</h3>
                <p className="mt-2 text-sm text-zinc-500">Customer Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Why Choose Us
              </span>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-900">
                Everything you need in one place.
              </h2>

              <p className="mt-4 text-zinc-500">
                We focus on making every part of your shopping experience simple
                and convenient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
                <div className="mx-auto w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                  <i className="fa-solid fa-truck text-xl text-zinc-800"></i>
                </div>

                <h3 className="mt-5 text-lg font-bold text-zinc-900">
                  Fast Delivery
                </h3>

                <p className="mt-3 text-sm text-zinc-500 leading-6">
                  Get your favorite products delivered quickly and conveniently
                  to your doorstep.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
                <div className="mx-auto w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                  <i className="fa-solid fa-shield-halved text-xl text-zinc-800"></i>
                </div>

                <h3 className="mt-5 text-lg font-bold text-zinc-900">
                  Secure Shopping
                </h3>

                <p className="mt-3 text-sm text-zinc-500 leading-6">
                  Your shopping experience matters to us, with security and
                  privacy at the forefront.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
                <div className="mx-auto w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                  <i className="fa-solid fa-headset text-xl text-zinc-800"></i>
                </div>

                <h3 className="mt-5 text-lg font-bold text-zinc-900">
                  Customer Support
                </h3>

                <p className="mt-3 text-sm text-zinc-500 leading-6">
                  Our team is always ready to help you with any questions or
                  concerns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900 rounded-3xl px-6 py-14 md:px-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to start shopping?
              </h2>

              <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                Discover our collection and find something you'll love today.
              </p>

              <button onClick={() => {
                navigate("/Products")
              }} className="mt-7 bg-white text-zinc-900 px-7 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
