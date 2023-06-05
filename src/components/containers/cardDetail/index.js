import React from "react";
import { Header } from "../header";
import Footer from "../footer";
import { CardBox } from "./CardBox";



const handleSubmit = (e) => {
    e.preventDefault();
};

export const CardDetail = () => {
  return (
    <>    
      <Header />
      <CardBox />
      <Footer />
    </>
  );
};
