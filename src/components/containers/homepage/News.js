import React from "react";
import AboutBackground from "../../../assets/about-background.png";
// import AboutBackgroundImage from "../../../assets/about-background-image.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const News = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
       
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading"> Noticias</p>
        <h1 className="primary-heading">
          Cartas mas vendidas 
        </h1>
        <p className="primary-text">
          
        </p>
        <p className="primary-text">
         Texto
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">mas informacion</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
