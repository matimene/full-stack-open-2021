import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";
import Filter from "./Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  if (!countries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
