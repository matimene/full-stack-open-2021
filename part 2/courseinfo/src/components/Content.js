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
      {parts.map((p) => (
        <Part key={p.id} part={p} />
      ))}
    </div>
  );
};

export default Content;
