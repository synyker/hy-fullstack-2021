import React, { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handler={() => setGood(good + 1)}/>
      <Button text={"neutral"} handler={() => setNeutral(neutral + 1)}/>
      <Button text={"bad"} handler={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = (props) => {
  const { text, handler } = props;
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const all = good + bad + neutral
  const average = `${(good * 1 + neutral * 0 + bad * -1) / all}%`
  const positive = (good / all) * 100
  return (
    <div>
      <h1>statistics</h1>
      { all > 0 && (
        <div>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={all} />
          <StatisticsLine text={"average"} value={average} />
          <StatisticsLine text={"positive"} value={positive} />
        </div>
      )}
      { all == 0 && (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticsLine = (props) => {
  const { text, value } = props;
  return (
    <p>{text} {value}</p>
  )
}

export default App;
