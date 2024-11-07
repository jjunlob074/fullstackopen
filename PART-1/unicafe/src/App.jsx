import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positiveFeedback = total > 0 ? (good/total)*100 : 0;
  return (
    <>
      {total === 0 ? (
        <p>No Feedback Given</p>
      ) : (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Total: {total}</p>
          <p>Average: {average}</p>
          <p>Positive Feedback: {positiveFeedback}%</p>
        </>
      )}
    </>
  );
}
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h2>Results</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </>
  )
}

export default App