import React, { useContext } from 'react'

import SunSvg from '../../assets/sun.svg'
import MoonSvg from '../../assets/moon.svg'
import { ThemeContext } from '../../context/ThemeSwitch.context'

const themeAccessories = [
  {
    type: 'sun',
    icon: <SunSvg className="absolute w-6 h-6 " />
  },
  {
    type: 'moon',
    icon: <MoonSvg className="absolute scale-125" />
  }
]

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
        className="group bg-gray-bg lg:bg-transparent dark:bg-gray-dark lg:dark:bg-transparent lg:transparent uppercase w-full border-b-[1px] border-t-[1px] lg:border-t-0 flex justify-center lg:justify-start items-center lg:pl-3 py-1 lg:py-0 overflow-hidden relative"
        onClick={switchTheme}
      >
        <div>
          {themeAccessories.map(({ icon, type }) => {
            return (
              <div
                key={type}
                className={`${
                  type === 'sun' ? sunPosition : moonPosition
                } h-9 w-9 cursor-pointe rounded-full absolute top-[6px] lg:top-0 flex items-center justify-center bg-primary group-hover:bg-primary-light transition-transform transform-duration-500`}
              >
                {icon}
              </div>
            )
          })}
        </div>

        <div className=" pl-12 gap-3 group-hover:text-gray dark:group-hover:text-gray">
          <p className="py-2 cursor-pointer uppercase text-center">
            {theme === 'light' ? 'svetla tema' : 'tamna tema'}
          </p>
        </div>
      </button>
    </>
  )
}

export default ThemeSwitch
