import Navbar from "./../Components/Navbar";

import { CartContext } from "../Contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartID, quantities, removeFromCart, handleIncrease, handleDecrease } =
    useContext(CartContext);
  useEffect(() => {
    if (cartID.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const requests = cartID.map((id) => {
      return axios.get(`https://dummyjson.com/products/${id}`);
    });

    Promise.all(requests)
      .then((responses) => {
        const productsData = responses.map((res) => res.data);

        setProducts(productsData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartID]);

  const AllProducts = products.map((product) => {
    return (
      <div
        key={product.id}
        className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-5"
      >
        {/* Product Image */}
        <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-lg overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {product.category}
                </p>
              </div>
              <button
                onClick={() => {
                  removeFromCart(product.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            {/* Quantity */}
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleDecrease(product.id)}
                disabled={(quantities[product.id] || 1) === 1}
                className="px-3 py-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <span className="px-4 font-semibold">
                {quantities[product.id] || 1}
              </span>
              <button
                onClick={() => handleIncrease(product.id)}
                disabled={(quantities[product.id] || 1) >= 5}
                className="px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"

              >
                +
              </button>
            </div>
            {/* Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-slate-800">
                {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-green-600">
                {Math.round(product.discountPercentage)}% OFF
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });
  const subTotal = products.reduce(
    (total, product) => total + product.price * (quantities[product.id] || 1),
    0,
  );
  const discount = products.reduce((total, product) => {
    const quantity = quantities[product.id] || 1;

    return (
      total + (product.price * product.discountPercentage * quantity) / 100
    );
  }, 0);
  const shipping = subTotal > 0 ? 10 : 0;
  const total = subTotal + shipping - discount;
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg font-semibold">Loading cart...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 min-h-[500px] flex flex-col justify-center items-center text-center">
        <i className="fa-solid fa-cart-shopping text-6xl text-slate-900 mb-5"></i>

        <h2 className="text-2xl font-bold text-slate-800">
          Your Cart is Empty
        </h2>

        <p className="text-slate-500 mt-2">
          Looks like you haven't added anything to your cart yet.
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
      <section className="py-10 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
            <p className="text-slate-500 mt-2">
              Review your items and complete your order.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Products */}
            <div className="lg:col-span-2 space-y-4">
              {AllProducts}
              {/* Shipping Information */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                  <textarea
                    placeholder="Full Address"
                    rows="3"
                    className="md:col-span-2 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
                  ></textarea>
                </div>
              </div>
              {/* Payment */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 border border-slate-300 rounded-lg p-4 cursor-pointer hover:border-black">
                    <input type="radio" name="payment" defaultChecked />
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-slate-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 border border-slate-300 rounded-lg p-4 cursor-pointer hover:border-black">
                    <input type="radio" name="payment" />
                    <div>
                      <p className="font-semibold">Credit / Debit Card</p>
                      <p className="text-sm text-slate-500">
                        Secure online payment.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-5">
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{subTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>{shipping.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-lg font-bold">Total</span>

                    <span className="text-2xl font-bold text-red-500">
                      {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-slate-900 hover:bg-black text-white py-3 rounded-lg font-semibold transition">
                  <i className="fa-solid fa-lock me-2"></i>
                  Place Order
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-4">
                  <i className="fa-solid fa-shield-halved"></i>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
