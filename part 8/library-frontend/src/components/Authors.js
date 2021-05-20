import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthyear from "./SetBirthyear";

const Authors = ({ show, setError, token }) => {
  const resultAuthors = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (resultAuthors.loading) {
    return <div>loading...</div>;
  }

  const authors = resultAuthors.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <SetBirthyear token={token} setError={setError} authors={authors} />
      )}
    </div>
  );
};

export default Authors;
