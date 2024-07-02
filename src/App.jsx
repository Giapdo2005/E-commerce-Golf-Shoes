import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ShoeCard from './components/Shoes.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (shoe) => {
    const updatedCart = [...cart, shoe];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (shoeId) => {
    const updatedCart = cart.filter((item) => item.id !== shoeId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);


  return (
    <Router>
      <div>
        <Navbar cart={cart}/>
        <Routes>
          <Route path="/" element={<ShoeCard handleAddToCart={handleAddToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
