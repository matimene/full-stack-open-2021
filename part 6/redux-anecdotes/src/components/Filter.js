import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter <input onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const ConnectedFilter = connect(null, { setFilter })(Filter);

export default ConnectedFilter;
