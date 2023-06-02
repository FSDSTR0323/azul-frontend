import React from "react";
import Logo from "../../../assets/Logo.svg";
// TODO falta agregar logo
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
      
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          
          <span>Ayuda</span>
          <span>compartir</span>
          <span>Carrers</span>
          <span>Testimonios</span>
          <span>Contacto</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@freakyworld.com</span>
          <span>press@freakyworld.com</span>
          <span>contact@freakyworld.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terminos & Condiciones</span>
          <span>Politicas de privacidad</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
