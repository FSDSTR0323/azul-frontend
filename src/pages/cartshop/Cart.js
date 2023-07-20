import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authorizationConfig } from '../../security';

export const Cart = () => {
  const [cardsOnCart, setCardsOnCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders());
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



