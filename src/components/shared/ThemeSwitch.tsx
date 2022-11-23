import React, { useContext, useEffect, useState } from 'react'

import { BsSun } from 'react-icons/bs'
import { ThemeContext } from '../../context/themeSwitch.context'

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <div
      className="h-9 w-9 self-end cursor-pointer border-b-4 overflow-hidden relative flex justify-center"
      onClick={switchTheme}
    >
      <BsSun
        className={`absolute top-0 ${
          theme === 'light' ? 'translate-y-0' : 'translate-y-4'
        } transition-transform transform-duration-300 w-7 h-7`}
      />
    </div>
  )
}

export default ThemeSwitch
