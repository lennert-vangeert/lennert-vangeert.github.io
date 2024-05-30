import React from "react";
import style from "./NotFound.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>404 - Not Found</h1>
      <p className={style.text}>The page you're looking for doesn't exist.</p>
      <Link className={style.link} to={ROUTES.home}>Go to the homepage</Link>
    </div>
  );
};

export default NotFound;
