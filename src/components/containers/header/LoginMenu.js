import * as React from 'react';
import Menu from '@mui/material/Menu';
import LoginForm from './LoginForm'
import { CgProfile } from "react-icons/cg";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom"

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <LoginForm></LoginForm>
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
    </div>
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
