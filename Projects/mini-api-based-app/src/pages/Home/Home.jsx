import React, { useEffect, useState } from "react";
import { useCountries } from "../../contexts/CountryContext";
import CountryCard from "../../components/CountryCard/CountryCard";
import style from "./Home.module.css";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

// Home component
const Home = () => {
  const { countryData, isLoading, errors } = useCountries(); // Haalt landendata, laadstatus en eventuele fouten op

  const [filteredData, setFilteredData] = useState([]); // State voor gefilterde data

  const [countryformData, setCountryFormdata] = useState(""); // State voor ingevoerde landnaam in zoekveld
  const [continentFormData, setContinentFormData] = useState(""); // State voor ingevoerde continentnaam in zoekveld

  // Functie om data te filteren op basis van ingevoerde land- en continentnaam
  const filter = () => {
    let dataCopy = structuredClone(countryData); // Kopieer de landendata om originele data niet te wijzigen
    dataCopy = dataCopy.filter(
      (dataItem) =>
        dataItem.name.common
          .toLowerCase()
          .includes(countryformData.toLocaleLowerCase()) &&
        dataItem.region
          .toLowerCase()
          .includes(continentFormData.toLocaleLowerCase())
    );
    setFilteredData(dataCopy);
  };

  useEffect(() => {
    if (countryData) filter(); // Filter de data als de landendata beschikbaar is
  }, [countryformData]);

  useEffect(() => {
    if (countryData) filter(); // Filter de data als de landendata beschikbaar is
  }, [continentFormData]);

  useEffect(() => {
    if (!isLoading && !errors) setFilteredData(countryData); // Stel gefilterde data in als er geen laadstatus en fouten zijn
  }, [isLoading]);

  // Als de data aan het laden is, toon de loader
  if (isLoading) return <Loader />;
  // Als er geen laadstatus is, toon de zoekvelden en de gefilterde landkaarten
  else
    return (
      <div className={style.outer_container}>
        <div className={style.searchFields}>
          {/* Zoekveld voor landnaam */}
          <label className={style.filter} htmlFor="searchCountry">
            Country:{" "}
            <input
              id="searchCountry"
              name="searchCountry"
              type={"text"}
              value={countryformData}
              onChange={(e) => setCountryFormdata(e.currentTarget.value)}
            />
          </label>
          {/* Zoekveld voor continentnaam */}
          <label className={style.filter} htmlFor="searchContinent">
            Continent:{" "}
            <input
              id="searchContinent"
              name="searchContinent"
              type={"text"}
              value={continentFormData}
              onChange={(e) => setContinentFormData(e.currentTarget.value)}
            />
          </label>
        </div>
        <div className={style.container}>
          {
            // Controleren of er gefilterde data beschikbaar is
            filteredData.length !== 0 ? (
              // Als er data is, maak een landkaart voor elk land
              filteredData.map((country, index) => {
                return <CountryCard key={index} country={country} />;
              })
            ) : (
              // Als er geen gefilterde data is, toon een "Noresults" boodschap
              <NotFound />
            )
          }
        </div>
      </div>
    );
};

export default Home;
