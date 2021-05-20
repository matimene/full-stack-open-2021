import React from "react";
import { CoursePart } from "./App";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const basePart = () => {
    return (
      <>
        <h3>
          {part.name}: {part.exerciseCount}
        </h3>
      </>
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div>
          {basePart()}
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          {basePart()}
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          {basePart()}
          <p>{part.description}</p>
          <p>submit to: {part.exerciseSubmissionLink}</p>
        </div>
      );

    case "special":
      return (
        <div>
          {basePart()}
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
