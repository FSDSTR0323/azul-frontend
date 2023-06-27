import React from "react";

import ChooseMeals from "../../assets/choose-image.png";
import DeliveryMeals from "../../assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
  
    {
      image: ChooseMeals,
      title: "escoge lo que quiras",
      text: "texto ",
    },
    {
      image: DeliveryMeals,
      title: "Envio rapido",
      text: " texto",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Resumen</p>
        <h1 className="primary-heading">Como funciona </h1>
        <p className="primary-text">
        Texto
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
