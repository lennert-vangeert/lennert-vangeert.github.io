import React from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
const Header = () => {
  return (
    <header className={style.header}>
      <Link className={style.header_item} to={ROUTES.home}>Home</Link>
      <Link className={style.header_item} to={"https://restcountries.com/"}>API</Link>
    </header>
  );
};

export default Header;
