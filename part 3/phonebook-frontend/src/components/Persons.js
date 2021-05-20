import React from "react";

const Persons = ({ persons, onDelete }) => {
  if (!persons) {
    return <div>Loading phonebook...</div>;
  }
  return persons.map((p, i) => (
    <div key={i}>
      {p.name}: {p.number}
      <button onClick={() => onDelete(p.id)}>delete</button>
    </div>
  ));
};

export default Persons;
