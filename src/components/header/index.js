/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useContext, useEffect } from "react";
// import Logo from "../../../assets/Logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import LoginMenu from "./LoginMenu"
import BannerBackground from "../../assets/home-banner-background.png";
import Logo from "../../assets/logo-Image.png"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";
import { InboxMenu } from "./InboxMenu";
import { UserContext } from '../../contexts/UserContext';
import Scroll from 'react-scroll'

export const Header = () => {

  const ScrollLink = Scroll.ScrollLink
  const [openMenu, setOpenMenu] = useState(false);
  const { userData } = useContext(UserContext)
  const menuOptions = [
    {
      text: "Inicio",
      icon: <HomeIcon />
    },
    {
      text: "Nostros",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonios",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contactos",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  useEffect(() => {

  }, [userData])

  return (
    <>
      <div className="home-bannerImage-container">
        <img id="logo" src={BannerBackground} alt="" />
      </div>
      <section className="header">
        <nav>
          <div className="nav-logo-container">
            <Link to={"/"}>
              <img src={Logo} alt="" style={{maxWidth:"3.5rem"}}/>
            </Link>
          </div>
          <div className="navbar-links-container">
            <SearchBar/>
            {window.localStorage.getItem("token") && 
              <a>
                <CartMenu className="navbar-cart-icon"/> 
              </a>
            } 
            {window.localStorage.getItem("token") && 
              <a>
                <InboxMenu className="navbar-cart-icon"/> 
              </a>
            }
            <LoginMenu></LoginMenu>        
          </div>
          <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
          </div>
          <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => setOpenMenu(false)}
              onKeyDown={() => setOpenMenu(false)}
            >
              <List>
                {menuOptions.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </nav>
      </section> 
    </>
  );
};