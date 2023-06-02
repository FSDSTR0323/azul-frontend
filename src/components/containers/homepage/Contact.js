import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Buscas algo en especial</h1>
      <h1 className="primary-heading">Dejanos saber</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@Freakyworld.com" />
        <button className="secondary-button">Enviar</button>
      </div>
    </div>
  );
};

export default Contact;
