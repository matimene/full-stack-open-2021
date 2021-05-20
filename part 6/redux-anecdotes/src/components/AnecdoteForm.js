import React from "react";
import { connect } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ newAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.createNew.value;
    event.target.createNew.value = "";
    newAnecdote(anecdote);
    setNotification(`${anecdote}, created`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="createNew" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const ConnectedAnecdoteForm = connect(null, { newAnecdote, setNotification })(
  AnecdoteForm
);

export default ConnectedAnecdoteForm;
