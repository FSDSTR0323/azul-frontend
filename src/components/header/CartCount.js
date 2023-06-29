import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import { useNavigate } from 'react-router-dom';

const CartCount = () => {
  const [count, setCount] = useState(null);
  const navigate = useNavigate();
  

  const fetchData = async () => {
    try {
      const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig.getHeaders());
      const count = userDataRes.data.on_cart.length;
      console.log("La cuenta es:", count);
      setCount(count);
      window.localStorage.setItem('carro', count.toString())
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCarroChanged = () => {
    const newCount = window.localStorage.getItem('carro');
    setCount(newCount);
  };

  useEffect(() => {
    window.addEventListener('carroChanged', handleCarroChanged);

    return () => {
      window.removeEventListener('carroChanged', handleCarroChanged);
    };
  }, []);

  const onClickCart = () => {
    navigate('/cartshop');
  };

  return (
    <>
      {window.localStorage.getItem("token") &&
        count !== null ? (
          <div>
            <BsCart2 style={{cursor:"pointer"}} onClick={onClickCart} />
            {count}
          </div>
        ) : (
          <BsCart2 disabled="true" />
        )}
    </>
  );
};

export default CartCount;









// import React, { useState, useEffect } from 'react';
// import { BsCart2 } from 'react-icons/bs';
// import axios from 'axios';
// import { authorizationConfig } from '../../security';
// import { useNavigate } from 'react-router-dom';

// const CartCount = () => {
//   const [count, setCount] = useState(null);
//   const navigate = useNavigate();
  

//   const fetchData = async () => {
//     try {
//       const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig.getHeaders());
//       const count = userDataRes.data.on_cart.length;
//       console.log("La cuenta es:", count);
//       setCount(count);
//       window.localStorage.setItem('carro', count.toString())
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCarroChanged = () => {
//     const newCount = window.localStorage.getItem('carro');
//     setCount(newCount);
//   };

//   useEffect(() => {
//     window.addEventListener('carroChanged', handleCarroChanged);

//     return () => {
//       window.removeEventListener('carroChanged', handleCarroChanged);
//     };
//   }, []);

//   const onClickCart = () => {
//     navigate('/cartshop');
//   };

//   return (
//     <>
//       {window.localStorage.getItem("token") &&
//         count !== null ? (
//           <div>
//             <BsCart2 style={{cursor:"pointer"}} onClick={onClickCart} />
//             {count}
//           </div>
//         ) : (
//           <BsCart2 disabled="true" />
//         )}
//     </>
//   );
// };

// export default CartCount;

