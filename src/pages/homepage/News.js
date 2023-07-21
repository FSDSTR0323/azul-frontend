import React from "react";
import AboutBackground from "../../assets/about-background.png";
// import AboutBackgroundImage from "../../../assets/about-background-image.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";
import comander from "../../assets/comander.png"

const News = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="commander">
      <img src={comander} alt="Commander" />
      </div>

      <div className="about-section-image-container">
       
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading"> Noticias</p>
        <h1 className="primary-heading">
        Preordena Commander Masters
        </h1>
        <p className="primary-text">
          
        </p>
        <p className="primary-text">
        Todo el poder, todas las reimpresiones codiciadas, toda la coleccionabilidad inigualable, todo hecho para el formato más popular de Magic, todo aquí. ¡Puedes reservar Commander Masters hoy!
        </p>
        <div className="about-buttons-container">
        <button className="secondary-button" onClick={() => window.open("https://magic.wizards.com/es/news")}>mas informacion</button>
          <button className="watch-video-button"onClick={() => window.open("https://www.youtube.com/watch?v=KhBUSkuRd74")}>
          
            <BsFillPlayCircleFill /> Watch Video
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default News;
