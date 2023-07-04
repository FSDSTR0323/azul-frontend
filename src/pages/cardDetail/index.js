import React from "react";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { CardBox } from "./CardBox";
import { PublicPageValidator } from "../../components/publicPageValidator";



export const CardDetail = () => {
  //const [openMenu, setOpenMenu] = useState(false);


  return (
    <PublicPageValidator>    
      <Header />
      <CardBox />
      <Footer />
    </PublicPageValidator>
  );
};




