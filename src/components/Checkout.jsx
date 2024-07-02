import axios from 'axios';
import React, { useState, useEffect } from 'react';


const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/cart');
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

function Checkout({ cart, removeFromCart }){
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCartItems();
      setCartItems(data);
    };
    fetchData();
  }, []);

  const handleRemoveFromCart = async (shoeId) => {
    try {
      removeFromCart(shoeId);
      await axios.delete(`http://localhost:5000/api/cart/remove/${shoeId}`)
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const calculateSubTotal = () => {
    return cart.reduce((total, shoe) => {
      const price = parseFloat(shoe.price.replace('$', ''));
      return total + price;
    }, 0); 
  }

  const calculateTax = () => {
    return (calculateSubTotal() * 0.1);
  }

  const calculateTotal = () => {
    const subtotal = calculateSubTotal();
    const tax = calculateTax();
    const shipping = 10.25;
    return (subtotal + tax + shipping);
  }
  return (
    <div className='checkout-container'>
      <div className='left-side'>
        <div className='cart-items'>
          Your Cart ({cart.length})
        </div>
        {cart.map((shoe, index) => (
          <div className='cart-shoes' key={index}>
            <div className="img-shoes">
              <img src={shoe.image} alt={shoe.name} />
            </div>
            <div className='shoes-info'>
              <div className='info1'>
                {shoe.name}
              </div>
              <div className='shoe-price'>
                Price: {shoe.price}
              </div>
              <div className='shoe-brand'>
                Shoe Brand: {shoe.brand}
              </div>
              <div className="shoe-quantity">
                Quantity: 1
              </div>
              <div className='buttons'>
                <button className='edit-btn'>
                  Edit
                </button>
                <button className='remove-btn' onClick={() => handleRemoveFromCart(shoe.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))};
      </div>
      <div className='cart-amount'>
        <div className='summary'>
          SUMMARY
        </div>
        <div className='subtotal'>
          <div>
            Subtotal:
          </div>
          <div className='price'>
            ${calculateSubTotal().toFixed(2)}
          </div>
        </div>
        <div className='tax'>
          <div>
            Estimated Tax:
          </div>
          <div className='price'>
            ${calculateTax().toFixed(2)}
          </div>
        </div>
        <div className='shipping'>
          <div>
            Shipping Cost: 
          </div>
          <div className='price'>
            $10.25
          </div>
        </div>
        <div className='total-cost'>
          <div>
            Total Cost:
          </div>
          <div className='price'>
            ${calculateTotal().toFixed(2)}
          </div>
        </div>
        <button className='checkout-btn'>
          CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default Checkout;