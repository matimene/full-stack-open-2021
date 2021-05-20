import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { CURRENT_USER, BOOKS_BY_GENRE } from "../queries";

const Recommend = ({ show }) => {
  const userResult = useQuery(CURRENT_USER);
  const [getFilteredBooks, resultFilteredBooks] = useLazyQuery(BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userResult.data) {
      const favoriteGenre = userResult.data.me.favoriteGenre;
      getFilteredBooks({ variables: { genre: favoriteGenre } });
    } // eslint-disable-next-line
  }, [userResult]);

  useEffect(() => {
    if (resultFilteredBooks.data) {
      setBooks(resultFilteredBooks.data.allBooks);
    }
  }, [resultFilteredBooks]);

  if (!show) {
    return null;
  }

  if (userResult.loading || resultFilteredBooks.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
