import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authorizationConfig } from '../../security';

export const Cart = () => {
  const [cardsOnCart, setCardsOnCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig);
        const cardsOnCartData = userDataRes.data.on_cart;
        setCardsOnCart(cardsOnCartData);
        console.log("cards on cart son: ", cardsOnCartData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Las cartas son: {cardsOnCart}
    </div>
  );
};

export default Cart;



