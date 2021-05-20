import React from "react";
import Part from "./Part";
import { CoursePart } from "./App";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((p, i) => {
        return <Part key={i} part={p} />;
      })}
    </div>
  );
};

export default Content;
