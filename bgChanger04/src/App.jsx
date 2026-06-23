import { useState } from 'react'

function App() {
  const [color, setColor] = useState("olive")

  return (
    <div
      className="w-screen h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div
        className="fixed flex flex-wrap 
        justify-center bottom-12 inset-x-0 px-2">
          <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-3 rounded-3xl'>
            test
            <button></button>
          </div>
      </div>
    </div>
  )
}

export default App