import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from '../../contexts/UserContext';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';

const CartMenu = () => {
  const { userData, userDataChangeDummy, setUserDataChangeDummy } = useContext(UserContext)
  const [count, setCount] = useState(null);
  const [cardsOnCart, setCardsOnCart] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const fetchData = () => {
    if (userData?.on_cart) {
      setCount(userData.on_cart.length);
      setCardsOnCart(userData.on_cart)
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

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

  const handleDeleteCard = async (card_id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/cards/deleteCardFromCart`, {_id: card_id}, authorizationConfig.getHeaders())
      setUserDataChangeDummy(!userDataChangeDummy)
      if (userData.on_cart.length === 1) {
        handleClose()
      }

    } catch(err) {
      console.log("EL ERROR ES", err)
    }
  }

  const handleBuyCards = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/cards/buyCardsOnCart`, {}, authorizationConfig.getHeaders())
      setUserDataChangeDummy(!userDataChangeDummy)
      handleClose()
    } catch(err) {
      console.log("EL ERROR ES", err)
    }
  }

  return (
    <>
      {window.localStorage.getItem("token") &&
        count > 0 ? (
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
        ) : (
        <IconButton disabled>
          <StyledBadge color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
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
            <div className='cart-items-box'>
              {cardsOnCart.map(card =>  {
                return (
                  <>
                  <div  key={card._id} className='card-on-cart-box'>
                    <div id="cart-text">
                      <p>
                        {card.name} <span id="cart-collection">({card.set_name})</span> 
                      </p>
                      <p>
                        Precio: <span>{card.price}</span> €
                      </p>
                    </div>
                    <div id="cart-delete-button">
                      <IconButton aria-label="delete" onClick={() => handleDeleteCard(card._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Divider />
                  </>
                )
              })
              }
            </div>
            <Divider style={{background:'black', marginBottom:"10px"}}/>
            <div className="cart-button-wrapper">
              <button 
                className="secondary-button"
                id="cart-button"
                onClick={handleBuyCards}
              >
                Comprar
              </button>
            </div>
        </div>
          </Menu>
    </>
  );
};


export default CartMenu;





