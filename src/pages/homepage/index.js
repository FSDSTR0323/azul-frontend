import React, { useEffect, useState } from "react";

import axios from 'axios';
// import BannerImage from "../../../assets/home-banner-image.png";
import { AboutUs } from "./AboutUs";
import { authorizationConfig } from '../../security';
import { Catalog } from "./Catalog";
import News from "./News";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import { Header } from "../../components/header"
import Footer from "../../components/footer"
import { PublicPageValidator } from "../../components/publicPageValidator";


export const Homepage = () => {
  const [renderCatalog, setRenderCatalog] = useState(false); 

  return (
    <div className="home-container">
      <PublicPageValidator>
        <Header />
        <AboutUs setRenderCatalog={setRenderCatalog} renderCatalog={renderCatalog} /> 
        <Catalog renderCatalog={renderCatalog}/>
        <News />
        <Footer />  
      </PublicPageValidator> 
    </div>
  );
};


