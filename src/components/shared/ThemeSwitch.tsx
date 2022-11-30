import React, { useContext } from 'react'

import SunSvg from '../../assets/sun.svg'
import MoonSvg from '../../assets/moon.svg'
import { ThemeContext } from '../../context/ThemeSwitch.context'

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const sunPosition = theme === 'light' ? '' : 'translate-y-[100px]'
  const moonPosition = theme === 'light' ? 'translate-y-[100px]' : ''

  return (
    <>
      <button
        className="group uppercase w-full mt-24 border-b-[1px] flex items-center pl-3 overflow-hidden relative"
        onClick={switchTheme}
      >
        <div
          className={`${sunPosition} h-9 w-9 cursor-pointe rounded-full absolute top-0 flex items-center justify-center bg-yellow group-hover:bg-yellow-hover transition-transform transform-duration-500`}
        >
          <SunSvg className="absolute w-5 h-5 " />
        </div>
        <div
          className={`${moonPosition} h-9 w-9 cursor-pointe rounded-full absolute top-0 flex items-center justify-center bg-white group-hover:bg-gray-text-hover text-black transition-transform transform-duration-500`}
        >
          <MoonSvg className="absolute" />
        </div>
        <div className=" pl-12 gap-3 group-hover:text-gray-text-hover dark:group-hover:text-gray-text-hover-dark">
          <p className="py-2 cursor-pointer uppercase text-center">
            tamna tema
          </p>
        </div>
      </button>
    </>
  )
}

export default ThemeSwitch
