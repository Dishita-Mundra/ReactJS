import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAll) str += "0123456789"
    if (charAll) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1;i <= array.length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = str.charAt(char)
      
    }

  }, [length, numAll, charAll, setPassword])

  return (
    <h1
      className='text-4xl text-center text-white'
    >
      Password Generator</h1>
  )
}

export default App