import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <div>No feedback yet</div>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>value</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"all"} value={all} />
          <Statistic text={"average"} value={average} />
          <Statistic text={"positive"} value={positive} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
