import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const GenresArrButtons = ({ books, showByGenre }) => {
  let uniqueGenresArr = [];
  books
    .map((b) => b.genres)
    .map((genresArr) => {
      for (let i = 0; i < genresArr.length; i++) {
        !uniqueGenresArr.includes(genresArr[i]) &&
          uniqueGenresArr.push(genresArr[i]);
      }
    });

  return (
    <div>
      {uniqueGenresArr.map((genre) => {
        return (
          <button key={genre} onClick={() => showByGenre(genre)}>
            {genre}
          </button>
        );
      })}
      <button onClick={() => showByGenre(null)}>all genres</button>
    </div>
  );
};

const Books = ({ show }) => {
  const resultBooks = useQuery(ALL_BOOKS);
  const [getFilteredBooks, resultFilteredBooks] = useLazyQuery(BOOKS_BY_GENRE);
  const [filteredBooks, setFilteredBooks] = useState(null);

  const showByGenre = (genreToFilter) => {
    if (!genreToFilter) {
      setFilteredBooks(null);
    } else {
      getFilteredBooks({ variables: { genre: genreToFilter } });
    }
  };

  useEffect(() => {
    if (resultFilteredBooks.data) {
      setFilteredBooks(resultFilteredBooks.data.allBooks);
    }
  }, [resultFilteredBooks]);

  if (!show) {
    return null;
  }

  if (resultBooks.loading || resultFilteredBooks.loading) {
    return <div>loading...</div>;
  }

  const books = resultBooks.data.allBooks;

  const renderBooks = () => {
    const booksToRender = filteredBooks ? filteredBooks : books;
    return booksToRender.map((b) => (
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {renderBooks()}
        </tbody>
      </table>
      <GenresArrButtons books={books} showByGenre={showByGenre} />
    </div>
  );
};

export default Books;
