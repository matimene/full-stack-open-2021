import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const SetBirthyear = ({ setError, authors, token }) => {
  const [birthyear, setBirthyear] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    selectedOption &&
      birthyear &&
      (await editAuthor({
        variables: {
          name: selectedOption.value,
          setBornTo: parseInt(birthyear),
        },
      }));

    setBirthyear(null);
  };

  let options = [];
  authors &&
    authors.map((author) =>
      options.push({ value: author.name, label: author.name })
    );

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          <label>birthyear</label>
          <input onChange={(e) => setBirthyear(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
