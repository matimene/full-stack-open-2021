import React from "react";

const Part = ({ part }) => {
  return (
    <p>
      {part.name}: {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p, i) => (
        <Part key={i} part={p} />
      ))}
    </div>
  );
};

export default Content;
