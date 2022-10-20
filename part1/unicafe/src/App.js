import { useState } from "react"
import "./App.css"

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({data}) => {
  if(data.good === 0 && data.neutral === 0 && data.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={data.good} />
        <StatisticLine text="neutral" value ={data.neutral} />
        <StatisticLine text="bad" value ={data.bad} />
        <StatisticLine text="all" value ={data.all} />
        <StatisticLine text="average" value ={data.average} />
        <StatisticLine text="positive" value ={data.positive} />
      </tbody>
    </table>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${(good / all) * 100} %`
  const data = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': all,
    'average': average,
    'positive': positive
  }


  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistic</h1>
      <Statistics data={data} />
    </div>
  )
}

export default App
