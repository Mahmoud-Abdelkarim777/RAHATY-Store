import "./App.css";
import Navbar from "./Components/Navbar";
// import Hero from './Components/Hero';
// import Category from './Components/Category';
import FeatureProducts from './Components/FeatureProducts';
import SpecialOffer from './Components/SpecialOffer';
import Footer from './Components/Footer';


import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Products from './Pages/Products';
import FavoritePage from './Pages/FavoritePage';
import Cart from './Pages/Cart';

// context
function Home() {
  return (
    <>
      <Navbar/>
      {/* <Hero/> */}
      {/* <Category/> */}
      <FeatureProducts/>
      <SpecialOffer/>
      <Footer/>
    </>
  );
}
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/FavoritePage" element={<FavoritePage/>}/>
        <Route path="/Cart" element={<Cart/>}/>
      </Routes>
  );
}

export default App;
