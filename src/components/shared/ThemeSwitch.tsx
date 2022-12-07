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
        className="group bg-primary-light-hover lg:bg-transparent dark:bg-gray-dark lg:dark:bg-transparent lg:transparent uppercase w-full border-b-[1px] border-t-[1px] lg:border-t-0 flex justify-center lg:justify-start items-center pl-3 py-1 lg:py-0 overflow-hidden relative"
        onClick={switchTheme}
      >
        <div>
          <div
            className={`${sunPosition} h-9 w-9 cursor-pointe rounded-full absolute top-[6px] lg:top-0 flex items-center justify-center bg-yellow group-hover:bg-yellow-hover transition-transform transform-duration-500`}
          >
            <SunSvg className="absolute w-5 h-5 " />
          </div>
          <div
            className={`${moonPosition} h-9 w-9 cursor-pointe rounded-full absolute top-[6px] lg:top-0 flex items-center justify-center bg-white group-hover:bg-gray-text-hover text-black transition-transform transform-duration-500`}
          >
            <MoonSvg className="absolute" />
          </div>
        </div>

        <div className=" pl-12 gap-3 group-hover:text-gray-text-hover dark:group-hover:text-gray-text-hover-dark">
          <p className="py-2 cursor-pointer uppercase text-center">
            {theme === 'light' ? 'svetla tema' : 'tamna tema'}
          </p>
        </div>
      </button>
    </>
  )
}

export default ThemeSwitch
