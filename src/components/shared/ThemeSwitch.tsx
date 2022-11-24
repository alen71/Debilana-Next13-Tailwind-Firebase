import React, { useContext } from 'react'

import { BsSun } from 'react-icons/bs'
import { FiMoon } from 'react-icons/fi'
import { ThemeContext } from '../../context/ThemeSwitch.context'

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <button
      className="h-7 w-7 mx-5 cursor-pointer border-b-2 overflow-hidden relative flex justify-center"
      onClick={switchTheme}
    >
      <BsSun
        className={`absolute top-0 ${
          theme === 'light' ? 'translate-y-0' : 'translate-y-[110%]'
        } transition-transform transform-duration-500 w-6  h-6`}
      />
      <FiMoon
        className={`absolute top-0 ${
          theme === 'light' ? 'translate-y-full' : 'translate-y-0'
        } transition-transform transform-duration-500 w-6  h-6`}
      />
    </button>
  )
}

export default ThemeSwitch
