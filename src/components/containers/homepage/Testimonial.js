import React from "react";

import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonios</p>
        <h1 className="primary-heading">Que nos diferencia</h1>
        <p className="primary-text">
        texto
        </p>
      </div>
      <div className="testimonial-section-bottom">
       
        <p>
         texto
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Equipo</h2>
      </div>
    </div>
  );
};

export default Testimonial;
