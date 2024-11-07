import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total > 0 ? ((good - bad) / total).toFixed(1) : 0;
  const positiveFeedback = total > 0 ? ((good / total) * 100).toFixed(1) : 0;


  return (
    <>
      {total === 0 ? (
        <p>No Feedback Given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="+Feedback" value={`${positiveFeedback}%`} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>Results</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
