import React from "react";

import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import style from "./CountryCard.module.css";

const CountryCard = ({ country }) => {
  return (
    <Link to={`${ROUTES.detail.to}${country.name.common}`}>
      <div className={style.CountryCard}>
        <div className={style.CountryCard__inner}>
          <h2>{country.name.common}</h2>
          <img
            className={style.CountryCard__image}
            src={country.flags.png}
            alt={country.name.common}
          />
          <p>Located in: {country.region}</p>
          <p>Capital: {country.capital}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
