import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartMenu = () => {
  const [count, setCount] = useState(null);
  const [cardsOnCart, setCardsOnCart] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const fetchData = async () => {
    try {
      const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig.getHeaders());
      console.log("La data recibida cuando se pide la info de usuario es !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", userDataRes.data.on_cart)
      setCount(userDataRes.data.on_cart.length);
      setCardsOnCart(userDataRes.data.on_cart)
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

  // const onClickCart = () => {
  //   navigate('/cartshop');
  // };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: "#ff2d55"
    },
  }));

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {window.localStorage.getItem("token") &&
        count !== null ? (
          <div>
          <IconButton 
            style={{cursor:"pointer"}} 
            // onClick={onClickCart}
            onClick={handleClick}
            // className='navbar-icon'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            // aria-label="cart"
          >
            <StyledBadge badgeContent={count} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          </div>
        ) : (
          <BsCart2 disabled="true" />
        )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
          <div className='cart-box'>
            <div className='results-box'>
              {cardsOnCart.map(e =>  {
                return (
                  <div  key={e._id} className='card-on-cart-box'>
                    <div>
                      {e.name} ({e.set_name}) 
                    </div>
                    <div>
                      {e.price} 
                    </div>
                    <button 
                        className="secondary-button"
                        id="login-form-box-button"
                        onClick={handleClose}
                      >
                        Eliminar
                    </button>
                  </div>
                )
              })
            }
            
            </div>
            </div>
          </Menu>
    </>
  );
};

export default CartMenu;









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

