import { createContext, useContext, useState, useEffect } from "react";

// Maakt een context aan voor landendata
const CountryContext = createContext();

// Provider component om landendata te beheren en door te geven aan kinderen
const CountryProvider = ({ children }) => {
  const [countryData, setCountryData] = useState([]); // State voor landendata
  const [isLoading, setIsLoading] = useState(false); // State om laadstatus bij te houden
  const [errors, setErrors] = useState(false); // State om fouten bij te houden

  // Functie om landendata op te halen van een externe bron
  const fetchCountries = async () => {
    setIsLoading(true); // Zet laadstatus op true

    fetch(`https://restcountries.com/v3.1/all`) // Fetch landendata van test.json of de api link
      .then((response) => response.json()) 
      .then((data) => setCountryData(data)) 
      .catch((err) => setErrors(err)) 
      .finally(() => setIsLoading(false)); // Zet laadstatus terug naar false
  };

  useEffect(() => {
    fetchCountries(); // Roep de functie aan om landendata op te halen wanneer de component gemonteerd is
  }, []);

  // Geeft de Provider component terug met de contextwaarde
  return (
    <CountryContext.Provider value={{ countryData, isLoading, errors }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;

// Hook om landendata op te halen van de context
export const useCountries = () => useContext(CountryContext);

//${window.location.origin}/test.json
//https://restcountries.com/v3.1/all