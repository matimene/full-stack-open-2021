import React from "react";
import SingleCountry from "./SingleCountry";

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    return <SingleCountry country={filteredCountries[0]} />;
  }

  return (
    <div>
      {filteredCountries.length > 10
        ? "Too many matches, specify another filter"
        : filteredCountries.map((c, i) => {
            return <div key={i}>{c.name}</div>;
          })}
    </div>
  );
};

export default Countries;
