import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Category from "./Components/Category";
import FeatureProducts from "./Components/FeatureProducts";
import SpecialOffer from "./Components/SpecialOffer";
import Footer from "./Components/Footer";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Login = lazy(() => import("./Pages/Login"));
const Products = lazy(() => import("./Pages/Products"));
const Deals = lazy(() => import("./Pages/Deals"));
const About = lazy(() => import("./Pages/About"));
const FavoritePage = lazy(() => import("./Pages/FavoritePage"));
const Cart = lazy(() => import("./Pages/Cart"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const CategoryProducts = lazy(() => import("./Pages/CategoryProducts"));

// context
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Category />
        <FeatureProducts />
        <SpecialOffer />
      </main>
      <Footer />
    </>
  );
}
function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/about" element={<About />} />
        <Route path="/FavoritePage" element={<FavoritePage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/products/category/:slug"
          element={<CategoryProducts />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
