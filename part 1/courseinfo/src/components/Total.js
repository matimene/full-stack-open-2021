import React from "react";

const Total = ({ parts }) => {
  const totalExercises = parts
    .map((p) => p.exercises)
    .reduce((a, b) => a + b, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
