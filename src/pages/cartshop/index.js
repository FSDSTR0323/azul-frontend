import React from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { Cart } from "./Cart";




export const CartShop = () => {
  //const [openMenu, setOpenMenu] = useState(false);


  return (
    <>    
      <Header />
      <Cart />
      <Footer />
    </>
  );
};
