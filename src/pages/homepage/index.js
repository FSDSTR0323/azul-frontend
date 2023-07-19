import React, { useEffect } from "react";
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


  return (
    <div className="home-container">
      <PublicPageValidator>
        <Header />
        <AboutUs />
        <Catalog />
        <News />
        <Work />
        <Testimonial />
        <Contact />   
        <Footer />  
      </PublicPageValidator> 
    </div>
  );
};


