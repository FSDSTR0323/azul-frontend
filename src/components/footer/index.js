import React from "react";
// TODO falta agregar logo
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link } from '@mui/material';
import { Divider } from '@mui/material';



const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-wrapper">
        <div className="footer-icons">
            <a href="https://twitter.com/wizards_magic" target="_blank" rel="noopener noreferrer">
              <BsTwitter />
            </a>
            <a href="https://www.linkedin.com/company/wizards-of-the-coast/" target="_blank" rel="noopener noreferrer">
              <SiLinkedin />
            </a>
            <a href="https://www.youtube.com/@mtg" target="_blank" rel="noopener noreferrer">
              <BsYoutube />
            </a>
            <a href="https://www.facebook.com/MagicTheGathering.es" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
        </div>
        < Divider orientation="vertical" variant="middle"/>
        <div className="footer-section-columns">
          <Link href="tel:+24453337783" color="inherit" underline="none">244-5333-7783</Link>
          <Link href="mailto:freakyworld.nuclio@gmail.com" color="inherit" underline="none">freakyworld.nuclio@gmail.com</Link>
        </div>
        < Divider orientation="vertical" variant="middle"/>
        <div className="footer-section-columns">
          <span>Terminos & Condiciones</span>
          <span>Politicas de privacidad</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
