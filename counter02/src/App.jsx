import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0);

  // let counter = 5

  const addValue = () => {
    
    if (counter < 20) {
      // update as earlier
      // setCounter(counter + 1)
      // setCounter(counter + 1)
      // setCounter(counter + 1)
      // setCounter(counter + 1)

      // counter value update with how many setCounter written
      setCounter(prevCounter => prevCounter + 1)
      setCounter(prevCounter => prevCounter + 1)
      setCounter(prevCounter => prevCounter + 1)
      setCounter(prevCounter => prevCounter + 1)
    }
  }

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  const reset = () => {
    setCounter(0)
  }

  return (
    <>
      <h1>Counter App</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>
        Add Value {counter}</button> <br />

      <button onClick={removeValue}>
        Remove Value {counter}</button> <br />

      <button onClick={reset}>
        Reset Value
      </button>

    </>
  )
}

export default App