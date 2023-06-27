import * as React from 'react';
import Menu from '@mui/material/Menu';
import LoginForm from './LoginForm'
import { CgProfile } from "react-icons/cg";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom"
import { UserContext } from "../../../../contexts/UserContext"

export default function BasicMenu() {
  const {userAvatar, setUserAvatar} = React.useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('avatar')
    setUserAvatar()
    handleClose()
  }

  console.log("el user avatar es", userAvatar)

  return (
    <>
      {!window.localStorage.getItem("token") &&
        <>
          <CgProfile
                  onClick={handleClick}
                  className='navbar-icon'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <LoginForm handleClose={handleClose} setUserAvatar={setUserAvatar}></LoginForm>
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
      {window.localStorage.getItem("token") && window.localStorage.getItem("avatar") &&
        <>
          <div  
            onClick={handleClick}
            className='navbar-icon navbar-avatar-container'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img src={window.localStorage.getItem("avatar")} alt="User avatar" className='avatar-navbar-image'/>
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
      {window.localStorage.getItem("token") && !window.localStorage.getItem("avatar") && 
        <>
          <CgProfile
          onClick={handleClick}
          className='navbar-icon'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          /> 
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
