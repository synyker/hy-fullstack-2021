import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [upvotes, setUpvotes] = useState(Array(anecdotes.length).fill(0));
  const [mostUpvoted, setMostUpvoted] = useState(null);

  const randomAnectode = () => {
    const rnd = Math.floor(Math.random() * anecdotes.length);
    setSelected(rnd);
  };

  const upvoteAnectode = () => {
    const copy = [...upvotes];
    copy[selected] += 1;
    setUpvotes(copy);
    setMostUpvoted(copy.indexOf(Math.max(...copy)));
  };

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {upvotes[selected]} votes</p>
      <button onClick={upvoteAnectode}>vote</button>
      <button onClick={randomAnectode}>next anectode</button>

      <h1>Anectode with most votes</h1>
      <p>{anecdotes[mostUpvoted]}</p>
      <p>{upvotes[mostUpvoted]}</p>
    </div>
  );
};

export default App;
