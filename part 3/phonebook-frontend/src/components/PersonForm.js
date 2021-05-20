import React, { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const person = { name, number };
    addPerson(person);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        number:
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
