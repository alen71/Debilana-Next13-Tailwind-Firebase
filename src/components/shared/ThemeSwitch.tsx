import React, { useContext, useEffect, useState } from 'react'

import { BsSun } from 'react-icons/bs'
import { ThemeContext } from '../../context/ThemeSwitch.context'

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <div
      className="h-7 w-7 cursor-pointer border-b-2 overflow-hidden relative flex justify-center"
      onClick={switchTheme}
    >
      <BsSun
        className={`absolute top-0 ${
          theme === 'light' ? 'translate-y-0' : 'translate-y-3'
        } transition-transform transform-duration-300 w-6 h-6`}
      />
    </div>
  )
}

export default ThemeSwitch
