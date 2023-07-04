import React, { useState, useEffect, useContext } from 'react';
import { BsCart2 } from 'react-icons/bs';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from '../../contexts/UserContext';

const CartMenu = () => {
  const { userData } = useContext(UserContext)
  const [count, setCount] = useState(null);
  const [cardsOnCart, setCardsOnCart] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const fetchData = () => {
    if (userData?.on_cart) {
      console.log("Se renderiza de nuevo el carrito y el número de productos es :", userData.on_cart.length)
      setCount(userData.on_cart.length);
      setCardsOnCart(userData.on_cart)
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

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
    if (count) {
      setAnchorEl(event.currentTarget);
    }
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





