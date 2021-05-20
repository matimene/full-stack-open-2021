import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));

  const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  const giveVote = (anecRef) => {
    const copy = [...points];
    copy[anecRef] += 1;
    setPoints(copy);
  };

  const getMostVotedIndex = () => {
    let higher = Math.max(...points);
    return points.indexOf(higher);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={() => giveVote(selected)}>vote</button>
      <button onClick={() => setSelected(getRandomNum(5))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getMostVotedIndex()]}</div>
    </>
  );
};

export default App;
