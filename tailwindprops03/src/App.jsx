import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
    const[count, setCount] = useState(0)
    let myObj = {
        username: "dishita",
        age: 19
    }
    let newArr = [1, 2, 3]
  return (
    <>
    
      <h1 className="max-w-2xl mx-auto bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind test
      </h1>
      <Card username="mundra" btnText= "click me" />
      <Card username="hello" btnText= "visit me"/>
    </>
  )
}

export default App; 
