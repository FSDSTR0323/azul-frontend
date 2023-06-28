import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import { useNavigate } from 'react-router-dom';

const CartCount = () => {
  const [count, setCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig.getHeaders());
        const count = userDataRes.data.on_cart.length;
        console.log("La cuenta es:", count);
        setCount(count);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const onClickCart = () => {
    navigate('/cartshop');
  };

  return (
    <>
      {count !== null ? (
        <div>
          <BsCart2 onClick={onClickCart} />
          {count}
        </div>
      ) : (
        <BsCart2 onClick={onClickCart} />
      )}
    </>
  );
};

export default CartCount;
