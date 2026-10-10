import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import SearchOverlay from "./SearchOverlay";
export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { favoriteIDs } = useContext(FavoritesContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [limtedCat, setLimtedCat] = useState([]);
  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");

    if (!ACCESS_TOKEN) {
      return;
    }
    axios
      .get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const name = res.data.firstName;
        setName(name);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setName("");
          return;
        } // Log only unexpected errors, not authentication failures. console.error("Failed to fetch user:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category-list?limit=8")
      .then((res) => {
        const limtedData = res.data.slice(0, 6);
        console.log(limtedData);
        setLimtedCat(limtedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const cat = limtedCat.map((c) => {
    return (
      <button key={c}>
        <Link
          to={`/products/category/${c}`}
          className="block px-4 py-2 text-sm text-black hover:text-zinc-500 hover:bg-zinc-200 "
        >
          {c}
        </Link>
      </button>
    );
  });
  return (
    <>
      <nav className="container mx-auto px-4 bg-slate-900 text-white py-4 flex md:block items-start md:items-center justify-between relative">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="text-black text-3xl font-bold">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl md:text-3xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
            >
              <i className="fa-solid fa-bag-shopping "></i>
              <span>RAHATY</span>
              <span className="font-normal text-gray-400 ">Store</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
              </span>

              <input
                onFocus={() => setSearchOpen(true)}
                className="placeholder:italic placeholder:text-slate-400 block bg-white text-black w-[450px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="search"
                name="search"
                id="search"
                autoComplete="off"
              />
            </label>
          </div>
          <div className="flex justify-between items-center gap-5 md:gap-10">
            <Link
              to="/FavoritePage"
              aria-label={`Favorite products, ${favoriteIDs.length} items`}
              className="relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-white"
            >
              <i className="fa-solid fa-heart" aria-hidden="true"></i>

              <span
                aria-hidden="true"
                className="flex items-center justify-center bg-red-700 text-white min-w-5 h-5 px-1 rounded-full absolute -top-1 -right-1 text-sm"
              >
                {favoriteIDs.length}
              </span>
            </Link>

            <Link
              to="/Cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-white"
            >
              <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>

              <span
                aria-hidden="true"
                className="flex items-center justify-center bg-red-700 text-white min-w-5 h-5 px-1 rounded-full absolute -top-1 -right-1 text-sm"
              >
                {cartCount}
              </span>
            </Link>

            {name ? (
              <span className="text-xl font-semibold">Hello {name}!</span>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex justify-center items-center text-white cursor-pointer"
              >
                <i className="fa-solid fa-user"></i>
                <p>Login/ Sign Up</p>
              </Link>
            )}
          </div>
        </div>
        {/* menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t font-bold border-zinc-200 rounded-lg flex flex-col p-5 gap-1 md:hidden z-50">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-lg text-sm text-black hover:text-zinc-500 hover:bg-zinc-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-4 py-2.5 rounded-lg text-sm text-black hover:text-zinc-500 hover:bg-zinc-200"
            >
              Products
            </Link>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm text-black hover:text-zinc-500 hover:bg-zinc-200 bg-transparent border-0 cursor-pointer"
            >
              Categories
              <svg
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m1 1 4 4 4-4"
                  stroke="#71717b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {dropdownOpen && <div className="flex flex-col pl-4">{cat}</div>}
            <Link
              to="/deals"
              className="px-4 py-2.5 rounded-lg text-sm text-black hover:text-zinc-500 hover:bg-zinc-200"
            >
              Deals
            </Link>
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-lg text-sm text-black hover:text-zinc-500 hover:bg-zinc-200"
            >
              About
            </Link>
            <div className="px-3">
              <Link
                to="/login"
                className="lg:hidden flex justify-center items-center gap-5"
              >
                <i className="fa-solid fa-user"></i>
                <p>Login/ Sign Up</p>
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="hidden md:flex items-center gap-8 font-bold container mx-auto px-4 bg-slate-900 text-white">
        <Link to="/" className="text-sm text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/products" className="text-sm text-white hover:text-gray-300">
          Products
        </Link>
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-sm text-white hover:text-gray-300 cursor-pointer bg-transparent border-0 py-2">
            Categories
            <svg
              className="transition-transform group-hover:rotate-180"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 1 4 4 4-4"
                stroke="#71717b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {cat}
          </div>
        </div>
        <Link to="/deals" className="text-sm text-white hover:text-gray-300">
          Deals
        </Link>
        <Link to="/about" className="text-sm text-white hover:text-gray-300">
          About
        </Link>
      </div>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
