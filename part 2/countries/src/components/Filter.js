import React from "react";

const Filter = ({ countries, setFilteredCountries }) => {
  function filterCountries(term) {
    const filteredCountries = countries.filter((c) =>
      c.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }

  return (
    <div>
      find countries:
      <input onChange={(e) => filterCountries(e.target.value)} />
    </div>
  );
};

export default Filter;
