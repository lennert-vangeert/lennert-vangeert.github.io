import React, { useEffect, useState } from "react";
import { useCountries } from "../../contexts/CountryContext";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import style from "./Detail.module.css";
import formatter from "../../helpers/numberFormatter";

const Detail = () => {
  const { name } = useParams(); // Haalt de parameter 'name' op uit de URL

  const { countryData, isLoading } = useCountries(); // Haalt de landendata op en controleert of het laden bezig is

  const [country, setCountry] = useState(false); // State voor het geselecteerde land
  const [amountPhotos, setAmountPhotos] = useState(1); // State voor het aantal foto's om weer te geven

  // Functie om het aantal foto's te verhogen
  const addPhotos = () => {
    setAmountPhotos(amountPhotos + 1);
  };

  useEffect(() => {
    // Filtert de landendata op basis van de naam
    const filteredCountries = countryData.filter(
      (country) => country.name.common === String(name)
    );

    // Als er precies één land overeenkomt, stel dat land in
    if (filteredCountries.length === 1) setCountry(filteredCountries[0]);
  }, [countryData]);

  // Als de data nog wordt geladen en er geen landendata is, toon de loader
  if (isLoading && !countryData) return <Loader />;
  // Als er geen overeenkomend land is gevonden, toon de NotFound component
  else if (!country) return <NotFound />;
  // Als er een land is gevonden, toon de detailinformatie en foto's
  else
    return (
      <article className={style.container}>
        <div className={style.split}>
          <div className={style.left}>
            <h1 className={style.title}>
              {country.name.common}{" "}
              {country.name.common === country.translations.nld.common
                ? ""
                : `(${country.translations.nld.common})`}
            </h1>
            {console.log(country.translations.nld.common)}
            <article className={style.text_split}>
              <div>
                <h3 className={style.subtitle}>Capital:</h3>
                {country.capital}
                <h3 className={style.subtitle}>Region: </h3>
                {country.region}
                <h3 className={style.subtitle}>Population: </h3>
                {formatter(country.population)}
                <h3 className={style.subtitle}>Area: </h3>
                {formatter(country.area)} km²
                <h3 className={style.subtitle}>languages spoken:</h3>
                <ul>
                  {/* Mapping over de talen van het land */}
                  {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={style.subtitle}>Native name</h3>
                <ul>
                  {/* Mapping over de native name van het land */}
                  {Object.values(country.name.nativeName).map((name) => (
                    <li key={name.common}>{name.common}</li>
                  ))}
                </ul>
                <h3 className={style.subtitle}>Independent</h3>
                {country.independent ? "Yes" : "No"}
                <h3 className={style.subtitle}>UN member</h3>
                {country.unMember ? "Yes" : "No"}
                <h3 className={style.subtitle}>Timezones </h3>
                <ul>
                  {/* Mapping over de tijdzones van het land */}
                  {Object.values(country.timezones).map((timezone) => (
                    <li key={timezone}>{timezone}</li>
                  ))}
                </ul>
                <h3 className={style.subtitle}>Currencies</h3>
                <ul>
                  {/* Mapping over de valuta van het land */}
                  {Object.values(country.currencies).map((currency) => (
                    <li key={currency.name}>
                      {currency.name} {`(${currency.symbol})`}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className={style.right}>
            {/* Toont de vlag van het land */}
            <img
              className={style.flag}
              src={country.flags.svg}
              alt={country.name.common}
            />
          </div>
        </div>

        {/* Mapping over het aantal foto's dat moet worden weergegeven */}
        {[...Array(amountPhotos)].map((_, index) => (
          <div className={style.split} key={index}>
            {/* Toont foto's van Unsplash */}
            <img
              className={style.image}
              src={`https://source.unsplash.com/750x750/?${
                country.name.common
              }&${Math.random()}`}
              alt={country.name.common}
            />
            <img
              className={style.image}
              src={`https://source.unsplash.com/750x750/?${
                country.name.common
              }&${Math.random()}`}
              alt={country.name.common}
            />
          </div>
        ))}
        {/* Toont een knop om meer foto's te laden en hide die knop wanneer amountPhotos 3 of meer is */}
        <div
          {...(amountPhotos >= 3 && { style: { display: "none" } })}
          onClick={addPhotos}
          className={style.center}
        >
          <button className={style.more_button}>Load more photos</button>
        </div>
      </article>
    );
};

export default Detail;
