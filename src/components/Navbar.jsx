import React from 'react';
import { Link } from 'react-router-dom';

function Navbar( { cart }) {
  return(
    <nav className="navbar">
      <h1>Welcome</h1>
      <h1>Golf Sneakers</h1>
      <Link to="/checkout">
        <img className="cart-img" src="./public/shopping-cart.png" alt="Cart" />
        <div className="cart-count">{cart.length}</div>
      </Link>
    </nav>
  );
};

export default Navbar;