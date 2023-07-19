import * as React from 'react';
import Menu from '@mui/material/Menu';
import LoginForm from './LoginForm'
import { CgProfile } from "react-icons/cg";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export default function BasicMenu() {
  const {userData, setUserData, userAvatar, setUserAvatar, isLoggedDummy, setIsLoggedDummy, userDataChangeDummy} = React.useContext(UserContext)
  // const [userAvatar, setUserAvatar] = React.useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: "#ff2d55"
    },
  }));

  React.useEffect(() => {
  }, [userAvatar, userData])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    setUserData()
    handleClose()
  }

  return (
    <>
      {!window.localStorage.getItem("token") &&
        <>
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
            <StyledBadge color="secondary">
              <CgProfile />
            </StyledBadge>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <LoginForm handleClose={handleClose} userData={userData} setUserData={setUserData} isLoggedDummy={isLoggedDummy} setIsLoggedDummy={setIsLoggedDummy}></LoginForm>
            <Divider variant="middle" />
            <div className='login-form-box'>
              <p>¿Aún no estás registrado?</p>
              <Link to={'/register'} style={{ textDecoration:"none" }}>
                <button 
                  className="secondary-button"
                  id="login-form-box-button"
                  onClick={handleClose}
                >
                  Crear una cuenta
                </button>
              </Link>

            </div>
          </Menu>
        </>
      }
      {window.localStorage.getItem("token") 
      && userAvatar
      &&
        <>
          <div  
            onClick={handleClick}
            className='navbar-icon navbar-avatar-container'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img src={userAvatar} alt="User avatar" className='avatar-navbar-image'/>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className='logged-user-menu'>
              <a href="/profile" className='profile-anchor'>Mi perfil</a>
              <Divider variant="middle" />
              <div className='login-form-box'>
                <Link to={'/'} style={{ textDecoration:"none" }}>
                  <button 
                    className="secondary-button"
                    id="logged-form-box-button"
                    onClick={handleLogOut}
                    >
                    Log out
                  </button>
                </Link>
              </div>    
            </div>
          </Menu>
        </>
      }
      {window.localStorage.getItem("token") 
      && !userAvatar
      && 
        <>
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
            <StyledBadge color="secondary">
              <CgProfile />
            </StyledBadge>
          </IconButton>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
          >
            <a href="/profile">Mi perfil</a>
            <Divider variant="middle" />
            <div className='login-form-box'>
              <Link to={'/'} style={{ textDecoration:"none" }}>
                <button 
                  className="secondary-button"
                  id="login-form-box-button"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              </Link>
            </div>
          </Menu>
        </>
      }
    </>
  );
}
  

//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Dashboard
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
