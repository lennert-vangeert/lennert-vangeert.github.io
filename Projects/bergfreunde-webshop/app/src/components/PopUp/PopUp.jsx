import React, { useEffect } from "react";
import style from "./PopUp.module.css";

const PopUp = ({ text, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Change duration as needed
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [onClose]);

  return <div className={style.popup}>{text}</div>;
};

export default PopUp;
