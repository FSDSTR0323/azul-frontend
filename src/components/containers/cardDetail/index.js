import React from "react";
import { Header } from "../header";
import Footer from "../footer";
import { CardBox } from "./CardBox";
import { SellMenu } from "./SellMenu"




/*const handleSubmit = (e) => {
    e.preventDefault();
};*/

export const CardDetail = () => {
  //const [openMenu, setOpenMenu] = useState(false);


  return (
    <>    
      <Header />
      <CardBox />
      <SellMenu/>
      <Footer />
    </>
  );
};


























/*import React from "react";
import { Header } from "../header";
import Footer from "../footer";
import { CardBox } from "./CardBox";
import SellMenu from "./SellMenu"




const handleSubmit = (e) => {
    e.preventDefault();
};

export const CardDetail = () => {
  return (
    <>    
      <Header />
      <CardBox />
      <SellMenu/> 
      <Footer />
    </>
  );
};*/
