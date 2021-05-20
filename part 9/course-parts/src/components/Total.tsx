import React from "react";

interface TotalProps {
  numberOfExercises: number;
}

const Total = ({ numberOfExercises }: TotalProps) => {
  return <h4>Number of exercises: {numberOfExercises}</h4>;
};

export default Total;
