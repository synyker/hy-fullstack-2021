import React, { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const all = good + bad + neutral
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good / all) * 100
  return (
    <div>
      <h1>statistics</h1>
      { all > 0 && (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>
            average {average}
          </p>
          <p>positive {positive}%</p>
        </div>
      )}
      { all == 0 && (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
