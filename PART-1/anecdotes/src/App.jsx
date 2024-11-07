import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const handleClickAnecdote = () => {
    let newSelected;
    do {
      newSelected = Math.floor(Math.random() * anecdotes.length);
    } while (newSelected === selected);
    setSelected(newSelected);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));
  console.log(mostVotedIndex);
  const allZeroVotes = votes.every(vote => vote === 0);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p><b>{`"${anecdotes[selected]}"`}</b></p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes:</h2>
      {allZeroVotes ? (
        <p>No votes yet.</p>
      ) : (
        <p><b>{`"${anecdotes[mostVotedIndex]}"`}</b></p>
      )}
    </>
  );
}

export default App;
