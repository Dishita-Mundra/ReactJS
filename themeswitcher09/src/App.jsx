import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/Theme'

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  }

  const darkTheme = () => {
    setThemeMode("dark");
  }

  return (

    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* themeBtn */}

          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Card */}

          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

export default App