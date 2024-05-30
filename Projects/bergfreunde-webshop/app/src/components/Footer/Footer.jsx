import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import { useAuthContext } from "../../contexts/AuthContainer";

const Footer = () => {
  const { user } = useAuthContext();

  return (
    <footer className={style.footer}>
      <div className={style.main__footer}>
        <div className={style.footer__logo}>
          <Link to={ROUTES.home}>
            <img
              className={style.main__footer_logo}
              src="/bergfreunde-logo.svg"
              alt="bergfreunde logo"
            />
          </Link>
        </div>
        <div className={style.footer__links}>
          {/* TODO -- make conditional rendering for dashboard and account links*/}
          <Link to={ROUTES.productList}>Klimschoenen</Link>
          <Link to={ROUTES.basket}>Winkelmand</Link>
          <Link to={ROUTES.account}>Account</Link>
          {user ? (
            user.role === "admin" || "" ? (
              <Link to={ROUTES.dashboard}>Dashboard</Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.secondary__footer}>
        <p className={style.secondary__footer_name}>
          &copy; Lennert Van Geert 2024
        </p>
        <p className={style.secondary__footer_text}>
          This is a school project and not a real website.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
