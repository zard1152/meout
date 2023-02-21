import { useEffect, useState } from 'react'
import { checkTheme, classNames } from '../utils'

const ToggleTheme = () => {
  const [theme, setTheme] = useState<string>()

  useEffect(() => {
    setTheme(checkTheme())
  }, [])

  const toggleTheme = () => {
    window.localStorage.setItem(
      'meout-theme',
      theme === 'dark' ? 'light' : 'dark'
    )
    setTheme(checkTheme())
  }

  return (
    <button
      className="bg-accent-1 border border-accent-2 w-14 h-8 rounded-full relative"
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
    >
      <span
        className={classNames(
          'absolute inset-0 bg-accent-7 rounded-full w-6 h-6 mt-[3px] shadow-md mx-1 duration-300 ease-in-out transition-all',
          theme === 'dark' ? 'ml-1' : 'ml-7'
        )}
      >
        🌓
      </span>
    </button>
  )
}

export default ToggleTheme
