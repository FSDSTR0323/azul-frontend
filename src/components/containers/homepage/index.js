import React from "react";

// import BannerImage from "../../../assets/home-banner-image.png";
import { AboutUs } from "./AboutUs";

import { Catalog } from "./Catalog";
import News from "./News";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import { Header } from "../main/header"
import Footer from "../main/footer"

export const Homepage = () => {
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


