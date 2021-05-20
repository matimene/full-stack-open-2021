import React from "react";

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with <input onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
