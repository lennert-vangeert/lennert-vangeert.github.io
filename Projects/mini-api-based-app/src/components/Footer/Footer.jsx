import React, { useState, useEffect } from "react";
import style from "./Footer.module.css";

// Footer component
const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(true); // State om te controleren of de footer zichtbaar moet zijn

  useEffect(() => {
    // Functie om te controleren of de footer zichtbaar moet zijn bij scrollen
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop; // Scrollpositie van het venster
      const windowHeight = window.innerHeight; // Hoogte van het venster
      const documentHeight = document.documentElement.scrollHeight; // Totale hoogte van het document

      // Controleer of de bodem van de pagina is bereikt
      if (windowHeight + scrollTop >= documentHeight) {
        setIsFooterVisible(false); // Verberg de footer
      } else {
        setIsFooterVisible(true); // Toon de footer
      }
    };

    window.addEventListener("scroll", handleScroll); // Voeg eventlistener toe voor scrollgebeurtenissen

    // Cleanup functie om eventlistener te verwijderen bij het unmounten van de component
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  // Toon de footer, afhankelijk van de isFooterVisible state
  return (
    <div className={isFooterVisible ? style.footer : style.footerHidden}>
      &#169; made with &#10084; by Lennert Van Geert
    </div>
  );
};

export default Footer;
