import React, { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button label={"good"} onClick={() => setGood(good + 1)} />
        <Button label={"neutral"} onClick={() => setNeutral(neutral + 1)} />
        <Button label={"bad"} onClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
