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

export const Homepage = () => {

  useEffect(() => {
    (async () => {
      try {
        const modifiedDataRes = await axios.get('http://localhost:5000/homepage', authorizationConfig)
        console.log("la data modificada es", modifiedDataRes)
      }  
      catch(err) {
          if(err.response.data.name === "TokenExpiredError") {
              window.localStorage.removeItem('token')
          }
      }
    })()
  }, [])


  return (
    <div className="home-container">
      <Header />
      <AboutUs />
      <Catalog />
      <News />
      <Work />
      <Testimonial />
      <Contact />   
      <Footer />   
    </div>
  );
};


