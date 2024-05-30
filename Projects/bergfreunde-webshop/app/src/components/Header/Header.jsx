import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import { useAuthContext } from "../../contexts/AuthContainer";

const Header = () => {
  const windowWidth = window.innerWidth;
  const { user, logout } = useAuthContext();
  return (
    <header className={style.header}>
      {windowWidth > 768 ? (
        <div className={style.secondary__header}>
          {user ? (
            user.role === "admin" || "" ? (
              <Link to={ROUTES.dashboard}>Dashboard</Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Link to={ROUTES.basket}>Winkelmand</Link>
          {user ? <Link to={ROUTES.account}>Account</Link> : ""}
          {user ? (
            <p onClick={logout}>Log uit</p>
          ) : (
            <Link to={ROUTES.login}>Log in</Link>
          )}
        </div>
      ) : (
        <div className={style.secondary__header}>
          <Link to={ROUTES.dashboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="30"
              viewBox="0 0 33 30"
            >
              <path
                id="Icon_akar-dashboard"
                data-name="Icon akar-dashboard"
                d="M3,7.5a3,3,0,0,1,3-3h9v27H6a3,3,0,0,1-3-3Zm18-3h9a3,3,0,0,1,3,3V15H21ZM21,21H33v7.5a3,3,0,0,1-3,3H21Z"
                transform="translate(-1.5 -3)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </Link>
          {user ? (
            <Link to={ROUTES.account}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <path
                  id="Icon_material-account-circle"
                  data-name="Icon material-account-circle"
                  d="M18,3A15,15,0,1,0,33,18,15.005,15.005,0,0,0,18,3Zm0,6a5.25,5.25,0,1,1-5.25,5.25A5.256,5.256,0,0,1,18,9Zm0,21a12.012,12.012,0,0,1-9.21-4.32,14.92,14.92,0,0,1,18.42,0A12.012,12.012,0,0,1,18,30Z"
                  transform="translate(-3 -3)"
                  fill="#fff"
                />
              </svg>
            </Link>
          ) : (
            ""
          )}

          <Link to={ROUTES.basket}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32.181"
              height="27.58"
              viewBox="0 0 32.181 27.58"
            >
              <g
                id="Icon_akar-basket"
                data-name="Icon akar-basket"
                transform="translate(-1.91 -3.92)"
              >
                <path
                  id="Path_33"
                  data-name="Path 33"
                  d="M3.465,16.863A1.5,1.5,0,0,1,4.92,15H31.08a1.5,1.5,0,0,1,1.455,1.863L29.819,27.728A3,3,0,0,1,26.909,30H9.092a3,3,0,0,1-2.91-2.272L3.465,16.865Z"
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                <path
                  id="Path_34"
                  data-name="Path 34"
                  d="M13.5,21v3m9-3v3M9,15l6-9m12,9L21,6"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </Link>
          {user ? (
            <svg
              onClick={logout}
              xmlns="http://www.w3.org/2000/svg"
              width="33.757"
              height="33.75"
              viewBox="0 0 33.757 33.75"
            >
              <g
                id="Icon_core-account-logout"
                data-name="Icon core-account-logout"
                transform="translate(34.875 34.875) rotate(180)"
              >
                <path
                  id="Path_56"
                  data-name="Path 56"
                  d="M5.425,19.127H24.732v-2.25H5.425L10.7,11.6h0L9.111,10.009,1.118,18h0L9.111,26,10.7,24.4h0L5.425,19.127Z"
                  fill="#fff"
                />
                <path
                  id="Path_57"
                  data-name="Path 57"
                  d="M11.25,1.125v2.25H32.625v29.25H11.25v2.25H34.875V1.125Z"
                  fill="#fff"
                />
              </g>
            </svg>
          ) : (
            ""
          )}
        </div>
      )}
      <div className={style.main__header}>
        <Link to={ROUTES.home}>
          <img
            className={style.main__header_logo}
            src="/bergfreunde-logo.svg"
            alt="bergfreunde logo"
          />
        </Link>
        <div className={style.main__header_links}>
          <Link to={ROUTES.productList}>Klimschoenen</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
