import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, orderByVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`${content} LIKED!`, 5));
  };

  const filteredAnecdotes = () => {
    if (filter) {
      return anecdotes.filter((a) => a.content.includes(filter));
    } else {
      return anecdotes;
    }
  };

  return (
    <>
      <button onClick={() => dispatch(orderByVotes())}>order by votes</button>
      {filteredAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
