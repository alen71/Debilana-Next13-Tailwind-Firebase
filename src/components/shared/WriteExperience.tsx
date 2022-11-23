import React, { useContext } from 'react'

import Pencil from '../../assets/pencil.svg'
// import PencilDark from '../../assets/pencil-dark.svg'
import { ThemeContext } from '../../context/themeSwitch.context'

const WriteExperience = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="flex items-center gap-3 py-1 px-3 cursor-pointer rounded-md hover:bg-primary-light dark:hover:text-gray-dark">
      <span className="hidden md:inline-flex">Podeli iskustvo</span>
      <Pencil />
    </div>
  )
}

export default WriteExperience
