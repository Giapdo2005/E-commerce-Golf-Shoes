import { useState, useEffect } from "react";
import shoes from "../shoeData";
import axios from "axios";


function ShoeCard({ handleAddToCart }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('Cart updated:', cart);
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  
  const addToCart = async (shoe) => {
    try {
      setCart(prevCart => {
        const updatedCart = [...prevCart, shoe];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      await axios.post("http://localhost:5000/api/cart/add", shoe);
      handleAddToCart(shoe);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="shoe-container">
    {shoes.map((shoe) => (
      <div className="container" key={shoe.id}>
        <div className="img">
          <img src={shoe.image} alt={shoe.name} />
        </div>
        <div className="name">
          {shoe.name}
        </div>
        <div className="price">
          {shoe.price}
        </div>
        <div className="add-to-cart" onClick={() => addToCart(shoe)}>
          Add to Cart
        </div>
      </div>
    ))}
  </div>
  );
}

export default ShoeCard;