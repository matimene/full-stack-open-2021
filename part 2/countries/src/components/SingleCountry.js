import React from "react";
import Weather from "./Weather";

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>Spoken Languages</h3>
      {country.languages.map((l, i) => {
        return <div key={i}>{l.name}</div>;
      })}
      <img src={country.flag} alt="country flag" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default SingleCountry;
